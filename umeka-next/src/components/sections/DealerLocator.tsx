'use client';

import { useMemo, useState } from 'react';
import { dealers } from '@/content/dealers';
import { Icon } from '@/components/ui/Icon';
import { ButtonLink } from '@/components/ui/Button';

/** Dealer locator with state + text filtering. Shows a helpful empty state. */
export function DealerLocator() {
  const states = useMemo(() => Array.from(new Set(dealers.map((d) => d.state))).sort(), []);
  const [state, setState] = useState('all');
  const [q, setQ] = useState('');

  const results = dealers.filter((d) => {
    if (state !== 'all' && d.state !== state) return false;
    const s = q.trim().toLowerCase();
    return !s || `${d.name} ${d.city} ${d.state}`.toLowerCase().includes(s);
  });

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-sm bg-bone p-5 sm:flex-row">
        <label className="relative block flex-1">
          <span className="sr-only">Search by city or dealer name</span>
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by city or dealer name"
            className="min-h-12 w-full rounded-sm border border-sand bg-paper pl-11 pr-4 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"
          />
        </label>
        <label className="relative block sm:w-64">
          <span className="sr-only">Filter by state</span>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="min-h-12 w-full appearance-none rounded-sm border border-sand bg-paper pl-4 pr-10 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"
          >
            <option value="all">All states</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Icon name="chevron" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
        </label>
      </div>

      {results.length ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {results.map((d) => (
            <li key={`${d.name}-${d.city}`} className="rounded-sm border border-sand bg-paper p-7">
              <p className="eyebrow text-honey-ink">{d.type}</p>
              <h3 className="text-display-sm mt-3">{d.name}</h3>
              <p className="mt-3 flex items-start gap-2 text-sm text-stone">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                {d.address ? `${d.address}, ` : ''}
                {d.city}, {d.state}
              </p>
              {d.phone && (
                <a href={`tel:${d.phone.replace(/\s/g, '')}`} className="mt-2 flex items-center gap-2 text-sm text-forest hover:underline">
                  <Icon name="phone" className="h-4 w-4 text-moss" /> {d.phone}
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 grid items-center gap-8 rounded-sm border border-dashed border-forest/25 p-8 md:grid-cols-[auto_1fr_auto] lg:p-12" aria-live="polite">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-bone text-forest">
            <Icon name="map" className="h-7 w-7" />
          </span>
          <div>
            <p className="font-display text-2xl text-forest">{dealers.length ? 'No dealers match your search.' : 'Our dealer directory is being updated.'}</p>
            <p className="mt-2 max-w-xl text-stone">
              Tell us your city and requirement, and we will connect you with the nearest authorised Umeka dealer or supply you directly.
            </p>
          </div>
          <ButtonLink href="/enquiry/?type=product" variant="primary" arrow>
            Find my nearest dealer
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
