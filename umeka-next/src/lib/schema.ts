import { site } from '@/content/site';
import { absoluteUrl } from './seo';
import { imageUrl } from './images';
import type { Product, Category } from '@/content/products';
import type { Article } from '@/content/articles';

/** Structured data (JSON-LD) builders. Rendered with <JsonLd />. */

export function organizationSchema() {
  const office = site.addresses.find((a) => a.id === 'office')!;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: 'Umeka',
    slogan: site.tagline,
    url: site.url,
    logo: absoluteUrl('/brand/umeka-logo-color.png'),
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.street,
      addressLocality: office.locality,
      addressRegion: office.region,
      postalCode: office.postalCode,
      addressCountry: 'IN',
    },
    sameAs: site.social.map((s) => s.url).filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: 'en-IN',
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function productSchema(product: Product, category: Category, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.intro,
    category: category.name,
    url: absoluteUrl(path),
    image: absoluteUrl(imageUrl(product.image)),
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@id': `${site.url}/#organization` },
  };
}

export function articleSchema(article: Article, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published,
    dateModified: article.published,
    image: absoluteUrl(imageUrl(article.image)),
    mainEntityOfPage: absoluteUrl(path),
    author: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
