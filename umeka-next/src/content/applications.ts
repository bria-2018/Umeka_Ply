import type { CategorySlug } from './products';

/**
 * APPLICATIONS
 * Where Umeka products are used. Each entry generates /applications/<slug>/.
 * Recommendations are general guidance on product types, not certified claims.
 */
export type Application = {
  slug: string;
  name: string;
  image: string;
  summary: string;
  intro: string;
  considerations: { title: string; text: string }[];
  recommended: { category: CategorySlug; why: string }[];
};

export const applications: Application[] = [
  {
    slug: 'residential-furniture',
    name: 'Residential Furniture',
    image: 'furniture-sideboard',
    summary: 'Beds, sideboards, TV units, study tables and storage that look good and last.',
    intro:
      'Home furniture is used every day — drawers are pulled, doors are swung and shelves are loaded. The panel behind the finish decides how well a piece holds up over the years.',
    considerations: [
      { title: 'Choose by location', text: 'Interior grades work for dry rooms; choose a higher moisture grade near kitchens and bathrooms.' },
      { title: 'Plan for load', text: 'Use block board for long shelves and wide bed panels that must stay straight.' },
      { title: 'Think about the finish', text: 'Smooth, even faces make laminate and veneer finishes look cleaner and last longer.' },
    ],
    recommended: [
      { category: 'plywood', why: 'Strong, stable carcasses with firm screw and hinge holding.' },
      { category: 'block-board', why: 'Long shelves, bed backs and wide panels that resist sagging.' },
    ],
  },
  {
    slug: 'modular-kitchens',
    name: 'Modular Kitchens',
    image: 'app-kitchen',
    summary: 'Cabinets and shutters that stand up to steam, spills and constant use.',
    intro:
      'Kitchens are the toughest room in the house for wood panels: heat, steam, water and daily cleaning. The right plywood grade and even-thickness panels keep cabinets aligned and durable.',
    considerations: [
      { title: 'Moisture grade matters', text: 'Use a boiling-water-resistant or waterproof grade, especially for sink and base units.' },
      { title: 'Seal every edge', text: 'Edge-band all exposed edges to keep moisture out of the core.' },
      { title: 'Keep it level', text: 'Even panel thickness helps modular boxes and shutters line up without packing.' },
    ],
    recommended: [
      { category: 'plywood', why: 'BWR or BWP grade plywood for carcasses, shutters and sink units.' },
      { category: 'block-board', why: 'Wide shelves and tall pantry units where stiffness is needed.' },
    ],
  },
  {
    slug: 'wardrobes',
    name: 'Wardrobes',
    image: 'app-wardrobe',
    summary: 'Tall, flat shutters and sturdy carcasses for bedrooms and dressing areas.',
    intro:
      'Floor-to-ceiling wardrobes need tall shutters that stay flat and carcasses that hold heavy hinges and channels. Panel stability is the difference between doors that close cleanly and doors that drift.',
    considerations: [
      { title: 'Flat tall shutters', text: 'Choose stable, well-pressed panels for doors over 6 ft.' },
      { title: 'Firm fittings', text: 'Dense plywood holds soft-close hinges and drawer channels securely.' },
      { title: 'Balanced finishes', text: 'Laminate both faces of a shutter to keep it balanced and flat.' },
    ],
    recommended: [
      { category: 'plywood', why: 'Carcasses, shutters and internal drawers.' },
      { category: 'block-board', why: 'Long shelves and wide loft units.' },
    ],
  },
  {
    slug: 'offices',
    name: 'Offices',
    image: 'app-office',
    summary: 'Workstations, cabins, storage and reception desks built for daily wear.',
    intro:
      'Office furniture faces heavy, continuous use and frequent reconfiguration. Strong, stable boards help desks stay level, storage stay square and fittings stay tight.',
    considerations: [
      { title: 'Long-span desks', text: 'Block board keeps wide desktops and conference tables flat.' },
      { title: 'Repeated fixing', text: 'Choose dense panels that hold screws through repeated assembly.' },
      { title: 'Consistent supply', text: 'Uniform panels across a project make large fit-outs smoother.' },
    ],
    recommended: [
      { category: 'block-board', why: 'Workstation tops, conference tables and long storage.' },
      { category: 'plywood', why: 'Cabinets, pedestals and wall storage.' },
      { category: 'flush-doors', why: 'Cabin and meeting-room doors.' },
    ],
  },
  {
    slug: 'commercial-interiors',
    name: 'Commercial Interiors',
    image: 'blockboard-cafe-tables',
    summary: 'Retail, cafés, hotels and showrooms where materials must look good under heavy use.',
    intro:
      'Commercial interiors combine high footfall, tight timelines and demanding design. Dependable panels help contractors finish on schedule and keep spaces looking sharp for longer.',
    considerations: [
      { title: 'Durability under footfall', text: 'Specify grades suited to the moisture and wear of each zone.' },
      { title: 'Design flexibility', text: 'Smooth faces accept laminates, veneers, paints and fluted finishes.' },
      { title: 'Project planning', text: 'Share quantities early so supply can be planned across phases.' },
    ],
    recommended: [
      { category: 'plywood', why: 'Display units, counters, cladding and storage.' },
      { category: 'block-board', why: 'Tables, long counters and partitions.' },
      { category: 'flush-doors', why: 'Back-of-house, room and washroom doors.' },
    ],
  },
  {
    slug: 'doors',
    name: 'Doors',
    image: 'flushdoor-panelled-wall',
    summary: 'Main, internal, bathroom and cabin doors that stay flat and secure.',
    intro:
      'A door is opened thousands of times a year. It has to stay flat, hold its hardware and look as good as the room around it.',
    considerations: [
      { title: 'Match the location', text: 'Use a moisture-focused door for bathrooms and utilities.' },
      { title: 'Plan the hardware', text: 'Confirm lock-block position before ordering for mortise locks.' },
      { title: 'Finish both faces', text: 'Finishing both sides equally helps the shutter stay flat.' },
    ],
    recommended: [
      { category: 'flush-doors', why: 'Ready-made shutters for homes, offices and hotels.' },
      { category: 'block-board', why: 'Custom-made doors and large sliding panels.' },
    ],
  },
  {
    slug: 'wall-panels',
    name: 'Wall Panels',
    image: 'wall-panel-slats',
    summary: 'Feature walls, TV backdrops, cladding and fluted panelling.',
    intro:
      'Wall panelling brings warmth and texture to a room. Flat, stable substrate panels keep joints tight and surfaces even across the whole wall.',
    considerations: [
      { title: 'Flatness first', text: 'Uneven panels show every joint once a finish is applied.' },
      { title: 'Allow for movement', text: 'Leave small expansion gaps and acclimatise panels before fixing.' },
      { title: 'Plan services', text: 'Mark wiring and lighting routes before panels go up.' },
    ],
    recommended: [
      { category: 'plywood', why: 'Substrate for veneer, laminate and fluted panelling.' },
      { category: 'block-board', why: 'Large backdrops and long horizontal runs.' },
    ],
  },
  {
    slug: 'interior-projects',
    name: 'Interior Projects',
    image: 'interior-screen-living',
    summary: 'Complete residential and commercial projects for designers, builders and contractors.',
    intro:
      'From a single apartment to a multi-floor commercial fit-out, a project needs consistent material, clear specifications and dependable supply. Umeka works with designers, builders and contractors to plan the right mix of products.',
    considerations: [
      { title: 'Specify clearly', text: 'Define grades for each zone — dry, humid and wet — in your drawings.' },
      { title: 'Order consistently', text: 'Sourcing from one manufacturer keeps quality uniform across the project.' },
      { title: 'Talk to us early', text: 'Share BOQs and timelines so we can recommend and plan supply.' },
    ],
    recommended: [
      { category: 'plywood', why: 'Furniture, kitchens, wardrobes and panelling.' },
      { category: 'block-board', why: 'Tables, long shelving and partitions.' },
      { category: 'flush-doors', why: 'All internal and service doors.' },
    ],
  },
];

export const getApplication = (slug: string) => applications.find((a) => a.slug === slug);
