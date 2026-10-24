import Link from 'next/link';
import { footerNav, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { Tbc } from '@/components/ui/Tbc';
import { PlyLines } from '@/components/ui/PlyLines';

export function Footer() {
  const year = new Date().getFullYear();
  const socials = site.social.filter((s) => s.url);
  const office = site.addresses[0];

  return (
    <footer className="grain relative overflow-hidden bg-forest-950 text-bone/75">
      <div className="container-x pt-20 pb-10 lg:pt-28">
        {/* Top band */}
        <div className="grid gap-12 border-b border-bone/10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src="/brand/umeka-logo-white.png" alt={`${site.name} — ${site.tagline}`} width={1480} height={350} loading="lazy" className="h-12 w-auto" />
            <p className="mt-7 max-w-md leading-relaxed">
              Plywood, block board and flush doors made for strength, durability and dependable everyday performance. A journey that began in {site.journeyStartYear},
              built on trust and carried forward with pride.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {socials.length ? (
                socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 transition-colors hover:border-honey-light hover:text-honey-light"
                  >
                    <Icon name={s.id} className="h-[18px] w-[18px]" />
                    <span className="sr-only">{s.label}</span>
                  </a>
                ))
              ) : (
                <span className="flex items-center gap-3 text-sm">
                  {site.social.map((s) => (
                    <span key={s.id} title={`${s.label} — link to be added`} className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-bone/20 text-bone/40">
                      <Icon name={s.id} className="h-[18px] w-[18px]" />
                      <span className="sr-only">{s.label} (coming soon)</span>
                    </span>
                  ))}
                  <Tbc label="Social links pending" tone="dark" />
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {(
              [
                ['Products', footerNav.products],
                ['Company', footerNav.company],
                ['Support', footerNav.support],
              ] as const
            ).map(([title, links]) => (
              <div key={title}>
                <h2 className="eyebrow !font-sans !text-honey-light">{title}</h2>
                <ul className="mt-6 space-y-3">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="transition-colors hover:text-bone">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact band */}
        <div className="grid gap-10 border-b border-bone/10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow text-honey-light">Call / WhatsApp</p>
            <a href={site.contact.phoneHref} className="mt-4 block font-display text-2xl text-bone transition-colors hover:text-honey-light">
              {site.contact.phoneDisplay}
            </a>
          </div>
          <div>
            <p className="eyebrow text-honey-light">Email</p>
            <a href={`mailto:${site.contact.email}`} className="mt-4 block break-all font-display text-2xl text-bone transition-colors hover:text-honey-light">
              {site.contact.email}
            </a>
          </div>
          <div>
            <p className="eyebrow text-honey-light">{office.label}</p>
            <address className="mt-4 not-italic leading-relaxed">
              {office.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
          </div>
          <div>
            <p className="eyebrow text-honey-light">Dealer enquiries</p>
            <p className="mt-4 leading-relaxed">Grow your business with a brand built on trust.</p>
            <Link href="/become-a-dealer/" className="mt-3 inline-flex items-center gap-2 font-medium text-bone underline-offset-4 hover:text-honey-light hover:underline">
              Become a dealer <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-6 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName ?? site.name}. All rights reserved.
            {!site.legalName && <Tbc label="Legal entity name pending" tone="dark" className="ml-3 align-middle" />}
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/sitemap.xml" className="transition-colors hover:text-bone">Sitemap</a>
            </li>
          </ul>
        </div>
      </div>
      <PlyLines className="pointer-events-none absolute -right-10 top-24 hidden w-72 text-bone/[0.06] lg:flex" count={14} />
      <p aria-hidden="true" className="pointer-events-none select-none overflow-hidden whitespace-nowrap pb-4 text-center font-display text-[18vw] leading-none text-bone/[0.035]">
        Trusted with Pride
      </p>
    </footer>
  );
}
