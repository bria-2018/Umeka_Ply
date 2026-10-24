import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Icon } from './Icon';

type Variant = 'primary' | 'gold' | 'outline' | 'outline-light' | 'light' | 'text' | 'text-light';
type Size = 'md' | 'lg' | 'sm';

const base =
  'group/btn inline-flex items-center justify-center gap-3 text-center leading-tight font-medium tracking-wide transition-all duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-bone hover:bg-forest-800 shadow-[0_10px_30px_-12px_rgba(5,55,51,0.6)]',
  gold: 'bg-honey text-forest-950 hover:bg-honey-light shadow-[0_10px_30px_-12px_rgba(195,155,59,0.7)]',
  outline: 'border border-forest/30 text-forest hover:border-forest hover:bg-forest hover:text-bone',
  'outline-light': 'border border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-forest',
  light: 'bg-bone text-forest hover:bg-white',
  text: 'text-forest underline-offset-[6px] hover:underline !px-0',
  'text-light': 'text-bone underline-offset-[6px] hover:underline !px-0',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-5 text-sm',
  md: 'min-h-12 px-7 text-[0.95rem]',
  lg: 'min-h-14 px-9 text-base',
};

type Common = { variant?: Variant; size?: Size; arrow?: boolean; icon?: string; children: ReactNode; className?: string };

function Inner({ children, arrow, icon }: Pick<Common, 'children' | 'arrow' | 'icon'>) {
  return (
    <>
      {icon && <Icon name={icon} className="h-[1.1em] w-[1.1em]" />}
      <span>{children}</span>
      {arrow && <Icon name="arrow" className="h-[1.1em] w-[1.1em] transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </>
  );
}

export function ButtonLink({ href, variant = 'primary', size = 'md', arrow, icon, children, className = '', ...rest }: Common & Omit<ComponentProps<typeof Link>, 'children' | 'className'>) {
  const external = typeof href === 'string' && /^(https?:|tel:|mailto:)/.test(href);
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    const isWeb = String(href).startsWith('http');
    return (
      <a href={String(href)} className={cls} {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...(rest as ComponentProps<'a'>)}>
        <Inner arrow={arrow} icon={icon}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner arrow={arrow} icon={icon}>{children}</Inner>
    </Link>
  );
}

export function Button({ variant = 'primary', size = 'md', arrow, icon, children, className = '', ...rest }: Common & Omit<ComponentProps<'button'>, 'children' | 'className'>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      <Inner arrow={arrow} icon={icon}>{children}</Inner>
    </button>
  );
}
