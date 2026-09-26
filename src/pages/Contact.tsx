import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import Accordion from '../components/Accordion';
import FormField from '../components/FormField';
import PageHeader from '../components/PageHeader';
import SocialLinks from '../components/SocialLinks';
import { contact, faqs } from '../data/site';
import { useSeo } from '../hooks/useSeo';
import { isValidEmail } from '../lib/utils';

type Form = { name: string; email: string; subject: string; message: string };

/**
 * Mock contact form. Hook it up to Formspree, Netlify Forms, EmailJS etc. by replacing the submit handler.
 */
export default function Contact() {
  useSeo('Contact us', 'Get in touch with Shaarz Cosmetics — business hours, contact details and frequently asked questions.');
  const [form, setForm] = useState<Form>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<Form> = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) errs.message = 'Your message should be at least 10 characters.';
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setSent(true);
  };

  const bind = (key: keyof Form) => ({
    value: form[key],
    onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value })),
    error: errors[key],
  });

  return (
    <>
      <PageHeader eyebrow="We're here to help" title="Contact us">
        Questions about an order, a product or finding your perfect shade? We'd love to hear from you.
      </PageHeader>

      <section className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          {sent ? (
            <div className="py-12 text-center" role="status">
              <CheckCircle2 size={48} className="mx-auto text-accent" aria-hidden="true" />
              <h2 className="mt-4 text-3xl">Message sent</h2>
              <p className="mt-2 text-ink-soft">Thank you, {form.name.split(' ')[0]}! We'll get back to you within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
              <h2 className="text-2xl sm:col-span-2">Send us a message</h2>
              <FormField id="contact-name" label="Name" autoComplete="name" required {...bind('name')} />
              <FormField id="contact-email" label="Email" type="email" autoComplete="email" required {...bind('email')} />
              <FormField id="contact-subject" label="Subject" className="sm:col-span-2" {...bind('subject')} />
              <FormField id="contact-message" label="Message" as="textarea" required className="sm:col-span-2" {...bind('message')} />
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary px-10">
                  Send message
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-cream-100 p-8">
            <h2 className="text-xl">Get in touch</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Mail size={18} className="shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="rounded hover:text-accent">{contact.email}</a>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="shrink-0 text-accent" aria-hidden="true" />
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="rounded hover:text-accent">{contact.phone}</a>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl bg-cream-100 p-8">
            <h2 className="flex items-center gap-2 text-xl">
              <Clock size={18} className="text-accent" aria-hidden="true" /> Business hours
            </h2>
            <dl className="mt-5 space-y-2 text-sm">
              {contact.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-ink-soft">{h.days}</dt>
                  <dd className="font-medium">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-3xl bg-cream-100 p-8">
            <h2 className="text-xl">Follow us</h2>
            <SocialLinks className="mt-4 -ml-2" />
          </div>
        </aside>
      </section>

      <section id="faq" className="section scroll-mt-24 pt-8" aria-labelledby="faq-title">
        <div className="container-page max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="section-title mt-2">Frequently asked questions</h2>
          </div>
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
