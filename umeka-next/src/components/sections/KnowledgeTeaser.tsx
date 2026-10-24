import { articles } from '@/content/articles';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { ArticleCard } from './ArticleCard';

export function KnowledgeTeaser({ index = '09' }: { index?: string }) {
  return (
    <section aria-labelledby="knowledge-title" className="section-y bg-paper">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index={index}
            eyebrow="Knowledge Centre"
            title={<span id="knowledge-title">Choose better with clear, practical guidance.</span>}
          />
          <Reveal delay={100}>
            <ButtonLink href="/knowledge-centre/" variant="outline" arrow>
              All articles
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 110}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
