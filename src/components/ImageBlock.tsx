import type { ImageAsset } from '../data/site';
import { assetUrl, cn } from '../lib/utils';

interface Props {
  image: ImageAsset;
  className?: string;
  imgClassName?: string;
  /** Set to true for above-the-fold images. */
  eager?: boolean;
  /** Label shown on gradient placeholders. */
  label?: string;
}

/**
 * Renders a real image when `image.src` is set; otherwise a soft gradient placeholder.
 * Images are lazy-loaded by default.
 */
export default function ImageBlock({ image, className, imgClassName, eager, label }: Props) {
  if (image.src) {
    return (
      <div className={cn('overflow-hidden bg-cream-100', className)}>
        <img
          src={assetUrl(image.src)}
          alt={image.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={image.alt}
      className={cn('relative flex items-center justify-center overflow-hidden bg-gradient-to-br', image.tone ?? 'from-blush-100 to-cream-200', className)}
    >
      <div className={cn('absolute inset-0 flex items-center justify-center', imgClassName)}>
        <span className="h-1/2 w-1/3 max-w-[140px] rounded-t-full rounded-b-2xl bg-white/40 shadow-inner" aria-hidden="true" />
      </div>
      {label && (
        <span className="relative mt-auto mb-4 rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-ink-soft" aria-hidden="true">
          {label}
        </span>
      )}
    </div>
  );
}
