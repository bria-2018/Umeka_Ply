import Link from 'next/link';
import { getCategory, productHref, type Product } from '@/content/products';
import { Picture } from '@/components/ui/Picture';
import { Icon } from '@/components/ui/Icon';

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category)!;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-sand bg-paper transition-all duration-500 hover:-translate-y-1 hover:border-forest/25 hover:shadow-[0_30px_60px_-35px_rgba(5,55,51,0.5)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Picture
          name={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-forest">{category.name}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <p className="eyebrow text-honey-ink">{product.grade}</p>
        <h3 className="text-display-sm mt-3">
          <Link href={productHref(product)} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-stone">{product.tagline}</p>
        <div className="mt-6 flex items-center justify-between border-t border-sand pt-5">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-forest">View details</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest transition-all duration-300 group-hover:bg-forest group-hover:text-bone">
            <Icon name="arrow" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
