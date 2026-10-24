import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using the Umeka Ply website.',
  path: '/terms-and-conditions/',
});

export default function TermsPage() {
  const owner = site.legalName ?? site.name;
  return (
    <LegalPage title="Terms & Conditions" path="/terms-and-conditions/" updated="October 2026">
      <p>
        These terms govern your use of the {site.name} website. By accessing or using the website, you agree to these terms. If you do not agree, please do not use
        the website.
      </p>
      <h2>Website content</h2>
      <p>
        The content on this website is provided for general information about {owner} and its products. While we aim to keep information accurate and up to date,
        product details, specifications, availability and images may change without notice. Images may be illustrative and finished products can vary in colour,
        grain and appearance.
      </p>
      <h2>Product information and suitability</h2>
      <p>
        Guidance on this website, including articles in the Knowledge Centre, is general in nature. Please confirm the suitability of any product for your specific
        application with our team or a qualified professional before purchase or installation.
      </p>
      <h2>Quotations, orders and warranty</h2>
      <p>
        Prices, quotations, orders, delivery and warranty are governed by the specific terms agreed at the time of sale with Umeka or its authorised dealer. Any
        warranty applies only as stated in Umeka&rsquo;s published warranty terms.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The Umeka name, logo, website design, text and images are the property of {owner} or its licensors and may not be copied, reproduced or used without prior
        written permission.
      </p>
      <h2>Acceptable use</h2>
      <ul>
        <li>Do not use the website for any unlawful purpose or to submit false or misleading information.</li>
        <li>Do not attempt to gain unauthorised access to the website or interfere with its operation.</li>
        <li>Do not use automated systems to submit forms or collect data from the website.</li>
      </ul>
      <h2>Third-party links</h2>
      <p>The website may link to third-party websites such as maps and messaging services. We are not responsible for the content or practices of those websites.</p>
      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {owner} is not liable for any loss arising from the use of, or reliance on, information on this website.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Courts in Ahmedabad, Gujarat shall have jurisdiction, subject to legal review.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
