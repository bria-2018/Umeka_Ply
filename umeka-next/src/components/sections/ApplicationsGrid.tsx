import Link from 'next/link';
import { applications } from '@/content/applications';
import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

/** Mosaic of application tiles linking to each application page. */
export function ApplicationsGrid({ heading = true, index = '05' }: { heading?: boolean; index?: string }) {
  return (
    <section aria-labelledby={heading ? 'apps-title' : undefined} className="section-y bg-bone">
      <div className="container-x">
        {heading && (
          <SectionHeading
            index={index}
            eyebrow="Applications"
            title={<span id="apps-title">Made for the spaces people live and work in.</span>}
            lede="From modular kitchens to commercial fit-outs, Umeka products form the strong, stable base behind beautiful interiors."
          />
        )}
        <ul className={`grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-4 lg:gap-5 ${heading ? 'mt-16' : ''}`}>
          {applications.map((a, i) => (
            <Reveal
              as="li"
              key={a.slug}
              delay={(i % 4) * 80}
              className={i === 0 ? 'sm:col-span-2 sm:row-span-2' : i === 5 ? 'lg:col-span-2' : ''}
            >
              <Link href={`/applications/${a.slug}/`} className="group relative block h-full overflow-hidden rounded-sm bg-sand">
                <Picture
                  name={a.image}
                  alt={`${a.name} made with Umeka products`}
                  fill
                  sizes={i === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                  imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-6">
                  <div>
                    <h3 className={`!text-bone ${i === 0 ? 'text-display-md' : 'text-display-sm'}`}>{a.name}</h3>
                    <p className={`mt-2 max-w-sm text-sm leading-relaxed text-bone/80 ${i === 0 || i === 5 ? '' : 'hidden'}`}>{a.summary}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bone/15 text-bone backdrop-blur transition-all duration-300 group-hover:bg-honey group-hover:text-forest-950">
                    <Icon name="arrow-up-right" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
