import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { CategoryShowcase } from '@/components/sections/CategoryShowcase';
import { FaqList } from '@/components/sections/FaqList';
import { FinalCta } from '@/components/sections/FinalCta';
import { faqs } from '@/content/company';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Why Choose Umeka',
  description: 'Strong construction, carefully selected materials, consistent quality and fair pricing. Discover why homeowners, professionals and dealers choose Umeka Ply.',
  path: '/why-umeka/',
  image: 'sofa-natural-light',
});

const audiences = [
  { icon: 'users', title: 'Homeowners', text: 'Furniture that looks good on day one and stays strong for years — without paying a premium for the name alone.' },
  { icon: 'layers', title: 'Architects & designers', text: 'Smooth, stable substrates for laminates, veneers and fluted finishes, with clear product information for specifications.' },
  { icon: 'handshake', title: 'Carpenters & contractors', text: 'Flat, even panels that cut cleanly, hold screws firmly and line up without packing — so jobs finish on time.' },
  { icon: 'truck', title: 'Dealers & distributors', text: 'A trusted, value-driven range with responsive support and dependable supply for growing your business.' },
];

export default function WhyUmekaPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'About', href: '/about/' },
          { name: 'Why Choose Umeka', href: '/why-umeka/' },
        ]}
        eyebrow="Why Choose Umeka"
        title={
          <>
            Premium quality. <em className="font-normal text-moss">Fair price.</em> No compromise.
          </>
        }
        lede="Umeka Ply is built for people who expect strength, consistency and a clean finish — and value honest pricing just as much."
        image="sofa-natural-light"
        imageAlt="Light-filled living room with a wooden-frame sofa, coffee table and plants"
      />
      <WhyChoose index="" showCta={false} />

      <section aria-labelledby="who-title" className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="Made for everyone who builds" title={<span id="who-title">Value for every stage of a project.</span>} />
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 90} className="border-t-2 border-forest pt-8">
                <Icon name={a.icon} className="h-7 w-7 text-moss" />
                <h3 className="text-display-sm mt-5">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{a.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CategoryShowcase index="" />

      <section aria-labelledby="faq-title" className="section-y bg-bone">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQs" title={<span id="faq-title">Common questions</span>} size="md" />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
