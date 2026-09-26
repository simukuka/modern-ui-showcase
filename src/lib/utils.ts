import { brand } from '../data/site';

const formatter = new Intl.NumberFormat(brand.locale, { style: 'currency', currency: brand.currency });

export const formatPrice = (value: number) => formatter.format(value);

/** Resolves an asset path from /public so it works with the Vite `base` (e.g. GitHub Pages). */
export const assetUrl = (src: string) => {
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;
};

export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
