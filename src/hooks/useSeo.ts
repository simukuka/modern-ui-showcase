import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { brand } from '../data/site';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Sets per-page <title>, meta description and Open Graph tags. */
export function useSeo(title?: string, description: string = brand.defaultDescription) {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const fullTitle = title ? `${title} | ${brand.name}` : `${brand.name} — ${brand.tagline}`;
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', window.location.href);
  }, [title, description, pathname, search]);
}
