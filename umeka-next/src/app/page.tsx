import type { Metadata } from 'next';
import { HomeHero } from '@/components/sections/HomeHero';
import { BrandIntro } from '@/components/sections/BrandIntro';
import { CategoryShowcase } from '@/components/sections/CategoryShowcase';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { QualityProcess } from '@/components/sections/QualityProcess';
import { ApplicationsGrid } from '@/components/sections/ApplicationsGrid';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';
import { DealerCta } from '@/components/sections/DealerCta';
import { Testimonials } from '@/components/sections/Testimonials';
import { KnowledgeTeaser } from '@/components/sections/KnowledgeTeaser';
import { FinalCta } from '@/components/sections/FinalCta';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.tagline} | Plywood, Block Board & Flush Doors` },
  description: site.description,
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BrandIntro />
      <CategoryShowcase />
      <WhyChoose />

      <section aria-labelledby="quality-title" className="section-y bg-paper">
        <div className="container-x">
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              index="04"
              eyebrow="Quality & Technology"
              title={<span id="quality-title">Precision in every layer.</span>}
              lede="Careful material selection, controlled bonding and pressing, and checks at every stage — the quiet discipline behind a dependable panel."
            />
            <ButtonLink href="/quality-technology/" variant="outline" arrow className="shrink-0">
              Our process
            </ButtonLink>
          </div>
          <QualityProcess />
        </div>
      </section>

      <ApplicationsGrid />
      <JourneyTimeline />
      <DealerCta />
      <Testimonials />
      <KnowledgeTeaser />
      <FinalCta />
    </>
  );
}
