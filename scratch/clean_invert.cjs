const fs = require('fs');

['professionals/index.html', 'resources/index.html', 'why-umeka/index.html'].forEach(f => {
  const p = 'e:/Umeka/Umeka_Website/' + f;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/filter:brightness\(0\)\s*invert\(1\);?/g, 'object-fit:contain;');
  c = c.replace(/logo\.png/g, 'logo-white.png');
  fs.writeFileSync(p, c, 'utf8');
  console.log('Cleaned invert logo in:', f);
});
