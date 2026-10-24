'use client';

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from 'react';

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/** Fades/slides content in once when it enters the viewport. Respects reduced motion. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
