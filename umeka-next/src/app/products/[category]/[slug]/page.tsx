import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProduct, getCategory, relatedProducts, productHref } from '@/content/products';
import { getApplication } from '@/content/applications';
import { getDownload } from '@/content/company';
import { productFields, productOptions } from '@/content/forms';
import { site } from '@/content/site';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlaceholderNote, Tbc } from '@/components/ui/Tbc';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProductGallery } from '@/components/sections/ProductGallery';
import { ProductCard } from '@/components/sections/ProductCard';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { productSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

type Params = { category: string; slug: string };

export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, slug } = await params;
  const p = getProduct(category, slug);
  if (!p) return {};
  return pageMetadata({ title: p.name, description: `${p.tagline} ${p.intro}`.slice(0, 158), path: productHref(p), image: p.image });
}

function TbcList({ items }: { items: string[] | null }) {
  if (!items || !items.length) return <Tbc />;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="rounded-full border border-sand bg-paper px-4 py-1.5 text-sm">
          {s}
        </li>
      ))}
    </ul>
  );
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params;
  const p = getProduct(category, slug);
  const c = getCategory(category);
  if (!p || !c) notFound();
  const path = productHref(p);
  const related = relatedProducts(p);
  const apps = p.applications.map(getApplication).filter(Boolean);
  const docs = p.downloads.map(getDownload).filter(Boolean);
  const defaultOption = productOptions.find((o) => o.startsWith(p.name)) ?? '';

  return (
    <>
      <JsonLd data={productSchema(p, c, path)} />

      {/* Hero */}
      <section className="bg-bone">
        <div className="container-x grid gap-12 pt-10 pb-16 md:pt-14 lg:grid-cols-12 lg:gap-16 lg:pb-24">
          <div className="lg:col-span-6 lg:order-2">
            <ProductGallery images={p.gallery} name={p.name} />
          </div>
          <div className="fade-up lg:col-span-6 lg:order-1">
            <Breadcrumbs
              items={[
                { name: 'Products', href: '/products/' },
                { name: c.name, href: `/products/${c.slug}/` },
                { name: p.name, href: path },
              ]}
            />
            <p className="eyebrow mt-10 flex items-center gap-3 text-honey-ink">
              <span aria-hidden="true" className="h-px w-8 bg-honey" />
              {c.name} · {p.grade}
            </p>
            <h1 className="text-display-lg mt-5">{p.name}</h1>
            {p.nameIsPlaceholder && <Tbc label="Product-line name to be confirmed" className="mt-4" />}
            <p className="mt-6 font-display text-2xl leading-snug text-moss">{p.tagline}</p>
            <p className="text-lede mt-5 text-stone">{p.intro}</p>

            <ul className="mt-8 space-y-3">
              {p.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="#enquire" variant="primary" arrow>
                Enquire about this product
              </ButtonLink>
              <ButtonLink href="#downloads" variant="outline" icon="download">
                Brochure &amp; data sheet
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-title" className="section-y-sm bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="Features" title={<span id="features-title">What makes it dependable</span>} size="md" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {p.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 90} className="border-t-2 border-honey bg-bone p-7 lg:p-8">
                <span className="font-display text-lg text-stone-light">0{i + 1}</span>
                <h3 className="text-display-sm mt-3">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{f.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Specs */}
      <section aria-labelledby="specs-title" className="section-y-sm bg-paper pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Specifications" title={<span id="specs-title">Technical details</span>} size="md" />
            <PlaceholderNote className="mt-8">
              Specifications will be published once confirmed and documented. Please contact us for current technical information.
            </PlaceholderNote>
          </div>
          <div className="lg:col-span-8">
            <dl className="grid gap-px overflow-hidden rounded-sm bg-sand sm:grid-cols-2">
              <div className="bg-paper p-6 sm:col-span-2">
                <dt className="eyebrow text-stone-light">Available sizes</dt>
                <dd className="mt-3">
                  <TbcList items={p.sizes} />
                </dd>
              </div>
              <div className="bg-paper p-6 sm:col-span-2">
                <dt className="eyebrow text-stone-light">Available thicknesses</dt>
                <dd className="mt-3">
                  <TbcList items={p.thicknesses} />
                </dd>
              </div>
              {p.specs.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-4 bg-paper p-6">
                  <dt className="text-sm text-stone">
                    {s.label}
                    {s.note && <span className="mt-1 block text-xs text-stone-light">{s.note}</span>}
                  </dt>
                  <dd className="text-right font-medium text-charcoal">{s.value ?? <Tbc />}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section aria-labelledby="apps-title" className="section-y-sm bg-bone">
        <div className="container-x">
          <SectionHeading eyebrow="Recommended applications" title={<span id="apps-title">Where to use it</span>} size="md" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {apps.map((a) => (
              <li key={a!.slug}>
                <Link href={`/applications/${a!.slug}/`} className="group flex h-full items-center justify-between gap-4 rounded-sm border border-sand bg-paper p-6 transition-colors hover:border-forest">
                  <span>
                    <span className="block font-display text-xl text-forest">{a!.name}</span>
                    <span className="mt-1 block text-sm text-stone">{a!.summary}</span>
                  </span>
                  <Icon name="arrow-up-right" className="h-5 w-5 shrink-0 text-forest transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Certifications, warranty, downloads */}
      <section id="downloads" aria-label="Certifications, warranty and downloads" className="section-y-sm scroll-mt-24 bg-paper">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div className="rounded-sm border border-dashed border-forest/25 p-8">
            <Icon name="shield" className="h-7 w-7 text-moss" />
            <h2 className="text-display-sm mt-5">Certifications</h2>
            {p.certifications?.length ? (
              <ul className="mt-4 space-y-2">
                {p.certifications.map((cert) => (
                  <li key={cert.name}>{cert.name}</li>
                ))}
              </ul>
            ) : (
              <>
                <p className="mt-3 text-stone">Certificates issued to Umeka will be listed here with downloadable copies.</p>
                <Tbc label="Pending verification" className="mt-4" />
              </>
            )}
          </div>
          <div className="rounded-sm border border-dashed border-forest/25 p-8">
            <Icon name="check" className="h-7 w-7 text-moss" />
            <h2 className="text-display-sm mt-5">Warranty</h2>
            {p.warranty ? (
              <p className="mt-3 text-stone">{p.warranty}</p>
            ) : (
              <>
                <p className="mt-3 text-stone">Warranty duration, coverage and claim process will be published once finalised.</p>
                <Tbc label="Terms to be confirmed" className="mt-4" />
              </>
            )}
          </div>
          <div className="rounded-sm bg-forest p-8 text-bone">
            <Icon name="file" className="h-7 w-7 text-honey-light" />
            <h2 className="text-display-sm mt-5 !text-bone">Downloads</h2>
            <ul className="mt-5 space-y-3">
              {docs.map((d) => (
                <li key={d!.id} className="flex items-center justify-between gap-3 border-b border-bone/10 pb-3">
                  <span className="text-sm">{d!.title}</span>
                  {d!.file ? (
                    <a href={d!.file} download className="inline-flex items-center gap-1.5 text-sm font-medium text-honey-light hover:underline">
                      <Icon name="download" className="h-4 w-4" /> PDF
                    </a>
                  ) : (
                    <Tbc label="Soon" tone="dark" />
                  )}
                </li>
              ))}
            </ul>
            <Link href="/downloads/" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-bone hover:text-honey-light">
              All downloads <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" aria-labelledby="enquire-title" className="section-y scroll-mt-24 bg-bone">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Product enquiry" title={<span id="enquire-title">Ask about {p.name.replace('Umeka ', '')}</span>} size="md" lede="Share your quantity and application, and our team will come back with availability and pricing." />
            <div className="mt-10 space-y-4 text-sm">
              <a href={site.contact.phoneHref} className="flex items-center gap-3 text-charcoal hover:text-forest">
                <Icon name="phone" className="h-5 w-5 text-moss" /> {site.contact.phoneDisplay}
              </a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-charcoal hover:text-forest">
                <Icon name="mail" className="h-5 w-5 text-moss" /> {site.contact.email}
              </a>
            </div>
          </div>
          <div className="rounded-sm bg-paper p-6 shadow-[0_30px_80px_-50px_rgba(5,55,51,0.5)] sm:p-10 lg:col-span-8">
            <EnquiryForm formType="product" fields={productFields} defaults={{ product: defaultOption }} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-title" className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="You may also need" title={<span id="related-title">Related products</span>} size="md" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((r) => (
              <li key={r.slug}>
                <ProductCard product={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
