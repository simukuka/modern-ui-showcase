import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { cn } from '../lib/utils';

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.q}>
            <h3 className="font-sans text-base">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left font-medium transition hover:text-accent"
              >
                {item.q}
                <ChevronDown size={18} className={cn('shrink-0 transition-transform duration-300', isOpen && 'rotate-180')} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
