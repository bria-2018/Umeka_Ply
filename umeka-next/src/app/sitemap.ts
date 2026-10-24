import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { categories, products, productHref } from '@/content/products';
import { applications } from '@/content/applications';
import { articles } from '@/content/articles';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${site.url}${p}`;
  const staticPages: [string, number][] = [
    ['/', 1],
    ['/products/', 0.9],
    ['/about/', 0.7],
    ['/our-journey/', 0.6],
    ['/quality-technology/', 0.7],
    ['/why-umeka/', 0.7],
    ['/applications/', 0.8],
    ['/dealers/', 0.7],
    ['/become-a-dealer/', 0.8],
    ['/downloads/', 0.6],
    ['/knowledge-centre/', 0.7],
    ['/contact/', 0.8],
    ['/enquiry/', 0.8],
    ['/privacy-policy/', 0.2],
    ['/terms-and-conditions/', 0.2],
  ];
  return [
    ...staticPages.map(([p, priority]) => ({ url: url(p), lastModified: now, changeFrequency: 'monthly' as const, priority })),
    ...categories.map((c) => ({ url: url(`/products/${c.slug}/`), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...products.map((p) => ({ url: url(productHref(p)), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...applications.map((a) => ({ url: url(`/applications/${a.slug}/`), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...articles.map((a) => ({ url: url(`/knowledge-centre/${a.slug}/`), lastModified: new Date(a.published), changeFrequency: 'yearly' as const, priority: 0.5 })),
  ];
}
