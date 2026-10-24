const fs = require('fs');
const path = require('path');

const appPages = [
  {
    file: 'applications/kitchens.html',
    heroBadge: 'Kitchen Installation',
    heroSize: '1200 × 540 px',
    heroDesc: 'Modern modular kitchen with light oak calibrated plywood shutters, quartz countertop, and zero-gap cabinet alignments',
    detail1Title: 'Under-Sink Carcass Construction',
    detail1Size: '600 × 400 px',
    detail1Desc: 'Under-sink BWP marine grade plywood carcass with waterproof resin bonding',
    detail1Text: '100% boiling water proof marine plywood bonded with synthetic phenol formaldehyde resin to resist plumbing leaks and continuous floor washing.',
    detail2Title: 'High-Load Drawer Carcasses',
    detail2Size: '600 × 400 px',
    detail2Desc: 'Heavy-duty soft-close telescopic drawer channel fastening',
    detail2Text: 'High-density calibrated cores provide superior holding strength for heavy tandem boxes, cutlery organizers, and pull-out pantry units.'
  },
  {
    file: 'applications/wardrobes-and-bedrooms.html',
    heroBadge: 'Bedroom Installation',
    heroSize: '1200 × 540 px',
    heroDesc: 'Floor-to-ceiling 8-foot built-in master bedroom wardrobes with flat calibrated shutters and minimal linen textures',
    detail1Title: 'Tall Shutter Alignment',
    detail1Size: '600 × 400 px',
    detail1Desc: '8-foot tall wardrobe shutters hanging completely straight with soft-close hinges',
    detail1Text: 'Even thickness across every inch prevents bow and twist in tall doors, ensuring soft-close hinges and sliding tracks never bind.',
    detail2Title: 'Heavy-Duty Bed Platforms',
    detail2Size: '600 × 400 px',
    detail2Desc: 'Solid platform bed framing with internal hydraulic storage lift',
    detail2Text: 'Calibrated 19mm plywood framing supports king-size mattress weights and hydraulic lift mechanisms without creaking or sagging.'
  },
  {
    file: 'applications/living-rooms-tv-units.html',
    heroBadge: 'Living Room Architecture',
    heroSize: '1200 × 540 px',
    heroDesc: 'Minimalist floating media console with architectural wood fluted wall panelling and warm ambient LED backlighting',
    detail1Title: 'Cantilevered Floating Consoles',
    detail1Size: '600 × 400 px',
    detail1Desc: 'Long floating media console shelf spanning 7 feet without sagging',
    detail1Text: 'Block board solid batten core prevents the long-term sagging common in unreinforced particle board or thin plywood shelves.',
    detail2Title: 'Feature Wall Panelling',
    detail2Size: '600 × 400 px',
    detail2Desc: 'Geometric calibrated plywood backing panel with natural oak veneer finish',
    detail2Text: 'Calibrated backing panels ensure large decorative veneer or charcoal louvre panelling sits flat against the wall with no unsightly gaps.'
  },
  {
    file: 'applications/doors-and-partitions.html',
    heroBadge: 'Door & Partition Architecture',
    heroSize: '1200 × 540 px',
    heroDesc: 'Solid-core flush doors and floor-to-ceiling wooden privacy partitions dividing contemporary living zones',
    detail1Title: 'Warp-Resistant Bedroom Doors',
    detail1Size: '600 × 400 px',
    detail1Desc: 'Flush door shutter fitted with magnetic mortise lock and concealed hinges',
    detail1Text: 'Perimeter framing stiles are kiln-seasoned to controlled moisture levels, preventing seasonal warping and ensuring a snug, quiet latch.',
    detail2Title: 'Acoustic Room Dividers',
    detail2Size: '600 × 400 px',
    detail2Desc: 'Solid core timber partition wall with integrated glass panel insertion',
    detail2Text: 'Substantial solid batten core delivers natural acoustic damping between bedrooms, study rooms, and common family living areas.'
  },
  {
    file: 'applications/tables-and-shelving.html',
    heroBadge: 'Table & Furniture Craftsmanship',
    heroSize: '1200 × 540 px',
    heroDesc: 'Expansive 8-seater dining table and open library shelving wall with solid wood batten core construction',
    detail1Title: 'Long-Span Dining Tabletops',
    detail1Size: '600 × 400 px',
    detail1Desc: 'Seamless wooden tabletop edge showing zero deflection over 8 feet',
    detail1Text: 'High longitudinal stiffness from continuous timber battens allows tables to span long leg distances without heavy metal subframes.',
    detail2Title: 'Open Library Book Racks',
    detail2Size: '600 × 400 px',
    detail2Desc: 'Wide multi-tier bookshelf holding dense hardbound book collections',
    detail2Text: 'Eliminates the unsightly concave shelf bow seen in commercial plywood and MDF when loaded with heavy books and art pieces.'
  },
  {
    file: 'applications/offices-commercial.html',
    heroBadge: 'Commercial Architecture',
    heroSize: '1200 × 540 px',
    heroDesc: 'Contemporary corporate office fitout with ergonomic workstations, executive desks, and reception backdrops',
    detail1Title: 'High-Traffic Workstations',
    detail1Size: '600 × 400 px',
    detail1Desc: 'Modular office benching system with laminate pressed calibrated ply',
    detail1Text: 'Resists daily impact, moisture from cleaning chemicals, and repeated hardware repositioning across corporate tenancies.',
    detail2Title: 'Boardroom Panelling & Storage',
    detail2Size: '600 × 400 px',
    detail2Desc: 'Executive conference room credenza and acoustic timber wall cladding',
    detail2Text: 'Precision thickness calibration ensures push-to-open cabinets and flush architectural cladding align seamlessly across large conference walls.'
  }
];

const root = 'e:/Umeka/Umeka_Website';

appPages.forEach(p => {
  const filePath = path.join(root, p.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Update fonts if needed
  content = content.replace(/Noto\+Serif\+Display[^"']*/g, 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700');

  // Update Instagram link in footer
  content = content.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');

  // Check if Hero visual already inserted
  if (!content.includes('hero-app-visual')) {
    const heroVisualHtml = `
        <!-- Hero Application Visual Placeholder -->
        <div class="img-placeholder img-ratio-2-1 hero-app-visual" style="max-width:1150px;margin:2.75rem auto 0;">
          <span class="img-placeholder-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            ${p.heroBadge}
          </span>
          <div class="img-placeholder-size">Recommended Image: ${p.heroSize}</div>
          <p class="img-placeholder-desc">${p.heroDesc}</p>
        </div>
      </div>
    </section>`;

    content = content.replace(/<\/div>\s*<\/section>/, heroVisualHtml);
  }

  // Check if Craftsmanship & Detailing section already inserted before contact-sec
  if (!content.includes('craftsmanship-detailing-sec')) {
    const detailingHtml = `
    <!-- Key Joinery & Craftsmanship Details -->
    <section class="sec craftsmanship-detailing-sec">
      <div class="wrap">
        <div class="sec-head">
          <span class="sec-tag">Precision Joinery</span>
          <h2 class="sec-title">Key Fabrication &amp; Engineering Details</h2>
          <p class="lede">How precision-engineered Umeka boards deliver superior durability on site:</p>
        </div>
        <div class="card-grid-2" style="margin-top:2.5rem;">
          <div class="feature-card">
            <div>
              <div class="img-placeholder img-ratio-16-9" style="margin-bottom:1.25rem;">
                <div class="img-placeholder-size">Image: ${p.detail1Size}</div>
                <p class="img-placeholder-desc">${p.detail1Desc}</p>
              </div>
              <h3 style="font-size:1.6rem;margin-bottom:0.5rem;">${p.detail1Title}</h3>
              <p>${p.detail1Text}</p>
            </div>
          </div>
          <div class="feature-card">
            <div>
              <div class="img-placeholder img-ratio-16-9" style="margin-bottom:1.25rem;">
                <div class="img-placeholder-size">Image: ${p.detail2Size}</div>
                <p class="img-placeholder-desc">${p.detail2Desc}</p>
              </div>
              <h3 style="font-size:1.6rem;margin-bottom:0.5rem;">${p.detail2Title}</h3>
              <p>${p.detail2Text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enquiry CTA -->`;

    content = content.replace(/<!-- (?:Enquiry CTA|Enquiry & Consultation) -->|<section class="sec contact-sec"/, detailingHtml + '\n    <section class="sec contact-sec"');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated:', p.file);
});
