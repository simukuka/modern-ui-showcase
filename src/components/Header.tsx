import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { navLinks } from '../data/site';
import { useDialog } from '../hooks/useDialog';
import { cn } from '../lib/utils';
import Logo from './Logo';
import SearchForm from './SearchForm';
import SocialLinks from './SocialLinks';

export default function Header() {
  const { count, openDrawer } = useCart();
  const { ids } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useDialog<HTMLDivElement>(menuOpen, () => setMenuOpen(false));

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (to: string) => {
    const [path, query] = to.split('?');
    if (location.pathname !== path) return false;
    return query ? location.search === `?${query}` : !location.search || path !== '/shop';
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled ? 'border-ink/10 bg-cream-50/90 shadow-sm backdrop-blur-md' : 'border-transparent bg-cream-50',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" className="icon-btn -ml-2" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <Menu size={22} />
          </button>
        </div>

        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={() =>
                    cn(
                      'relative rounded py-2 text-sm font-medium tracking-wide transition-colors hover:text-accent',
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100",
                      isActive(l.to) && 'text-accent after:scale-x-100',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <SearchForm className="hidden w-56 xl:block" />
          <button
            type="button"
            className="icon-btn xl:hidden"
            onClick={() => setSearchOpen((o) => !o)}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            aria-controls="header-search"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <Link to="/wishlist" className="icon-btn hidden sm:inline-flex" aria-label={`Wishlist, ${ids.length} items`}>
            <Heart size={20} />
            {ids.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-blush-200 px-1 text-[10px] font-semibold text-ink">
                {ids.length}
              </span>
            )}
          </Link>
          <button type="button" className="icon-btn -mr-2" onClick={openDrawer} aria-label={`Open cart, ${count} items`}>
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] animate-fade-in items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div id="header-search" className="container-page animate-fade-in pb-4 xl:hidden">
          <SearchForm autoFocus onSubmitted={() => setSearchOpen(false)} />
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-ink/40" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm animate-fade-in flex-col bg-cream-50 shadow-soft"
          >
            <div className="flex h-16 items-center justify-between border-b border-ink/10 px-4">
              <Logo />
              <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <div className="p-4">
              <SearchForm onSubmitted={() => setMenuOpen(false)} />
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4">
              <ul className="divide-y divide-ink/10">
                {[...navLinks, { label: 'Wishlist', to: '/wishlist' }, { label: 'Cart', to: '/cart' }].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="block py-4 font-display text-xl transition hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-ink/10 p-4">
              <SocialLinks />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
