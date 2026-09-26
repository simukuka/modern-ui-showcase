import type { Badge } from '../data/products';
import { cn } from '../lib/utils';

const styles: Record<Badge, string> = {
  New: 'bg-white text-ink',
  Bestseller: 'bg-accent text-white',
  Limited: 'bg-ink text-white',
};

export default function ProductBadges({ badges, className }: { badges: Badge[]; className?: string }) {
  if (!badges.length) return null;
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {badges.map((b) => (
        <span key={b} className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-sm', styles[b])}>
          {b}
        </span>
      ))}
    </div>
  );
}
