import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { CategoryShowcase } from '@/components/sections/CategoryShowcase';
import { ProductExplorer } from '@/components/sections/ProductExplorer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlaceholderNote } from '@/components/ui/Tbc';
import { FinalCta } from '@/components/sections/FinalCta';
import { ButtonLink } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Products — Plywood, Block Board & Flush Doors',
  description: 'Explore the Umeka Ply range: plywood, block board and flush doors for homes, offices and commercial projects. Filter by category and application.',
  path: '/products/',
  image: 'product-plywood',
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Products', href: '/products/' }]}
        eyebrow="Our Products"
        title="The strong, dependable base behind every finish."
        lede="Plywood, block board and flush doors — each made to the same promise of strength, consistency and a clean finish."
        image="plywood-panelling-tv"
        imageAlt="Living room with light plywood wall panelling and a low TV unit"
        actions={
          <>
            <ButtonLink href="#range" variant="primary" arrow>
              Browse the range
            </ButtonLink>
            <ButtonLink href="/enquiry/?type=product" variant="outline">
              Ask for a recommendation
            </ButtonLink>
          </>
        }
      />
      <CategoryShowcase heading={false} />
      <section id="range" aria-labelledby="range-title" className="section-y scroll-mt-24 bg-paper pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="Full Range" title={<span id="range-title">Find the right product.</span>} size="md" />
          <PlaceholderNote className="mt-8 max-w-3xl">
            Product-line names, grades and technical specifications shown are working placeholders and will be updated with confirmed Umeka data before launch.
          </PlaceholderNote>
          <div className="mt-10">
            <ProductExplorer />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
