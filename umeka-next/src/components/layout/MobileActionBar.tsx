import Link from 'next/link';
import { site, whatsappLink } from '@/content/site';
import { Icon } from '@/components/ui/Icon';

/** Persistent quick-action bar on phones: Call · WhatsApp · Enquire. */
export function MobileActionBar() {
  const item = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[0.72rem] font-medium tracking-wide';
  return (
    <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 flex border-t border-bone/10 bg-forest text-bone pb-[env(safe-area-inset-bottom)] md:hidden">
      <a href={site.contact.phoneHref} className={item}>
        <Icon name="phone" className="h-5 w-5 text-honey-light" />
        Call
      </a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${item} border-x border-bone/10`}>
        <Icon name="whatsapp" className="h-5 w-5 text-honey-light" />
        WhatsApp
      </a>
      <Link href="/enquiry/" className={`${item} bg-honey text-forest-950`}>
        <Icon name="mail" className="h-5 w-5" />
        Enquire
      </Link>
    </nav>
  );
}
