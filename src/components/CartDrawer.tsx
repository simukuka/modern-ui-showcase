import { ShoppingBag, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useDialog } from '../hooks/useDialog';
import { formatPrice } from '../lib/utils';
import FreeShippingBar from './FreeShippingBar';
import ImageBlock from './ImageBlock';
import QuantitySelector from './QuantitySelector';

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, lines, subtotal, count, updateQuantity, removeItem } = useCart();
  const ref = useDialog<HTMLDivElement>(isDrawerOpen, closeDrawer);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 animate-fade-in bg-ink/40" onClick={closeDrawer} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in-right flex-col bg-cream-50 shadow-soft"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
          <h2 id="cart-drawer-title" className="font-display text-2xl">
            Your bag <span className="font-sans text-base text-ink-muted">({count})</span>
          </h2>
          <button type="button" className="icon-btn -mr-2" onClick={closeDrawer} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <ShoppingBag size={40} className="text-accent/60" aria-hidden="true" />
            <p className="font-display text-xl">Your bag is empty</p>
            <p className="text-sm text-ink-soft">Discover something beautiful.</p>
            <Link to="/shop" onClick={closeDrawer} className="btn-primary mt-2">
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="px-6 pt-4">
              <FreeShippingBar />
            </div>
            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 py-5">
                  <Link to={`/product/${line.product.id}`} onClick={closeDrawer} className="shrink-0 rounded-xl" tabIndex={-1} aria-hidden="true">
                    <ImageBlock image={line.product.images[0]} className="h-24 w-20 rounded-xl" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link to={`/product/${line.product.id}`} onClick={closeDrawer} className="rounded font-medium leading-snug hover:text-accent">
                        {line.product.name}
                      </Link>
                      <p className="font-medium">{formatPrice(line.lineTotal)}</p>
                    </div>
                    {(line.shade || line.size) && (
                      <p className="mt-0.5 text-xs text-ink-muted">{[line.shade, line.size].filter(Boolean).join(' · ')}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantitySelector size="sm" value={line.quantity} min={1} onChange={(q) => updateQuantity(line.key, q)} label={`Quantity for ${line.product.name}`} />
                      <button type="button" onClick={() => removeItem(line.key)} className="icon-btn h-8 w-8" aria-label={`Remove ${line.product.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-ink/10 px-6 py-5">
              <div className="flex justify-between text-base">
                <span>Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">Shipping and taxes calculated at checkout.</p>
              <div className="mt-4 grid gap-2">
                <Link to="/checkout" onClick={closeDrawer} className="btn-primary w-full">
                  Checkout
                </Link>
                <Link to="/cart" onClick={closeDrawer} className="btn-outline w-full">
                  View cart
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
