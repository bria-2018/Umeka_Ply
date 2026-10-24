import Link from 'next/link';
import type { Article } from '@/content/articles';
import { Picture } from '@/components/ui/Picture';
import { Icon } from '@/components/ui/Icon';

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export function ArticleCard({ article, priority }: { article: Article; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/knowledge-centre/${article.slug}/`} className="block" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-sand">
          <Picture
            name={article.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-forest">
            {article.category}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[0.8rem] text-stone-light">
          <time dateTime={article.published}>{fmt.format(new Date(article.published))}</time> · {article.readingMinutes} min read
        </p>
        <h3 className="mt-3 text-display-sm">
          <Link href={`/knowledge-centre/${article.slug}/`} className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-stone">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-forest">
          Read article <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
