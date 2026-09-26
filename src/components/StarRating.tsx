import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

export default function StarRating({ rating, className, size = 16 }: { rating: number; className?: string; size?: number }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - (i - 1)));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }} aria-hidden="true">
            <Star size={size} className="absolute inset-0 text-accent/30" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} className="fill-accent text-accent" />
            </span>
          </span>
        );
      })}
    </span>
  );
}
