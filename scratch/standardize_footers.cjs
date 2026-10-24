const fs = require('fs');
const path = require('path');

const root = 'e:/Umeka/Umeka_Website';

const remainingFiles = [
  'contact/index.html',
  'dealers/index.html',
  'privacy-policy.html',
  'terms.html',
  'sitemap.html',
  'why-umeka/standards.html'
];

remainingFiles.forEach(rel => {
  const filePath = path.join(root, rel);
  let content = fs.readFileSync(filePath, 'utf8');

  // Determine relative prefix for assets/links:
  const isSubdir = rel.includes('/') || rel.includes('\\');
  const pfx = isSubdir ? '../' : './';

  const fullFooter = `  <!-- Global Footer -->
  <footer class="ftr">
    <div class="wrap">
      <div class="ftr-grid">
        <div>
          <a class="brand-link" href="${pfx}index.html">
            <img src="${pfx}assets/images/logo-white.png" alt="Umeka Logo" style="height:2.85rem;object-fit:contain;">
          </a>
          <p class="ftr-brand-desc">
            Calibrated plywood, block board and flush doors, manufactured with precision in Kutch, Gujarat. Trusted with Pride across India.
          </p>
          <!-- Footer Social Media Icons -->
          <div class="ftr-social-icons" style="margin-top:1rem;display:flex;gap:0.75rem;align-items:center;" aria-label="Umeka Social Profiles">
            <a class="ftr-social-link" href="https://facebook.com/umekaply" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:1.25rem;height:1.25rem;color:rgba(255,255,255,0.85);"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a class="ftr-social-link" href="https://www.instagram.com/umeka.ply" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25rem;height:1.25rem;color:rgba(255,255,255,0.85);"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a class="ftr-social-link" href="https://youtube.com/@umekaply" target="_blank" rel="noopener" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:1.25rem;height:1.25rem;color:rgba(255,255,255,0.85);"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4>Products</h4>
          <ul>
            <li><a href="${pfx}products/calibrated-plywood.html">Calibrated Plywood</a></li>
            <li><a href="${pfx}products/block-board.html">Block Board</a></li>
            <li><a href="${pfx}products/flush-doors.html">Flush Doors</a></li>
            <li><a href="${pfx}products/index.html">All Products Overview</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="${pfx}about/index.html">About Umeka</a></li>
            <li><a href="${pfx}why-umeka/index.html">Why Umeka</a></li>
            <li><a href="${pfx}why-umeka/standards.html">Standards &amp; Testing</a></li>
            <li><a href="${pfx}dealers/index.html">Dealers</a></li>
            <li><a href="${pfx}professionals/index.html">For Professionals</a></li>
            <li><a href="${pfx}resources/index.html">Resources</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact &amp; Plants</h4>
          <address>
            <strong>Ahmedabad Sales Office</strong>
            E-1, Highway Estate, Opp. Kiran Motors Workshop, Sarkhej-Sanand Road, Sarkhej, Ahmedabad 382 210
          </address>
          <address>
            <strong>Kutch Manufacturing Plant</strong>
            Survey No. 416, 1 &amp; 2, Chopadva, Bhachau, Kutch 370 140
          </address>
          <address>
            <a href="tel:+919725208788">+91 97252 08788</a><br>
            <a href="mailto:info@umekainternational.in">info@umekainternational.in</a>
          </address>
        </div>
      </div>
      <div class="ftr-base">
        <span>© <span id="yr">2026</span> Umeka. All rights reserved.</span>
        <div class="ftr-base-links">
          <a href="${pfx}privacy-policy.html">Privacy Policy</a>
          <a href="${pfx}terms.html">Terms of Service</a>
          <a href="${pfx}sitemap.html">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>`;

  // Replace existing footer
  content = content.replace(/<footer class="ftr">[\s\S]*?<\/footer>/, fullFooter);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Standardized footer in:', rel);
});
