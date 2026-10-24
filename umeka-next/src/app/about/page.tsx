import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { PlaceholderNote } from '@/components/ui/Tbc';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { FinalCta } from '@/components/sections/FinalCta';
import { values } from '@/content/company';
import { site, yearsOfJourney } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Umeka',
  description: `Umeka Ply makes plywood, block board and flush doors built on more than ${new Date().getFullYear() - 1998} years of experience that began in 1998 as Jyoti Enterprise. Premium quality at a fair price.`,
  path: '/about/',
  image: 'wooden-wall-living',
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About Umeka', href: '/about/' }]}
        eyebrow="About Umeka"
        title={
          <>
            Built on experience. <em className="font-normal text-moss">Carried with pride.</em>
          </>
        }
        lede={`Umeka Ply brings more than ${yearsOfJourney()} years of hands-on experience in plywood and wood panels to a new generation of strong, dependable and beautifully finished products.`}
        image="wooden-wall-living"
        imageAlt="Bright living space with natural timber wall cladding, a wooden armchair and plants"
      />

      <section className="section-y bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who we are" title="A brand rooted in the trade." size="md" />
          </div>
          <Reveal delay={100} className="space-y-6 text-lede text-stone lg:col-span-7">
            <p>
              Our journey began in {site.journeyStartYear} as {site.originalBusinessName}. Working side by side with dealers, carpenters, contractors and homeowners, we
              learned what people really need from a panel: it must be strong, it must stay flat, it must finish cleanly — and it must be worth the price.
            </p>
            <p>
              Umeka Ply is the next chapter of that experience. We offer plywood, block board and flush doors that combine careful material selection, dependable
              bonding and a refined finish, at prices that remain fair and competitive.
            </p>
            <p>
              Our name carries a simple promise — <strong className="font-semibold text-forest">Trusted with Pride</strong>. It means standing behind every sheet and
              every door we supply, and building relationships that last as long as our products.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="mission-title" className="section-y-sm bg-bone">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            {
              label: 'Our mission',
              title: 'Make dependable quality accessible.',
              text: 'To provide plywood, block board and flush doors of premium quality at fair and competitive prices, supported by honest advice and responsive service.',
            },
            {
              label: 'Our vision',
              title: 'Be the name builders trust first.',
              text: 'To become one of the most trusted wood-panel brands for homeowners, professionals and dealers — known for consistency, integrity and pride in our work.',
            },
          ].map((b, i) => (
            <Reveal key={b.label} delay={i * 120} className={`rounded-sm p-10 lg:p-14 ${i === 0 ? 'bg-forest text-bone' : 'bg-paper'}`}>
              <p className={`eyebrow ${i === 0 ? 'text-honey-light' : 'text-honey-ink'}`}>{b.label}</p>
              <h2 id={i === 0 ? 'mission-title' : undefined} className={`text-display-md mt-5 ${i === 0 ? '!text-bone' : ''}`}>
                {b.title}
              </h2>
              <p className={`mt-5 text-lede ${i === 0 ? 'text-bone/75' : 'text-stone'}`}>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="values-title" className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title={<span id="values-title">What we stand for.</span>} align="center" />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-sm bg-sand sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 90} className="group bg-paper p-10 transition-colors duration-500 hover:bg-bone">
                <span className="font-display text-lg text-stone-light">0{i + 1}</span>
                <h3 className="text-display-md mt-4">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="where-title" className="section-y-sm bg-bone">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[3/2] overflow-hidden rounded-sm">
            <Picture name="quality-factory" alt="Finished plywood sheets stacked beside a hot press in a modern manufacturing facility" fill sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Where we work" title={<span id="where-title">Gujarat-based. Ready to serve.</span>} size="md" />
            <Reveal delay={100} className="mt-6 space-y-5 text-stone">
              <p>
                Our corporate and sales office is in Ahmedabad, Gujarat, with manufacturing in Kutch. From here, we serve dealers, professionals and project buyers
                across our growing network.
              </p>
              <PlaceholderNote>
                Manufacturing details (own unit or partner unit, capacity and process) to be confirmed before publishing. The facility image shown is illustrative.
              </PlaceholderNote>
            </Reveal>
            <Reveal delay={200} className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/quality-technology/" variant="primary" arrow>
                Quality &amp; Technology
              </ButtonLink>
              <ButtonLink href="/contact/" variant="outline">
                Visit or contact us
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <JourneyTimeline index="" />
      <WhyChoose index="" />
      <FinalCta />
    </>
  );
}
