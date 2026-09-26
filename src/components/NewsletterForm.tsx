import { CheckCircle2 } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';
import { cn, isValidEmail } from '../lib/utils';

/**
 * Mock newsletter signup. Connect to Mailchimp, Klaviyo, etc. by replacing `handleSubmit`.
 */
export default function NewsletterForm({ variant = 'light', className }: { variant?: 'light' | 'dark'; className?: string }) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setDone(true);
  };

  if (done) {
    return (
      <p className={cn('flex items-center gap-2 text-sm', className)} role="status">
        <CheckCircle2 size={18} className={variant === 'dark' ? 'text-blush-200' : 'text-accent'} aria-hidden="true" />
        Thank you for subscribing! Check your inbox for a welcome gift.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn('input flex-1 rounded-full', error && 'input-error')}
        />
        <button type="submit" className={variant === 'dark' ? 'btn-light' : 'btn-primary'}>
          Subscribe
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className={cn('mt-2 text-sm', variant === 'dark' ? 'text-blush-200' : 'text-red-700')} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
