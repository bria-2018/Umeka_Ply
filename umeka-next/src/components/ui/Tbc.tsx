import type { ReactNode } from 'react';

/**
 * Visible marker for unconfirmed information. Every placeholder value on the
 * site uses this so nothing unverified can be mistaken for a fact.
 */
export function Tbc({ label = 'To be confirmed', tone = 'light', className = '' }: { label?: string; tone?: 'light' | 'dark'; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] whitespace-nowrap ${
        tone === 'dark' ? 'border-honey-light/60 text-honey-light' : 'border-honey-ink/50 bg-honey/10 text-honey-ink'
      } ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

/** Dashed notice panel for sections whose content is awaiting confirmation. */
export function PlaceholderNote({ children, tone = 'light', className = '' }: { children: ReactNode; tone?: 'light' | 'dark'; className?: string }) {
  return (
    <div
      role="note"
      className={`flex gap-3 rounded-sm border border-dashed p-4 text-sm leading-relaxed ${
        tone === 'dark' ? 'border-bone/30 text-bone/75' : 'border-honey-ink/40 bg-honey/[0.06] text-stone'
      } ${className}`}
    >
      <Tbc label="Note" tone={tone} className="mt-0.5 self-start" />
      <div>{children}</div>
    </div>
  );
}
