import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  size?: 'lg' | 'md';
  className?: string;
  actions?: ReactNode;
};

/** Consistent eyebrow + headline + lede block used across every section. */
export function SectionHeading({ eyebrow, index, title, lede, as: Tag = 'h2', align = 'left', tone = 'light', size = 'lg', className = '', actions }: Props) {
  const dark = tone === 'dark';
  return (
    <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-4xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${dark ? 'text-honey-light' : 'text-honey-ink'}`}>
          {index && <span className={`font-display text-base font-medium tracking-normal ${dark ? 'text-bone/50' : 'text-stone-light'}`}>{index}</span>}
          <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-honey-light/60' : 'bg-honey'}`} />
          {eyebrow}
        </p>
      )}
      <Tag className={`${size === 'lg' ? 'text-display-lg' : 'text-display-md'} ${dark ? '!text-bone' : ''}`}>{title}</Tag>
      {lede && <p className={`text-lede mt-6 ${align === 'center' ? 'mx-auto' : ''} max-w-2xl ${dark ? 'text-bone/75' : 'text-stone'}`}>{lede}</p>}
      {actions && <div className={`mt-8 flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : ''}`}>{actions}</div>}
    </Reveal>
  );
}
