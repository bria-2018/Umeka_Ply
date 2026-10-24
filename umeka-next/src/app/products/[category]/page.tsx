import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategory, productsInCategory } from '@/content/products';
import { applications } from '@/content/applications';
import { getDownload } from '@/content/company';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ProductCard } from '@/components/sections/ProductCard';
import { LayerDiagram } from '@/components/sections/LayerDiagram';
import { FinalCta } from '@/components/sections/FinalCta';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { PlaceholderNote, Tbc } from '@/components/ui/Tbc';
import { Picture } from '@/components/ui/Picture';
import { pageMetadata } from '@/lib/seo';

type Params = { category: string };

export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle, description: c.metaDescription, path: `/products/${c.slug}/`, image: c.image });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const items = productsInCategory(c.slug);
  const relatedApps = applications.filter((a) => a.recommended.some((r) => r.category === c.slug)).slice(0, 4);
  const sheet = getDownload(c.slug === 'plywood' ? 'plywood-technical-sheet' : c.slug === 'block-board' ? 'block-board-technical-sheet' : 'flush-door-technical-sheet');

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Products', href: '/products/' },
          { name: c.name, href: `/products/${c.slug}/` },
        ]}
        eyebrow={`Umeka ${c.name}`}
        title={c.title}
        lede={c.summary}
        image={c.lifestyleImage}
        imageAlt={`Interior featuring ${c.name.toLowerCase()} furniture and fittings`}
        actions={
          <>
            <ButtonLink href="#lines" variant="primary" arrow>
              View product lines
            </ButtonLink>
            <ButtonLink href={`/enquiry/?type=product`} variant="outline">
              Enquire about {c.name}
            </ButtonLink>
          </>
        }
      />

      {/* Intro + highlights */}
      <section className="section-y bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand">
              <Picture name={c.image} alt={`Umeka ${c.name} — product view`} fill sizes="(min-width: 1024px) 40vw, 100vw" />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={`What is ${c.singular.toLowerCase()}?`} title={`Understanding ${c.name.toLowerCase()}`} size="md" />
            <Reveal delay={100} className="mt-6 space-y-5 text-lede text-stone">
              {c.intro.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Reveal>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-sand sm:grid-cols-2">
              {c.highlights.map((h, i) => (
                <Reveal as="li" key={h.title} delay={i * 80} className="bg-paper p-6">
                  <Icon name="check" className="h-6 w-6 text-moss" />
                  <h3 className="mt-4 font-sans text-base font-semibold !text-charcoal">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{h.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Construction */}
      <section aria-labelledby="construction-title" className="section-y bg-bone">
        <div className="container-x">
          <SectionHeading
            eyebrow="Construction"
            title={<span id="construction-title">How {c.name.toLowerCase()} is built.</span>}
            lede="Hover or tab through the layers to see what each one does. Illustrative construction; exact layer counts vary by thickness and grade."
            size="md"
          />
          <div className="mt-14">
            <LayerDiagram category={c} />
          </div>
        </div>
      </section>

      {/* Product lines */}
      <section id="lines" aria-labelledby="lines-title" className="section-y scroll-mt-24 bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="Product Lines" title={<span id="lines-title">Choose the right grade.</span>} size="md" />
          <PlaceholderNote className="mt-8 max-w-3xl">
            Product-line names and grade availability are placeholders pending confirmation of the final Umeka range.
          </PlaceholderNote>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {items.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Best for + applications */}
      <section className="section-y-sm bg-forest text-bone grain">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-honey-light">Best for</p>
            <h2 className="text-display-md mt-4 !text-bone">Where {c.name.toLowerCase()} works best</h2>
          </div>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-8">
            {c.bestFor.map((b) => (
              <li key={b} className="rounded-full border border-bone/20 px-5 py-2.5 text-sm text-bone/85">
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="container-x mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedApps.map((a) => (
            <Link key={a.slug} href={`/applications/${a.slug}/`} className="group relative block aspect-[4/3] overflow-hidden rounded-sm">
              <Picture name={a.image} alt={a.name} fill sizes="(min-width: 1024px) 25vw, 50vw" imgClassName="transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-display text-xl text-bone">
                {a.name} <Icon name="arrow-up-right" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Downloads */}
      <section className="section-y-sm bg-bone">
        <div className="container-x flex flex-col items-start justify-between gap-8 rounded-sm border border-sand bg-paper p-8 md:flex-row md:items-center lg:p-12">
          <div className="flex gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-bone text-forest">
              <Icon name="file" className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-display-sm">{sheet?.title}</h2>
              <p className="mt-2 text-stone">{sheet?.description}</p>
              {!sheet?.file && <Tbc label="Document coming soon" className="mt-3" />}
            </div>
          </div>
          {sheet?.file ? (
            <ButtonLink href={sheet.file} variant="primary" icon="download">
              Download
            </ButtonLink>
          ) : (
            <ButtonLink href="/enquiry/?type=general" variant="outline" arrow>
              Request by email
            </ButtonLink>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
