import { Search } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function SearchForm({ className, onSubmitted, autoFocus }: { className?: string; onSubmitted?: () => void; autoFocus?: boolean }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop');
    onSubmitted?.();
  };

  return (
    <form role="search" onSubmit={submit} className={cn('relative', className)}>
      <label htmlFor={autoFocus ? 'site-search-overlay' : 'site-search'} className="sr-only">
        Search products
      </label>
      <input
        id={autoFocus ? 'site-search-overlay' : 'site-search'}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products…"
        autoFocus={autoFocus}
        className="input rounded-full py-2.5 pl-10 pr-4"
      />
      <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
    </form>
  );
}
