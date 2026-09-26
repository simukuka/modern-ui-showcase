import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductCarousel({ products, label }: { products: Product[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" className="icon-btn border border-ink/15" onClick={() => scroll(-1)} aria-label="Previous products">
          <ChevronLeft size={18} />
        </button>
        <button type="button" className="icon-btn border border-ink/15" onClick={() => scroll(1)} aria-label="Next products">
          <ChevronRight size={18} />
        </button>
      </div>
      <ul ref={track} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:px-0">
        {products.map((p) => (
          <li key={p.id} className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-[31%] lg:w-[23%]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
