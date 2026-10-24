import { getImage, srcSet } from '@/lib/images';

type PictureProps = {
  name: string;
  alt: string;
  /** Responsive sizes hint, e.g. "(min-width: 1024px) 50vw, 100vw" */
  sizes?: string;
  /** Fill the parent (parent must be positioned and sized). */
  fill?: boolean;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Responsive <picture> with AVIF → WebP → JPEG fallbacks, reserved aspect
 * ratio (no layout shift), blurred preview and native lazy-loading.
 * If an image is missing from the manifest, a clearly labelled placeholder
 * is rendered instead so gaps are easy to spot before launch.
 */
export function Picture({ name, alt, sizes = '100vw', fill, priority, className = '', imgClassName = '' }: PictureProps) {
  const entry = getImage(name);

  if (!entry) {
    return (
      <div
        role="img"
        aria-label={`${alt} (image to be supplied)`}
        className={`flex items-center justify-center bg-gradient-to-br from-oak to-walnut/60 text-center text-xs font-medium uppercase tracking-[0.2em] text-forest-950/70 ${fill ? 'absolute inset-0' : 'aspect-[3/2]'} ${className}`}
      >
        Image to be supplied
      </div>
    );
  }

  const largest = entry.widths[entry.widths.length - 1];
  const fallbackW = entry.widths.find((w) => w >= 1024) ?? largest;

  return (
    <picture className={`${fill ? 'absolute inset-0 block' : 'block'} ${className}`}>
      <source type="image/avif" srcSet={srcSet(name, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, 'webp')} sizes={sizes} />
      <img
        src={`/images/${name}-${fallbackW}.jpg`}
        srcSet={srcSet(name, 'jpg')}
        sizes={sizes}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={`${fill ? 'h-full w-full object-cover' : 'h-auto w-full'} ${imgClassName}`}
        style={{ backgroundImage: `url(${entry.blur})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
    </picture>
  );
}
