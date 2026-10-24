import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Tbc, PlaceholderNote } from '@/components/ui/Tbc';
import { ButtonLink } from '@/components/ui/Button';
import { downloads } from '@/content/company';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Downloads — Catalogues & Technical Sheets',
  description: 'Download the Umeka Ply product catalogue, technical data sheets, certificates, warranty terms and care guides.',
  path: '/downloads/',
  image: 'product-plywood',
});

export default function DownloadsPage() {
  const types = Array.from(new Set(downloads.map((d) => d.type)));
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Downloads', href: '/downloads/' }]}
        eyebrow="Downloads"
        title="Product information, ready when you need it."
        lede="Catalogues, technical data sheets, certificates and guides for homeowners, professionals and dealers."
      />
      <section className="section-y bg-paper">
        <div className="container-x">
          <PlaceholderNote className="mb-12 max-w-3xl">
            Documents marked &ldquo;Coming soon&rdquo; are being prepared. Upload PDFs to <code>/public/downloads/</code> and set the file path in{' '}
            <code>src/content/company.ts</code> to publish them. Need something now? Request it and we will email it to you.
          </PlaceholderNote>
          {types.map((type) => (
            <div key={type} className="border-t border-sand py-10 first:border-t-0 first:pt-0">
              <h2 className="eyebrow text-honey-ink">{type}</h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {downloads
                  .filter((d) => d.type === type)
                  .map((d, i) => (
                    <Reveal as="li" key={d.id} delay={i * 80} className="flex flex-col justify-between gap-6 rounded-sm border border-sand bg-paper p-7 transition-colors hover:border-forest/30 sm:flex-row sm:items-center">
                      <div className="flex gap-5">
                        <span className="flex h-14 w-12 shrink-0 items-end justify-center rounded-sm bg-forest pb-2 text-[0.6rem] font-bold tracking-widest text-honey-light">PDF</span>
                        <div>
                          <h3 className="font-display text-xl text-forest">{d.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-stone">{d.description}</p>
                          {d.size && <p className="mt-1 text-xs text-stone-light">{d.size}</p>}
                        </div>
                      </div>
                      {d.file ? (
                        <a href={d.file} download className="inline-flex min-h-11 shrink-0 items-center gap-2 bg-forest px-5 text-sm font-medium text-bone hover:bg-forest-800">
                          <Icon name="download" className="h-4 w-4" /> Download
                        </a>
                      ) : (
                        <Tbc label="Coming soon" className="shrink-0" />
                      )}
                    </Reveal>
                  ))}
              </ul>
            </div>
          ))}
          <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-sm bg-bone p-8 md:flex-row md:items-center">
            <p className="font-display text-2xl text-forest">Need a document that isn&rsquo;t listed?</p>
            <ButtonLink href="/enquiry/?type=general" variant="primary" arrow>
              Request a document
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
