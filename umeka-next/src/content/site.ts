/**
 * CENTRAL SITE CONFIGURATION
 * --------------------------------------------------------------------------
 * Company details, contact information, navigation and social links live
 * here so they can be edited in one place. Anything set to `null` or flagged
 * with `verified: false` is rendered on the site with a visible
 * "To be confirmed" marker until real information is supplied.
 */

export const site = {
  name: 'Umeka Ply',
  shortName: 'Umeka',
  tagline: 'Trusted with Pride',
  legalName: null as string | null, // e.g. "Umeka International Pvt. Ltd." — TO BE CONFIRMED
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.umekainternational.in').replace(/\/$/, ''),
  description:
    'Umeka Ply manufactures plywood, block board and flush doors built for strength, durability and dependable everyday performance. Premium quality at a fair price. Trusted with Pride.',
  journeyStartYear: 1998,
  originalBusinessName: 'Jyoti Enterprise',
  locale: 'en_IN',

  contact: {
    phoneDisplay: '+91 97252 08788',
    phoneHref: 'tel:+919725208788',
    whatsappNumber: '919725208788',
    email: 'info@umekainternational.in',
    hours: null as string | null, // e.g. "Mon–Sat, 10:00 am – 7:00 pm" — TO BE CONFIRMED
  },

  addresses: [
    {
      id: 'office',
      label: 'Corporate & Sales Office',
      lines: ['E-1, Highway Estate, Opp. Kiran Motors Workshop', 'Sarkhej–Sanand Road, Sarkhej', 'Ahmedabad, Gujarat 382210'],
      locality: 'Ahmedabad',
      region: 'Gujarat',
      postalCode: '382210',
      street: 'E-1, Highway Estate, Opp. Kiran Motors Workshop, Sarkhej–Sanand Road, Sarkhej',
      verified: true,
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Highway+Estate+Sarkhej+Sanand+Road+Ahmedabad',
    },
    {
      id: 'plant',
      label: 'Manufacturing Unit',
      lines: ['Survey No. 416, 1 & 2, Village Chopadva', 'Taluka Bhachau, Dist. Kutch', 'Gujarat 370140'],
      locality: 'Bhachau',
      region: 'Gujarat',
      postalCode: '370140',
      street: 'Survey No. 416, 1 & 2, Village Chopadva, Taluka Bhachau',
      // Confirm whether this is Umeka's own unit or a partner unit.
      verified: false,
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chopadva+Bhachau+Kutch',
    },
  ],

  social: [
    { id: 'instagram', label: 'Instagram', url: null as string | null },
    { id: 'facebook', label: 'Facebook', url: null as string | null },
    { id: 'linkedin', label: 'LinkedIn', url: null as string | null },
    { id: 'youtube', label: 'YouTube', url: null as string | null },
  ],
} as const;

export const whatsappLink = (message = 'Hello Umeka, I would like to know more about your products.') =>
  `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const yearsOfJourney = () => new Date().getFullYear() - site.journeyStartYear;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  {
    label: 'Products',
    href: '/products/',
    children: [
      { label: 'Plywood', href: '/products/plywood/', description: 'Cross-laminated panels for furniture, kitchens and interiors.' },
      { label: 'Block Board', href: '/products/block-board/', description: 'Solid-core boards for long shelves, tables and partitions.' },
      { label: 'Flush Doors', href: '/products/flush-doors/', description: 'Flat, stable door shutters ready for any finish.' },
      { label: 'All Products', href: '/products/', description: 'Browse and filter the complete Umeka range.' },
    ],
  },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About Umeka', href: '/about/', description: 'Who we are and what we stand for.' },
      { label: 'Our Journey', href: '/our-journey/', description: 'From Jyoti Enterprise in 1998 to Umeka Ply today.' },
      { label: 'Why Choose Umeka', href: '/why-umeka/', description: 'The strengths behind every sheet and door.' },
      { label: 'Quality & Technology', href: '/quality-technology/', description: 'Materials, bonding, pressing and checks.' },
    ],
  },
  { label: 'Applications', href: '/applications/' },
  {
    label: 'Dealers',
    href: '/dealers/',
    children: [
      { label: 'Dealer Network', href: '/dealers/', description: 'Find an authorised Umeka dealer near you.' },
      { label: 'Become a Dealer', href: '/become-a-dealer/', description: 'Partner with Umeka in your territory.' },
    ],
  },
  { label: 'Knowledge Centre', href: '/knowledge-centre/' },
  { label: 'Downloads', href: '/downloads/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = {
  products: [
    { label: 'Plywood', href: '/products/plywood/' },
    { label: 'Block Board', href: '/products/block-board/' },
    { label: 'Flush Doors', href: '/products/flush-doors/' },
    { label: 'All Products', href: '/products/' },
    { label: 'Applications', href: '/applications/' },
  ],
  company: [
    { label: 'About Umeka', href: '/about/' },
    { label: 'Our Journey', href: '/our-journey/' },
    { label: 'Why Choose Umeka', href: '/why-umeka/' },
    { label: 'Quality & Technology', href: '/quality-technology/' },
    { label: 'Knowledge Centre', href: '/knowledge-centre/' },
  ],
  support: [
    { label: 'Send an Enquiry', href: '/enquiry/' },
    { label: 'Dealer Network', href: '/dealers/' },
    { label: 'Become a Dealer', href: '/become-a-dealer/' },
    { label: 'Downloads', href: '/downloads/' },
    { label: 'Contact Us', href: '/contact/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
  ],
};
