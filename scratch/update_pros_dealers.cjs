const fs = require('fs');
const path = require('path');

const root = 'e:/Umeka/Umeka_Website';

// 1. Update dealers/index.html
let dealers = fs.readFileSync(path.join(root, 'dealers/index.html'), 'utf8');
dealers = dealers.replace(/Noto\+Serif\+Display[^"']*/g, 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700');
dealers = dealers.replace(/<img src="(?:\.\.\/)?assets\/images\/logo\.png" alt="Umeka Logo" class="brand-logo-img">/g, 
  `<img src="../assets/images/logo-color.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-light">\n        <img src="../assets/images/logo-white.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-dark">`);
dealers = dealers.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');

if (!dealers.includes('dealer-hero-visual')) {
  const dHeroVisual = `
        <!-- Dealer Network Visual Placeholder -->
        <div class="img-placeholder img-ratio-2-1 dealer-hero-visual" style="max-width:1150px;margin:2.75rem auto 0;">
          <span class="img-placeholder-badge">Showroom Network</span>
          <div class="img-placeholder-size">Recommended Image: 1200 × 540 px</div>
          <p class="img-placeholder-desc">Authorized Umeka dealer showroom interior featuring clean brand display racks, calibrated plywood samples, and technical consultation counter</p>
        </div>
      </div>
    </section>`;
  dealers = dealers.replace(/<\/div>\s*<\/section>/, dHeroVisual);
}

// Add sample rack placeholder in strengths section
if (!dealers.includes('dealer-kit-visual')) {
  const dKitVisual = `
        <!-- Dealer Merchandising & Kit Visual -->
        <div class="img-placeholder img-ratio-16-9 dealer-kit-visual" style="max-width:850px;margin:3rem auto 0;">
          <span class="img-placeholder-badge">Trade Merchandising</span>
          <div class="img-placeholder-size">Recommended Image: 800 × 450 px</div>
          <p class="img-placeholder-desc">Umeka Dealer Point-of-Sale display stand, sample swatches box, and architectural brochures</p>
        </div>
      </div>
    </section>`;
  dealers = dealers.replace(/<\/div>\s*<\/section>\s*<!-- Dealer Application Form -->/, dKitVisual + '\n    <!-- Dealer Application Form -->');
}

fs.writeFileSync(path.join(root, 'dealers/index.html'), dealers, 'utf8');
console.log('Updated dealers/index.html');

// 2. Update professionals/index.html
let prosIndex = fs.readFileSync(path.join(root, 'professionals/index.html'), 'utf8');
prosIndex = prosIndex.replace(/Noto\+Serif\+Display[^"']*/g, 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700');
prosIndex = prosIndex.replace(/<img src="(?:\.\.\/)?assets\/images\/logo\.png" alt="Umeka Logo" class="brand-logo-img">/g, 
  `<img src="../assets/images/logo-color.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-light">\n        <img src="../assets/images/logo-white.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-dark">`);
prosIndex = prosIndex.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');

if (!prosIndex.includes('pros-hero-visual')) {
  const pHeroVisual = `
        <!-- Professionals Hero Visual Placeholder -->
        <div class="img-placeholder img-ratio-2-1 pros-hero-visual" style="max-width:1150px;margin:2.75rem auto 0;">
          <span class="img-placeholder-badge">Architectural Collaboration</span>
          <div class="img-placeholder-size">Recommended Image: 1200 × 540 px</div>
          <p class="img-placeholder-desc">Architects, contractors, and project managers reviewing calibrated plywood joinery specifications on an active site</p>
        </div>
      </div>
    </section>`;
  prosIndex = prosIndex.replace(/<\/div>\s*<\/section>/, pHeroVisual);
}

fs.writeFileSync(path.join(root, 'professionals/index.html'), prosIndex, 'utf8');
console.log('Updated professionals/index.html');

// 3. Update professionals subpages
const proSubpages = [
  {
    file: 'professionals/architects-designers.html',
    badge: 'Design Collaboration',
    size: '1200 × 540 px',
    desc: 'Architectural studio table with material sample boards, blueprints, and calibrated wood veneer swatches'
  },
  {
    file: 'professionals/contractors-carpenters.html',
    badge: 'On-Site Precision',
    size: '1200 × 540 px',
    desc: 'Master carpenters cutting and assembling zero-gap modular cabinetry using Umeka calibrated boards on site'
  },
  {
    file: 'professionals/project-buyers.html',
    badge: 'Bulk Procurement',
    size: '1200 × 540 px',
    desc: 'Neatly organized warehouse dispatch bay at Chopadva, Kutch loading container trucks with verified batch pallets'
  }
];

proSubpages.forEach(sp => {
  const filePath = path.join(root, sp.file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/Noto\+Serif\+Display[^"']*/g, 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700');
  content = content.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');

  if (!content.includes('pro-sub-visual')) {
    const visualHtml = `
        <!-- Hero Visual Placeholder -->
        <div class="img-placeholder img-ratio-2-1 pro-sub-visual" style="max-width:1150px;margin:2.75rem auto 0;">
          <span class="img-placeholder-badge">${sp.badge}</span>
          <div class="img-placeholder-size">Recommended Image: ${sp.size}</div>
          <p class="img-placeholder-desc">${sp.desc}</p>
        </div>
      </div>
    </section>`;
    content = content.replace(/<\/div>\s*<\/section>/, visualHtml);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated:', sp.file);
});
