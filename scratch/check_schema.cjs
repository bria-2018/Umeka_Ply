const fs = require('fs');
const path = require('path');

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

walk('e:/Umeka/Umeka_Website').forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const hasSchema = c.includes('application/ld+json');
  const schemaMatches = c.match(/"@type":\s*"([^"]+)"/g) || [];
  const types = schemaMatches.map(m => m.replace(/"@type":\s*"/, '').replace(/"/, '')).join(', ');
  console.log(path.relative('e:/Umeka/Umeka_Website', f).padEnd(45), 'Schema:', types || 'None');
});
