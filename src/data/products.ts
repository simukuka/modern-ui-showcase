/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCT CATALOGUE — replace these placeholder products with your own.
 * ─────────────────────────────────────────────────────────────
 *  - `id` must be unique and URL-friendly (it is used in /product/:id).
 *  - `images[].src` can point to /public/images/... or a CDN URL.
 *    Leave it empty to show a gradient placeholder.
 *  - Prices are in the currency set in `src/data/site.ts` (brand.currency).
 */
import type { ImageAsset } from './site';

export type CategoryId = 'skincare' | 'makeup' | 'lips' | 'eyes' | 'fragrance' | 'body';
export type SkinType = 'all' | 'dry' | 'oily' | 'combination' | 'sensitive';
export type Badge = 'New' | 'Bestseller' | 'Limited';

export interface Shade {
  name: string;
  /** Hex colour used for the swatch. */
  hex: string;
}

export interface ProductReview {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  /** Higher = more popular. Used for "Popular" sorting. */
  popularity: number;
  /** ISO date — used for "Newest" sorting. */
  createdAt: string;
  badges: Badge[];
  skinTypes: SkinType[];
  shortDescription: string;
  description: string;
  ingredients: string;
  howToUse: string;
  shades?: Shade[];
  sizes?: string[];
  images: ImageAsset[];
  reviews: ProductReview[];
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: ImageAsset;
}

export const categories: Category[] = [
  { id: 'skincare', name: 'Skincare', description: 'Serums, creams & cleansers', image: { src: '', alt: 'Skincare category placeholder', tone: 'from-cream-200 to-blush-100' } },
  { id: 'makeup', name: 'Makeup', description: 'Complexion essentials', image: { src: '', alt: 'Makeup category placeholder', tone: 'from-blush-200 to-cream-200' } },
  { id: 'lips', name: 'Lips', description: 'Lipsticks, glosses & balms', image: { src: '', alt: 'Lips category placeholder', tone: 'from-blush-300 to-blush-100' } },
  { id: 'eyes', name: 'Eyes', description: 'Mascara, liners & palettes', image: { src: '', alt: 'Eyes category placeholder', tone: 'from-cream-300 to-cream-100' } },
  { id: 'fragrance', name: 'Fragrance', description: 'Signature scents', image: { src: '', alt: 'Fragrance category placeholder', tone: 'from-blush-100 to-cream-300' } },
  { id: 'body', name: 'Body', description: 'Oils, scrubs & lotions', image: { src: '', alt: 'Body category placeholder', tone: 'from-cream-100 to-blush-200' } },
];

export const skinTypes: { id: SkinType; label: string }[] = [
  { id: 'all', label: 'All skin types' },
  { id: 'dry', label: 'Dry' },
  { id: 'oily', label: 'Oily' },
  { id: 'combination', label: 'Combination' },
  { id: 'sensitive', label: 'Sensitive' },
];

const tones = [
  'from-blush-200 via-cream-100 to-blush-100',
  'from-cream-300 via-cream-100 to-blush-100',
  'from-blush-300 via-blush-100 to-cream-100',
  'from-cream-200 via-blush-100 to-cream-300',
];

/** Builds 4 placeholder gallery images for a product. Replace with real `src` paths. */
const placeholderImages = (name: string, offset = 0): ImageAsset[] =>
  [0, 1, 2, 3].map((i) => ({
    src: '',
    alt: `${name} — placeholder image ${i + 1}`,
    tone: tones[(i + offset) % tones.length],
  }));

const sampleReviews: ProductReview[] = [
  { name: 'Placeholder Customer A', rating: 5, date: '2026-05-12', text: '[PLACEHOLDER] Absolutely love it — lightweight, beautiful finish and lasts all day.' },
  { name: 'Placeholder Customer B', rating: 4, date: '2026-04-28', text: '[PLACEHOLDER] Great quality and lovely packaging. Would buy again.' },
  { name: 'Placeholder Customer C', rating: 5, date: '2026-03-03', text: '[PLACEHOLDER] My new holy-grail product. Gentle on my sensitive skin.' },
];

export const products: Product[] = [
  {
    id: 'radiance-serum',
    name: 'Radiance Vitamin C Serum',
    category: 'skincare',
    price: 48,
    rating: 4.8,
    reviewCount: 214,
    popularity: 98,
    createdAt: '2026-01-10',
    badges: ['Bestseller'],
    skinTypes: ['all', 'dry', 'combination', 'oily'],
    shortDescription: 'Brightening daily serum for a luminous complexion.',
    description: '[PLACEHOLDER] A lightweight, fast-absorbing serum that helps brighten dullness and even out skin tone for a healthy, lit-from-within glow.',
    ingredients: '[PLACEHOLDER] Aqua, Ascorbyl Glucoside, Niacinamide, Hyaluronic Acid, Glycerin, Ferulic Acid, Tocopherol.',
    howToUse: '[PLACEHOLDER] Apply 3–4 drops to clean, dry skin morning and evening. Follow with moisturiser and SPF in the daytime.',
    sizes: ['15 ml', '30 ml', '50 ml'],
    images: placeholderImages('Radiance Vitamin C Serum', 0),
    reviews: sampleReviews,
  },
  {
    id: 'velvet-matte-lipstick',
    name: 'Velvet Matte Lipstick',
    category: 'lips',
    price: 26,
    rating: 4.7,
    reviewCount: 389,
    popularity: 96,
    createdAt: '2025-11-02',
    badges: ['Bestseller'],
    skinTypes: ['all'],
    shortDescription: 'Weightless, long-wear matte colour.',
    description: '[PLACEHOLDER] A creamy matte lipstick with rich pigment that glides on smoothly and stays comfortable all day.',
    ingredients: '[PLACEHOLDER] Isododecane, Dimethicone, Kaolin, Shea Butter, Vitamin E, Pigments.',
    howToUse: '[PLACEHOLDER] Apply directly from the bullet starting at the centre of the lips and working outward.',
    shades: [
      { name: 'Rosewood', hex: '#9b5a55' },
      { name: 'Nude Silk', hex: '#c48f7f' },
      { name: 'Crimson', hex: '#9e1f2e' },
      { name: 'Mauve', hex: '#8e5d73' },
    ],
    images: placeholderImages('Velvet Matte Lipstick', 2),
    reviews: sampleReviews,
  },
  {
    id: 'silk-foundation',
    name: 'Second Skin Silk Foundation',
    category: 'makeup',
    price: 42,
    rating: 4.6,
    reviewCount: 172,
    popularity: 90,
    createdAt: '2026-06-01',
    badges: ['New'],
    skinTypes: ['all', 'dry', 'combination', 'oily'],
    shortDescription: 'Buildable, breathable medium coverage.',
    description: '[PLACEHOLDER] A silky, serum-infused foundation that blurs imperfections while letting your skin breathe.',
    ingredients: '[PLACEHOLDER] Aqua, Cyclopentasiloxane, Glycerin, Squalane, Niacinamide, Iron Oxides.',
    howToUse: '[PLACEHOLDER] Shake well. Apply with fingertips, brush or sponge, building coverage as desired.',
    shades: [
      { name: 'Porcelain', hex: '#f1d6c3' },
      { name: 'Sand', hex: '#dcb28f' },
      { name: 'Honey', hex: '#b9855b' },
      { name: 'Caramel', hex: '#94613e' },
      { name: 'Espresso', hex: '#5a3a26' },
    ],
    sizes: ['30 ml'],
    images: placeholderImages('Second Skin Silk Foundation', 1),
    reviews: sampleReviews,
  },
  {
    id: 'lash-lift-mascara',
    name: 'Lash Lift Volumising Mascara',
    category: 'eyes',
    price: 24,
    rating: 4.5,
    reviewCount: 256,
    popularity: 88,
    createdAt: '2025-09-15',
    badges: [],
    skinTypes: ['all', 'sensitive'],
    shortDescription: 'Lift, length and volume without clumps.',
    description: '[PLACEHOLDER] A buildable mascara that lifts and separates every lash for a wide-awake look.',
    ingredients: '[PLACEHOLDER] Aqua, Beeswax, Carnauba Wax, Panthenol, Iron Oxides.',
    howToUse: '[PLACEHOLDER] Wiggle the brush from root to tip. Layer for extra volume.',
    shades: [
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Brown Black', hex: '#3a2a22' },
    ],
    images: placeholderImages('Lash Lift Volumising Mascara', 3),
    reviews: sampleReviews,
  },
  {
    id: 'rose-oud-parfum',
    name: 'Rose Oud Eau de Parfum',
    category: 'fragrance',
    price: 85,
    compareAtPrice: 95,
    rating: 4.9,
    reviewCount: 98,
    popularity: 92,
    createdAt: '2026-02-20',
    badges: ['Bestseller', 'Limited'],
    skinTypes: ['all'],
    shortDescription: 'Warm rose, velvety oud and soft amber.',
    description: '[PLACEHOLDER] An elegant, long-lasting fragrance that opens with Damask rose and settles into a warm base of oud and amber.',
    ingredients: '[PLACEHOLDER] Alcohol Denat., Parfum, Aqua, Linalool, Citronellol, Geraniol.',
    howToUse: '[PLACEHOLDER] Spray onto pulse points — wrists, neck and behind the ears.',
    sizes: ['30 ml', '50 ml', '100 ml'],
    images: placeholderImages('Rose Oud Eau de Parfum', 2),
    reviews: sampleReviews,
  },
  {
    id: 'hydra-cloud-cream',
    name: 'Hydra Cloud Moisturiser',
    category: 'skincare',
    price: 38,
    rating: 4.7,
    reviewCount: 187,
    popularity: 85,
    createdAt: '2026-07-05',
    badges: ['New'],
    skinTypes: ['dry', 'sensitive', 'combination'],
    shortDescription: 'Whipped moisturiser for 72h hydration.',
    description: '[PLACEHOLDER] A cloud-light cream that melts into skin, delivering deep hydration and a soft, plump finish.',
    ingredients: '[PLACEHOLDER] Aqua, Squalane, Ceramide NP, Hyaluronic Acid, Panthenol, Allantoin.',
    howToUse: '[PLACEHOLDER] Massage a pea-sized amount onto face and neck morning and night.',
    sizes: ['50 ml'],
    images: placeholderImages('Hydra Cloud Moisturiser', 1),
    reviews: sampleReviews,
  },
  {
    id: 'glow-lip-oil',
    name: 'Glow Nourishing Lip Oil',
    category: 'lips',
    price: 20,
    rating: 4.6,
    reviewCount: 143,
    popularity: 80,
    createdAt: '2026-08-01',
    badges: ['New'],
    skinTypes: ['all'],
    shortDescription: 'Non-sticky shine with a hint of tint.',
    description: '[PLACEHOLDER] A glossy lip oil that nourishes and softens with a sheer wash of colour.',
    ingredients: '[PLACEHOLDER] Jojoba Oil, Rosehip Oil, Vitamin E, Pigments.',
    howToUse: '[PLACEHOLDER] Apply alone or over lipstick for a glossy finish.',
    shades: [
      { name: 'Clear', hex: '#f3e2dc' },
      { name: 'Peach', hex: '#e7a384' },
      { name: 'Berry', hex: '#8f3350' },
    ],
    images: placeholderImages('Glow Nourishing Lip Oil', 0),
    reviews: sampleReviews,
  },
  {
    id: 'nude-eyeshadow-palette',
    name: 'Everyday Nudes Eyeshadow Palette',
    category: 'eyes',
    price: 44,
    rating: 4.8,
    reviewCount: 121,
    popularity: 87,
    createdAt: '2025-12-10',
    badges: ['Bestseller'],
    skinTypes: ['all'],
    shortDescription: '12 buttery mattes and shimmers.',
    description: '[PLACEHOLDER] A versatile palette of warm neutrals for effortless day-to-night looks.',
    ingredients: '[PLACEHOLDER] Talc, Mica, Dimethicone, Zinc Stearate, Pigments.',
    howToUse: '[PLACEHOLDER] Apply lighter shades to the lid and deepen the crease with darker tones.',
    images: placeholderImages('Everyday Nudes Eyeshadow Palette', 3),
    reviews: sampleReviews,
  },
  {
    id: 'gentle-cleanser',
    name: 'Soft Foam Gentle Cleanser',
    category: 'skincare',
    price: 22,
    rating: 4.5,
    reviewCount: 201,
    popularity: 78,
    createdAt: '2025-08-20',
    badges: [],
    skinTypes: ['all', 'oily', 'combination', 'sensitive'],
    shortDescription: 'pH-balanced daily cleanser.',
    description: '[PLACEHOLDER] A gentle foaming cleanser that removes makeup and impurities without stripping.',
    ingredients: '[PLACEHOLDER] Aqua, Coco-Glucoside, Glycerin, Aloe Vera, Green Tea Extract.',
    howToUse: '[PLACEHOLDER] Massage onto damp skin, then rinse with lukewarm water.',
    sizes: ['150 ml', '250 ml'],
    images: placeholderImages('Soft Foam Gentle Cleanser', 2),
    reviews: sampleReviews,
  },
  {
    id: 'body-glow-oil',
    name: 'Golden Hour Body Oil',
    category: 'body',
    price: 36,
    rating: 4.7,
    reviewCount: 88,
    popularity: 76,
    createdAt: '2026-05-18',
    badges: [],
    skinTypes: ['dry', 'all'],
    shortDescription: 'Dry-touch shimmer oil for radiant skin.',
    description: '[PLACEHOLDER] A luxurious dry oil with a subtle golden shimmer that leaves skin soft and glowing.',
    ingredients: '[PLACEHOLDER] Caprylic Triglyceride, Sweet Almond Oil, Argan Oil, Mica, Parfum.',
    howToUse: '[PLACEHOLDER] Massage onto damp skin after showering.',
    sizes: ['100 ml'],
    images: placeholderImages('Golden Hour Body Oil', 1),
    reviews: sampleReviews,
  },
  {
    id: 'sugar-body-scrub',
    name: 'Brown Sugar Body Scrub',
    category: 'body',
    price: 28,
    rating: 4.6,
    reviewCount: 64,
    popularity: 70,
    createdAt: '2026-03-30',
    badges: [],
    skinTypes: ['all', 'dry'],
    shortDescription: 'Polishing scrub for silky-smooth skin.',
    description: '[PLACEHOLDER] A rich exfoliating scrub that buffs away dryness and leaves skin velvety.',
    ingredients: '[PLACEHOLDER] Sucrose, Shea Butter, Coconut Oil, Vanilla Extract.',
    howToUse: '[PLACEHOLDER] Massage onto damp skin in circular motions, then rinse.',
    sizes: ['200 g'],
    images: placeholderImages('Brown Sugar Body Scrub', 0),
    reviews: sampleReviews,
  },
  {
    id: 'blush-duo',
    name: 'Cheek Bloom Blush Duo',
    category: 'makeup',
    price: 30,
    rating: 4.7,
    reviewCount: 110,
    popularity: 83,
    createdAt: '2026-08-20',
    badges: ['New'],
    skinTypes: ['all'],
    shortDescription: 'Silky blush and highlighter pairing.',
    description: '[PLACEHOLDER] A buildable blush paired with a soft-focus highlighter for a natural, healthy flush.',
    ingredients: '[PLACEHOLDER] Mica, Talc, Dimethicone, Jojoba Oil, Pigments.',
    howToUse: '[PLACEHOLDER] Sweep blush onto the apples of the cheeks and highlight the high points of the face.',
    shades: [
      { name: 'Petal', hex: '#e59a95' },
      { name: 'Apricot', hex: '#e2926a' },
      { name: 'Plum', hex: '#9a4f63' },
    ],
    images: placeholderImages('Cheek Bloom Blush Duo', 2),
    reviews: sampleReviews,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getCategory = (id: string) => categories.find((c) => c.id === id);

export const bestsellers = products.filter((p) => p.badges.includes('Bestseller'));

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category) || b.popularity - a.popularity)
    .slice(0, limit);
