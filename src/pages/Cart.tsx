import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FreeShippingBar from '../components/FreeShippingBar';
import OrderSummary from '../components/OrderSummary';
import ImageBlock from '../components/ImageBlock';
import PageHeader from '../components/PageHeader';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import { useSeo } from '../hooks/useSeo';
import { formatPrice } from '../lib/utils';

export default function Cart() {
  useSeo('Your cart', 'Review the items in your Shaarz Cosmetics shopping bag.');
  const { lines, updateQuantity, removeItem } = useCart();

  if (!lines.length) {
    return (
      <>
        <PageHeader title="Your cart" />
        <div className="container-page flex flex-col items-center py-16 text-center">
          <ShoppingBag size={48} className="text-accent/60" aria-hidden="true" />
          <p className="mt-4 font-display text-2xl">Your cart is empty</p>
          <p className="mt-2 text-ink-soft">Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn-primary mt-8">
            Continue shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Your cart" />
      <div className="container-page grid gap-10 pb-20 lg:grid-cols-[1fr_380px]">
        <div>
          <FreeShippingBar />
          <table className="mt-6 w-full text-left">
            <caption className="sr-only">Items in your cart</caption>
            <thead className="hidden border-b border-ink/10 text-xs uppercase tracking-widest text-ink-muted sm:table-header-group">
              <tr>
                <th scope="col" className="pb-3 font-medium">Product</th>
                <th scope="col" className="pb-3 font-medium">Quantity</th>
                <th scope="col" className="pb-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {lines.map((line) => (
                <tr key={line.key} className="flex flex-wrap items-center gap-4 py-6 sm:table-row">
                  <td className="w-full sm:w-auto sm:py-6">
                    <div className="flex items-center gap-4">
                      <ImageBlock image={line.product.images[0]} className="h-28 w-24 shrink-0 rounded-xl" />
                      <div>
                        <Link to={`/product/${line.product.id}`} className="rounded font-display text-lg hover:text-accent">
                          {line.product.name}
                        </Link>
                        {(line.shade || line.size) && <p className="mt-1 text-sm text-ink-muted">{[line.shade, line.size].filter(Boolean).join(' · ')}</p>}
                        <p className="mt-1 text-sm">{formatPrice(line.product.price)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="sm:py-6">
                    <div className="flex items-center gap-2">
                      <QuantitySelector value={line.quantity} onChange={(q) => updateQuantity(line.key, q)} label={`Quantity for ${line.product.name}`} />
                      <button type="button" onClick={() => removeItem(line.key)} className="icon-btn" aria-label={`Remove ${line.product.name}`}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="ml-auto text-right font-medium sm:py-6">{formatPrice(line.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/shop" className="mt-4 inline-flex items-center gap-2 rounded text-sm font-medium text-accent">
            <ArrowLeft size={16} aria-hidden="true" /> Continue shopping
          </Link>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <OrderSummary>
            <Link to="/checkout" className="btn-primary mt-6 w-full py-4">
              Proceed to checkout
            </Link>
            <p className="mt-4 text-center text-xs text-ink-muted">Taxes calculated at checkout.</p>
          </OrderSummary>
        </aside>
      </div>
    </>
  );
}
