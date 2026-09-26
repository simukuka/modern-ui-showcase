import { SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { categories, getCategory, products, skinTypes, type SkinType } from '../data/products';
import { useSeo } from '../hooks/useSeo';
import { cn } from '../lib/utils';

const priceRanges = [
  { id: 'under-25', label: 'Under $25', min: 0, max: 25 },
  { id: '25-50', label: '$25 – $50', min: 25, max: 50 },
  { id: '50-plus', label: '$50 and above', min: 50, max: Infinity },
];

const sortOptions = [
  { id: 'popular', label: 'Most popular' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = params.get('category') ?? '';
  const price = params.get('price') ?? '';
  const skin = params.get('skin') ?? '';
  const sort = params.get('sort') ?? 'popular';
  const q = params.get('q') ?? '';

  const activeCategory = getCategory(category);
  useSeo(
    activeCategory ? activeCategory.name : 'Shop all',
    activeCategory
      ? `Shop ${activeCategory.name.toLowerCase()} at Shaarz Cosmetics — ${activeCategory.description.toLowerCase()}.`
      : 'Shop the full Shaarz Cosmetics collection of skincare, makeup, fragrance and body care.',
  );

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const range = priceRanges.find((r) => r.id === price);
    const term = q.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!range || (p.price >= range.min && p.price < range.max)) &&
        (!skin || p.skinTypes.includes(skin as SkinType) || p.skinTypes.includes('all')) &&
        (!term || [p.name, p.category, p.shortDescription].some((s) => s.toLowerCase().includes(term))),
    );
    const sorters: Record<string, (a: (typeof list)[number], b: (typeof list)[number]) => number> = {
      popular: (a, b) => b.popularity - a.popularity,
      newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...list].sort(sorters[sort] ?? sorters.popular);
  }, [category, price, skin, sort, q]);

  const activeCount = [category, price, skin, q].filter(Boolean).length;

  const renderFilters = (prefix: string) => (
    <div className="space-y-8">
      <div>
        <label htmlFor={`${prefix}-search`} className="label">
          Search
        </label>
        <input id={`${prefix}-search`} type="search" className="input" placeholder="e.g. serum, lipstick" value={q} onChange={(e) => update('q', e.target.value)} />
      </div>
      <fieldset>
        <legend className="label">Category</legend>
        <div className="mt-2 space-y-2">
          {[{ id: '', name: 'All products' }, ...categories].map((c) => (
            <label key={c.id || 'all'} className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="radio" name={`${prefix}-category`} className="h-4 w-4 accent-accent" checked={category === c.id} onChange={() => update('category', c.id)} />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="label">Price</legend>
        <div className="mt-2 space-y-2">
          {[{ id: '', label: 'Any price' }, ...priceRanges].map((r) => (
            <label key={r.id || 'any'} className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="radio" name={`${prefix}-price`} className="h-4 w-4 accent-accent" checked={price === r.id} onChange={() => update('price', r.id)} />
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="label">Skin type</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {skinTypes
            .filter((s) => s.id !== 'all')
            .map((s) => {
              const active = skin === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update('skin', active ? '' : s.id)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm transition',
                    active ? 'border-accent bg-accent text-white' : 'border-ink/15 bg-white hover:border-accent hover:text-accent',
                  )}
                >
                  {s.label}
                </button>
              );
            })}
        </div>
      </fieldset>
      {activeCount > 0 && (
        <button type="button" className="rounded text-sm font-medium text-accent underline underline-offset-4" onClick={() => setParams(sort !== 'popular' ? { sort } : {}, { replace: true })}>
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <PageHeader eyebrow="Shop" title={activeCategory?.name ?? 'All products'}>
        {activeCategory ? activeCategory.description : 'Skincare, makeup and fragrance made to celebrate you.'}
      </PageHeader>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[240px_1fr]">
        <aside aria-label="Product filters" className="hidden lg:block">
          {renderFilters('desktop')}
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
            <p className="text-sm text-ink-soft" aria-live="polite">
              {results.length} {results.length === 1 ? 'product' : 'products'}
              {q && (
                <>
                  {' '}for “<strong className="text-ink">{q}</strong>”
                </>
              )}
            </p>
            <div className="flex items-center gap-3">
              <button type="button" className="btn-outline px-4 py-2 lg:hidden" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen} aria-controls="mobile-filters">
                <SlidersHorizontal size={16} aria-hidden="true" /> Filters{activeCount > 0 && ` (${activeCount})`}
              </button>
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select id="sort" value={sort} onChange={(e) => update('sort', e.target.value === 'popular' ? '' : e.target.value)} className="input w-auto rounded-full py-2 pr-8">
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtersOpen && (
            <div id="mobile-filters" className="relative mt-4 animate-fade-in rounded-2xl border border-ink/10 bg-white p-6 lg:hidden">
              <button type="button" className="icon-btn absolute right-3 top-3" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={18} />
              </button>
              {renderFilters('mobile')}
            </div>
          )}

          {results.length ? (
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3">
              {results.map((p) => (
                <li key={p.id} className="animate-fade-up">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-16 text-center">
              <p className="font-display text-2xl">No products found</p>
              <p className="mt-2 text-ink-soft">Try adjusting your filters or search term.</p>
              <button type="button" className="btn-primary mt-6" onClick={() => setParams({}, { replace: true })}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
