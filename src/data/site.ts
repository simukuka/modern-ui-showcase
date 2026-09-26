/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to update all copy on the site.
 * ─────────────────────────────────────────────────────────────
 *  Everything marked [PLACEHOLDER] is sample text. Replace it with
 *  your real brand copy, contact details and social links.
 *
 *  Images: set `src` to a file in /public/images (e.g. 'images/hero.jpg')
 *  or to a full URL. When `src` is empty a soft gradient block is shown.
 */

export interface ImageAsset {
  /** Path relative to /public (e.g. 'images/hero.jpg') or absolute URL. Leave empty for a gradient placeholder. */
  src?: string;
  alt: string;
  /** Tailwind gradient classes used when no `src` is provided. */
  tone?: string;
}

export const brand = {
  name: 'Shaarz Cosmetics',
  shortName: 'Shaarz',
  tagline: 'Clean, luxurious beauty for every skin',
  /** Put your logo in /public/images and set the path here, e.g. 'images/logo.svg'. Leave empty to use the text wordmark. */
  logo: '',
  currency: 'USD',
  locale: 'en-US',
  freeShippingThreshold: 60,
  flatShippingRate: 6.95,
  defaultDescription:
    'Shaarz Cosmetics — thoughtfully crafted skincare, makeup and fragrance for every skin. [PLACEHOLDER description]',
};

export const announcement = {
  text: 'Free shipping on orders over $60 · Complimentary samples with every order',
  link: { label: 'Shop now', to: '/shop' },
};

export const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Skincare', to: '/shop?category=skincare' },
  { label: 'Makeup', to: '/shop?category=makeup' },
  { label: 'Fragrance', to: '/shop?category=fragrance' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const hero = {
  eyebrow: 'New collection',
  headline: 'Beauty that feels as good as it looks',
  subheadline:
    '[PLACEHOLDER] Thoughtfully formulated skincare and makeup that celebrates your natural radiance — gentle on skin, rich in results.',
  cta: { label: 'Shop Now', to: '/shop' },
  secondaryCta: { label: 'Our story', to: '/about' },
  image: {
    src: '',
    alt: 'Placeholder hero image — replace with a campaign photo of your products',
    tone: 'from-blush-200 via-cream-200 to-blush-100',
  } as ImageAsset,
};

export const brandStory = {
  eyebrow: 'Our story',
  title: 'Crafted with intention, made for you',
  body: '[PLACEHOLDER] Shaarz Cosmetics was born from a simple belief: that beauty should be effortless, inclusive and kind to your skin. Every formula is developed with care, tested for comfort and designed to bring out your own glow.',
  cta: { label: 'Read our story', to: '/about' },
  image: {
    src: '',
    alt: 'Placeholder image — founder or studio photo',
    tone: 'from-cream-300 via-blush-100 to-cream-100',
  } as ImageAsset,
};

export const about = {
  title: 'About Shaarz Cosmetics',
  intro:
    '[PLACEHOLDER] We create modern beauty essentials that blend high-performance ingredients with a luxurious feel — so your routine becomes a moment you look forward to.',
  story: [
    '[PLACEHOLDER] What began as a small passion project has grown into a beauty brand loved by clients who value quality, transparency and self-expression.',
    '[PLACEHOLDER] Our products are developed in small batches, with carefully selected ingredients and textures designed to suit every skin tone and type.',
  ],
  mission:
    '[PLACEHOLDER] Our mission is to make premium, skin-loving beauty accessible to everyone — and to help every client feel confident in their own skin.',
  values: [
    { title: 'Skin-first formulas', text: '[PLACEHOLDER] Gentle, effective ingredients chosen with care for sensitive and everyday skin.' },
    { title: 'Inclusive by design', text: '[PLACEHOLDER] Shades and textures created to celebrate every skin tone.' },
    { title: 'Cruelty-free', text: '[PLACEHOLDER] We never test on animals and partner only with ethical suppliers.' },
    { title: 'Mindful packaging', text: '[PLACEHOLDER] Recyclable materials and refills wherever possible.' },
  ],
  image: {
    src: '',
    alt: 'Placeholder image — brand lifestyle photo',
    tone: 'from-blush-100 via-cream-200 to-blush-200',
  } as ImageAsset,
};

export const reviews = [
  { name: 'Amira K.', rating: 5, text: '[PLACEHOLDER] My skin has never felt this soft. The serum is now a daily essential.', product: 'Radiance Serum' },
  { name: 'Leila M.', rating: 5, text: '[PLACEHOLDER] The lipstick shades are gorgeous and last all day without drying.', product: 'Velvet Matte Lipstick' },
  { name: 'Sara T.', rating: 4, text: '[PLACEHOLDER] Beautiful packaging, fast delivery, and the fragrance is dreamy.', product: 'Rose Oud Eau de Parfum' },
];

export const instagram = {
  handle: '@shaarzcosmetics',
  url: 'https://instagram.com/',
  images: [
    { src: '', alt: 'Placeholder social post 1', tone: 'from-blush-200 to-cream-200' },
    { src: '', alt: 'Placeholder social post 2', tone: 'from-cream-300 to-blush-100' },
    { src: '', alt: 'Placeholder social post 3', tone: 'from-blush-300 to-blush-100' },
    { src: '', alt: 'Placeholder social post 4', tone: 'from-cream-200 to-cream-300' },
    { src: '', alt: 'Placeholder social post 5', tone: 'from-blush-100 to-blush-300' },
    { src: '', alt: 'Placeholder social post 6', tone: 'from-cream-100 to-blush-200' },
  ] as ImageAsset[],
};

export const contact = {
  email: 'hello@example.com',
  phone: '+1 (555) 000-0000',
  address: '[PLACEHOLDER] 123 Beauty Lane, Your City',
  hours: [
    { days: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { days: 'Saturday', time: '10:00 AM – 4:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
};

export type SocialName = 'instagram' | 'facebook' | 'tiktok' | 'youtube';

export const socials: { name: SocialName; label: string; url: string }[] = [
  { name: 'instagram', label: 'Instagram', url: 'https://instagram.com/' },
  { name: 'facebook', label: 'Facebook', url: 'https://facebook.com/' },
  { name: 'tiktok', label: 'TikTok', url: 'https://tiktok.com/' },
  { name: 'youtube', label: 'YouTube', url: 'https://youtube.com/' },
];

export const faqs = [
  { q: 'How long does shipping take?', a: '[PLACEHOLDER] Orders are processed within 1–2 business days. Standard delivery takes 3–7 business days.' },
  { q: 'Do you offer free shipping?', a: `[PLACEHOLDER] Yes — all orders over $${brand.freeShippingThreshold} ship for free.` },
  { q: 'What is your return policy?', a: '[PLACEHOLDER] Unopened items can be returned within 30 days of delivery for a full refund.' },
  { q: 'Are your products cruelty-free?', a: '[PLACEHOLDER] Yes. We never test on animals and all of our products are cruelty-free.' },
  { q: 'How do I find my shade?', a: '[PLACEHOLDER] Each product page lists shade descriptions. You can also contact us for a personalised shade match.' },
];

export const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', to: '/shop' },
      { label: 'Skincare', to: '/shop?category=skincare' },
      { label: 'Makeup', to: '/shop?category=makeup' },
      { label: 'Fragrance', to: '/shop?category=fragrance' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact us', to: '/contact' },
      { label: 'FAQ', to: '/contact#faq' },
      { label: 'Wishlist', to: '/wishlist' },
      { label: 'Cart', to: '/cart' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Our values', to: '/about#values' },
    ],
  },
];
