import { Check, CheckCircle2, CreditCard, Lock, Truck, Wallet } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField';
import ImageBlock from '../components/ImageBlock';
import OrderSummary from '../components/OrderSummary';
import { useCart, type CartLine } from '../context/CartContext';
import { useSeo } from '../hooks/useSeo';
import { cn, formatPrice, isValidEmail } from '../lib/utils';

const steps = ['Shipping', 'Payment', 'Review'] as const;

interface Shipping {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
}

type Errors = Partial<Record<string, string>>;

const paymentMethods = [
  { id: 'card', label: 'Credit / debit card', icon: CreditCard },
  { id: 'wallet', label: 'PayPal / digital wallet', icon: Wallet },
  { id: 'cod', label: 'Cash on delivery', icon: Truck },
];

const validateShipping = (s: Shipping): Errors => {
  const e: Errors = {};
  if (!isValidEmail(s.email)) e.email = 'Enter a valid email address.';
  if (!s.firstName.trim()) e.firstName = 'First name is required.';
  if (!s.lastName.trim()) e.lastName = 'Last name is required.';
  if (s.address.trim().length < 5) e.address = 'Enter your street address.';
  if (!s.city.trim()) e.city = 'City is required.';
  if (!/^[A-Za-z0-9\s-]{3,10}$/.test(s.postcode.trim())) e.postcode = 'Enter a valid postal code.';
  if (!s.country.trim()) e.country = 'Country is required.';
  if (s.phone && !/^[+\d\s()-]{7,20}$/.test(s.phone)) e.phone = 'Enter a valid phone number.';
  return e;
};

interface Confirmed {
  orderNumber: string;
  email: string;
  lines: CartLine[];
  total: number;
}

export default function Checkout() {
  useSeo('Checkout', 'Securely complete your Shaarz Cosmetics order.');
  const { lines, total, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<Shipping>({ email: '', firstName: '', lastName: '', address: '', city: '', postcode: '', country: '', phone: '' });
  const [payment, setPayment] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const go = (next: number) => {
    setErrors({});
    setStep(next);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const focusFirstError = (errs: Errors) => {
    const first = Object.keys(errs)[0];
    if (first) requestAnimationFrame(() => document.getElementById(`co-${first}`)?.focus());
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 0) {
      const errs = validateShipping(shipping);
      setErrors(errs);
      if (Object.keys(errs).length) return focusFirstError(errs);
      go(1);
    } else if (step === 1) {
      if (!payment) {
        setErrors({ payment: 'Please choose a payment method.' });
        return focusFirstError({ payment: 'x' });
      }
      go(2);
    } else {
      if (!terms) {
        setErrors({ terms: 'Please accept the terms to place your order.' });
        return focusFirstError({ terms: 'x' });
      }
      setConfirmed({
        orderNumber: `SZ-${Date.now().toString().slice(-6)}`,
        email: shipping.email,
        lines,
        total,
      });
      clearCart();
      window.scrollTo(0, 0);
    }
  };

  if (confirmed) {
    return (
      <div className="container-page max-w-2xl py-20 text-center">
        <CheckCircle2 size={56} className="mx-auto text-accent" aria-hidden="true" />
        <h1 className="mt-6 text-4xl sm:text-5xl">Thank you for your order!</h1>
        <p className="mt-4 text-ink-soft" role="status">
          Order <strong className="text-ink">{confirmed.orderNumber}</strong> has been placed. A confirmation will be sent to{' '}
          <strong className="text-ink">{confirmed.email}</strong>.
        </p>
        <p className="mt-2 text-xs text-ink-muted">This is a demo checkout — no payment has been taken.</p>
        <ul className="mt-10 divide-y divide-ink/10 rounded-2xl bg-white p-6 text-left shadow-sm">
          {confirmed.lines.map((l) => (
            <li key={l.key} className="flex justify-between gap-4 py-3 text-sm">
              <span>
                {l.product.name} × {l.quantity}
                {(l.shade || l.size) && <span className="block text-xs text-ink-muted">{[l.shade, l.size].filter(Boolean).join(' · ')}</span>}
              </span>
              <span>{formatPrice(l.lineTotal)}</span>
            </li>
          ))}
          <li className="flex justify-between py-3 font-semibold">
            <span>Total</span>
            <span>{formatPrice(confirmed.total)}</span>
          </li>
        </ul>
        <Link to="/shop" className="btn-primary mt-10">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-4xl">Checkout</h1>
        <p className="mt-4 text-ink-soft">Your cart is empty.</p>
        <Link to="/shop" className="btn-primary mt-8">
          Shop products
        </Link>
      </div>
    );
  }

  const field = (key: keyof Shipping, label: string, extra: Record<string, unknown> = {}) => (
    <FormField
      id={`co-${key}`}
      label={label}
      value={shipping[key]}
      onChange={(e) => setShipping((s) => ({ ...s, [key]: e.target.value }))}
      error={errors[key]}
      {...extra}
    />
  );

  return (
    <div className="container-page py-12">
      <h1 className="text-center text-4xl sm:text-5xl">Checkout</h1>

      <nav aria-label="Checkout progress" className="mx-auto mt-10 max-w-lg">
        <ol className="flex items-center justify-between">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center last:flex-none" aria-current={i === step ? 'step' : undefined}>
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium transition',
                    i < step ? 'border-accent bg-accent text-white' : i === step ? 'border-accent text-accent' : 'border-ink/20 text-ink-muted',
                  )}
                >
                  {i < step ? <Check size={16} aria-hidden="true" /> : i + 1}
                </span>
                <span className={cn('text-sm', i === step ? 'font-medium text-ink' : 'text-ink-muted')}>
                  {label}
                  {i < step && <span className="sr-only"> (completed)</span>}
                </span>
              </span>
              {i < steps.length - 1 && <span className={cn('mx-3 h-px flex-1', i < step ? 'bg-accent' : 'bg-ink/15')} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} noValidate className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl focus:outline-none">
            {step === 0 ? 'Shipping details' : step === 1 ? 'Payment' : 'Review your order'}
          </h2>

          {step === 0 && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {field('email', 'Email', { type: 'email', autoComplete: 'email', required: true, className: 'sm:col-span-2' })}
              {field('firstName', 'First name', { autoComplete: 'given-name', required: true })}
              {field('lastName', 'Last name', { autoComplete: 'family-name', required: true })}
              {field('address', 'Address', { autoComplete: 'street-address', required: true, className: 'sm:col-span-2' })}
              {field('city', 'City', { autoComplete: 'address-level2', required: true })}
              {field('postcode', 'Postal code', { autoComplete: 'postal-code', required: true })}
              {field('country', 'Country', { autoComplete: 'country-name', required: true })}
              {field('phone', 'Phone (optional)', { type: 'tel', autoComplete: 'tel' })}
            </div>
          )}

          {step === 1 && (
            <div className="mt-6">
              <p className="flex items-start gap-2 rounded-2xl bg-blush-50 p-4 text-sm text-ink-soft">
                <Lock size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <strong className="text-ink">Payment placeholder.</strong> This demo does not collect card details. Connect a provider such as Stripe,
                  Shopify or Snipcart to accept real payments.
                </span>
              </p>
              <fieldset className="mt-6" aria-describedby={errors.payment ? 'co-payment-error' : undefined}>
                <legend className="label">Payment method</legend>
                <div className="mt-2 grid gap-3">
                  {paymentMethods.map(({ id, label, icon: Icon }, i) => (
                    <label
                      key={id}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent',
                        payment === id ? 'border-accent bg-blush-50' : 'border-ink/15 hover:border-accent',
                      )}
                    >
                      <input
                        id={i === 0 ? 'co-payment' : undefined}
                        type="radio"
                        name="payment"
                        value={id}
                        checked={payment === id}
                        onChange={() => setPayment(id)}
                        className="h-4 w-4 accent-accent"
                      />
                      <Icon size={18} className="text-accent" aria-hidden="true" />
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.payment && (
                  <p id="co-payment-error" className="mt-2 text-sm text-red-700">
                    {errors.payment}
                  </p>
                )}
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-cream-100 p-5 text-sm">
                  <div className="flex justify-between">
                    <h3 className="font-sans font-medium">Ship to</h3>
                    <button type="button" className="rounded text-accent underline underline-offset-4" onClick={() => go(0)}>
                      Edit<span className="sr-only"> shipping details</span>
                    </button>
                  </div>
                  <p className="mt-2 text-ink-soft">
                    {shipping.firstName} {shipping.lastName}
                    <br />
                    {shipping.address}
                    <br />
                    {shipping.city}, {shipping.postcode}
                    <br />
                    {shipping.country}
                    <br />
                    {shipping.email}
                  </p>
                </div>
                <div className="rounded-2xl bg-cream-100 p-5 text-sm">
                  <div className="flex justify-between">
                    <h3 className="font-sans font-medium">Payment</h3>
                    <button type="button" className="rounded text-accent underline underline-offset-4" onClick={() => go(1)}>
                      Edit<span className="sr-only"> payment method</span>
                    </button>
                  </div>
                  <p className="mt-2 text-ink-soft">{paymentMethods.find((m) => m.id === payment)?.label}</p>
                </div>
              </div>
              <ul className="divide-y divide-ink/10">
                {lines.map((l) => (
                  <li key={l.key} className="flex items-center gap-4 py-4">
                    <ImageBlock image={l.product.images[0]} className="h-16 w-14 shrink-0 rounded-lg" />
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{l.product.name}</p>
                      <p className="text-ink-muted">
                        {[l.shade, l.size].filter(Boolean).join(' · ')} {(l.shade || l.size) && '·'} Qty {l.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(l.lineTotal)}</p>
                  </li>
                ))}
              </ul>
              <div>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    id="co-terms"
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    aria-invalid={Boolean(errors.terms)}
                    aria-describedby={errors.terms ? 'co-terms-error' : undefined}
                    className="mt-0.5 h-4 w-4 accent-accent"
                  />
                  <span>I agree to the terms of service and privacy policy.</span>
                </label>
                {errors.terms && (
                  <p id="co-terms-error" className="mt-2 text-sm text-red-700">
                    {errors.terms}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step > 0 ? (
              <button type="button" className="btn-outline" onClick={() => go(step - 1)}>
                Back
              </button>
            ) : (
              <Link to="/cart" className="btn-outline">
                Back to cart
              </Link>
            )}
            <button type="submit" className="btn-primary px-10">
              {step === 0 ? 'Continue to payment' : step === 1 ? 'Review order' : `Place order · ${formatPrice(total)}`}
            </button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <OrderSummary>
            <ul className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm">
              {lines.map((l) => (
                <li key={l.key} className="flex justify-between gap-3">
                  <span className="text-ink-soft">
                    {l.product.name} × {l.quantity}
                  </span>
                  <span>{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
          </OrderSummary>
        </aside>
      </div>
    </div>
  );
}
