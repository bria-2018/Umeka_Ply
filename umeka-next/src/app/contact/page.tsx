import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Icon } from '@/components/ui/Icon';
import { Tbc } from '@/components/ui/Tbc';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { generalFields } from '@/content/forms';
import { site, whatsappLink } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description: `Contact Umeka Ply in Ahmedabad, Gujarat. Call or WhatsApp ${site.contact.phoneDisplay}, email ${site.contact.email}, or send an enquiry online.`,
  path: '/contact/',
});

export default function ContactPage() {
  const quick = [
    { icon: 'phone', label: 'Call us', value: site.contact.phoneDisplay, href: site.contact.phoneHref },
    { icon: 'whatsapp', label: 'WhatsApp', value: 'Chat with our team', href: whatsappLink() },
    { icon: 'mail', label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Contact', href: '/contact/' }]}
        eyebrow="Contact Us"
        title="Let’s talk about your project."
        lede="Whether you need a product recommendation, a quotation or dealership information, our team is ready to help."
      >
        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {quick.map((q) => (
            <li key={q.label}>
              <a
                href={q.href}
                {...(q.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full items-center gap-4 rounded-sm bg-paper p-5 transition-shadow hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-honey-light transition-colors group-hover:bg-honey group-hover:text-forest-950">
                  <Icon name={q.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.16em] text-stone-light">{q.label}</span>
                  <span className="block truncate font-medium text-forest">{q.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section aria-labelledby="form-title" className="section-y bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-4">
            <SectionHeading eyebrow="Visit us" title={<span id="addr-title">Our locations</span>} size="md" />
            {site.addresses.map((a) => (
              <div key={a.id} className="border-t border-sand pt-6">
                <p className="eyebrow flex items-center gap-3 text-honey-ink">{a.label}</p>
                <address className="mt-3 not-italic leading-relaxed text-charcoal">
                  {a.lines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>
                {!a.verified && <Tbc label="Unit details to confirm" className="mt-3" />}
                <a href={a.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest hover:underline">
                  <Icon name="pin" className="h-4 w-4" /> Open in Google Maps
                </a>
              </div>
            ))}
            <div className="border-t border-sand pt-6">
              <p className="eyebrow text-honey-ink">Business hours</p>
              {site.contact.hours ? <p className="mt-3">{site.contact.hours}</p> : <Tbc className="mt-3" />}
            </div>
          </div>
          <div className="rounded-sm border border-sand bg-paper p-6 shadow-[0_30px_80px_-50px_rgba(5,55,51,0.5)] sm:p-10 lg:col-span-8">
            <h2 id="form-title" className="text-display-md">Send us a message</h2>
            <p className="mt-3 mb-8 text-stone">We usually respond within one working day.</p>
            <EnquiryForm formType="general" fields={generalFields} />
          </div>
        </div>
      </section>

      <section aria-label="Map" className="bg-bone">
        <div className="container-x py-16">
          <div className="relative overflow-hidden rounded-sm border border-sand">
            <iframe
              title="Umeka Ply office location map"
              src="https://www.google.com/maps?q=Highway+Estate,+Sarkhej-Sanand+Road,+Sarkhej,+Ahmedabad&output=embed"
              className="block h-[420px] w-full grayscale-[30%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
