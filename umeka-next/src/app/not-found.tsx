import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { PlyLines } from '@/components/ui/PlyLines';
import { mainNav } from '@/content/site';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  const links = mainNav.filter((n) => !n.children).slice(0, 5);
  return (
    <section className="grain relative overflow-hidden bg-forest text-bone">
      <div className="container-x flex min-h-[75vh] flex-col justify-center py-24">
        <PlyLines className="mb-10 w-24 text-honey-light/70" count={6} animate />
        <p className="eyebrow text-honey-light">Error 404</p>
        <h1 className="text-display-xl mt-5 max-w-3xl !text-bone">This page seems to have come unglued.</h1>
        <p className="text-lede mt-6 max-w-xl text-bone/75">The page you are looking for may have moved or no longer exists. Let&rsquo;s get you back on solid ground.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="gold" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/products/" variant="outline-light">
            Explore products
          </ButtonLink>
        </div>
        <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-bone/10 pt-8 text-sm text-bone/70">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-honey-light">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[38vw] leading-none text-bone/[0.04]">
        404
      </p>
    </section>
  );
}
