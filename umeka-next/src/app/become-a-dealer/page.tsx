import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { PlaceholderNote } from '@/components/ui/Tbc';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { FaqList } from '@/components/sections/FaqList';
import { dealerFields } from '@/content/forms';
import { site, whatsappLink } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Become a Dealer or Distributor',
  description: 'Partner with Umeka Ply. Apply to become an authorised dealer or distributor of plywood, block board and flush doors in your region.',
  path: '/become-a-dealer/',
  image: 'interior-screen-living',
});

const reasons = [
  { icon: 'layers', title: 'Complete core range', text: 'Plywood, block board and flush doors — the products your customers ask for most, from one brand.' },
  { icon: 'value', title: 'Competitive margins', text: 'Premium-quality products at fair prices, so you can compete confidently in your market.' },
  { icon: 'handshake', title: 'A partner, not a supplier', text: 'Direct access to our team for product guidance, pricing and order planning.' },
  { icon: 'users', title: 'Lead sharing', text: 'Enquiries from your area can be routed to you as the network grows.' },
  { icon: 'file', title: 'Marketing support', text: 'Product information, catalogues and display material to help you sell.' },
  { icon: 'truck', title: 'Reliable supply', text: 'Consistent product and planned dispatches you can count on.' },
];

const steps = [
  { title: 'Apply', text: 'Share your business details using the form below.' },
  { title: 'Conversation', text: 'Our team calls you to understand your market and goals.' },
  { title: 'Agreement', text: 'We agree terms, territory and your opening order.' },
  { title: 'Launch', text: 'Receive stock, product training and marketing material.' },
];

const dealerFaqs = [
  { q: 'Who can apply to become an Umeka dealer?', a: 'We welcome plywood, laminate, hardware, timber and interior-material businesses, as well as entrepreneurs planning to start in this trade.' },
  { q: 'Is there a minimum investment or order?', a: 'Commercial terms depend on your location and business model. Our team will discuss this with you after reviewing your application.' },
  { q: 'Do you offer exclusive territories?', a: 'Territory arrangements are discussed individually based on the market and the partner’s capability.' },
  { q: 'How long does the process take?', a: 'We aim to respond to every application promptly. Timelines for onboarding depend on agreement and logistics.' },
];

export default function BecomeDealerPage() {
  return (
    <>
      <PageHero
        tone="dark"
        crumbs={[
          { name: 'Dealers', href: '/dealers/' },
          { name: 'Become a Dealer', href: '/become-a-dealer/' },
        ]}
        eyebrow="Partner with Umeka"
        title={
          <>
            Grow with a brand <em className="font-normal text-honey-light">built on trust.</em>
          </>
        }
        lede="Join the Umeka Ply network and offer your customers premium-quality plywood, block board and flush doors at prices that make sense."
        image="interior-screen-living"
        imageAlt="Contemporary interior with wooden slatted screen"
      />

      <section aria-labelledby="reasons-title" className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="Why partner with us" title={<span id="reasons-title">What Umeka partners can expect.</span>} />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-sm bg-sand sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 3) * 90} className="bg-paper p-8 lg:p-10">
                <Icon name={r.icon} className="h-7 w-7 text-moss" />
                <h3 className="text-display-sm mt-5">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{r.text}</p>
              </Reveal>
            ))}
          </ul>
          <PlaceholderNote className="mt-8 max-w-3xl">Dealer terms, margins, territories and support programmes to be confirmed by Umeka before launch.</PlaceholderNote>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="section-y-sm bg-bone">
        <div className="container-x">
          <h2 id="steps-title" className="text-display-md">How it works</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className="relative border-t border-forest/20 pt-8">
                <span className="absolute -top-4 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-forest font-display text-bone">{i + 1}</span>
                <h3 className="text-display-sm">{s.title}</h3>
                <p className="mt-2 text-stone">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="apply" aria-labelledby="apply-title" className="section-y scroll-mt-24 bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Dealer application" title={<span id="apply-title">Tell us about your business.</span>} size="md" lede="It takes about two minutes. Our channel team will contact you to take the conversation forward." />
            <div className="mt-10 rounded-sm bg-bone p-6 text-sm">
              <p className="font-medium text-charcoal">Prefer to talk first?</p>
              <a href={site.contact.phoneHref} className="mt-3 flex items-center gap-3 text-forest hover:underline">
                <Icon name="phone" className="h-4 w-4" /> {site.contact.phoneDisplay}
              </a>
              <a href={whatsappLink('Hello Umeka, I am interested in becoming a dealer.')} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-3 text-forest hover:underline">
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp our team
              </a>
            </div>
          </div>
          <div className="rounded-sm border border-sand bg-paper p-6 shadow-[0_30px_80px_-50px_rgba(5,55,51,0.5)] sm:p-10 lg:col-span-8">
            <EnquiryForm formType="dealer" fields={dealerFields} submitLabel="Submit Application" successTitle="Thank you — your application has been received." />
          </div>
        </div>
      </section>

      <section aria-labelledby="dfaq-title" className="section-y-sm bg-bone">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="dfaq-title" className="text-display-md">Dealer FAQs</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={dealerFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
