import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticle, type Block } from '@/content/articles';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { JsonLd } from '@/components/ui/JsonLd';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { articleSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

type Params = { slug: string };

export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.excerpt, path: `/knowledge-centre/${a.slug}/`, image: a.image, type: 'article' });
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>;
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'h3':
      return <h3>{block.text}</h3>;
    case 'ul':
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'note':
      return (
        <aside className="!mt-10 rounded-sm border-l-2 border-honey bg-bone p-6 text-charcoal">
          {block.text}{' '}
          <Link href="/enquiry/?type=product" className="font-semibold">
            Send an enquiry →
          </Link>
        </aside>
      );
  }
}

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const path = `/knowledge-centre/${a.slug}/`;
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema(a, path)} />
      <article>
        <header className="bg-bone">
          <div className="container-x pt-10 pb-12 md:pt-14">
            <Breadcrumbs
              items={[
                { name: 'Knowledge Centre', href: '/knowledge-centre/' },
                { name: a.title, href: path },
              ]}
            />
            <div className="fade-up mx-auto mt-12 max-w-4xl text-center">
              <p className="eyebrow text-honey-ink">{a.category}</p>
              <h1 className="text-display-lg mt-5">{a.title}</h1>
              <p className="text-lede mx-auto mt-6 max-w-2xl text-stone">{a.excerpt}</p>
              <p className="mt-6 text-sm text-stone-light">
                <time dateTime={a.published}>{fmt.format(new Date(a.published))}</time> · {a.readingMinutes} min read · Umeka Ply
              </p>
            </div>
          </div>
        </header>
        <div className="bg-gradient-to-b from-bone from-50% to-paper to-50%">
          <div className="container-x">
            <div className="relative mx-auto aspect-[21/9] max-w-6xl overflow-hidden rounded-sm">
              <Picture name={a.image} alt="" fill priority sizes="(min-width: 1200px) 1152px, 100vw" />
            </div>
          </div>
        </div>
        <div className="bg-paper">
          <div className="container-x py-16 lg:py-24">
            <div className="prose-umeka mx-auto">
              {a.body.map((b, i) => (
                <RenderBlock key={i} block={b} />
              ))}
            </div>
            <div className="mx-auto mt-16 flex max-w-[72ch] flex-col items-start justify-between gap-6 border-t border-sand pt-10 sm:flex-row sm:items-center">
              <Link href="/knowledge-centre/" className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:underline">
                <Icon name="arrow" className="h-4 w-4 rotate-180" /> All articles
              </Link>
              <ButtonLink href="/enquiry/?type=product" variant="primary" arrow>
                Ask our experts
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>
      <section aria-labelledby="more-title" className="section-y-sm bg-bone">
        <div className="container-x">
          <h2 id="more-title" className="text-display-md">Keep reading</h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => (
              <ArticleCard key={m.slug} article={m} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
