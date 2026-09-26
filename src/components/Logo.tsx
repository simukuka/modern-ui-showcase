import { Link } from 'react-router-dom';
import { brand } from '../data/site';
import { assetUrl, cn } from '../lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center rounded', className)} aria-label={`${brand.name} — home`}>
      {brand.logo ? (
        <img src={assetUrl(brand.logo)} alt={brand.name} className="h-8 w-auto" />
      ) : (
        <span className="font-display text-2xl font-medium tracking-tight text-ink">
          {brand.shortName}
          <span className="ml-1.5 align-middle font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Cosmetics</span>
        </span>
      )}
    </Link>
  );
}
