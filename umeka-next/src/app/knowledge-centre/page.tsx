import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { FaqList } from '@/components/sections/FaqList';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FinalCta } from '@/components/sections/FinalCta';
import { articles } from '@/content/articles';
import { faqs } from '@/content/company';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Knowledge Centre — Plywood Guides & Buying Advice',
  description: 'Practical guides on choosing plywood, MR/BWR/BWP grades, plywood vs block board, checking quality, choosing flush doors and caring for furniture.',
  path: '/knowledge-centre/',
  image: 'texture-ply-edge',
});

export default function KnowledgePage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Knowledge Centre', href: '/knowledge-centre/' }]}
        eyebrow="Knowledge Centre"
        title="Know your material. Build with confidence."
        lede="Clear, practical guidance on choosing, using and caring for plywood, block board and flush doors."
      />
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal className="grid items-center gap-10 border-b border-sand pb-16 lg:grid-cols-2 lg:gap-16">
            <ArticleCard article={featured} priority />
            <div className="hidden lg:block">
              <p className="eyebrow text-honey-ink">Featured guide</p>
              <p className="text-display-md mt-4 text-forest">{featured.title}</p>
              <p className="text-lede mt-5 text-stone">{featured.excerpt}</p>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 100}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section aria-labelledby="kfaq-title" className="section-y bg-bone">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Quick answers" title={<span id="kfaq-title">Frequently asked questions</span>} size="md" />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
