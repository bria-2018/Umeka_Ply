const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'umeka-next' || file === 'Claude') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(getHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const root = 'e:/Umeka/Umeka_Website';
const files = getHtmlFiles(root);

const socialBlock = `<!-- Footer Social Media Icons -->
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
          </div>`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('instagram.com/umeka.ply')) {
    // Locate the first column in footer
    const target1 = '<p style="max-width:32ch">Calibrated plywood, block board and flush doors, made in Kutch, Gujarat.</p>';
    const target2 = '<p class="ftr-brand-desc">';
    const target3 = 'Calibrated plywood, block board and flush doors, manufactured with precision in Kutch, Gujarat. Trusted with Pride across India.';
    
    if (content.includes(target1)) {
      content = content.replace(target1, target1 + '\n          ' + socialBlock);
    } else if (content.includes(target3)) {
      content = content.replace(target3 + '\n          </p>', target3 + '\n          </p>\n          ' + socialBlock);
    } else {
      // Find footer closing of first col
      const footerMatch = content.match(/<footer class="ftr">[\s\S]*?<div class="wrap">[\s\S]*?<div class="(?:f-grid|ftr-grid)">\s*<div>([\s\S]*?)<\/div>/);
      if (footerMatch && !footerMatch[1].includes('instagram.com/umeka.ply')) {
        const replacement = footerMatch[1] + '\n          ' + socialBlock;
        content = content.replace(footerMatch[1], replacement);
      }
    }
    fs.writeFileSync(f, content, 'utf8');
    console.log('Added social block to:', path.relative(root, f));
  }
});
