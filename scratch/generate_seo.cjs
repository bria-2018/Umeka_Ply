const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'umeka-next' || file === 'Claude' || file === 'Ref') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(getHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const root = 'e:/Umeka/Umeka_Website';
const domain = 'https://www.umekainternational.in';
const htmlFiles = getHtmlFiles(root);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

htmlFiles.forEach(f => {
  let rel = path.relative(root, f).replace(/\\/g, '/');
  let urlPath = rel === 'index.html' ? '' : rel.replace(/\/index\.html$/, '/');
  let priority = '0.8';
  if (rel === 'index.html') priority = '1.0';
  else if (rel.startsWith('products/')) priority = '0.9';
  else if (rel.startsWith('applications/')) priority = '0.9';

  xml += `  <url>
    <loc>${domain}/${urlPath}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
});

xml += `</urlset>`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml, 'utf8');
console.log('Created sitemap.xml with', htmlFiles.length, 'URLs');

const robots = `# Umeka Robots.txt
User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

fs.writeFileSync(path.join(root, 'robots.txt'), robots, 'utf8');
console.log('Created robots.txt');
