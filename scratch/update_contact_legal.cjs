const fs = require('fs');
const path = require('path');

const root = 'e:/Umeka/Umeka_Website';

// 1. Update contact/index.html
let contact = fs.readFileSync(path.join(root, 'contact/index.html'), 'utf8');
contact = contact.replace(/Noto\+Serif\+Display[^"']*/g, 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700');
contact = contact.replace(/<img src="(?:\.\.\/)?assets\/images\/logo\.png" alt="Umeka Logo" class="brand-logo-img">/g, 
  `<img src="../assets/images/logo-color.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-light">\n        <img src="../assets/images/logo-white.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-dark">`);
contact = contact.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');

// Add location visual placeholders in contact info panel
if (!contact.includes('contact-locations-visual')) {
  const locVisuals = `
            <div class="contact-locations-visual" style="margin-top:2rem;display:grid;gap:1.25rem;">
              <div class="img-placeholder img-ratio-16-9" style="background:rgba(255,255,255,0.06);border-color:rgba(197,155,39,0.35);">
                <span class="img-placeholder-badge">Sales Office</span>
                <div class="img-placeholder-size" style="color:var(--white);background:rgba(0,0,0,0.3);">Map / Photo: 600 × 320 px</div>
                <p class="img-placeholder-desc" style="color:rgba(255,255,255,0.85);">Ahmedabad Sales Office &amp; Sample Lounge, Sarkhej-Sanand Road</p>
              </div>

              <div class="img-placeholder img-ratio-16-9" style="background:rgba(255,255,255,0.06);border-color:rgba(197,155,39,0.35);">
                <span class="img-placeholder-badge">Plant Unit</span>
                <div class="img-placeholder-size" style="color:var(--white);background:rgba(0,0,0,0.3);">Map / Photo: 600 × 320 px</div>
                <p class="img-placeholder-desc" style="color:rgba(255,255,255,0.85);">Kutch Manufacturing Plant &amp; Dispatch Bay, Chopadva, Bhachau</p>
              </div>
            </div>`;
  contact = contact.replace(/<\/dl>\s*<\/div>/, '</dl>' + locVisuals + '\n          </div>');
}

fs.writeFileSync(path.join(root, 'contact/index.html'), contact, 'utf8');
console.log('Updated contact/index.html');

// 2. Update legal pages
['privacy-policy.html', 'terms.html', 'sitemap.html'].forEach(f => {
  const filePath = path.join(root, f);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/Noto\+Serif\+Display[^"']*/g, 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700');
  content = content.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated:', f);
});
