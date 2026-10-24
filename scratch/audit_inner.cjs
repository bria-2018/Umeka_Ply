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

console.log('Total HTML files found:', files.length);

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const rel = path.relative(root, f);
  const cssMatches = content.match(/href=["'][^"']*\.css["']/g) || [];
  const fontMatches = content.match(/fonts\.googleapis\.com\/css2\?[^"']+/g) || [];
  const title = (content.match(/<title>([^<]+)<\/title>/i) || [])[1] || 'No Title';
  const hasCormorant = fontMatches.some(m => m.includes('Cormorant'));
  const hasLogoColor = content.includes('logo-color.png');
  const hasInsta = content.includes('instagram.com/umeka.ply');
  console.log(`${rel.padEnd(45)} :: Cormorant: ${hasCormorant ? 'YES' : 'NO '} :: logo-color: ${hasLogoColor ? 'YES' : 'NO '} :: insta: ${hasInsta ? 'YES' : 'NO '} :: Title: ${title.substring(0, 40)}`);
});
