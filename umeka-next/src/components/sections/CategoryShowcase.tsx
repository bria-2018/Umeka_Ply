import Link from 'next/link';
import { categories, productsInCategory } from '@/content/products';
import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

/** Three large product-category cards. Used on Home and Products. */
export function CategoryShowcase({ heading = true, index = '02' }: { heading?: boolean; index?: string }) {
  return (
    <section aria-labelledby={heading ? 'categories-title' : undefined} className="section-y bg-paper">
      <div className="container-x">
        {heading && (
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              index={index}
              eyebrow="Our Products"
              title={<span id="categories-title">Three products. One standard of pride.</span>}
              lede="Every Umeka product is made to the same promise: strong construction, a clean finish and dependable performance, sheet after sheet."
            />
            <Reveal delay={100}>
              <Link href="/products/" className="group inline-flex items-center gap-3 font-medium text-forest">
                View all products
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 transition-all duration-300 group-hover:bg-forest group-hover:text-bone">
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          </div>
        )}

        <div className={`grid gap-6 md:grid-cols-3 lg:gap-8 ${heading ? 'mt-16' : ''}`}>
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 120}>
              <Link href={`/products/${c.slug}/`} className="group block h-full" aria-label={`Explore ${c.name}`}>
                <article className="flex h-full flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
                    <Picture
                      name={c.image}
                      alt={`Umeka ${c.name}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-forest font-display text-base text-bone">0{i + 1}</span>
                    <span className="absolute right-5 top-5 rounded-full bg-paper/90 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-forest backdrop-blur">
                      {productsInCategory(c.slug).length} product lines
                    </span>
                    <h3 className="text-display-md absolute bottom-6 left-6 right-6 !text-bone">{c.name}</h3>
                  </div>
                  <div className="flex flex-1 flex-col border-b border-sand pb-7 pt-6">
                    <p className="flex-1 leading-relaxed text-stone">{c.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-forest">
                      Explore Products
                      <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
