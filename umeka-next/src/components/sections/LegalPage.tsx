import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PlaceholderNote } from '@/components/ui/Tbc';

/** Shared layout for long-form legal pages. */
export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="bg-bone">
        <div className="container-x pt-10 pb-14 md:pt-14">
          <Breadcrumbs items={[{ name: title, href: path }]} />
          <h1 className="text-display-xl mt-10">{title}</h1>
          <p className="mt-4 text-sm text-stone-light">Last updated: {updated}</p>
        </div>
      </section>
      <section className="bg-paper">
        <div className="container-x py-16 lg:py-24">
          <PlaceholderNote className="mx-auto mb-12 max-w-[72ch]">
            This is a starter policy written for the Umeka website. It must be reviewed by a qualified legal adviser and updated with Umeka&rsquo;s registered legal
            entity name and address before launch.
          </PlaceholderNote>
          <div className="prose-umeka mx-auto">{children}</div>
        </div>
      </section>
    </>
  );
}
