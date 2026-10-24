import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { PlyLines } from '@/components/ui/PlyLines';
import { site } from '@/content/site';

/** Closing enquiry band: "Build with Strength. Choose with Pride." */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="grain relative overflow-hidden bg-forest text-bone">
      <div className="container-x relative py-24 text-center lg:py-36">
        <PlyLines className="mx-auto mb-10 w-24 text-honey-light/70" count={6} />
        <Reveal>
          <h2 id="final-cta-title" className="text-display-xl mx-auto max-w-5xl !text-bone">
            Build with Strength. <em className="font-normal text-honey-light">Choose with Pride.</em>
          </h2>
          <p className="text-lede mx-auto mt-7 max-w-2xl text-bone/75">
            Tell us about your project, ask for a product recommendation or explore a dealership. Our team will get back to you promptly.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-12 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/enquiry/?type=product" variant="gold" size="lg" arrow>
            Product Enquiry
          </ButtonLink>
          <ButtonLink href="/become-a-dealer/" variant="outline-light" size="lg">
            Dealership Enquiry
          </ButtonLink>
          <ButtonLink href="/contact/" variant="outline-light" size="lg">
            Contact Umeka
          </ButtonLink>
        </Reveal>
        <Reveal delay={250} className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-bone/70">
          <a href={site.contact.phoneHref} className="hover:text-honey-light">{site.contact.phoneDisplay}</a>
          <span aria-hidden="true" className="hidden h-1 w-1 rotate-45 bg-honey sm:block" />
          <a href={`mailto:${site.contact.email}`} className="hover:text-honey-light">{site.contact.email}</a>
        </Reveal>
      </div>
    </section>
  );
}
