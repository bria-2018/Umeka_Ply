import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Picture } from '@/components/ui/Picture';
import { Tbc, PlaceholderNote } from '@/components/ui/Tbc';
import { FinalCta } from '@/components/sections/FinalCta';
import { timeline } from '@/content/company';
import { site, yearsOfJourney } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Our Journey — Since 1998',
  description: 'From Jyoti Enterprise in 1998 to Umeka Ply today: the story of a plywood brand built on experience, relationships and pride in quality.',
  path: '/our-journey/',
  image: 'texture-ply-edge',
});

const chapterImages = ['texture-ply-edge', 'product-plywood', 'quality-factory', 'hero-living-panelling'];

export default function JourneyPage() {
  return (
    <>
      <PageHero
        tone="dark"
        crumbs={[
          { name: 'About', href: '/about/' },
          { name: 'Our Journey', href: '/our-journey/' },
        ]}
        eyebrow={`Since ${site.journeyStartYear}`}
        title={
          <>
            {yearsOfJourney()}+ years in the making. <em className="font-normal text-honey-light">One promise throughout.</em>
          </>
        }
        lede={`What began as ${site.originalBusinessName} in ${site.journeyStartYear} has grown into Umeka Ply — a brand shaped by decades of experience in plywood and wood panels.`}
      />

      <section aria-label="Timeline" className="section-y bg-paper">
        <div className="container-x">
          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-sand md:left-1/2" />
            {timeline.map((m, i) => (
              <li key={m.year} className="relative grid gap-8 pb-20 pl-12 last:pb-0 md:grid-cols-2 md:gap-20 md:pl-0">
                <span aria-hidden="true" className="absolute left-[0.6rem] top-3 h-4 w-4 rounded-full border-2 border-honey bg-paper md:left-1/2 md:-translate-x-1/2" />
                <Reveal className={i % 2 ? 'md:order-2' : 'md:text-right'}>
                  <p className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-none text-forest">{m.year}</p>
                  <h2 className="text-display-sm mt-4">{m.title}</h2>
                  <p className={`mt-4 max-w-md leading-relaxed text-stone ${i % 2 ? '' : 'md:ml-auto'}`}>{m.text}</p>
                  {!m.verified && <Tbc label="Milestone details to confirm" className="mt-4" />}
                </Reveal>
                <Reveal delay={120} className={`relative aspect-[3/2] overflow-hidden rounded-sm ${i % 2 ? 'md:order-1' : ''}`}>
                  <Picture name={chapterImages[i] ?? 'product-plywood'} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" />
                </Reveal>
              </li>
            ))}
          </ol>
          <PlaceholderNote className="mx-auto mt-16 max-w-3xl">
            Please share key milestones (for example: first manufacturing, product launches, expansion into new regions, number of dealers) so this timeline can be
            completed with accurate dates. Images are illustrative.
          </PlaceholderNote>
        </div>
      </section>

      <section className="section-y bg-bone">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-24">
          <SectionHeading eyebrow="What hasn't changed" title="The same values, carried forward." />
          <Reveal delay={100} className="space-y-6 text-lede text-stone">
            <p>
              Through every stage of our journey, a few things have stayed constant: fair dealing, a practical understanding of how panels perform on site, and the
              belief that good material should be within reach of every home and project.
            </p>
            <p>
              Umeka Ply carries those values forward with a modern product range, clearer product information and a growing dealer network — so more people can build
              with confidence.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
