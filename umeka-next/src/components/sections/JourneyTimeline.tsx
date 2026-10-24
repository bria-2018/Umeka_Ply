import { timeline } from '@/content/company';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tbc } from '@/components/ui/Tbc';
import { ButtonLink } from '@/components/ui/Button';

/** Story timeline from 1998 to today. */
export function JourneyTimeline({ index = '06', showCta = true, bg = 'bg-paper' }: { index?: string; showCta?: boolean; bg?: string }) {
  return (
    <section aria-labelledby="journey-title" className={`section-y relative overflow-hidden ${bg}`}>
      <p aria-hidden="true" className="pointer-events-none absolute -right-8 top-6 select-none font-display text-[clamp(8rem,22vw,20rem)] leading-none text-forest/[0.04]">
        1998
      </p>
      <div className="container-x relative">
        <SectionHeading
          index={index}
          eyebrow="Our Journey"
          title={<span id="journey-title">From Jyoti Enterprise to Umeka Ply.</span>}
          lede="A story of steady growth, built one relationship and one delivery at a time."
          actions={
            showCta ? (
              <ButtonLink href="/our-journey/" variant="outline" arrow>
                Read our story
              </ButtonLink>
            ) : undefined
          }
        />

        <ol className="relative mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[0.65rem] hidden h-px bg-gradient-to-r from-honey via-honey/40 to-forest/20 lg:block" />
          {timeline.map((m, i) => (
            <Reveal as="li" key={m.year} delay={i * 120} className="relative pl-8 lg:pl-0 lg:pt-12">
              <span aria-hidden="true" className="absolute left-0 top-1.5 h-full w-px bg-sand lg:hidden" />
              <span
                aria-hidden="true"
                className={`absolute -left-[0.4rem] top-1 h-3.5 w-3.5 rounded-full border-2 lg:left-0 lg:top-0 ${
                  i === 0 || i === timeline.length - 1 ? 'border-honey bg-honey' : 'border-honey bg-paper'
                }`}
              />
              <p className="font-display text-5xl leading-none text-forest lg:text-6xl">{m.year}</p>
              <h3 className="mt-5 font-sans text-lg font-semibold leading-snug !text-charcoal">{m.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{m.text}</p>
              {!m.verified && <Tbc label="Milestone details to confirm" className="mt-4" />}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
