import { Check, ChevronRight, Leaf, RotateCcw, ShoppingBag, Truck, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useId, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageBlock from '../components/ImageBlock';
import ProductBadges from '../components/ProductBadges';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';
import StarRating from '../components/StarRating';
import WishlistButton from '../components/WishlistButton';
import { useCart } from '../context/CartContext';
import { getCategory, getProduct, getRelatedProducts, type Product } from '../data/products';
import { useSeo } from '../hooks/useSeo';
import { cn, formatPrice } from '../lib/utils';
import NotFound from './NotFound';

export default function ProductDetail() {
  const { id = '' } = useParams();
  const product = getProduct(id);
  if (!product) return <NotFound />;
  // `key` resets all local state (selected image, shade, qty…) when navigating between products.
  return <ProductView key={product.id} product={product} />;
}

function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const image = product.images[active];

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const onThumbKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % product.images.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <div className="flex flex-col-reverse gap-4 self-start md:flex-row md:items-start lg:sticky lg:top-28">
      <div role="tablist" aria-label="Product images" aria-orientation="vertical" onKeyDown={onThumbKey} className="no-scrollbar flex gap-3 overflow-x-auto md:w-20 md:flex-col">
        {product.images.map((img, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            aria-label={`Show image ${i + 1} of ${product.images.length}`}
            onClick={() => setActive(i)}
            className={cn('shrink-0 overflow-hidden rounded-xl border-2 transition', active === i ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100')}
          >
            <ImageBlock image={img} className="h-20 w-16 md:h-24 md:w-20" />
          </button>
        ))}
      </div>
      <div className="relative flex-1">
        <div
          className={cn('overflow-hidden rounded-3xl', zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in')}
          onMouseMove={onMove}
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
        >
          <ImageBlock
            image={image}
            eager
            className="aspect-[4/5] w-full"
            label={`Image ${active + 1}`}
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
          style={{ display: zoomed ? 'block' : 'none' }}
        >
          <div className="h-full w-full scale-[2] transition-transform duration-200" style={{ transformOrigin: origin }}>
            <ImageBlock image={image} className="h-full w-full" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setZoomed((z) => !z)}
          aria-pressed={zoomed}
          aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
          className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:text-accent"
        >
          {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
        </button>
      </div>
    </div>
  );
}

const tabs = ['Description', 'Ingredients', 'How to use'] as const;

function ProductView({ product }: { product: Product }) {
  useSeo(product.name, `${product.shortDescription} Shop ${product.name} at Shaarz Cosmetics.`);
  const { addItem } = useCart();
  const [shade, setShade] = useState(product.shades?.[0]?.name);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>('Description');
  const [added, setAdded] = useState(false);
  const tabsId = useId();
  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  const tabContent: Record<(typeof tabs)[number], string> = {
    Description: product.description,
    Ingredients: product.ingredients,
    'How to use': product.howToUse,
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.indexOf(tab);
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else return;
    e.preventDefault();
    setTab(tabs[next]);
    document.getElementById(`${tabsId}-tab-${next}`)?.focus();
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="container-page pt-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-muted">
          <li>
            <Link to="/" className="rounded hover:text-accent">Home</Link>
            <ChevronRight size={14} className="ml-1 inline" aria-hidden="true" />
          </li>
          <li>
            <Link to={`/shop?category=${product.category}`} className="rounded hover:text-accent">{category?.name}</Link>
            <ChevronRight size={14} className="ml-1 inline" aria-hidden="true" />
          </li>
          <li aria-current="page" className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <section className="container-page grid gap-10 py-8 lg:grid-cols-2 lg:gap-16">
        <Gallery product={product} />

        <div className="lg:py-4">
          <ProductBadges badges={product.badges} />
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <StarRating rating={product.rating} />
            <button
              type="button"
              onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded text-ink-soft underline-offset-4 hover:text-accent hover:underline"
            >
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </button>
          </div>
          <p className="mt-5 flex items-baseline gap-3 text-2xl font-medium">
            {formatPrice(product.price)}
            {product.compareAtPrice && (
              <span className="text-lg text-ink-muted line-through">
                <span className="sr-only">Was </span>
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{product.shortDescription}</p>

          {product.shades && (
            <fieldset className="mt-8">
              <legend className="text-sm font-medium">
                Shade: <span className="font-normal text-ink-soft">{shade}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.shades.map((s) => (
                  <label key={s.name} className="cursor-pointer" title={s.name}>
                    <input type="radio" name="shade" value={s.name} checked={shade === s.name} onChange={() => setShade(s.name)} className="peer sr-only" />
                    <span className="sr-only">{s.name}</span>
                    <span
                      aria-hidden="true"
                      className="block h-10 w-10 rounded-full border-2 border-white shadow ring-2 ring-transparent transition peer-checked:ring-accent peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 hover:scale-110"
                      style={{ backgroundColor: s.hex }}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {product.sizes && (
            <fieldset className="mt-6">
              <legend className="text-sm font-medium">Size</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <label key={s} className="cursor-pointer">
                    <input type="radio" name="size" value={s} checked={size === s} onChange={() => setSize(s)} className="peer sr-only" />
                    <span className="block rounded-full border border-ink/15 bg-white px-5 py-2 text-sm transition hover:border-accent peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2">
                      {s}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QuantitySelector value={qty} onChange={setQty} />
            <button
              type="button"
              className="btn-primary flex-1 py-3.5"
              onClick={() => {
                addItem(product.id, { quantity: qty, shade, size });
                setAdded(true);
              }}
            >
              {added ? <Check size={18} aria-hidden="true" /> : <ShoppingBag size={18} aria-hidden="true" />}
              {added ? 'Added to bag' : `Add to cart · ${formatPrice(product.price * qty)}`}
            </button>
            <WishlistButton productId={product.id} productName={product.name} className="h-12 w-12 border border-ink/15" />
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {added ? `${product.name} added to your bag` : ''}
          </p>

          <ul className="mt-8 grid gap-3 rounded-2xl bg-cream-100 p-5 text-sm text-ink-soft sm:grid-cols-3">
            <li className="flex items-center gap-2"><Truck size={16} className="text-accent" aria-hidden="true" /> Free shipping over $60</li>
            <li className="flex items-center gap-2"><RotateCcw size={16} className="text-accent" aria-hidden="true" /> 30-day returns</li>
            <li className="flex items-center gap-2"><Leaf size={16} className="text-accent" aria-hidden="true" /> Cruelty-free</li>
          </ul>

          <div className="mt-10">
            <div role="tablist" aria-label="Product information" className="flex gap-6 border-b border-ink/10" onKeyDown={onTabKey}>
              {tabs.map((t, i) => (
                <button
                  key={t}
                  id={`${tabsId}-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  aria-controls={`${tabsId}-panel`}
                  tabIndex={tab === t ? 0 : -1}
                  onClick={() => setTab(t)}
                  className={cn('-mb-px rounded-t border-b-2 pb-3 text-sm font-medium transition', tab === t ? 'border-accent text-accent' : 'border-transparent text-ink-soft hover:text-ink')}
                >
                  {t}
                </button>
              ))}
            </div>
            <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-tab-${tabs.indexOf(tab)}`} tabIndex={0} className="animate-fade-in py-6 leading-relaxed text-ink-soft">
              {tabContent[tab]}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="section bg-blush-50" aria-labelledby="reviews-title">
        <div className="container-page grid gap-10 lg:grid-cols-[280px_1fr]">
          <div>
            <h2 id="reviews-title" className="section-title">Reviews</h2>
            <p className="mt-4 font-display text-5xl">{product.rating.toFixed(1)}</p>
            <StarRating rating={product.rating} size={20} className="mt-2" />
            <p className="mt-2 text-sm text-ink-soft">Based on {product.reviewCount} reviews</p>
          </div>
          <ul className="space-y-4">
            {product.reviews.map((r) => (
              <li key={`${r.name}-${r.date}`} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <StarRating rating={r.rating} size={14} />
                  <time dateTime={r.date} className="text-xs text-ink-muted">
                    {new Date(r.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                  </time>
                </div>
                <p className="mt-3 leading-relaxed">{r.text}</p>
                <p className="mt-3 text-sm font-medium">{r.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="related-title">
        <div className="container-page">
          <h2 id="related-title" className="section-title">You may also like</h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
