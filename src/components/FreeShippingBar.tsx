import { Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { brand } from '../data/site';
import { formatPrice } from '../lib/utils';

export default function FreeShippingBar() {
  const { subtotal, remainingForFreeShipping } = useCart();
  const pct = Math.min(100, (subtotal / brand.freeShippingThreshold) * 100);
  return (
    <div className="rounded-2xl bg-blush-50 p-4">
      <p className="flex items-center gap-2 text-sm text-ink">
        <Truck size={16} className="text-accent" aria-hidden="true" />
        {remainingForFreeShipping > 0 ? (
          <span>
            You're <strong>{formatPrice(remainingForFreeShipping)}</strong> away from free shipping
          </span>
        ) : (
          <span>
            <strong>Congratulations!</strong> You've unlocked free shipping.
          </span>
        )}
      </p>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-white"
        role="progressbar"
        aria-label="Progress towards free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
      >
        <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
