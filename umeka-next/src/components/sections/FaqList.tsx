import { JsonLd } from '@/components/ui/JsonLd';
import { faqSchema } from '@/lib/schema';
import { Icon } from '@/components/ui/Icon';

/** Accessible accordion FAQ (native <details>) with FAQPage schema. */
export function FaqList({ items, schema = true }: { items: { q: string; a: string }[]; schema?: boolean }) {
  return (
    <div>
      {schema && <JsonLd data={faqSchema(items)} />}
      <ul className="border-t border-sand">
        {items.map((f) => (
          <li key={f.q} className="border-b border-sand">
            <details className="group">
              <summary className="flex items-center justify-between gap-6 py-6 text-left">
                <span className="font-display text-[1.35rem] leading-snug text-forest">{f.q}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest/15 text-forest transition-all duration-300 group-open:rotate-45 group-open:bg-forest group-open:text-bone">
                  <Icon name="close" className="h-4 w-4 rotate-45" />
                </span>
              </summary>
              <p className="max-w-3xl pb-7 pr-12 leading-relaxed text-stone">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
