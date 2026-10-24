import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { Picture } from './Picture';
import { PlyLines } from './PlyLines';

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  tone?: 'light' | 'dark';
  children?: ReactNode;
};

/** Standard inner-page hero: breadcrumbs, eyebrow, H1, lede, optional image. */
export function PageHero({ crumbs, eyebrow, title, lede, image, imageAlt = '', actions, tone = 'light', children }: Props) {
  const dark = tone === 'dark';
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-forest text-bone grain' : 'bg-bone'}`}>
      <div className={`container-x grid gap-10 pt-10 pb-14 md:pt-14 lg:gap-16 ${image ? 'lg:grid-cols-12 lg:items-end lg:pb-0' : 'lg:pb-20'}`}>
        <div className={`${image ? 'lg:col-span-6 lg:pb-20' : 'max-w-5xl'} fade-up`}>
          <Breadcrumbs items={crumbs} tone={tone} />
          {eyebrow && (
            <p className={`eyebrow mt-10 flex items-center gap-3 ${dark ? 'text-honey-light' : 'text-honey-ink'}`}>
              <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-honey-light/60' : 'bg-honey'}`} />
              {eyebrow}
            </p>
          )}
          <h1 className={`text-display-xl mt-5 ${dark ? '!text-bone' : ''}`}>{title}</h1>
          {lede && <p className={`text-lede mt-6 max-w-2xl ${dark ? 'text-bone/75' : 'text-stone'}`}>{lede}</p>}
          {actions && <div className="mt-9 flex flex-wrap gap-4">{actions}</div>}
          {children}
        </div>
        {image && (
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-sm lg:aspect-[5/4]">
              <Picture name={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" imgClassName="hero-zoom" />
            </div>
            <PlyLines className={`absolute -left-6 bottom-10 hidden w-24 lg:flex ${dark ? 'text-honey-light/70' : 'text-honey'}`} animate />
          </div>
        )}
      </div>
    </section>
  );
}
