# Shaarz Cosmetics — Storefront

A modern, premium, fully responsive cosmetics storefront for **Shaarz Cosmetics**, built with
**React 18 + Vite + TypeScript + Tailwind CSS**.

> ⚠️ All text, products and images in this repository are **placeholders** (marked `[PLACEHOLDER]` or shown as soft
> gradient blocks). Nothing has been copied from the existing website. Follow the
> [Replacing placeholder content](#replacing-placeholder-content) guide to add your real brand assets.

## Features

| Area | What's included |
| --- | --- |
| **Home** | Full-width hero with CTA, bestsellers/new-arrivals carousel, shop-by-category tiles, brand story teaser, customer reviews, Instagram-style gallery, newsletter signup |
| **Shop** | Responsive grid, filters (category, price range, skin type), search, sorting (popular, newest, price, rating), "New" / "Bestseller" / "Limited" badges. Filters live in the URL, so filtered views are shareable |
| **Product** | Image gallery with thumbnails + hover/tap zoom, shade & size selectors, quantity, add to cart, wishlist heart, Description / Ingredients / How to use tabs, star ratings & reviews, related products |
| **Cart** | Slide-out cart drawer + full cart page, quantity updates, subtotal and free-shipping progress bar (persisted in `localStorage`) |
| **Checkout (mock)** | 3-step form (Shipping → Payment placeholder → Review) with validation and an order confirmation screen |
| **About / Contact** | Brand story, mission and values; contact form with validation, business hours, social links and an FAQ accordion |
| **Wishlist** | Saved products, persisted in `localStorage` |
| **Global** | Announcement bar, sticky header with search, cart & wishlist counts, mobile menu, rich footer with newsletter & socials, 404 page |
| **Quality** | Semantic HTML, keyboard navigation (focus traps in drawers, arrow-key tabs), visible focus states, skip link, WCAG AA colour contrast, reduced-motion support, lazy-loaded images, code-split pages, per-page titles/meta descriptions, Open Graph tags, favicon |

## Getting started

Requires **Node.js 20.19+** (22 recommended).

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173/modern-ui-showcase/
npm run build     # type-check and build for production into dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
├── components/   # Reusable UI (Header, Footer, CartDrawer, ProductCard, ImageBlock, …)
├── context/      # CartContext and WishlistContext (React Context + localStorage)
├── data/
│   ├── site.ts       # ← ALL site copy: brand, hero, story, about, reviews, FAQ, contact, socials, nav
│   └── products.ts   # ← Product catalogue and categories
├── hooks/        # useLocalStorage, useSeo, useDialog
├── lib/          # Formatting & helpers
├── pages/        # Home, Shop, ProductDetail, Cart, Checkout, About, Contact, Wishlist, NotFound
├── App.tsx       # Routes
└── index.css     # Tailwind layers & shared component classes
tailwind.config.ts  # ← Brand colours & fonts
public/             # favicon.svg, og-image.svg, images/
```

## Replacing placeholder content

Everything you need to edit lives in **three places**: `src/data/`, `tailwind.config.ts` and `public/`.

### 1. Logo, favicon and social share image
- Put your logo in `public/images/` (e.g. `public/images/logo.svg`) and set `brand.logo = 'images/logo.svg'` in
  `src/data/site.ts`. Leave it empty to keep the text wordmark.
- Replace `public/favicon.svg` with your icon (keep the name, or update the `<link rel="icon">` in `index.html`).
- Replace `public/og-image.svg` with a 1200×630 image (a `.jpg`/`.png` is best for social networks) and update the
  `og:image` tag in `index.html`.

### 2. Photos
Every image in the data files is an object like:

```ts
{ src: '', alt: 'Describe the image', tone: 'from-blush-200 to-cream-200' }
```

- Drop your photos into `public/images/` and set `src: 'images/your-photo.jpg'` (or a full CDN URL).
- When `src` is empty a gradient placeholder (`tone`) is shown instead.
- Always write a meaningful `alt` text for accessibility and SEO.
- Tip: export photos as WebP/JPEG around 1600px wide for the hero and ~1000px for products.

### 3. Copy & business details — `src/data/site.ts`
Edit the brand name, tagline, announcement bar, hero text, brand story, About page, homepage reviews,
Instagram handle, contact details, business hours, social links, FAQ and footer links. Search for
`[PLACEHOLDER]` to find every piece of sample text. Free-shipping threshold and flat shipping rate are in
`brand.freeShippingThreshold` / `brand.flatShippingRate`; currency is `brand.currency`.

### 4. Products — `src/data/products.ts`
Each product has:

```ts
{
  id: 'radiance-serum',             // unique, URL-friendly → /product/radiance-serum
  name: 'Radiance Vitamin C Serum',
  category: 'skincare',             // skincare | makeup | lips | eyes | fragrance | body
  price: 48, compareAtPrice: 55,    // compareAtPrice is optional (shows a strike-through)
  rating: 4.8, reviewCount: 214,
  popularity: 98,                   // used by "Most popular" sort
  createdAt: '2026-01-10',          // used by "Newest" sort
  badges: ['Bestseller'],           // 'New' | 'Bestseller' | 'Limited'
  skinTypes: ['all', 'dry'],
  shortDescription, description, ingredients, howToUse,
  shades: [{ name: 'Rosewood', hex: '#9b5a55' }],   // optional
  sizes: ['15 ml', '30 ml'],                         // optional
  images: [{ src: 'images/radiance-1.jpg', alt: '…' }, …],
  reviews: [{ name, rating, date, text }],
}
```

Add, remove or edit products freely — the shop, filters, search, carousel and related products update automatically.
Categories (name, description, tile image) are defined at the top of the same file.

### 5. Colours & fonts — `tailwind.config.ts`
Brand tokens are `cream`, `blush`, `accent` and `ink` colours plus the `display` (Playfair Display) and `sans`
(Inter) font families. Change the hex values or fonts there and the whole site updates. If you change fonts,
also update the Google Fonts `<link>` in `index.html`. Keep text/background contrast at WCAG AA (4.5:1).

## Payments

The checkout is a **mock** — no payment data is collected and no orders are sent anywhere. When you're ready to
sell online, connect a real provider, for example:

- **Shopify Buy Button** — manage products & inventory in Shopify, embed buy buttons/cart.
- **Stripe Checkout / Payment Links** — redirect to a Stripe-hosted checkout (requires a small serverless function
  to create sessions, e.g. on Netlify/Vercel).
- **Snipcart** — add a script and `data-item-*` attributes to the "Add to cart" button; Snipcart handles the cart,
  checkout and payments.

The newsletter and contact forms are also mocked — hook them up to Mailchimp/Klaviyo and Formspree/Netlify
Forms/EmailJS by replacing their submit handlers (`src/components/NewsletterForm.tsx`, `src/pages/Contact.tsx`).

## Deployment

### GitHub Pages (included)
`.github/workflows/deploy.yml` builds and deploys the site on every push to `main`.

1. In the repository go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main` (or run the workflow manually). The site will be available at
   `https://<your-user>.github.io/modern-ui-showcase/`.

Vite's `base` is set to `/modern-ui-showcase/` in `vite.config.ts` and the app uses `HashRouter`
(URLs like `/#/shop`), so deep links and refreshes work on Pages without server configuration.
A `404.html` fallback is also generated.

### Custom domain (e.g. shaarzcosmetics.com), Netlify, Vercel or Cloudflare Pages
1. Set `base: '/'` in `vite.config.ts`.
2. Build command `npm run build`, output directory `dist`.
3. Optional: switch `HashRouter` to `BrowserRouter` in `src/App.tsx` for clean URLs, and add an SPA rewrite
   (`/* → /index.html`) on your host.
4. For a custom domain on GitHub Pages, add a `public/CNAME` file containing your domain and configure DNS.

## License

[MIT](LICENSE)
