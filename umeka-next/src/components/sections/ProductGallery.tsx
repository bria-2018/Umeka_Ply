'use client';

import { useState } from 'react';
import { Picture } from '@/components/ui/Picture';

/** Product image gallery with thumbnail switcher. */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand">
        {images.map((img, i) => (
          <div key={img + i} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`} aria-hidden={i !== active}>
            <Picture name={img} alt={`${name} — view ${i + 1}`} fill priority={i === 0} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3" role="group" aria-label="Choose image">
        {images.map((img, i) => (
          <button
            key={img + i}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            aria-label={`Show image ${i + 1} of ${images.length}`}
            className={`relative aspect-[4/3] overflow-hidden rounded-sm transition-all duration-300 ${
              i === active ? 'ring-2 ring-honey ring-offset-2 ring-offset-bone' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Picture name={img} alt="" fill sizes="15vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
