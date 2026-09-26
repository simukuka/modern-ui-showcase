import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY } from '../context/CartContext';
import { cn } from '../lib/utils';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  label?: string;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({ value, onChange, min = 1, label = 'Quantity', size = 'md' }: Props) {
  const btn = cn('inline-flex items-center justify-center rounded-full transition hover:bg-blush-100 disabled:opacity-40', size === 'sm' ? 'h-8 w-8' : 'h-11 w-11');
  return (
    <div className="inline-flex items-center rounded-full border border-ink/15 bg-white" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus size={14} />
      </button>
      <span className={cn('min-w-[2rem] text-center font-medium tabular-nums', size === 'sm' ? 'text-sm' : '')} aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY} aria-label="Increase quantity">
        <Plus size={14} />
      </button>
    </div>
  );
}
