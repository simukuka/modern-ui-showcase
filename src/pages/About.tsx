import { Heart, Leaf, Recycle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageBlock from '../components/ImageBlock';
import PageHeader from '../components/PageHeader';
import { about } from '../data/site';
import { useSeo } from '../hooks/useSeo';

const valueIcons = [Sparkles, Heart, Leaf, Recycle];

export default function About() {
  useSeo('About us', 'Discover the story, mission and values behind Shaarz Cosmetics.');
  return (
    <>
      <PageHeader eyebrow="Our story" title={about.title}>
        {about.intro}
      </PageHeader>

      <section className="section pt-8">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <ImageBlock image={about.image} className="aspect-[4/5] w-full rounded-3xl" label="Your photo here" />
          <div className="max-w-lg space-y-5 text-lg leading-relaxed text-ink-soft">
            <h2 className="section-title text-ink">Where it all began</h2>
            {about.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-cream-50">
        <div className="container-page max-w-3xl text-center">
          <p className="eyebrow text-blush-200">Our mission</p>
          <p className="mt-6 font-display text-2xl leading-relaxed text-cream-50 sm:text-3xl">{about.mission}</p>
        </div>
      </section>

      <section id="values" className="section scroll-mt-24">
        <div className="container-page">
          <div className="text-center">
            <p className="eyebrow">What we stand for</p>
            <h2 className="section-title mt-2">Our values</h2>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <li key={v.title} className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush-100 text-accent">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-14 text-center">
            <Link to="/shop" className="btn-primary px-8 py-4">
              Explore the collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
