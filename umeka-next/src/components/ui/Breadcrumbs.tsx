import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { Icon } from './Icon';

export type Crumb = { name: string; href: string };

/** Breadcrumb trail with BreadcrumbList schema. "Home" is added automatically. */
export function Breadcrumbs({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] ${tone === 'dark' ? 'text-bone/60' : 'text-stone-light'}`}>
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={tone === 'dark' ? 'text-bone' : 'text-forest'}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className={`transition-colors ${tone === 'dark' ? 'hover:text-bone' : 'hover:text-forest'}`}>
                    {c.name}
                  </Link>
                  <Icon name="chevron-right" className="h-3 w-3 opacity-60" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
