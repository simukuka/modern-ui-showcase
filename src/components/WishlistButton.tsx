import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { cn } from '../lib/utils';

export default function WishlistButton({ productId, productName, className }: { productId: string; productName: string; className?: string }) {
  const { has, toggle } = useWishlist();
  const active = has(productId);
  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={active}
      aria-label={active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition hover:scale-105 hover:text-accent',
        className,
      )}
    >
      <Heart size={18} className={cn('transition', active && 'fill-accent text-accent')} />
    </button>
  );
}
