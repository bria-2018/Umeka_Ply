/**
 * PRODUCT CATALOGUE
 * --------------------------------------------------------------------------
 * This file drives the products listing, category pages, product detail
 * pages, the header menu, the sitemap and Product schema markup.
 *
 * IMPORTANT — PLACEHOLDER DATA
 * Product-line names, grades, sizes, thicknesses, technical values,
 * certifications and warranty terms below are NOT confirmed. Any value set
 * to `null` renders as "To be confirmed" on the site. Replace with verified
 * Umeka data before launch. Do not enter figures that cannot be documented.
 *
 * To add a product: copy an entry in `products`, give it a unique `slug`,
 * set its `category`, and fill in the fields. Pages are generated
 * automatically at build time.
 */

export type CategorySlug = 'plywood' | 'block-board' | 'flush-doors';

export type Spec = { label: string; value: string | null; note?: string };

export type Category = {
  slug: CategorySlug;
  name: string;
  singular: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  lifestyleImage: string;
  summary: string;
  intro: string[];
  highlights: { title: string; text: string }[];
  bestFor: string[];
  construction: { name: string; detail: string; tone: string; thickness: number }[];
};

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  /** true while the product-line name is a working placeholder */
  nameIsPlaceholder: boolean;
  grade: string;
  tagline: string;
  intro: string;
  image: string;
  gallery: string[];
  benefits: string[];
  features: { title: string; text: string }[];
  sizes: string[] | null;
  thicknesses: string[] | null;
  specs: Spec[];
  applications: string[];
  certifications: { name: string; document?: string }[] | null;
  warranty: string | null;
  downloads: string[];
  featured?: boolean;
};

export const categories: Category[] = [
  {
    slug: 'plywood',
    name: 'Plywood',
    singular: 'Plywood',
    title: 'Plywood built for furniture, kitchens and interiors',
    metaTitle: 'Plywood | MR, BWR & BWP Grade Plywood',
    metaDescription:
      'Umeka plywood is made from cross-laminated hardwood veneers for strong, stable and smooth panels. Explore grades for interiors, kitchens and moisture-prone areas.',
    image: 'product-plywood',
    lifestyleImage: 'plywood-panelling-tv',
    summary:
      'Cross-laminated hardwood veneers pressed into strong, stable panels with smooth faces — the everyday backbone of wardrobes, kitchens and fine furniture.',
    intro: [
      'Plywood is made by bonding thin wood veneers on top of each other, with the grain of each layer running at right angles to the one beside it. This cross-lamination spreads stress evenly, so the panel resists warping, splitting and bending far better than solid wood of the same thickness.',
      'Umeka plywood is pressed for even thickness and a smooth, ready-to-finish surface, so laminates, veneers and paint sit flat and joints close cleanly on site.',
    ],
    highlights: [
      { title: 'Cross-laminated strength', text: 'Alternating grain directions keep panels flat and strong in both directions.' },
      { title: 'Strong screw holding', text: 'Dense, well-bonded layers grip hinges, channels and fittings firmly.' },
      { title: 'Smooth, even faces', text: 'Sanded surfaces that take laminate, veneer and polish evenly.' },
      { title: 'Grades for every room', text: 'Options for dry interiors and for kitchens, bathrooms and humid areas.' },
    ],
    bestFor: ['Wardrobes', 'Modular kitchens', 'Beds & storage', 'TV units', 'Wall panelling', 'Office furniture'],
    construction: [
      { name: 'Face veneer', detail: 'Smooth, sanded hardwood face', tone: '#d9bf8f', thickness: 1 },
      { name: 'Cross band', detail: 'Grain at 90° for stability', tone: '#c9a46d', thickness: 1 },
      { name: 'Core veneers', detail: 'Bonded, pressed hardwood plies', tone: '#b98f57', thickness: 3 },
      { name: 'Cross band', detail: 'Balances the construction', tone: '#c9a46d', thickness: 1 },
      { name: 'Back veneer', detail: 'Matched to keep the panel flat', tone: '#d9bf8f', thickness: 1 },
    ],
  },
  {
    slug: 'block-board',
    name: 'Block Board',
    singular: 'Block Board',
    title: 'Block board for long spans, tables and partitions',
    metaTitle: 'Block Board | Solid-Core Boards for Shelves & Tables',
    metaDescription:
      'Umeka block board combines a solid wood-strip core with veneer faces for rigid, lighter panels that resist sagging. Ideal for long shelves, tables, doors and partitions.',
    image: 'product-blockboard',
    lifestyleImage: 'blockboard-cafe-tables',
    summary:
      'A core of solid wood strips between veneer faces — rigid, lighter for its size and made for wide surfaces that must stay straight.',
    intro: [
      'Block board has a core of solid timber strips placed edge to edge and sandwiched between veneer layers. The strips run along the length of the board, giving it excellent stiffness over long spans while keeping the weight down.',
      'That makes block board a practical choice for long shelves, dining and conference tables, bed panels, partitions and tall doors — anywhere a wide panel must resist sagging over time.',
    ],
    highlights: [
      { title: 'Resists sagging', text: 'Lengthwise timber strips keep long shelves and tabletops straight.' },
      { title: 'Lighter for its size', text: 'Easier to handle and install than an equivalent solid panel.' },
      { title: 'Rigid and stable', text: 'Veneer faces lock the core in place for a flat, steady board.' },
      { title: 'Easy to work', text: 'Cuts, routes and fixes cleanly with standard carpentry tools.' },
    ],
    bestFor: ['Long shelves', 'Dining & conference tables', 'Bed panels', 'Partitions', 'Tall doors', 'Office desks'],
    construction: [
      { name: 'Face veneer', detail: 'Smooth outer surface', tone: '#d9bf8f', thickness: 1 },
      { name: 'Cross band', detail: 'Holds the core in place', tone: '#c9a46d', thickness: 1 },
      { name: 'Solid wood-strip core', detail: 'Timber battens placed edge to edge', tone: '#a87b45', thickness: 4 },
      { name: 'Cross band', detail: 'Balances the board', tone: '#c9a46d', thickness: 1 },
      { name: 'Back veneer', detail: 'Matched outer surface', tone: '#d9bf8f', thickness: 1 },
    ],
  },
  {
    slug: 'flush-doors',
    name: 'Flush Doors',
    singular: 'Flush Door',
    title: 'Flush doors that stay flat, strong and ready to finish',
    metaTitle: 'Flush Doors | Solid, Stable Door Shutters',
    metaDescription:
      'Umeka flush doors have a flat, smooth face on both sides over a sturdy frame and core. Ready for laminate, veneer or paint for homes, offices and hospitality projects.',
    image: 'product-flushdoor',
    lifestyleImage: 'flushdoor-panelled-wall',
    summary:
      'Flat, smooth door shutters built over a sturdy frame and core — stable through the seasons and ready for laminate, veneer or paint.',
    intro: [
      'A flush door has a completely flat face on both sides, built over a sturdy timber frame and a filled core. The clean surface suits modern interiors and can be finished in laminate, veneer, paint or polish to match any room.',
      'Umeka flush doors are built to stay flat and stable through changing seasons, with secure fixing for hinges, locks and handles.',
    ],
    highlights: [
      { title: 'Flat, clean faces', text: 'Smooth surfaces on both sides for a seamless finish.' },
      { title: 'Stable in use', text: 'Built to resist twisting and bowing through the seasons.' },
      { title: 'Secure fittings', text: 'Frame designed to hold hinges, locks and handles firmly.' },
      { title: 'Ready to finish', text: 'Takes laminate, veneer, paint or polish to suit the room.' },
    ],
    bestFor: ['Bedroom doors', 'Main & internal doors', 'Offices & cabins', 'Hotels & hospitality', 'Apartments', 'Institutional projects'],
    construction: [
      { name: 'Face skin', detail: 'Smooth, flat outer surface', tone: '#d9bf8f', thickness: 1 },
      { name: 'Frame & core', detail: 'Timber frame with filled core', tone: '#a87b45', thickness: 4 },
      { name: 'Lock block', detail: 'Reinforced zone for fittings', tone: '#8f6638', thickness: 1 },
      { name: 'Face skin', detail: 'Matched surface on the reverse', tone: '#d9bf8f', thickness: 1 },
    ],
  },
];

const tbcSpecs = (extra: Spec[] = []): Spec[] => [
  { label: 'Grade', value: null },
  { label: 'Timber / core species', value: null },
  { label: 'Face veneer', value: null },
  { label: 'Bonding resin', value: null },
  { label: 'Standard reference', value: null, note: 'Only list a standard Umeka is certified to.' },
  { label: 'Thickness tolerance', value: null },
  { label: 'Moisture content', value: null },
  { label: 'Borer & termite treatment', value: null },
  ...extra,
];

export const products: Product[] = [
  // ---------------------------------------------------------------- PLYWOOD
  {
    slug: 'mr-grade-plywood',
    category: 'plywood',
    name: 'Umeka MR Grade Plywood',
    nameIsPlaceholder: true,
    grade: 'MR (Moisture Resistant)',
    tagline: 'Dependable plywood for dry interior furniture.',
    intro:
      'An everyday interior plywood for wardrobes, beds, TV units, shelving and storage in dry indoor areas. Pressed for even thickness and smooth faces that take laminate and veneer cleanly.',
    image: 'product-plywood',
    gallery: ['product-plywood', 'furniture-sideboard', 'plywood-panelling-tv'],
    benefits: [
      'Even thickness for clean joints and aligned shutters',
      'Smooth faces ready for laminate, veneer or polish',
      'Firm screw and hinge holding for everyday furniture',
      'Value-focused choice for dry interior areas',
    ],
    features: [
      { title: 'Cross-laminated build', text: 'Alternating veneer grain keeps panels flat and strong.' },
      { title: 'Sanded surfaces', text: 'Prepared for a smooth, even finish.' },
      { title: 'Interior grade', text: 'Suited to dry indoor furniture and fittings.' },
    ],
    sizes: null,
    thicknesses: null,
    specs: tbcSpecs(),
    applications: ['residential-furniture', 'wardrobes', 'wall-panels', 'interior-projects'],
    certifications: null,
    warranty: null,
    downloads: ['product-catalogue', 'plywood-technical-sheet'],
    featured: true,
  },
  {
    slug: 'bwr-grade-plywood',
    category: 'plywood',
    name: 'Umeka BWR Grade Plywood',
    nameIsPlaceholder: true,
    grade: 'BWR (Boiling Water Resistant)',
    tagline: 'Added moisture protection for kitchens and humid rooms.',
    intro:
      'A step up in moisture performance for kitchens, utility areas, bathroom vanities and rooms with higher humidity, where panels face steam, splashes and regular cleaning.',
    image: 'product-plywood',
    gallery: ['product-plywood', 'app-kitchen', 'fluted-cabinet'],
    benefits: [
      'Improved resistance to humidity and occasional splashes',
      'Stable panels for kitchen carcasses and shutters',
      'Smooth faces for laminates and edge banding',
      'Suitable for semi-humid interior areas',
    ],
    features: [
      { title: 'Moisture-focused bonding', text: 'Resin system selected for humid interior conditions.' },
      { title: 'Even calibration', text: 'Helps modular units and shutters line up correctly.' },
      { title: 'Kitchen-ready', text: 'Designed for cabinets, counters and utility storage.' },
    ],
    sizes: null,
    thicknesses: null,
    specs: tbcSpecs(),
    applications: ['modular-kitchens', 'wardrobes', 'residential-furniture', 'commercial-interiors'],
    certifications: null,
    warranty: null,
    downloads: ['product-catalogue', 'plywood-technical-sheet'],
    featured: true,
  },
  {
    slug: 'bwp-marine-grade-plywood',
    category: 'plywood',
    name: 'Umeka BWP Marine Grade Plywood',
    nameIsPlaceholder: true,
    grade: 'BWP (Boiling Water Proof)',
    tagline: 'Our toughest plywood for wet and high-moisture areas.',
    intro:
      'Made for the most demanding locations — sink units, bathroom cabinets, wet utility areas and spaces exposed to water — where long-term bond strength matters most.',
    image: 'product-plywood',
    gallery: ['product-plywood', 'app-kitchen', 'decorative-screen'],
    benefits: [
      'Built for areas with regular water exposure',
      'Strong, durable bonding under demanding conditions',
      'Stable panels for long service life',
      'Suitable for kitchens, bathrooms and wet utilities',
    ],
    features: [
      { title: 'Waterproof-grade bonding', text: 'Resin system intended for high-moisture use.' },
      { title: 'Dense construction', text: 'Tightly pressed veneers for strength and screw holding.' },
      { title: 'Heavy-duty use', text: 'For kitchens, bathrooms and commercial wet areas.' },
    ],
    sizes: null,
    thicknesses: null,
    specs: tbcSpecs(),
    applications: ['modular-kitchens', 'commercial-interiors', 'interior-projects', 'doors'],
    certifications: null,
    warranty: null,
    downloads: ['product-catalogue', 'plywood-technical-sheet'],
    featured: true,
  },

  // ------------------------------------------------------------ BLOCK BOARD
  {
    slug: 'mr-grade-block-board',
    category: 'block-board',
    name: 'Umeka MR Grade Block Board',
    nameIsPlaceholder: true,
    grade: 'MR (Moisture Resistant)',
    tagline: 'Rigid, lighter boards for long interior spans.',
    intro:
      'A solid wood-strip core board for long shelves, bookcases, bed panels, tables and partitions in dry interior areas — stiff where it counts and easier to handle.',
    image: 'product-blockboard',
    gallery: ['product-blockboard', 'blockboard-cafe-tables', 'light-wood-furniture'],
    benefits: [
      'Resists sagging across long shelves and tabletops',
      'Lighter than an equivalent solid panel',
      'Flat, stable surfaces for laminates and veneers',
      'Easy to cut, route and fix on site',
    ],
    features: [
      { title: 'Solid strip core', text: 'Timber battens run along the board for stiffness.' },
      { title: 'Veneered faces', text: 'Cross bands and faces lock the core in place.' },
      { title: 'Interior grade', text: 'For furniture and fittings in dry areas.' },
    ],
    sizes: null,
    thicknesses: null,
    specs: tbcSpecs([{ label: 'Strip width', value: null }]),
    applications: ['residential-furniture', 'offices', 'wall-panels', 'interior-projects'],
    certifications: null,
    warranty: null,
    downloads: ['product-catalogue', 'block-board-technical-sheet'],
    featured: true,
  },
  {
    slug: 'bwp-grade-block-board',
    category: 'block-board',
    name: 'Umeka BWP Grade Block Board',
    nameIsPlaceholder: true,
    grade: 'BWP (Boiling Water Proof)',
    tagline: 'Long-span strength with higher moisture protection.',
    intro:
      'For long-span furniture and doors in kitchens, washrooms and humid commercial spaces, combining the stiffness of a solid core with moisture-focused bonding.',
    image: 'product-blockboard',
    gallery: ['product-blockboard', 'blockboard-cafe-tables', 'app-office'],
    benefits: [
      'Stiff, straight panels over long spans',
      'Bonding intended for moisture-prone areas',
      'Suitable for doors, counters and commercial furniture',
      'Stable, lighter construction',
    ],
    features: [
      { title: 'Moisture-focused bonding', text: 'For humid and wet-adjacent locations.' },
      { title: 'Solid strip core', text: 'Lengthwise battens for rigidity.' },
      { title: 'Commercial use', text: 'Suited to cafés, offices and hospitality fit-outs.' },
    ],
    sizes: null,
    thicknesses: null,
    specs: tbcSpecs([{ label: 'Strip width', value: null }]),
    applications: ['commercial-interiors', 'offices', 'doors', 'modular-kitchens'],
    certifications: null,
    warranty: null,
    downloads: ['product-catalogue', 'block-board-technical-sheet'],
  },

  // ------------------------------------------------------------ FLUSH DOORS
  {
    slug: 'interior-flush-door',
    category: 'flush-doors',
    name: 'Umeka Interior Flush Door',
    nameIsPlaceholder: true,
    grade: 'Interior',
    tagline: 'A flat, stable shutter for bedrooms and internal doors.',
    intro:
      'A clean, flat flush door for bedrooms, study rooms, offices and internal openings. Smooth on both faces and ready for laminate, veneer, paint or polish.',
    image: 'product-flushdoor',
    gallery: ['product-flushdoor', 'flushdoor-panelled-wall', 'app-wardrobe'],
    benefits: [
      'Flat, smooth faces on both sides',
      'Stable through seasonal changes',
      'Secure fixing for hinges, locks and handles',
      'Ready for any decorative finish',
    ],
    features: [
      { title: 'Sturdy frame', text: 'Timber frame for strength and fixing.' },
      { title: 'Filled core', text: 'Supports the faces and keeps the shutter flat.' },
      { title: 'Lock-block zone', text: 'Reinforced area for door hardware.' },
    ],
    sizes: null,
    thicknesses: null,
    specs: [
      { label: 'Door type', value: 'Flush door' },
      { label: 'Core construction', value: null },
      { label: 'Frame timber', value: null },
      { label: 'Face skin', value: null },
      { label: 'Bonding resin', value: null },
      { label: 'Standard reference', value: null, note: 'Only list a standard Umeka is certified to.' },
      { label: 'Borer & termite treatment', value: null },
    ],
    applications: ['doors', 'residential-furniture', 'offices', 'interior-projects'],
    certifications: null,
    warranty: null,
    downloads: ['product-catalogue', 'flush-door-technical-sheet'],
    featured: true,
  },
  {
    slug: 'waterproof-flush-door',
    category: 'flush-doors',
    name: 'Umeka Waterproof Flush Door',
    nameIsPlaceholder: true,
    grade: 'BWP (Boiling Water Proof)',
    tagline: 'For bathrooms, utilities and high-moisture openings.',
    intro:
      'A flush door intended for bathrooms, utility rooms and other openings exposed to moisture, combining a flat finish with moisture-focused bonding.',
    image: 'product-flushdoor',
    gallery: ['product-flushdoor', 'flushdoor-panelled-wall', 'decorative-screen'],
    benefits: [
      'Intended for moisture-prone openings',
      'Flat faces that take laminate or paint',
      'Stable, durable construction',
      'Secure fixing for hardware',
    ],
    features: [
      { title: 'Moisture-focused bonding', text: 'For bathrooms and utility areas.' },
      { title: 'Sturdy frame', text: 'Holds hinges and locks firmly.' },
      { title: 'Finish-ready faces', text: 'Smooth surfaces for decorative finishes.' },
    ],
    sizes: null,
    thicknesses: null,
    specs: [
      { label: 'Door type', value: 'Flush door' },
      { label: 'Core construction', value: null },
      { label: 'Frame timber', value: null },
      { label: 'Face skin', value: null },
      { label: 'Bonding resin', value: null },
      { label: 'Standard reference', value: null, note: 'Only list a standard Umeka is certified to.' },
      { label: 'Borer & termite treatment', value: null },
    ],
    applications: ['doors', 'commercial-interiors', 'interior-projects'],
    certifications: null,
    warranty: null,
    downloads: ['product-catalogue', 'flush-door-technical-sheet'],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (category: string, slug: string) =>
  products.find((p) => p.category === category && p.slug === slug);
export const productsInCategory = (slug: string) => products.filter((p) => p.category === slug);
export const productHref = (p: Pick<Product, 'category' | 'slug'>) => `/products/${p.category}/${p.slug}/`;
export const relatedProducts = (p: Product, limit = 3) =>
  [
    ...products.filter((x) => x.category === p.category && x.slug !== p.slug),
    ...products.filter((x) => x.category !== p.category && x.featured),
  ].slice(0, limit);
