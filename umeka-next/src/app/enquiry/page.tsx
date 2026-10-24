import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EnquiryTabs } from '@/components/forms/EnquiryTabs';
import { Icon } from '@/components/ui/Icon';
import { PlyLines } from '@/components/ui/PlyLines';
import { site, whatsappLink } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Send an Enquiry',
  description: 'Send a product, general or dealership enquiry to Umeka Ply. Our team will respond promptly with recommendations, pricing or partnership details.',
  path: '/enquiry/',
});

export default function EnquiryPage() {
  return (
    <section className="bg-bone">
      <div className="container-x grid gap-14 pt-10 pb-20 md:pt-14 lg:grid-cols-12 lg:gap-20 lg:pb-28">
        <aside className="lg:col-span-4">
          <Breadcrumbs items={[{ name: 'Send an Enquiry', href: '/enquiry/' }]} />
          <p className="eyebrow mt-10 flex items-center gap-3 text-honey-ink">
            <span aria-hidden="true" className="h-px w-8 bg-honey" />
            Enquiry
          </p>
          <h1 className="text-display-xl mt-5">How can we help?</h1>
          <p className="text-lede mt-6 text-stone">Choose the type of enquiry and share a few details. The right person in our team will get back to you.</p>
          <div className="mt-12 rounded-sm bg-forest p-8 text-bone">
            <PlyLines className="mb-6 w-16 text-honey-light/70" count={5} />
            <p className="font-display text-2xl">Prefer a quick conversation?</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href={site.contact.phoneHref} className="flex items-center gap-3 hover:text-honey-light">
                  <Icon name="phone" className="h-5 w-5 text-honey-light" /> {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-honey-light">
                  <Icon name="whatsapp" className="h-5 w-5 text-honey-light" /> WhatsApp our team
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 break-all hover:text-honey-light">
                  <Icon name="mail" className="h-5 w-5 shrink-0 text-honey-light" /> {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div className="rounded-sm bg-paper p-6 shadow-[0_30px_80px_-50px_rgba(5,55,51,0.5)] sm:p-10 lg:col-span-8">
          <EnquiryTabs />
        </div>
      </div>
    </section>
  );
}
