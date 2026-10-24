/**
 * COMPANY STORY, STRENGTHS, QUALITY PROCESS, DOWNLOADS, TESTIMONIALS, FAQs
 * --------------------------------------------------------------------------
 * Items with `verified: false` or `file: null` render with a visible
 * "To be confirmed" / "Coming soon" marker. Do not mark anything verified
 * until it can be documented.
 */

export type Milestone = { year: string; title: string; text: string; verified: boolean };

export const timeline: Milestone[] = [
  {
    year: '1998',
    title: 'The journey begins as Jyoti Enterprise',
    text: 'Our story starts in the plywood and timber trade, built on fair dealing, personal relationships and a commitment to supplying material people could depend on.',
    verified: true,
  },
  {
    year: '2000s',
    title: 'Growing with the trade',
    text: 'Years of working closely with dealers, carpenters and contractors shaped a practical understanding of what makes a panel perform on site.',
    verified: false,
  },
  {
    year: '2010s',
    title: 'Deepening product knowledge',
    text: 'Experience across plywood, block board and flush doors built the expertise in materials, bonding and finishing that Umeka draws on today.',
    verified: false,
  },
  {
    year: 'Today',
    title: 'Umeka Ply — Trusted with Pride',
    text: 'More than two decades of experience come together in Umeka Ply: premium-quality plywood, block board and flush doors, offered at fair and competitive prices.',
    verified: true,
  },
];

export const values = [
  { title: 'Trust', text: 'We say what our products can do — and make sure they do it.' },
  { title: 'Strength', text: 'Panels and doors built for daily use, not just for display.' },
  { title: 'Durability', text: 'Materials chosen and made to last for years in real homes.' },
  { title: 'Quality', text: 'Careful attention from raw material selection to dispatch.' },
  { title: 'Consistency', text: 'The same dependable product, delivery after delivery.' },
  { title: 'Pride', text: 'Our name is on every sheet. We make it worth trusting.' },
];

export type Strength = { title: string; text: string; icon: string; needsConfirmation?: boolean };

export const strengths: Strength[] = [
  { icon: 'layers', title: 'Strong, durable construction', text: 'Cross-laminated and solid-core builds made to handle everyday loads.' },
  { icon: 'leaf', title: 'Carefully selected raw materials', text: 'Timber and veneers chosen for strength, stability and a clean finish.' },
  { icon: 'check', title: 'Consistent quality', text: 'Checked at every stage so each delivery matches the last.' },
  { icon: 'cog', title: 'Advanced manufacturing', text: 'Modern pressing and finishing for flat, even, well-bonded panels.', needsConfirmation: true },
  { icon: 'drop', title: 'Moisture resistance', text: 'Grades designed for dry interiors, humid kitchens and wet areas.', needsConfirmation: true },
  { icon: 'shield', title: 'Borer & termite protection', text: 'Treatment intended to protect against wood-boring insects.', needsConfirmation: true },
  { icon: 'link', title: 'Reliable bonding', text: 'Resin systems selected to keep layers firmly bonded for the long term.', needsConfirmation: true },
  { icon: 'surface', title: 'Smooth, finished surfaces', text: 'Sanded faces that take laminate, veneer and polish evenly.' },
  { icon: 'handshake', title: 'Dealer support', text: 'Responsive service, product guidance and dependable supply for partners.' },
  { icon: 'value', title: 'Value for money', text: 'Premium quality offered at fair, competitive prices.' },
];

export const qualitySteps = [
  { step: '01', title: 'Raw material selection', text: 'Timber and veneers are selected and inspected for quality, grain and soundness before production begins.', image: 'texture-ply-edge' },
  { step: '02', title: 'Conditioning & preparation', text: 'Veneers are dried and prepared to a controlled moisture level so they bond well and stay stable.', image: 'product-plywood' },
  { step: '03', title: 'Resin application & lay-up', text: 'Resin suited to each grade is applied evenly and layers are assembled with alternating grain direction.', image: 'product-blockboard' },
  { step: '04', title: 'Hot pressing', text: 'Assembled panels are pressed under heat and pressure to form a strong, uniform bond across the sheet.', image: 'quality-factory' },
  { step: '05', title: 'Sanding & calibration', text: 'Faces are sanded smooth and panels are finished to an even thickness for clean joinery.', image: 'plywood-panelling-tv' },
  { step: '06', title: 'Inspection & dispatch', text: 'Finished products are checked for dimensions, surface and edges before they are packed and dispatched.', image: 'quality-factory' },
];

export const qualityChecks = [
  'Raw material inspection',
  'Moisture content checks',
  'Bond quality checks',
  'Thickness & dimension checks',
  'Surface & edge inspection',
  'Final visual inspection before dispatch',
];

export type Download = {
  id: string;
  title: string;
  description: string;
  type: 'Catalogue' | 'Technical Sheet' | 'Certificate' | 'Warranty' | 'Guide';
  /** Path under /public, e.g. '/downloads/umeka-catalogue.pdf'. null = not yet available. */
  file: string | null;
  size?: string;
};

export const downloads: Download[] = [
  { id: 'product-catalogue', title: 'Umeka Product Catalogue', description: 'The complete Umeka range of plywood, block board and flush doors.', type: 'Catalogue', file: null },
  { id: 'plywood-technical-sheet', title: 'Plywood Technical Data Sheet', description: 'Grades, sizes, thicknesses and technical values for Umeka plywood.', type: 'Technical Sheet', file: null },
  { id: 'block-board-technical-sheet', title: 'Block Board Technical Data Sheet', description: 'Construction, sizes and technical values for Umeka block board.', type: 'Technical Sheet', file: null },
  { id: 'flush-door-technical-sheet', title: 'Flush Door Technical Data Sheet', description: 'Construction, sizes and finishing guidance for Umeka flush doors.', type: 'Technical Sheet', file: null },
  { id: 'certificates', title: 'Certificates & Licences', description: 'Standards certificates and licences issued to Umeka.', type: 'Certificate', file: null },
  { id: 'warranty-terms', title: 'Warranty Terms', description: 'Coverage, duration and how to make a claim.', type: 'Warranty', file: null },
  { id: 'care-guide', title: 'Installation & Care Guide', description: 'Handling, installation and care advice for longer life.', type: 'Guide', file: null },
];

export const getDownload = (id: string) => downloads.find((d) => d.id === id);

export type Testimonial = { quote: string | null; name: string | null; role: string | null; city: string | null };

/** Replace with genuine, permission-cleared testimonials. Never invent quotes. */
export const testimonials: Testimonial[] = [
  { quote: null, name: null, role: 'Interior Designer', city: null },
  { quote: null, name: null, role: 'Carpenter / Contractor', city: null },
  { quote: null, name: null, role: 'Dealer Partner', city: null },
];

export const faqs = [
  {
    q: 'Which products does Umeka make?',
    a: 'Umeka Ply offers plywood, block board and flush doors for residential, commercial and project use. Visit the Products section to explore the range.',
  },
  {
    q: 'Which plywood grade should I use in a kitchen?',
    a: 'For kitchens, a boiling-water-resistant (BWR) grade is a sensible minimum, and a boiling-waterproof (BWP) grade is recommended for sink units and areas exposed to water. Our team can help you choose.',
  },
  {
    q: 'What is the difference between plywood and block board?',
    a: 'Plywood is made from cross-laminated veneers and has balanced strength in both directions, making it ideal for cabinets and carcasses. Block board has a solid wood-strip core that is very stiff along its length, making it ideal for long shelves, tables and partitions.',
  },
  {
    q: 'Where can I buy Umeka products?',
    a: 'Umeka products are available through our dealer and distributor network. Use the Dealer Network page or send us an enquiry and we will connect you with the nearest dealer.',
  },
  {
    q: 'Can I become an Umeka dealer or distributor?',
    a: 'Yes. We are expanding our network and welcome enquiries from plywood, hardware, timber and interior-material businesses. Apply through the Become a Dealer page.',
  },
  {
    q: 'Do Umeka products come with a warranty?',
    a: 'Warranty details are being finalised and will be published on this website. Please contact us for current information.',
  },
];
