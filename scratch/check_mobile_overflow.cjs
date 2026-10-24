const fs = require('fs');
const path = require('path');

// Check all HTML files for elements that might cause horizontal overflow on mobile
function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    if (f === 'node_modules' || f === '.git' || f === 'umeka-next' || f === 'Claude' || f === 'Ref') return;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (f.endsWith('.html')) res.push(p);
  });
  return res;
}

const files = walk('e:/Umeka/Umeka_Website');
console.log('Checking inline styles and tables across', files.length, 'files...');

let issues = 0;
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const rel = path.relative('e:/Umeka/Umeka_Website', f);

  // Check if tables are wrapped in an overflow container
  const tableMatches = content.match(/<table[\s\S]*?<\/table>/gi) || [];
  tableMatches.forEach(table => {
    // Check if table is preceded by spec-table-wrap or similar overflow wrapper
    const idx = content.indexOf(table);
    const before = content.substring(Math.max(0, idx - 150), idx);
    if (!before.includes('overflow') && !before.includes('spec-table-wrap') && !before.includes('table-wrap')) {
      console.log('Warning: table without overflow wrapper in', rel);
      issues++;
    }
  });

  // Check fixed pixel widths > 360px in inline styles
  const widthMatches = content.match(/style=["'][^"']*width:\s*([4-9]\d{2,}|[1-9]\d{3,})px/gi) || [];
  if (widthMatches.length > 0) {
    console.log('Fixed wide width in', rel, ':', widthMatches);
    issues++;
  }
});

if (issues === 0) {
  console.log('All pages verified clean of fixed overflow width issues!');
} else {
  console.log('Found', issues, 'potential mobile issues.');
}
