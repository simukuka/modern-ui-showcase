import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { formatPrice } from '../lib/utils';
import ImageBlock from './ImageBlock';
import ProductBadges from './ProductBadges';
import StarRating from './StarRating';
import WishlistButton from './WishlistButton';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const hasOptions = Boolean(product.shades?.length || (product.sizes && product.sizes.length > 1));

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-2xl">
        <ImageBlock
          image={product.images[0]}
          className="aspect-[4/5] w-full"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <ProductBadges badges={product.badges} className="absolute left-3 top-3" />
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-3 top-3 z-10" />
        <div className="absolute inset-x-3 bottom-3 pointer-events-none z-10 translate-y-2 opacity-0 group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          {hasOptions ? (
            <Link to={`/product/${product.id}`} className="btn-light w-full shadow-soft">
              Choose options
            </Link>
          ) : (
            <button
              type="button"
              className="btn-light w-full shadow-soft"
              onClick={() => addItem(product.id, { size: product.sizes?.[0] })}
            >
              <ShoppingBag size={16} aria-hidden="true" /> Quick add
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs uppercase tracking-widest text-ink-muted">{product.category}</p>
        <h3 className="mt-1 font-display text-lg leading-snug">
          <Link to={`/product/${product.id}`} className="rounded after:absolute after:inset-0 after:content-[''] hover:text-accent focus-visible:after:rounded-2xl">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-ink-muted">
          <StarRating rating={product.rating} size={13} />
          <span>({product.reviewCount})</span>
        </div>
        <p className="mt-2 flex items-baseline gap-2 font-medium">
          <span>{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-ink-muted line-through">
              <span className="sr-only">Was </span>
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
