'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { mainNav, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { ButtonLink } from '@/components/ui/Button';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Lock scroll + manage focus for the mobile drawer
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (open) {
        setOpen(false);
        menuBtn.current?.focus();
      }
      setOpenMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-forest-950 text-bone/80 lg:block">
        <div className="container-x flex h-10 items-center justify-between text-[0.8rem]">
          <p className="tracking-wide">
            <span className="text-honey-light">Since {site.journeyStartYear}</span>
            <span className="mx-3 text-bone/30">/</span>Plywood · Block Board · Flush Doors
          </p>
          <div className="flex items-center gap-7">
            <a href={site.contact.phoneHref} className="flex items-center gap-2 transition-colors hover:text-honey-light">
              <Icon name="phone" className="h-3.5 w-3.5" /> {site.contact.phoneDisplay}
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 transition-colors hover:text-honey-light">
              <Icon name="mail" className="h-3.5 w-3.5" /> {site.contact.email}
            </a>
            <Link href="/become-a-dealer/" className="text-honey-light transition-colors hover:text-bone">
              Become a Dealer →
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)] ${
          scrolled ? 'bg-paper/90 shadow-[0_12px_40px_-24px_rgba(5,55,51,0.45)] backdrop-blur-xl' : 'bg-paper'
        }`}
      >
        <div className={`container-x flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? 'h-16' : 'h-20 lg:h-24'}`}>
          <Link href="/" className="relative shrink-0" aria-label={`${site.name} — home`}>
            <img
              src="/brand/umeka-logo-color.png"
              alt={`${site.name} — ${site.tagline}`}
              width={1480}
              height={350}
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-8' : 'h-9 lg:h-11'}`}
            />
          </Link>

          <nav ref={navRef} aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenMenu(item.label)}
                  onMouseLeave={() => item.children && setOpenMenu(null)}
                >
                  {item.children ? (
                    <button
                      type="button"
                      aria-expanded={openMenu === item.label}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      className={`relative flex items-center gap-1.5 px-3.5 py-3 text-[0.92rem] font-medium transition-colors hover:text-forest ${
                        isActive(item.href) ? 'text-forest' : 'text-charcoal/80'
                      }`}
                    >
                      {item.label}
                      <Icon name="chevron" className={`h-3.5 w-3.5 transition-transform duration-300 ${openMenu === item.label ? 'rotate-180' : ''}`} />
                      {isActive(item.href) && <span className="absolute inset-x-3.5 bottom-1.5 h-px bg-honey" />}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`relative block px-3.5 py-3 text-[0.92rem] font-medium transition-colors hover:text-forest ${
                        isActive(item.href) ? 'text-forest' : 'text-charcoal/80'
                      }`}
                    >
                      {item.label}
                      {isActive(item.href) && <span className="absolute inset-x-3.5 bottom-1.5 h-px bg-honey" />}
                    </Link>
                  )}

                  {item.children && (
                    <div
                      className={`absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3 transition-all duration-300 ease-[var(--ease-out-expo)] ${
                        openMenu === item.label ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                      }`}
                    >
                      <ul className="overflow-hidden rounded-sm border border-sand bg-paper p-2 shadow-[0_30px_60px_-30px_rgba(5,55,51,0.45)]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="group/item flex items-start gap-3 rounded-sm px-4 py-3.5 transition-colors hover:bg-bone focus-visible:bg-bone"
                            >
                              <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-honey transition-all duration-300 group-hover/item:w-6" />
                              <span>
                                <span className="block font-medium text-forest">{child.label}</span>
                                {child.description && <span className="mt-0.5 block text-[0.82rem] leading-snug text-stone">{child.description}</span>}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <ButtonLink href="/enquiry/" variant="primary" size="sm">
                Send an Enquiry
              </ButtonLink>
            </span>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-forest/15 text-forest transition-colors hover:bg-bone xl:hidden"
            >
              <Icon name="menu" className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] xl:hidden ${open ? 'visible' : 'invisible'}`}
      >
        <div
          className={`absolute inset-0 bg-forest-950/50 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-forest text-bone transition-transform duration-500 ease-[var(--ease-out-expo)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-bone/10 px-6">
            <img src="/brand/umeka-logo-white.png" alt={site.name} width={1480} height={350} className="h-8 w-auto" />
            <button
              ref={closeBtn}
              type="button"
              onClick={() => {
                setOpen(false);
                menuBtn.current?.focus();
              }}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-bone/20"
            >
              <Icon name="close" className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="divide-y divide-bone/10">
              {mainNav.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileSub === item.label}
                        onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                        className="flex w-full items-center justify-between py-4 text-left font-display text-2xl"
                      >
                        {item.label}
                        <Icon name="chevron" className={`h-5 w-5 transition-transform ${mobileSub === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`grid overflow-hidden transition-all duration-500 ${mobileSub === item.label ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'}`}>
                        <ul className="min-h-0">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                tabIndex={mobileSub === item.label ? 0 : -1}
                                className="flex items-center gap-3 py-2.5 text-bone/80 hover:text-honey-light"
                              >
                                <span aria-hidden="true" className="h-px w-4 bg-honey-light" />
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="block py-4 font-display text-2xl">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 border-t border-bone/10 p-6">
            <ButtonLink href="/enquiry/" variant="gold" className="w-full">
              Send an Enquiry
            </ButtonLink>
            <div className="grid grid-cols-2 gap-3">
              <ButtonLink href={site.contact.phoneHref} variant="outline-light" size="sm" icon="phone">
                Call
              </ButtonLink>
              <ButtonLink href={`https://wa.me/${site.contact.whatsappNumber}`} variant="outline-light" size="sm" icon="whatsapp">
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
