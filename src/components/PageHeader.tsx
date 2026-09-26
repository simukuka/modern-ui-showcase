import type { ReactNode } from 'react';

export default function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-gradient-to-b from-blush-50 to-cream-50">
      <div className="container-page py-14 text-center sm:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1>
        {children && <div className="mx-auto mt-4 max-w-2xl text-ink-soft">{children}</div>}
      </div>
    </section>
  );
}
