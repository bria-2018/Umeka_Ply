import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DealerLocator } from '@/components/sections/DealerLocator';
import { DealerCta } from '@/components/sections/DealerCta';
import { ButtonLink } from '@/components/ui/Button';
import { Tbc } from '@/components/ui/Tbc';
import { focusRegions } from '@/content/dealers';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Dealer & Distributor Network',
  description: 'Find an authorised Umeka Ply dealer or distributor near you for plywood, block board and flush doors, or contact us to be connected with your nearest partner.',
  path: '/dealers/',
  image: 'blockboard-cafe-tables',
});

export default function DealersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Dealer Network', href: '/dealers/' }]}
        eyebrow="Dealer Network"
        title="Find Umeka near you."
        lede="Umeka products are supplied through a growing network of authorised dealers and distributors. Search below, or ask us to connect you with your nearest partner."
        actions={
          <>
            <ButtonLink href="#locator" variant="primary" arrow>
              Search dealers
            </ButtonLink>
            <ButtonLink href="/become-a-dealer/" variant="outline">
              Become a dealer
            </ButtonLink>
          </>
        }
      >
        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-stone">
          <span>Network focus:</span>
          {focusRegions.map((r) => (
            <span key={r} className="rounded-full border border-sand bg-paper px-4 py-1.5 text-charcoal">
              {r}
            </span>
          ))}
          <Tbc label="Coverage to confirm" />
        </div>
      </PageHero>

      <section id="locator" aria-labelledby="locator-title" className="section-y scroll-mt-24 bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="Dealer locator" title={<span id="locator-title">Authorised dealers &amp; distributors</span>} size="md" className="mb-10" />
          <DealerLocator />
        </div>
      </section>
      <DealerCta index="" />
    </>
  );
}
