import manifestJson from '@/content/image-manifest.json';

export type ImageEntry = { width: number; height: number; widths: number[]; blur: string };
export const imageManifest = manifestJson as Record<string, ImageEntry>;

export const getImage = (name: string): ImageEntry | undefined => imageManifest[name];

/** URL of the best JPEG rendition at or below `target` px wide (for OG, schema). */
export function imageUrl(name: string, target = 1600, ext: 'jpg' | 'webp' | 'avif' = 'jpg') {
  const entry = imageManifest[name];
  if (!entry) return `/images/hero-living-panelling-1600.jpg`;
  const w = [...entry.widths].reverse().find((x) => x <= target) ?? entry.widths[0];
  return `/images/${name}-${w}.${ext}`;
}

export const srcSet = (name: string, ext: string) => {
  const entry = imageManifest[name];
  if (!entry) return '';
  return entry.widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ');
};
