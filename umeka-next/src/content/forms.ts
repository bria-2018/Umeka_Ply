import type { FieldDef } from '@/lib/forms';
import { products, categories } from './products';
import { applications } from './applications';

/** Field definitions for the three lead-generation forms. */

export const enquiryTypes = [
  'Product information',
  'Price / quotation',
  'Dealer or distributor enquiry',
  'Project or bulk supply',
  'Feedback',
  'Other',
];

export const generalFields: FieldDef[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name', placeholder: 'Your name' },
  { name: 'company', label: 'Company name', type: 'text', autoComplete: 'organization', placeholder: 'Optional' },
  { name: 'phone', label: 'Phone number', type: 'tel', required: true, autoComplete: 'tel', placeholder: '98765 43210' },
  { name: 'email', label: 'Email address', type: 'email', required: true, autoComplete: 'email', placeholder: 'name@company.com' },
  { name: 'city', label: 'City', type: 'text', required: true, autoComplete: 'address-level2', placeholder: 'e.g. Ahmedabad' },
  { name: 'enquiryType', label: 'Enquiry type', type: 'select', required: true, options: enquiryTypes },
  { name: 'message', label: 'Message', type: 'textarea', required: true, wide: true, maxLength: 2000, placeholder: 'Tell us how we can help' },
];

export const productOptions = [
  ...categories.flatMap((c) => products.filter((p) => p.category === c.slug).map((p) => `${p.name} (${c.name})`)),
  'Not sure — please advise',
];

export const productFields: FieldDef[] = [
  { name: 'product', label: 'Product', type: 'select', required: true, options: productOptions, wide: true },
  { name: 'quantity', label: 'Required quantity', type: 'text', required: true, placeholder: 'e.g. 50 sheets, 12 doors' },
  { name: 'application', label: 'Application', type: 'select', required: true, options: [...applications.map((a) => a.name), 'Other'] },
  { name: 'location', label: 'Project location', type: 'text', required: true, autoComplete: 'address-level2', placeholder: 'City / area' },
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name', placeholder: 'Your name' },
  { name: 'phone', label: 'Phone number', type: 'tel', required: true, autoComplete: 'tel', placeholder: '98765 43210' },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', placeholder: 'Optional' },
  { name: 'message', label: 'Message', type: 'textarea', wide: true, maxLength: 2000, placeholder: 'Thickness, timeline or any other details (optional)' },
];

export const dealerFields: FieldDef[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name', placeholder: 'Your name' },
  { name: 'businessName', label: 'Business name', type: 'text', required: true, autoComplete: 'organization', placeholder: 'Registered business name' },
  { name: 'phone', label: 'Phone number', type: 'tel', required: true, autoComplete: 'tel', placeholder: '98765 43210' },
  { name: 'email', label: 'Email address', type: 'email', required: true, autoComplete: 'email', placeholder: 'name@business.com' },
  { name: 'cityState', label: 'City and state', type: 'text', required: true, placeholder: 'e.g. Rajkot, Gujarat' },
  {
    name: 'businessCategory',
    label: 'Current business category',
    type: 'select',
    required: true,
    options: ['Plywood & laminates', 'Hardware & fittings', 'Timber merchant', 'Interior materials', 'Building materials', 'Furniture manufacturing', 'New business', 'Other'],
  },
  { name: 'yearsInBusiness', label: 'Years in business', type: 'select', required: true, options: ['Starting new', 'Less than 2 years', '2–5 years', '5–10 years', 'More than 10 years'] },
  { name: 'areaOfInterest', label: 'Area of interest', type: 'select', required: true, options: ['Dealership', 'Distributorship', 'Project supply partner', 'Not sure yet'] },
  { name: 'message', label: 'Message', type: 'textarea', wide: true, maxLength: 2000, placeholder: 'Your territory, showroom or warehouse, and anything else we should know (optional)' },
];
