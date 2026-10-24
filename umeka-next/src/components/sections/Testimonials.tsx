import { testimonials } from '@/content/company';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { Tbc } from '@/components/ui/Tbc';

/**
 * Testimonial layout. Shows clearly labelled empty placeholders until genuine,
 * permission-cleared testimonials are added in content/company.ts.
 */
export function Testimonials({ index = '08' }: { index?: string }) {
  return (
    <section aria-labelledby="testimonials-title" className="section-y bg-bone">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Testimonials"
          align="center"
          title={<span id="testimonials-title">In the words of the people we work with.</span>}
          lede="Homeowners, designers, carpenters and dealers — their experience matters more than anything we could say."
        />
        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => {
            const pending = !t.quote;
            return (
              <Reveal
                as="li"
                key={i}
                delay={i * 100}
                className={`flex flex-col justify-between rounded-sm p-8 lg:p-10 ${pending ? 'border border-dashed border-forest/25 bg-paper/60' : 'bg-paper shadow-sm'}`}
              >
                <div>
                  <Icon name="quote" className="h-9 w-9 text-honey" strokeWidth={1.4} />
                  {pending ? (
                    <p className="mt-6 font-display text-2xl leading-snug text-stone-light">Customer testimonial will appear here once available.</p>
                  ) : (
                    <blockquote className="mt-6 font-display text-2xl leading-snug text-forest">&ldquo;{t.quote}&rdquo;</blockquote>
                  )}
                </div>
                <div className="mt-10 flex items-center gap-4 border-t border-sand pt-6">
                  <span aria-hidden="true" className="h-12 w-12 rounded-full border border-dashed border-forest/25 bg-bone" />
                  <div className="text-sm">
                    <p className="font-semibold text-charcoal">{t.name ?? 'Name'}</p>
                    <p className="text-stone">
                      {t.role ?? 'Role'} · {t.city ?? 'City'}
                    </p>
                  </div>
                  {pending && <Tbc label="Testimonial pending" className="ml-auto" />}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
