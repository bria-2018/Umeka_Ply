import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { ApplicationsGrid } from '@/components/sections/ApplicationsGrid';
import { FinalCta } from '@/components/sections/FinalCta';
import { ButtonLink } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Applications — Where to Use Plywood, Block Board & Flush Doors',
  description: 'Residential furniture, modular kitchens, wardrobes, offices, commercial interiors, doors and wall panels — find the right Umeka product for every application.',
  path: '/applications/',
  image: 'app-kitchen',
});

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Applications', href: '/applications/' }]}
        eyebrow="Applications"
        title="The right panel for every space."
        lede="Every room asks something different of its materials. Explore where Umeka plywood, block board and flush doors perform best — and what to consider for each."
        image="app-kitchen"
        imageAlt="Modern kitchen with light wood upper cabinets and deep green lower cabinets"
        actions={
          <ButtonLink href="/enquiry/?type=product" variant="primary" arrow>
            Get a product recommendation
          </ButtonLink>
        }
      />
      <ApplicationsGrid heading={false} />
      <FinalCta />
    </>
  );
}
