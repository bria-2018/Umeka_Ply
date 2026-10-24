'use client';

import { useState } from 'react';
import { qualitySteps, qualityChecks } from '@/content/company';
import { Picture } from '@/components/ui/Picture';
import { Icon } from '@/components/ui/Icon';

/** Interactive manufacturing process: choose a step to see its detail and image. */
export function QualityProcess({ tone = 'paper' }: { tone?: 'paper' | 'bone' }) {
  const [active, setActive] = useState(0);
  const step = qualitySteps[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <ol className="border-t border-sand" role="tablist" aria-label="Manufacturing steps" aria-orientation="vertical">
          {qualitySteps.map((s, i) => {
            const selected = i === active;
            return (
              <li key={s.step} className="border-b border-sand">
                <button
                  type="button"
                  role="tab"
                  id={`qstep-${i}`}
                  aria-selected={selected}
                  aria-controls="qstep-panel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      const n = (i + 1) % qualitySteps.length;
                      setActive(n);
                      document.getElementById(`qstep-${n}`)?.focus();
                    }
                    if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      const n = (i - 1 + qualitySteps.length) % qualitySteps.length;
                      setActive(n);
                      document.getElementById(`qstep-${n}`)?.focus();
                    }
                  }}
                  className="group flex w-full items-start gap-5 py-5 text-left"
                >
                  <span className={`font-display text-lg transition-colors ${selected ? 'text-honey-ink' : 'text-stone-light'}`}>{s.step}</span>
                  <span className="flex-1">
                    <span className={`block font-display text-[1.45rem] leading-tight transition-colors ${selected ? 'text-forest' : 'text-charcoal/70 group-hover:text-forest'}`}>
                      {s.title}
                    </span>
                    <span className={`grid transition-all duration-500 ease-[var(--ease-out-expo)] ${selected ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <span className="min-h-0 overflow-hidden text-[0.95rem] leading-relaxed text-stone">{s.text}</span>
                    </span>
                  </span>
                  <Icon name="arrow" className={`mt-2 h-4 w-4 transition-all duration-300 ${selected ? 'translate-x-0 text-honey-ink opacity-100' : '-translate-x-2 opacity-0'}`} />
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="lg:col-span-7">
        <div id="qstep-panel" role="tabpanel" aria-labelledby={`qstep-${active}`} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand">
          {qualitySteps.map((s, i) => (
            <div key={s.step} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`} aria-hidden={i !== active}>
              <Picture name={s.image} alt={s.title} fill sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/85 to-transparent p-6 pt-24 text-bone sm:p-8 sm:pt-28">
            <p className="eyebrow text-honey-light">Step {step.step}</p>
            <p className="mt-2 font-display text-2xl sm:text-3xl">{step.title}</p>
          </div>
        </div>
        <div className={`mt-6 rounded-sm p-6 ${tone === 'paper' ? 'bg-bone' : 'bg-paper'}`}>
          <p className="eyebrow text-honey-ink">Quality checks</p>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {qualityChecks.map((c) => (
              <li key={c} className="flex items-center gap-3 text-[0.95rem] text-charcoal">
                <Icon name="check" className="h-5 w-5 shrink-0 text-moss" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
