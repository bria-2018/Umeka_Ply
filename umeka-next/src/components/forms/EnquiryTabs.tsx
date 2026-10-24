'use client';

import { useEffect, useState } from 'react';
import { EnquiryForm } from './EnquiryForm';
import { generalFields, productFields, dealerFields, productOptions } from '@/content/forms';
import { products } from '@/content/products';

const tabs = [
  { id: 'product', label: 'Product Enquiry', hint: 'Prices, availability and recommendations', fields: productFields },
  { id: 'general', label: 'General Enquiry', hint: 'Questions, feedback or anything else', fields: generalFields },
  { id: 'dealer', label: 'Dealer / Distributor', hint: 'Partner with Umeka in your region', fields: dealerFields },
] as const;

type TabId = (typeof tabs)[number]['id'];

/** Tabbed enquiry hub. Supports ?type=product|general|dealer and ?product=<slug>. */
export function EnquiryTabs({ initial = 'product' }: { initial?: TabId }) {
  const [active, setActive] = useState<TabId>(initial);
  const [productDefault, setProductDefault] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('type');
    if (t === 'product' || t === 'general' || t === 'dealer') setActive(t);
    const slug = params.get('product');
    if (slug) {
      const p = products.find((x) => x.slug === slug);
      const option = p && productOptions.find((o) => o.startsWith(p.name));
      if (option) {
        setProductDefault(option);
        setActive('product');
      }
    }
  }, []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
    else return;
    e.preventDefault();
    setActive(tabs[n].id);
    document.getElementById(`tab-${tabs[n].id}`)?.focus();
  };

  const current = tabs.find((t) => t.id === active)!;

  return (
    <div>
      <div role="tablist" aria-label="Enquiry type" className="grid gap-2 sm:grid-cols-3">
        {tabs.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`rounded-sm border px-5 py-4 text-left transition-all duration-300 ${
                selected ? 'border-forest bg-forest text-bone shadow-lg' : 'border-sand bg-paper text-charcoal hover:border-forest/40'
              }`}
            >
              <span className="block font-medium">{t.label}</span>
              <span className={`mt-1 block text-[0.8rem] ${selected ? 'text-bone/70' : 'text-stone'}`}>{t.hint}</span>
            </button>
          );
        })}
      </div>
      <div id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} className="mt-10">
        <EnquiryForm
          key={`${current.id}-${productDefault}`}
          formType={current.id}
          fields={[...current.fields]}
          defaults={current.id === 'product' && productDefault ? { product: productDefault } : {}}
          submitLabel={current.id === 'dealer' ? 'Submit Application' : 'Send Enquiry'}
        />
      </div>
    </div>
  );
}
