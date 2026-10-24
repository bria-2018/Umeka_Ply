'use client';

import { useState } from 'react';
import type { Category } from '@/content/products';

const DEPTH = 34; // px — apparent depth of each slab (cabinet projection)

/**
 * Interactive exploded construction view. Each layer is drawn as an
 * isometric slab (front edge + top face + side face). Hover or focus a
 * layer — or its legend entry — to pull it out and highlight it.
 * Illustrative only; layer counts vary by thickness and grade.
 */
export function LayerDiagram({ category }: { category: Category }) {
  const [active, setActive] = useState<number | null>(null);
  const layers = category.construction;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="relative mx-auto w-full max-w-xl px-2 py-6" aria-hidden="true">
        <div className="flex flex-col" style={{ gap: active === null ? 14 : 22, transition: 'gap .6s cubic-bezier(.16,1,.3,1)' }}>
          {layers.map((l, i) => {
            const isActive = active === i;
            const edge = l.thickness * 12 + 6;
            const crossGrain = /cross/i.test(l.name);
            return (
              <div
                key={`${l.name}-${i}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="relative cursor-pointer transition-all duration-500 ease-[var(--ease-out-expo)]"
                style={{
                  height: edge + DEPTH,
                  width: `calc(100% - ${DEPTH}px)`,
                  transform: `translateX(${isActive ? 28 : 0}px)`,
                  opacity: active === null || isActive ? 1 : 0.55,
                }}
              >
                {/* Top face */}
                <div
                  className="absolute left-0 top-0 w-full origin-bottom-left"
                  style={{
                    height: DEPTH,
                    transform: 'skewX(-45deg)',
                    background: crossGrain
                      ? `repeating-linear-gradient(0deg, color-mix(in srgb, ${l.tone} 85%, white) 0 5px, ${l.tone} 5px 7px)`
                      : `repeating-linear-gradient(90deg, color-mix(in srgb, ${l.tone} 85%, white) 0 9px, ${l.tone} 9px 11px)`,
                  }}
                />
                {/* Front edge */}
                <div
                  className="absolute bottom-0 left-0 w-full"
                  style={{
                    height: edge,
                    background: crossGrain
                      ? `repeating-linear-gradient(90deg, color-mix(in srgb, ${l.tone} 80%, #6b4a2b) 0 3px, color-mix(in srgb, ${l.tone} 92%, #6b4a2b) 3px 6px)`
                      : `repeating-linear-gradient(0deg, color-mix(in srgb, ${l.tone} 78%, #6b4a2b) 0 2px, color-mix(in srgb, ${l.tone} 90%, #6b4a2b) 2px 5px)`,
                    outline: isActive ? '2px solid #c39b3b' : 'none',
                    outlineOffset: 2,
                  }}
                />
                {/* Side face */}
                <div
                  className="absolute bottom-0 origin-bottom-left"
                  style={{
                    left: '100%',
                    width: DEPTH,
                    height: edge,
                    transform: 'skewY(-45deg)',
                    background: `color-mix(in srgb, ${l.tone} 68%, #3b2a18)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <ol className="border-t border-sand">
        {layers.map((l, i) => (
          <li key={`${l.name}-legend-${i}`} className="border-b border-sand">
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={`flex w-full items-center gap-5 py-4 text-left transition-colors ${active === i ? 'text-forest' : 'text-charcoal'}`}
            >
              <span className="h-8 w-8 shrink-0 rounded-[2px] border border-forest/10" style={{ background: l.tone }} aria-hidden="true" />
              <span className="flex-1">
                <span className="block font-medium">{l.name}</span>
                <span className="block text-sm text-stone">{l.detail}</span>
              </span>
              <span className={`font-display text-lg ${active === i ? 'text-honey-ink' : 'text-stone-light'}`}>{String(i + 1).padStart(2, '0')}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
