import { strengths } from '@/content/company';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tbc } from '@/components/ui/Tbc';
import { ButtonLink } from '@/components/ui/Button';

/** Brand strengths grid on deep green. */
export function WhyChoose({ index = '03', showCta = true }: { index?: string; showCta?: boolean }) {
  return (
    <section aria-labelledby="why-title" className="grain section-y relative overflow-hidden bg-forest text-bone">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              tone="dark"
              index={index}
              eyebrow="Why Choose Umeka"
              title={<span id="why-title">Strength you can see. Quality you can feel.</span>}
            />
          </div>
          <Reveal delay={100} className="lg:col-span-5">
            <p className="text-lede text-bone/75">
              From the timber we select to the way each panel is pressed and finished, every step is aimed at one outcome: products that perform reliably for years.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-bone/10 lg:grid-cols-5">
          {strengths.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 5) * 70} className="group relative bg-forest p-5 transition-colors duration-500 hover:bg-forest-800 sm:p-7 lg:p-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-honey-light/30 text-honey-light transition-all duration-500 group-hover:border-honey-light group-hover:bg-honey-light group-hover:text-forest sm:h-12 sm:w-12">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-sans text-[0.95rem] font-semibold leading-snug !text-bone sm:mt-6 sm:text-[1.02rem]">{s.title}</h3>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-bone/65 sm:mt-2.5 sm:text-sm">{s.text}</p>
              {s.needsConfirmation && <Tbc tone="dark" label="Details to confirm" className="mt-4" />}
            </Reveal>
          ))}
        </ul>

        {showCta && (
          <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-bone/10 pt-10 md:flex-row md:items-center">
            <p className="max-w-2xl text-sm text-bone/60">
              Technical claims such as moisture grades, treatments and bonding systems will be supported with product-specific documentation before launch.
            </p>
            <ButtonLink href="/why-umeka/" variant="outline-light" arrow>
              Why Umeka
            </ButtonLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
