import { site, yearsOfJourney } from '@/content/site';
import { ButtonLink } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/ui/Reveal';
import { PlyLines } from '@/components/ui/PlyLines';

export function BrandIntro() {
  return (
    <section aria-labelledby="intro-title" className="section-y bg-bone">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-honey-ink">
              <span className="font-display text-base tracking-normal text-stone-light">01</span>
              <span aria-hidden="true" className="h-px w-8 bg-honey" />
              About Umeka
            </p>
            <h2 id="intro-title" className="text-display-lg mt-6">
              Experience you can build on. <em className="font-normal text-moss">Quality you can trust.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 space-y-5 text-lede text-stone">
            <p>
              Umeka&rsquo;s story began in {site.journeyStartYear} as {site.originalBusinessName}, working closely with dealers, carpenters and builders in the plywood
              and timber trade. More than {yearsOfJourney()} years later, that hands-on experience shapes every product we make.
            </p>
            <p>
              Today, Umeka Ply offers plywood, block board and flush doors that bring together strength, durability and a refined finish — premium quality at a fair,
              competitive price, and relationships that last as long as our products.
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/about/" variant="primary" arrow>
              About Umeka
            </ButtonLink>
            <ButtonLink href="/our-journey/" variant="outline">
              Our Journey
            </ButtonLink>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <Reveal className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-sm">
            <Picture name="furniture-sideboard" alt="Handcrafted wooden sideboard with a herringbone front in a bright living room" fill sizes="(min-width: 1024px) 40vw, 80vw" />
          </Reveal>
          <Reveal delay={160} className="absolute bottom-[-2rem] left-0 aspect-[4/3] w-[48%] overflow-hidden rounded-sm border-[6px] border-bone shadow-2xl">
            <Picture name="texture-ply-edge" alt="Close-up of a plywood edge showing even, tightly bonded veneer layers" fill sizes="(min-width: 1024px) 24vw, 48vw" />
          </Reveal>
          <div className="absolute left-[6%] top-10 hidden rounded-sm bg-forest p-6 text-bone shadow-xl sm:block">
            <p className="font-display text-5xl leading-none text-honey-light">{site.journeyStartYear}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-bone/70">Where it began</p>
          </div>
          <PlyLines className="absolute -right-4 bottom-16 hidden w-20 text-honey lg:flex" />
        </div>
      </div>
    </section>
  );
}
