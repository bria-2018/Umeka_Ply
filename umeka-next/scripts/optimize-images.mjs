/**
 * Image optimisation pipeline for the Umeka website.
 *
 * Reads every image in ./source-images (recursively), and writes responsive
 * AVIF, WebP and JPEG versions to ./public/images/<name>-<width>.<ext>.
 * It also writes ./src/content/image-manifest.json, which the <Picture>
 * component uses to build srcset/sizes, reserve layout space and show a
 * tiny blurred preview while the real image loads.
 *
 * Usage:  npm run images            (only processes new/changed files)
 *         npm run images -- --force (rebuild everything)
 *
 * To replace a photo: drop a new file into source-images with the same base
 * name (e.g. source-images/lifestyle/hero-living-panelling.jpg) and re-run.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const SRC = path.join(ROOT, 'source-images');
const OUT = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'src', 'content', 'image-manifest.json');
const WIDTHS = [640, 1024, 1600, 1920];
const FORCE = process.argv.includes('--force');
const EXT = /\.(jpe?g|png|webp|tiff?)$/i;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  );
  return files.flat().filter((f) => EXT.test(f));
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  let manifest = {};
  if (!FORCE && (await exists(MANIFEST))) {
    manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
  }

  const files = await walk(SRC);
  for (const file of files) {
    const name = path.basename(file).replace(EXT, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const stat = await fs.stat(file);
    const prev = manifest[name];
    if (!FORCE && prev && prev.mtime === stat.mtimeMs) {
      continue;
    }

    const base = sharp(file, { limitInputPixels: false }).rotate();
    const meta = await base.metadata();
    const widths = WIDTHS.filter((w) => w < meta.width).concat(meta.width < WIDTHS.at(-1) ? [meta.width] : []);
    const finalWidths = [...new Set(widths.length ? widths : [meta.width])].sort((a, b) => a - b);

    process.stdout.write(`• ${name} (${meta.width}×${meta.height}) → ${finalWidths.join(', ')}\n`);
    for (const w of finalWidths) {
      const resized = base.clone().resize({ width: w, withoutEnlargement: true });
      await Promise.all([
        resized.clone().avif({ quality: 52, effort: 4 }).toFile(path.join(OUT, `${name}-${w}.avif`)),
        resized.clone().webp({ quality: 74 }).toFile(path.join(OUT, `${name}-${w}.webp`)),
        resized.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(path.join(OUT, `${name}-${w}.jpg`)),
      ]);
    }

    const blurBuf = await base.clone().resize({ width: 24 }).jpeg({ quality: 45 }).toBuffer();
    manifest[name] = {
      width: meta.width,
      height: meta.height,
      widths: finalWidths,
      blur: `data:image/jpeg;base64,${blurBuf.toString('base64')}`,
      mtime: stat.mtimeMs,
    };
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await fs.writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`\nDone. ${Object.keys(sorted).length} images in manifest.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
