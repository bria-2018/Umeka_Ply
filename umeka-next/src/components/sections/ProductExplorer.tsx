'use client';

import { useEffect, useMemo, useState } from 'react';
import { products, categories } from '@/content/products';
import { applications } from '@/content/applications';
import { ProductCard } from './ProductCard';
import { Icon } from '@/components/ui/Icon';

/** Search + filter the full product range. Supports ?category=<slug>. */
export function ProductExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [application, setApplication] = useState<string>('all');

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('category');
    if (c && categories.some((x) => x.slug === c)) setCategory(c);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (application !== 'all' && !p.applications.includes(application)) return false;
      if (!q) return true;
      return [p.name, p.grade, p.tagline, p.intro, ...p.benefits].join(' ').toLowerCase().includes(q);
    });
  }, [query, category, application]);

  const chip = (selected: boolean) =>
    `min-h-11 rounded-full border px-5 text-sm font-medium transition-all duration-300 ${
      selected ? 'border-forest bg-forest text-bone' : 'border-sand bg-paper text-charcoal hover:border-forest/40'
    }`;

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-sm bg-bone p-5 lg:flex-row lg:items-center lg:justify-between lg:p-6">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')} className={chip(category === 'all')}>
            All products
          </button>
          {categories.map((c) => (
            <button key={c.slug} type="button" aria-pressed={category === c.slug} onClick={() => setCategory(c.slug)} className={chip(category === c.slug)}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block">
            <span className="sr-only">Filter by application</span>
            <select
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className="min-h-11 w-full appearance-none rounded-full border border-sand bg-paper pl-5 pr-10 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15 sm:w-56"
            >
              <option value="all">All applications</option>
              {applications.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name}
                </option>
              ))}
            </select>
            <Icon name="chevron" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
          </label>
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="min-h-11 w-full rounded-full border border-sand bg-paper pl-11 pr-5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15 sm:w-64"
            />
          </label>
        </div>
      </div>

      <p aria-live="polite" className="mt-8 text-sm text-stone">
        Showing <strong className="text-charcoal">{results.length}</strong> of {products.length} products
      </p>

      {results.length ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {results.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-sm border border-dashed border-sand p-12 text-center">
          <p className="font-display text-2xl text-forest">No products match your filters.</p>
          <p className="mt-2 text-stone">Try a different search, or clear the filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
              setApplication('all');
            }}
            className="mt-6 min-h-11 rounded-full border border-forest px-6 text-sm font-medium text-forest hover:bg-forest hover:text-bone"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
