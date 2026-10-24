/**
 * KNOWLEDGE CENTRE ARTICLES
 * Original, general guidance. Articles describe industry practice and do
 * not make claims about specific Umeka certifications or test results.
 * Body content uses simple typed blocks so it can later be moved into a CMS.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'note'; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Buying Guide' | 'Grades & Standards' | 'Product Care' | 'Applications';
  image: string;
  readingMinutes: number;
  published: string; // ISO date
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: 'how-to-choose-the-right-plywood',
    title: 'How to choose the right plywood for your project',
    excerpt: 'Grade, thickness, location and finish — a simple framework for picking plywood that suits the job and the budget.',
    category: 'Buying Guide',
    image: 'product-plywood',
    readingMinutes: 5,
    published: '2026-10-01',
    body: [
      { type: 'p', text: 'Plywood may look similar from one sheet to the next, but the right choice depends on where it will be used, what it has to carry and how it will be finished. Working through four simple questions will help you choose with confidence.' },
      { type: 'h2', text: '1. Where will the furniture live?' },
      { type: 'p', text: 'Moisture is the single biggest factor. Bedroom wardrobes, living-room units and study tables sit in dry conditions, while kitchens, bathrooms and utility areas face steam, splashes and cleaning water.' },
      { type: 'ul', items: ['Dry interiors: an interior (MR) grade is usually sufficient.', 'Kitchens and humid rooms: choose a boiling-water-resistant (BWR) grade.', 'Sink units, bathrooms and wet areas: choose a boiling-waterproof (BWP) or marine grade.'] },
      { type: 'h2', text: '2. What will it carry?' },
      { type: 'p', text: 'Thicker panels are stiffer and hold screws better. Carcasses and shutters are commonly made in medium thicknesses, while back panels and drawer bottoms use thinner sheets. For long shelves or wide tabletops, consider block board, which resists sagging over long spans.' },
      { type: 'h2', text: '3. How will it be finished?' },
      { type: 'p', text: 'Laminates, veneers and paint all show the surface underneath. A smooth, evenly sanded face with consistent thickness gives a flatter, cleaner finish and fewer visible joints.' },
      { type: 'h2', text: '4. Who is making it?' },
      { type: 'p', text: 'Buy from a manufacturer that clearly states the grade, provides product information and stands behind its material. Ask your dealer or carpenter to show you the sheet edges and faces before you order.' },
      { type: 'note', text: 'Not sure which Umeka product suits your project? Send us your requirement and our team will recommend a grade and thickness.' },
    ],
  },
  {
    slug: 'mr-bwr-bwp-plywood-grades-explained',
    title: 'MR, BWR and BWP plywood grades explained',
    excerpt: 'What the common plywood grade names mean, how they differ, and where each one belongs in your home or project.',
    category: 'Grades & Standards',
    image: 'texture-ply-edge',
    readingMinutes: 4,
    published: '2026-09-24',
    body: [
      { type: 'p', text: 'Plywood is usually sold by grade, and the grade tells you how well its glue bond is expected to handle moisture. The three names you will hear most often in India are MR, BWR and BWP.' },
      { type: 'table', head: ['Grade', 'Stands for', 'Typical use'], rows: [
        ['MR', 'Moisture Resistant', 'Furniture and fittings in dry indoor areas'],
        ['BWR', 'Boiling Water Resistant', 'Kitchens, utility areas and humid rooms'],
        ['BWP', 'Boiling Water Proof', 'Sink units, bathrooms and areas exposed to water'],
      ] },
      { type: 'h2', text: 'Why the glue matters' },
      { type: 'p', text: 'The wood veneers in plywood are held together by resin. Interior grades use resins suited to dry conditions, while higher grades use resins designed to keep the layers bonded even after exposure to water and heat. The grade is therefore about the bond, not only the wood.' },
      { type: 'h2', text: 'Indian Standards' },
      { type: 'p', text: 'Plywood grades in India are defined in Bureau of Indian Standards specifications — for example, IS 303 for general-purpose plywood and IS 710 for marine plywood. When a product claims a standard, ask to see the relevant licence or certificate issued to that manufacturer.' },
      { type: 'h2', text: 'Choosing the right grade' },
      { type: 'ul', items: ['Use the grade that matches the wettest condition the panel will face.', 'Seal and edge-band all exposed edges, whatever the grade.', 'A higher grade will not fix poor installation — good ventilation and sealing still matter.'] },
    ],
  },
  {
    slug: 'plywood-vs-block-board',
    title: 'Plywood or block board: which one should you use?',
    excerpt: 'Both are engineered wood panels, but they behave differently. Here is how to decide for shelves, tables, wardrobes and doors.',
    category: 'Buying Guide',
    image: 'product-blockboard',
    readingMinutes: 4,
    published: '2026-09-15',
    body: [
      { type: 'p', text: 'Plywood and block board are often used side by side in the same project. Understanding how each one is built makes it easy to put the right panel in the right place.' },
      { type: 'h2', text: 'How they are made' },
      { type: 'p', text: 'Plywood is made from many thin veneers glued with their grain at right angles, which gives it balanced strength in both directions. Block board has a core of solid wood strips placed edge to edge between veneer faces, which makes it very stiff along its length and lighter for its size.' },
      { type: 'table', head: ['', 'Plywood', 'Block board'], rows: [
        ['Strength', 'Balanced in both directions', 'Very stiff along the length'],
        ['Weight', 'Heavier for its size', 'Lighter for its size'],
        ['Screw holding', 'Excellent on faces and edges', 'Good on faces; plan edge fixings'],
        ['Best for', 'Carcasses, shutters, kitchens', 'Long shelves, tables, partitions, doors'],
      ] },
      { type: 'h2', text: 'A simple rule of thumb' },
      { type: 'ul', items: ['If it is a box — a cabinet, drawer or carcass — use plywood.', 'If it is long and flat — a shelf, tabletop, partition or tall door — consider block board.', 'In kitchens and bathrooms, choose a moisture-appropriate grade for either product.'] },
    ],
  },
  {
    slug: 'how-to-check-plywood-quality-before-buying',
    title: 'How to check plywood quality before you buy',
    excerpt: 'Six quick checks you can do at the dealer to spot a well-made sheet — no tools or technical knowledge required.',
    category: 'Buying Guide',
    image: 'quality-factory',
    readingMinutes: 4,
    published: '2026-09-05',
    body: [
      { type: 'p', text: 'You do not need a laboratory to tell a good sheet from a poor one. A few simple checks at the dealer will tell you a lot about how a panel was made.' },
      { type: 'h3', text: '1. Look at the edge' },
      { type: 'p', text: 'The layers should be even, tightly bonded and free of gaps. Visible holes or overlapping veneers in the edge suggest a weak core.' },
      { type: 'h3', text: '2. Check the face' },
      { type: 'p', text: 'Run your hand across the surface. It should feel smooth and even, without lumps, open joints or patches.' },
      { type: 'h3', text: '3. Check for flatness' },
      { type: 'p', text: 'Sight along the sheet. A good panel lies flat; a twisted or bowed sheet will be difficult to work and may get worse over time.' },
      { type: 'h3', text: '4. Compare thickness' },
      { type: 'p', text: 'Measure the thickness at several points. Consistent thickness means cleaner joints and shutters that line up properly.' },
      { type: 'h3', text: '5. Tap the surface' },
      { type: 'p', text: 'A firm, solid sound across the sheet suggests a well-bonded core. A hollow sound in patches can indicate gaps inside.' },
      { type: 'h3', text: '6. Ask for documents' },
      { type: 'p', text: 'Ask about the grade, any standard claimed and the warranty terms. A reliable manufacturer will explain these clearly and in writing.' },
    ],
  },
  {
    slug: 'choosing-the-right-flush-door',
    title: 'Choosing the right flush door',
    excerpt: 'Location, size, hardware and finish — what to decide before you order flush doors for a home or project.',
    category: 'Applications',
    image: 'product-flushdoor',
    readingMinutes: 4,
    published: '2026-08-28',
    body: [
      { type: 'p', text: 'Flush doors are popular because they are flat, clean and easy to finish. A little planning before ordering will save time and rework on site.' },
      { type: 'h2', text: 'Match the door to the room' },
      { type: 'ul', items: ['Bedrooms, study rooms and offices: an interior flush door is usually suitable.', 'Bathrooms, utilities and areas near water: choose a door intended for moisture-prone locations.', 'Main doors: consider security hardware and a finish that suits exposure to sunlight.'] },
      { type: 'h2', text: 'Measure the opening carefully' },
      { type: 'p', text: 'Measure the height and width of each frame opening at more than one point, and note the required door thickness. Openings in older buildings are often not perfectly square.' },
      { type: 'h2', text: 'Plan the hardware' },
      { type: 'p', text: 'Locks, handles and hinges need solid timber behind them. Confirm the position of the lock block with your supplier, especially for mortise locks.' },
      { type: 'h2', text: 'Finish both faces' },
      { type: 'p', text: 'Apply laminate, veneer or paint to both faces and seal all edges, including the top and bottom. Balanced finishing helps the door stay flat.' },
    ],
  },
  {
    slug: 'caring-for-plywood-furniture',
    title: 'Caring for plywood furniture: a simple guide',
    excerpt: 'Everyday habits that keep wardrobes, kitchens and tables looking good and performing well for years.',
    category: 'Product Care',
    image: 'light-wood-furniture',
    readingMinutes: 3,
    published: '2026-08-18',
    body: [
      { type: 'p', text: 'Well-made plywood furniture can last for decades. A few simple habits will help it look and perform its best.' },
      { type: 'h2', text: 'Keep moisture in check' },
      { type: 'ul', items: ['Wipe up spills promptly, especially around sinks and basins.', 'Make sure all exposed edges are edge-banded or sealed.', 'Keep cabinets under sinks ventilated and repair leaks quickly.'] },
      { type: 'h2', text: 'Clean gently' },
      { type: 'p', text: 'Use a soft, slightly damp cloth and mild soap. Avoid harsh chemicals and abrasive pads that can damage laminates and polish.' },
      { type: 'h2', text: 'Protect from heat and sun' },
      { type: 'p', text: 'Use trivets under hot pans and keep furniture away from direct, prolonged sunlight, which can fade finishes over time.' },
      { type: 'h2', text: 'Look after the hardware' },
      { type: 'p', text: 'Tighten loose hinges and handles early, and avoid overloading shelves beyond what they were designed for.' },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
