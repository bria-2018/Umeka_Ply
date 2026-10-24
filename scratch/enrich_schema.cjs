const fs = require('fs');
const path = require('path');

const root = 'e:/Umeka/Umeka_Website';
const domain = 'https://www.umekainternational.in';

const pageSchemas = [
  // Applications
  {
    file: 'applications/kitchens.html',
    name: 'Modular Kitchens',
    parent: 'Applications',
    parentUrl: 'applications/'
  },
  {
    file: 'applications/wardrobes-and-bedrooms.html',
    name: 'Wardrobes & Bedrooms',
    parent: 'Applications',
    parentUrl: 'applications/'
  },
  {
    file: 'applications/living-rooms-tv-units.html',
    name: 'Living Rooms & TV Units',
    parent: 'Applications',
    parentUrl: 'applications/'
  },
  {
    file: 'applications/tables-and-shelving.html',
    name: 'Tables & Shelving',
    parent: 'Applications',
    parentUrl: 'applications/'
  },
  {
    file: 'applications/doors-and-partitions.html',
    name: 'Doors & Partitions',
    parent: 'Applications',
    parentUrl: 'applications/'
  },
  {
    file: 'applications/offices-commercial.html',
    name: 'Offices & Commercial',
    parent: 'Applications',
    parentUrl: 'applications/'
  },
  // Professionals
  {
    file: 'professionals/index.html',
    name: 'For Professionals',
    parent: null
  },
  {
    file: 'professionals/architects-designers.html',
    name: 'Architects & Designers',
    parent: 'Professionals',
    parentUrl: 'professionals/'
  },
  {
    file: 'professionals/contractors-carpenters.html',
    name: 'Contractors & Carpenters',
    parent: 'Professionals',
    parentUrl: 'professionals/'
  },
  {
    file: 'professionals/project-buyers.html',
    name: 'Project Buyers',
    parent: 'Professionals',
    parentUrl: 'professionals/'
  },
  // Dealers
  {
    file: 'dealers/index.html',
    name: 'Dealers & Distributors',
    parent: null
  },
  // Why Umeka
  {
    file: 'why-umeka/index.html',
    name: 'Why Umeka',
    parent: null
  },
  {
    file: 'why-umeka/standards.html',
    name: 'Standards & Testing',
    parent: 'Why Umeka',
    parentUrl: 'why-umeka/'
  },
  {
    file: 'why-umeka/warranty.html',
    name: 'Warranty Policy',
    parent: 'Why Umeka',
    parentUrl: 'why-umeka/'
  },
  // Resources
  {
    file: 'resources/index.html',
    name: 'Resources & Guides',
    parent: null
  },
  {
    file: 'resources/how-to-choose-plywood.html',
    name: 'How to Choose Plywood for Your Project',
    parent: 'Resources',
    parentUrl: 'resources/',
    isArticle: true,
    headline: 'How to Choose Plywood for Your Project'
  },
  {
    file: 'resources/mr-bwr-bwp-explained.html',
    name: 'MR, BWR and BWP Plywood Explained',
    parent: 'Resources',
    parentUrl: 'resources/',
    isArticle: true,
    headline: 'MR, BWR and BWP Plywood Explained'
  },
  {
    file: 'resources/block-board-vs-plywood.html',
    name: 'Block Board vs Plywood: Which One to Use?',
    parent: 'Resources',
    parentUrl: 'resources/',
    isArticle: true,
    headline: 'Block Board vs Plywood: Which One to Use?'
  },
  {
    file: 'resources/choosing-flush-door.html',
    name: 'Choosing a Flush Door — Umeka Door Guide',
    parent: 'Resources',
    parentUrl: 'resources/',
    isArticle: true,
    headline: 'Choosing a Flush Door — Umeka Door Guide'
  },
  {
    file: 'resources/how-to-spot-quality-plywood.html',
    name: 'How to Spot Quality Plywood Before You Buy',
    parent: 'Resources',
    parentUrl: 'resources/',
    isArticle: true,
    headline: 'How to Spot Quality Plywood Before You Buy'
  }
];

pageSchemas.forEach(ps => {
  const filePath = path.join(root, ps.file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('application/ld+json')) return;

  const pageUrl = `${domain}/${ps.file}`;
  let breadcrumbItems = [
    `{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "${domain}/"
    }`
  ];

  if (ps.parent) {
    breadcrumbItems.push(`{
      "@type": "ListItem",
      "position": 2,
      "name": "${ps.parent}",
      "item": "${domain}/${ps.parentUrl}"
    }`);
    breadcrumbItems.push(`{
      "@type": "ListItem",
      "position": 3,
      "name": "${ps.name}",
      "item": "${pageUrl}"
    }`);
  } else {
    breadcrumbItems.push(`{
      "@type": "ListItem",
      "position": 2,
      "name": "${ps.name}",
      "item": "${pageUrl}"
    }`);
  }

  let schemaObj = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map(i => JSON.parse(i))
  };

  let schemaBlock = `
  <script type="application/ld+json">
  ${JSON.stringify(schemaObj, null, 2)}
  </script>`;

  if (ps.isArticle) {
    const articleObj = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": ps.headline,
      "author": {
        "@type": "Organization",
        "name": "Umeka Technical Advisory Desk"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Umeka",
        "logo": {
          "@type": "ImageObject",
          "url": `${domain}/assets/images/logo-color.png`
        }
      }
    };
    schemaBlock += `
  <script type="application/ld+json">
  ${JSON.stringify(articleObj, null, 2)}
  </script>`;
  }

  content = content.replace('</head>', `${schemaBlock}\n</head>`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Added schema to:', ps.file);
});
