import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Picture } from '@/components/ui/Picture';
import { Icon } from '@/components/ui/Icon';
import { PlaceholderNote, Tbc } from '@/components/ui/Tbc';
import { ButtonLink } from '@/components/ui/Button';
import { QualityProcess } from '@/components/sections/QualityProcess';
import { FinalCta } from '@/components/sections/FinalCta';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Quality & Technology',
  description: 'How Umeka Ply makes strong, stable panels: careful raw material selection, controlled bonding, hot pressing, sanding, calibration and inspection at every stage.',
  path: '/quality-technology/',
  image: 'quality-factory',
});

const pillars = [
  {
    icon: 'leaf',
    title: 'Material selection',
    text: 'Timber and veneers are chosen for soundness, grain and density. Good material is the foundation of a good panel — no process can make up for a weak start.',
  },
  {
    icon: 'link',
    title: 'Bonding technology',
    text: 'Each grade uses a resin system matched to its intended conditions, applied evenly so every layer is fully bonded across the sheet.',
  },
  {
    icon: 'layers',
    title: 'Pressing & calibration',
    text: 'Panels are hot-pressed for a uniform bond, then sanded and calibrated for smooth faces and consistent thickness.',
  },
  {
    icon: 'shield',
    title: 'Protection',
    text: 'Treatments intended to protect against borers and termites help panels perform in real-world conditions.',
  },
];

const standards = [
  { label: 'Standards certification (e.g. BIS)', status: 'Pending verification' },
  { label: 'Independent test reports', status: 'Pending verification' },
  { label: 'Emission classification', status: 'Pending verification' },
  { label: 'Warranty terms', status: 'To be confirmed' },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'About', href: '/about/' },
          { name: 'Quality & Technology', href: '/quality-technology/' },
        ]}
        eyebrow="Quality & Technology"
        title={
          <>
            Precision you can&rsquo;t see. <em className="font-normal text-moss">Performance you can rely on.</em>
          </>
        }
        lede="A dependable panel is the result of many careful steps. Here is how we approach materials, bonding, pressing and quality checks."
        image="quality-factory"
        imageAlt="Modern plywood manufacturing line with a hot press and stacks of finished sheets"
      />

      <section aria-labelledby="pillars-title" className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="Our approach" title={<span id="pillars-title">Four foundations of quality.</span>} />
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 90} className="rounded-sm border border-sand bg-paper p-8 transition-colors duration-500 hover:border-forest/30 hover:bg-bone">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-honey-light">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-display-sm mt-6">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{p.text}</p>
              </Reveal>
            ))}
          </ul>
          <PlaceholderNote className="mt-10 max-w-3xl">
            Process descriptions are general and will be refined with confirmed details of Umeka&rsquo;s manufacturing (equipment, resin systems, treatments and test
            methods).
          </PlaceholderNote>
        </div>
      </section>

      <section aria-labelledby="process-title" className="section-y bg-bone">
        <div className="container-x">
          <SectionHeading eyebrow="Manufacturing process" title={<span id="process-title">From log to finished panel.</span>} className="mb-16" />
          <QualityProcess tone="bone" />
        </div>
      </section>

      <section aria-labelledby="edge-title" className="relative overflow-hidden bg-forest text-bone">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[22rem]">
            <Picture name="texture-ply-edge" alt="Macro view of a plywood edge with even, tightly bonded layers" fill sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="grain px-[clamp(1.25rem,4.5vw,4.5rem)] py-20 lg:py-28">
            <p className="eyebrow text-honey-light">The edge tells the story</p>
            <h2 id="edge-title" className="text-display-lg mt-5 !text-bone">
              Even layers. Tight bonds. No hidden gaps.
            </h2>
            <p className="text-lede mt-6 text-bone/75">
              Look at the edge of a well-made plywood sheet and you will see thin, even layers bonded tightly together. That is where strength, screw holding and
              long-term stability begin — and it is what we aim for in every sheet.
            </p>
            <ButtonLink href="/knowledge-centre/how-to-check-plywood-quality-before-buying/" variant="outline-light" arrow className="mt-10">
              How to check plywood quality
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="standards-title" className="section-y bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Standards & documentation"
              title={<span id="standards-title">Proof before promise.</span>}
              lede="We will publish certificates, test reports and warranty terms here as they are issued to Umeka — so every quality claim can be checked."
              size="md"
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {standards.map((s) => (
              <li key={s.label} className="flex flex-col justify-between gap-6 rounded-sm border border-dashed border-forest/25 p-7">
                <div className="flex items-start gap-4">
                  <Icon name="file" className="h-6 w-6 shrink-0 text-moss" />
                  <p className="font-medium text-charcoal">{s.label}</p>
                </div>
                <Tbc label={s.status} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
