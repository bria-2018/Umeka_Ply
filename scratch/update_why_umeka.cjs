const fs = require('fs');
const path = require('path');

const root = 'e:/Umeka/Umeka_Website';

// 1. Update why-umeka/index.html
let whyIndex = fs.readFileSync(path.join(root, 'why-umeka/index.html'), 'utf8');
whyIndex = whyIndex.replace(/Noto\+Serif\+Display[^"']*/g, 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700');
whyIndex = whyIndex.replace(/<img src="(?:\.\.\/)?assets\/images\/logo\.png" alt="Umeka Logo" class="brand-logo-img">/g, 
  `<img src="../assets/images/logo-color.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-light">\n        <img src="../assets/images/logo-white.png" alt="Umeka Logo — Trusted with Pride" class="brand-logo-img logo-dark">`);
whyIndex = whyIndex.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');

if (!whyIndex.includes('why-hero-visual')) {
  const heroVisual = `
        <!-- Hero Quality Inspection Visual Placeholder -->
        <div class="img-placeholder img-ratio-2-1 why-hero-visual" style="max-width:1150px;margin:2.75rem auto 0;">
          <span class="img-placeholder-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Quality Verification
          </span>
          <div class="img-placeholder-size">Recommended Image: 1200 × 540 px</div>
          <p class="img-placeholder-desc">Inside the Chopadva, Kutch facility: technicians operating wide-belt calibrating sanders and digital thickness micrometers</p>
        </div>
      </div>
    </section>`;
  whyIndex = whyIndex.replace(/<\/div>\s*<\/section>/, heroVisual);
}

// Update why-umeka/index.html footer with official social icons
if (!whyIndex.includes('ftr-social-icons')) {
  whyIndex = whyIndex.replace(/<p style="max-width:32ch">Calibrated plywood, block board and flush doors, made in Kutch, Gujarat\.<\/p>/, 
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

fs.writeFileSync(path.join(root, 'why-umeka/index.html'), whyIndex, 'utf8');
console.log('Updated why-umeka/index.html');

// 2. Update why-umeka/standards.html
let standards = fs.readFileSync(path.join(root, 'why-umeka/standards.html'), 'utf8');
standards = standards.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');
if (!standards.includes('standards-hero-visual')) {
  const stdVisual = `
        <!-- Standards Testing Visual Placeholder -->
        <div class="img-placeholder img-ratio-2-1 standards-hero-visual" style="max-width:1150px;margin:2.75rem auto 0;">
          <span class="img-placeholder-badge">Laboratory Rig</span>
          <div class="img-placeholder-size">Recommended Image: 1200 × 500 px</div>
          <p class="img-placeholder-desc">Laboratory test apparatus: cyclic boiling water immersion chamber and glue-line shear strength testing rig</p>
        </div>
      </div>
    </section>`;
  standards = standards.replace(/<\/div>\s*<\/section>/, stdVisual);
}
fs.writeFileSync(path.join(root, 'why-umeka/standards.html'), standards, 'utf8');
console.log('Updated why-umeka/standards.html');

// 3. Update why-umeka/warranty.html
let warranty = fs.readFileSync(path.join(root, 'why-umeka/warranty.html'), 'utf8');
warranty = warranty.replace(/https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g, 'https://www.instagram.com/umeka.ply');
if (!warranty.includes('warranty-hero-visual')) {
  const warVisual = `
        <!-- Warranty Seal Visual Placeholder -->
        <div class="img-placeholder img-ratio-2-1 warranty-hero-visual" style="max-width:1150px;margin:2.75rem auto 0;">
          <span class="img-placeholder-badge">Authenticity &amp; Warranty</span>
          <div class="img-placeholder-size">Recommended Image: 1200 × 500 px</div>
          <p class="img-placeholder-desc">Official Umeka hologram seal and factory serial batch code printed along the calibrated board edge</p>
        </div>
      </div>
    </section>`;
  warranty = warranty.replace(/<\/div>\s*<\/section>/, warVisual);
}
fs.writeFileSync(path.join(root, 'why-umeka/warranty.html'), warranty, 'utf8');
console.log('Updated why-umeka/warranty.html');
