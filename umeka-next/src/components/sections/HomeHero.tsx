import { site, yearsOfJourney } from '@/content/site';
import { ButtonLink } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { PlyLines } from '@/components/ui/PlyLines';

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative bg-forest text-bone">
      <div className="grid lg:min-h-[min(88vh,860px)] lg:grid-cols-12">
        {/* Content panel */}
        <div className="grain relative order-2 flex flex-col justify-between px-[clamp(1.25rem,4.5vw,4.5rem)] pt-14 pb-12 lg:order-1 lg:col-span-6 lg:pt-20 lg:pb-14 xl:col-span-5">
          <div>
            <p className="eyebrow fade-up flex items-center gap-3 text-honey-light" style={{ ['--d' as string]: '100ms' }}>
              <span aria-hidden="true" className="h-px w-10 bg-honey-light/70" />
              Plywood · Block Board · Flush Doors
            </p>
            <h1 id="hero-title" className="mt-8 !text-bone">
              <span className="fade-up block font-sans text-[clamp(1rem,1.4vw,1.2rem)] font-semibold uppercase tracking-[0.42em] text-bone/70" style={{ ['--d' as string]: '200ms' }}>
                Umeka Ply
              </span>
              <span className="text-display-2xl fade-up mt-5 block" style={{ ['--d' as string]: '320ms' }}>
                Trusted with <em className="font-normal text-honey-light">Pride.</em>
              </span>
            </h1>
            <p className="text-lede fade-up mt-8 max-w-xl text-bone/75" style={{ ['--d' as string]: '460ms' }}>
              Strong, precise and dependable plywood, block board and flush doors — premium quality at a fair price, shaped by a journey that began in {site.journeyStartYear}.
            </p>
            <div className="fade-up mt-10 flex flex-wrap gap-4" style={{ ['--d' as string]: '600ms' }}>
              <ButtonLink href="/products/" variant="gold" size="lg" arrow>
                Explore Products
              </ButtonLink>
              <ButtonLink href="/enquiry/" variant="outline-light" size="lg">
                Send an Enquiry
              </ButtonLink>
            </div>
          </div>

          <dl className="fade-up mt-14 grid grid-cols-3 gap-6 border-t border-bone/15 pt-8" style={{ ['--d' as string]: '760ms' }}>
            {[
              [`${yearsOfJourney()}+`, 'Years of experience'],
              ['3', 'Core product categories'],
              [String(site.journeyStartYear), 'Journey began'],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="mt-2 text-[0.78rem] leading-snug text-bone/60">{label}</dt>
                <dd className="font-display text-[clamp(1.9rem,3vw,2.8rem)] leading-none text-bone">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Image */}
        <div className="relative order-1 aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:order-2 lg:col-span-6 lg:aspect-auto xl:col-span-7">
          <Picture
            name="hero-living-panelling"
            alt="Warm living room with full-height natural wood wall panelling and a leather sofa"
            fill
            priority
            sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 50vw, 100vw"
            imgClassName="hero-zoom object-[60%_center]"
          />
          <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-forest/40 to-transparent lg:block" />
          <div className="absolute bottom-6 right-6 hidden max-w-[17rem] rounded-sm bg-paper/95 p-5 text-charcoal shadow-2xl backdrop-blur md:block lg:bottom-10 lg:right-10">
            <PlyLines className="mb-4 w-16 text-honey" count={5} />
            <p className="font-display text-xl leading-snug text-forest">Built layer by layer. Backed by experience.</p>
            <p className="mt-2 text-sm text-stone">Our journey began as {site.originalBusinessName} in {site.journeyStartYear}.</p>
          </div>
        </div>
      </div>

      {/* Values ribbon */}
      <div className="border-t border-bone/10 bg-forest-900">
        <ul className="container-x no-scrollbar flex items-center justify-between gap-8 overflow-x-auto py-5 text-[0.78rem] font-medium uppercase tracking-[0.24em] text-bone/60">
          {['Strength', 'Durability', 'Precision', 'Consistency', 'Value', 'Pride'].map((v, i) => (
            <li key={v} className="flex shrink-0 items-center gap-8">
              {i > 0 && <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-honey" />}
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
