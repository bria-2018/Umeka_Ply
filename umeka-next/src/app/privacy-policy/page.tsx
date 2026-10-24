import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How Umeka Ply collects, uses and protects personal information shared through this website.',
  path: '/privacy-policy/',
});

export default function PrivacyPage() {
  const owner = site.legalName ?? `${site.name} ("Umeka", "we", "us")`;
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/" updated="October 2026">
      <p>
        This Privacy Policy explains how {owner} collects, uses and protects the personal information you share when you use this website or contact us. By using
        the website, you agree to the practices described here.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Details you provide in enquiry, product or dealer forms — such as your name, company, phone number, email address, city and message.</li>
        <li>Information you share when you call, email or message us on WhatsApp.</li>
        <li>Basic technical information collected automatically, such as browser type, device, pages visited and approximate location, if analytics is enabled.</li>
      </ul>
      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiries and provide product information, quotations or recommendations.</li>
        <li>To assess and process dealer and distributor applications.</li>
        <li>To connect you with an authorised Umeka dealer in your area, where relevant.</li>
        <li>To improve our website, products and services.</li>
        <li>To meet legal and regulatory obligations.</li>
      </ul>
      <p>We do not sell your personal information. We will only send you marketing communication where you have agreed to receive it, and you can opt out at any time.</p>
      <h2>Sharing your information</h2>
      <p>
        We may share your information with authorised Umeka dealers or distributors to fulfil your enquiry, and with trusted service providers (such as website
        hosting, form processing and analytics providers) who help us run our business. These parties may only use your information for the purposes we specify.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        This website may use cookies and analytics tools to understand how visitors use the site. You can control cookies through your browser settings. Disabling
        cookies will not prevent you from using the main features of the site.
      </p>
      <h2>Data security and retention</h2>
      <p>
        We take reasonable technical and organisational measures to protect your information. We keep personal information only for as long as needed for the
        purposes described in this policy or as required by law.
      </p>
      <h2>Your choices</h2>
      <p>
        You may ask us to access, correct or delete the personal information we hold about you, or to stop contacting you, by writing to{' '}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
      <h2>Contact</h2>
      <p>
        For any questions about this policy, please contact us at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call{' '}
        <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>.
      </p>
    </LegalPage>
  );
}
