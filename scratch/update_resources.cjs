const fs = require('fs');
const path = require('path');

const root = 'e:/Umeka/Umeka_Website';

// 1. Update resources/index.html
let resIndex = fs.readFileSync(path.join(root, 'resources/index.html'), 'utf8');
resIndex = resIndex.replace(/Noto\+Serif\+Display[^"']*/g, 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700');
resIndex = resIndex.replace(/<img src="(?:\.\.\/)?assets\/images\/logo\.png" alt="Umeka Logo" class="brand-logo-img">/g, 
  `<img src="../assets/images/logo-color.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-light">\n        <img src="../assets/images/logo-white.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-dark">`);
resIndex = resIndex.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');

// Add thumbnails into the feature cards in resources/index.html
const guideThumbs = [
  { match: 'How to Choose Plywood for Your Project', size: '600 × 380 px', desc: 'Material selection chart with veneer layers and thickness gauges' },
  { match: 'MR, BWR and BWP Explained', size: '600 × 380 px', desc: 'Boiling water beaker test and resin chemical bonding illustration' },
  { match: 'Block Board or Plywood: Which One to Use?', size: '600 × 380 px', desc: 'Side-by-side comparison of timber batten core vs cross-band plies' },
  { match: 'How to Spot Quality Plywood Before You Buy', size: '600 × 380 px', desc: 'Technician measuring edge thickness with a digital vernier caliper' },
  { match: 'Choosing a Flush Door', size: '600 × 380 px', desc: 'Cutaway view of solid timber stiles and sound-insulating core battens' }
];

guideThumbs.forEach(gt => {
  const needle = `<h2 style="font-size:1.6rem;margin:.75rem 0 .5rem;">${gt.match}</h2>`;
  const replacement = `
              <div class="img-placeholder img-ratio-16-9" style="margin-bottom:1.25rem;">
                <div class="img-placeholder-size">Image: ${gt.size}</div>
                <p class="img-placeholder-desc">${gt.desc}</p>
              </div>
              ${needle}`;
  if (!resIndex.includes(`Image: ${gt.size}`)) {
    resIndex = resIndex.replace(needle, replacement);
  }
});

// Update social icons in footer of resources/index.html
if (!resIndex.includes('ftr-social-icons')) {
  resIndex = resIndex.replace(/<p style="max-width:32ch">Calibrated plywood, block board and flush doors, made in Kutch, Gujarat\.<\/p>/, 
    `<p style="max-width:32ch">Calibrated plywood, block board and flush doors, made in Kutch, Gujarat.</p>
          <div class="ftr-social-icons" style="margin-top:1rem;" aria-label="Umeka Social Profiles">
            <a class="ftr-social-link" href="https://facebook.com/umekaply" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a class="ftr-social-link" href="https://www.instagram.com/umeka.ply" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a class="ftr-social-link" href="https://youtube.com/@umekaply" target="_blank" rel="noopener" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>`);
}

fs.writeFileSync(path.join(root, 'resources/index.html'), resIndex, 'utf8');
console.log('Updated resources/index.html');

// 2. Update individual resource guide articles
const guideFiles = [
  {
    file: 'resources/how-to-choose-plywood.html',
    badge: 'Guide Visual',
    size: '1200 × 540 px',
    desc: 'Comprehensive diagram showing hardwood core veneers, glue lines, face veneers, and calibrated thickness standards'
  },
  {
    file: 'resources/mr-bwr-bwp-explained.html',
    badge: 'Standards Visual',
    size: '1200 × 540 px',
    desc: 'Laboratory water immersion bath testing comparison between MR, BWR, and BWP marine grade boards'
  },
  {
    file: 'resources/block-board-vs-plywood.html',
    badge: 'Comparison Visual',
    size: '1200 × 540 px',
    desc: 'Visual cross-section comparison between solid timber batten core (block board) and cross-laminated veneers (plywood)'
  },
  {
    file: 'resources/choosing-flush-door.html',
    badge: 'Door Engineering Visual',
    size: '1200 × 540 px',
    desc: 'Cutaway architectural drawing of solid wooden flush door stiles, lock block placement, and calibrated skins'
  },
  {
    file: 'resources/how-to-spot-quality-plywood.html',
    badge: 'Inspection Checklist Visual',
    size: '1200 × 540 px',
    desc: 'Master carpenter performing on-site quality checks: edge void inspection, coin tap resonance test, and caliper measurement'
  }
];

guideFiles.forEach(gf => {
  const filePath = path.join(root, gf.file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/Noto\+Serif\+Display[^"']*/g, 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700');
  content = content.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');

  if (!content.includes('guide-hero-visual')) {
    const visualHtml = `
        <!-- Guide Hero Featured Visual Placeholder -->
        <div class="img-placeholder img-ratio-2-1 guide-hero-visual" style="max-width:1150px;margin:2.75rem auto 0;">
          <span class="img-placeholder-badge">${gf.badge}</span>
          <div class="img-placeholder-size">Recommended Image: ${gf.size}</div>
          <p class="img-placeholder-desc">${gf.desc}</p>
        </div>
      </div>
    </section>`;
    content = content.replace(/<\/div>\s*<\/section>/, visualHtml);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated:', gf.file);
});
