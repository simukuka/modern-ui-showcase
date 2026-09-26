import { ArrowRight, Leaf, Quote, Sparkles, Truck } from 'lucide-react';
import SocialIcon from '../components/SocialIcon';
import { Link } from 'react-router-dom';
import ImageBlock from '../components/ImageBlock';
import NewsletterForm from '../components/NewsletterForm';
import ProductCarousel from '../components/ProductCarousel';
import StarRating from '../components/StarRating';
import { bestsellers, categories, products } from '../data/products';
import { brandStory, hero, instagram, reviews } from '../data/site';
import { useSeo } from '../hooks/useSeo';

export default function Home() {
  useSeo(undefined);
  const featured = [...bestsellers, ...products.filter((p) => p.badges.includes('New'))];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <ImageBlock image={hero.image} eager className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/70 to-transparent" aria-hidden="true" />
        <div className="container-page relative flex min-h-[70vh] items-center py-20 lg:min-h-[80vh]">
          <div className="max-w-xl animate-fade-up">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{hero.headline}</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">{hero.subheadline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to={hero.cta.to} className="btn-primary px-8 py-4">
                {hero.cta.label} <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to={hero.secondaryCta.to} className="btn-outline px-8 py-4">
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section aria-label="Why shop with us" className="border-y border-ink/10 bg-white">
        <ul className="container-page grid gap-6 py-8 text-sm sm:grid-cols-3">
          {[
            { icon: Truck, title: 'Free shipping', text: 'On all orders over $60' },
            { icon: Leaf, title: 'Clean & cruelty-free', text: 'Kind to skin and planet' },
            { icon: Sparkles, title: 'Free samples', text: 'With every order' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center justify-center gap-3">
              <Icon size={22} className="text-accent" aria-hidden="true" />
              <span>
                <strong className="block font-medium">{title}</strong>
                <span className="text-ink-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Bestsellers */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Loved by our clients</p>
              <h2 className="section-title mt-2">Bestsellers & new arrivals</h2>
            </div>
            <Link to="/shop" className="group inline-flex items-center gap-1 rounded text-sm font-medium text-accent">
              Shop all <ArrowRight size={14} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4">
            <ProductCarousel products={featured} label="Bestsellers and new arrivals" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section bg-cream-100">
        <div className="container-page">
          <div className="text-center">
            <p className="eyebrow">Explore</p>
            <h2 className="section-title mt-2">Shop by category</h2>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/shop?category=${c.id}`} className="group relative block overflow-hidden rounded-2xl">
                  <ImageBlock image={c.image} className="aspect-[4/3] w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                    <h3 className="font-display text-xl text-white sm:text-2xl">{c.name}</h3>
                    <p className="mt-1 hidden text-sm text-white/90 sm:block">{c.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Brand story */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <ImageBlock image={brandStory.image} className="aspect-[4/5] w-full rounded-3xl lg:aspect-square" label="Your photo here" />
          <div className="max-w-lg">
            <p className="eyebrow">{brandStory.eyebrow}</p>
            <h2 className="section-title mt-3">{brandStory.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{brandStory.body}</p>
            <Link to={brandStory.cta.to} className="btn-outline mt-8">
              {brandStory.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section bg-blush-50">
        <div className="container-page">
          <div className="text-center">
            <p className="eyebrow">Reviews</p>
            <h2 className="section-title mt-2">What our clients say</h2>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.name}>
                <figure className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <Quote size={28} className="text-blush-300" aria-hidden="true" />
                  <StarRating rating={r.rating} className="mt-4" />
                  <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed">“{r.text}”</blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-ink-muted"> · {r.product}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Instagram grid */}
      <section className="section">
        <div className="container-page">
          <div className="text-center">
            <p className="eyebrow">Follow along</p>
            <h2 className="section-title mt-2">
              <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="rounded hover:text-accent">
                {instagram.handle}
                <span className="sr-only"> on Instagram (opens in a new tab)</span>
              </a>
            </h2>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {instagram.images.map((img, i) => (
              <li key={i}>
                <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-xl">
                  <ImageBlock image={img} className="aspect-square w-full" imgClassName="transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-white opacity-0 transition group-hover:bg-ink/30 group-hover:opacity-100" aria-hidden="true">
                    <SocialIcon name="instagram" className="h-6 w-6" />
                  </span>
                  <span className="sr-only">View post on Instagram (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section bg-ink text-cream-50">
        <div className="container-page max-w-2xl text-center">
          <p className="eyebrow text-blush-200">Newsletter</p>
          <h2 className="section-title mt-3 text-cream-50">Beauty notes, straight to your inbox</h2>
          <p className="mt-4 text-cream-200">Subscribe for 10% off your first order, exclusive offers and first access to new launches.</p>
          <NewsletterForm variant="dark" className="mx-auto mt-8 max-w-md text-left" />
        </div>
      </section>
    </>
  );
}
