import { Link } from 'react-router-dom';
import { brand, contact, footerLinks } from '../data/site';
import Logo from './Logo';
import NewsletterForm from './NewsletterForm';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-cream-100">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">{brand.tagline}.</p>
          <SocialLinks className="mt-6 -ml-2" />
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="rounded text-sm text-ink-soft transition hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="lg:col-span-4">
          <h2 className="font-display text-xl">Join the Shaarz circle</h2>
          <p className="mt-2 text-sm text-ink-soft">Get 10% off your first order, early access to launches and beauty tips.</p>
          <NewsletterForm className="mt-4" />
          <p className="mt-6 text-sm text-ink-soft">
            <a href={`mailto:${contact.email}`} className="rounded hover:text-accent">
              {contact.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p>Prices shown in {brand.currency}. Demo storefront — no real payments are processed.</p>
        </div>
      </div>
    </footer>
  );
}
