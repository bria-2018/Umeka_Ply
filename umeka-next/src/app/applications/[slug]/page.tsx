import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { applications, getApplication } from '@/content/applications';
import { getCategory, productsInCategory } from '@/content/products';
import { articles } from '@/content/articles';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Picture } from '@/components/ui/Picture';
import { Icon } from '@/components/ui/Icon';
import { ProductCard } from '@/components/sections/ProductCard';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { FinalCta } from '@/components/sections/FinalCta';
import { ButtonLink } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/seo';

type Params = { slug: string };

export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return applications.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getApplication(slug);
  if (!a) return {};
  return pageMetadata({ title: `${a.name} — Plywood & Board Guide`, description: `${a.summary} ${a.intro}`.slice(0, 158), path: `/applications/${a.slug}/`, image: a.image });
}

export default async function ApplicationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getApplication(slug);
  if (!a) notFound();
  const recommendedProducts = a.recommended.flatMap((r) => productsInCategory(r.category).slice(0, 1));
  const others = applications.filter((x) => x.slug !== a.slug).slice(0, 4);
  const guides = articles.slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Applications', href: '/applications/' },
          { name: a.name, href: `/applications/${a.slug}/` },
        ]}
        eyebrow="Application"
        title={a.name}
        lede={a.summary}
        image={a.image}
        imageAlt={`${a.name} interior`}
        actions={
          <ButtonLink href="/enquiry/?type=product" variant="primary" arrow>
            Ask for a recommendation
          </ButtonLink>
        }
      />

      <section className="section-y bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Overview" title="What this space demands" size="md" />
            <Reveal delay={100}>
              <p className="text-lede mt-6 text-stone">{a.intro}</p>
            </Reveal>
          </div>
          <ol className="space-y-px overflow-hidden rounded-sm bg-sand lg:col-span-7">
            {a.considerations.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 90} className="flex gap-6 bg-paper p-7">
                <span className="font-display text-3xl leading-none text-honey-ink">0{i + 1}</span>
                <div>
                  <h3 className="font-sans text-lg font-semibold !text-charcoal">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="rec-title" className="section-y bg-bone">
        <div className="container-x">
          <SectionHeading eyebrow="Recommended products" title={<span id="rec-title">What to use</span>} size="md" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {a.recommended.map((r) => {
              const cat = getCategory(r.category)!;
              return (
                <li key={r.category}>
                  <Link href={`/products/${cat.slug}/`} className="group flex h-full gap-5 rounded-sm bg-paper p-6 transition-shadow hover:shadow-lg">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm">
                      <Picture name={cat.image} alt="" fill sizes="80px" />
                    </div>
                    <div>
                      <p className="flex items-center gap-2 font-display text-xl text-forest">
                        {cat.name} <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-stone">{r.why}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="guides-title" className="section-y-sm bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Helpful guides" title={<span id="guides-title">Read before you build</span>} size="md" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            {guides.map((g) => (
              <ArticleCard key={g.slug} article={g} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="section-y-sm bg-bone">
        <div className="container-x">
          <h2 id="more-title" className="text-display-sm">More applications</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/applications/${o.slug}/`} className="group relative block aspect-[4/3] overflow-hidden rounded-sm">
                  <Picture name={o.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" imgClassName="transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent" />
                  <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-display text-xl text-bone">
                    {o.name} <Icon name="arrow-up-right" className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
