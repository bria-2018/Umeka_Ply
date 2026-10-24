import { ButtonLink } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { PlyLines } from '@/components/ui/PlyLines';

const benefits = [
  { icon: 'layers', title: 'A complete range', text: 'Plywood, block board and flush doors from one trusted brand.' },
  { icon: 'value', title: 'Competitive pricing', text: 'Premium quality at prices that work for you and your customers.' },
  { icon: 'handshake', title: 'Responsive support', text: 'Direct access to our team for product guidance and supply planning.' },
  { icon: 'truck', title: 'Dependable supply', text: 'Consistent product, delivery after delivery.' },
];

/** Dealer / distributor recruitment call-to-action. */
export function DealerCta({ index = '07' }: { index?: string }) {
  return (
    <section aria-labelledby="dealer-cta-title" className="relative overflow-hidden bg-forest-900 text-bone">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[22rem] lg:col-span-5 lg:min-h-full">
          <Picture name="interior-screen-living" alt="Contemporary interior with a wooden slatted screen and timber furniture" fill sizes="(min-width: 1024px) 42vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-forest-900/30" />
        </div>
        <div className="grain relative px-[clamp(1.25rem,4.5vw,4.5rem)] py-20 lg:col-span-7 lg:py-28">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-honey-light">
              <span className="font-display text-base tracking-normal text-bone/50">{index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-honey-light/60" />
              Dealers &amp; Distributors
            </p>
            <h2 id="dealer-cta-title" className="text-display-lg mt-6 max-w-2xl !text-bone">
              Grow your business with a name people trust.
            </h2>
            <p className="text-lede mt-6 max-w-xl text-bone/75">
              We are expanding the Umeka network and looking for committed partners who share our belief in honest products and long-term relationships.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 90} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-honey/15 text-honey-light">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold !text-bone">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-bone/65">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200} className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="/become-a-dealer/" variant="gold" size="lg" arrow>
              Become a Dealer
            </ButtonLink>
            <ButtonLink href="/dealers/" variant="outline-light" size="lg">
              Find a Dealer
            </ButtonLink>
          </Reveal>
          <PlyLines className="absolute right-10 top-12 hidden w-28 text-honey-light/30 lg:flex" count={9} />
        </div>
      </div>
    </section>
  );
}
