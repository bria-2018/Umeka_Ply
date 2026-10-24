/**
 * Generates favicon.png (512px) and apple-touch-icon.png (180px) from the
 * emblem portion of the colour logo. Run: node scripts/make-icons.mjs
 * Replace with designer-supplied icons when available.
 */
import sharp from 'sharp';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const src = path.join(root, 'public', 'brand', 'umeka-logo-color.png');

const emblem = await sharp(src).extract({ left: 0, top: 0, width: 362, height: 350 }).toBuffer();
const square = sharp({ create: { width: 400, height: 400, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([
  { input: emblem, top: 25, left: 19 },
]);
const buf = await square.png().toBuffer();
await sharp(buf).resize(512, 512).png().toFile(path.join(root, 'public', 'favicon.png'));
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#f7f5f2' } })
  .composite([{ input: await sharp(buf).resize(160, 160).png().toBuffer(), top: 10, left: 10 }])
  .png()
  .toFile(path.join(root, 'public', 'apple-touch-icon.png'));
console.log('Icons written.');
