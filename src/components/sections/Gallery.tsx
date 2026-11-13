'use client';

import Image from 'next/image';
import { useState } from 'react';

import { PhotoViewer } from '@/components/PhotoViewer';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonClasses } from '@/components/ui/Button';
import { GALLERY_ITEMS } from '@/data/gallery';
import { cn } from '@/lib/cn';

// The preview shows four photographs; the viewer holds the whole collection.
const PREVIEW = [
  { index: 7, className: 'col-span-2 row-span-2', sizes: '(min-width: 768px) 50vw, 100vw' },
  { index: 1, className: 'row-span-2', sizes: '(min-width: 768px) 25vw, 50vw' },
  { index: 3, className: '', sizes: '(min-width: 768px) 25vw, 50vw' },
  { index: 6, className: '', sizes: '(min-width: 768px) 25vw, 50vw' },
];

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = GALLERY_ITEMS.length;

  return (
    <Section id="gallery" tone="deep" containerSize="wide">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          eyebrow="Gallery"
          title="The resort, as you'll find it"
          lead="Every photograph was taken at Samisthi Aranya."
        />
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className={buttonClasses('secondary')}
          data-reveal
        >
          View all {total} photos
        </button>
      </div>

      <ul
        className="mt-14 grid grid-cols-2 gap-3 max-md:auto-rows-[44vw] md:h-[min(42rem,70vw)] md:grid-cols-4 md:grid-rows-2 md:gap-4"
        data-reveal
      >
        {PREVIEW.map(({ index, className, sizes }, position) => {
          const item = GALLERY_ITEMS[index];
          const last = position === PREVIEW.length - 1;
          return (
            <li key={item.id} className={cn('relative', className)}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={last ? undefined : `Open photo: ${item.caption}`}
                className="group relative block size-full overflow-hidden bg-olive-deep"
              >
                <Image
                  src={item.image}
                  alt={last ? '' : item.alt}
                  fill
                  sizes={sizes}
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
                {last && (
                  <span className="absolute inset-0 grid place-items-center bg-olive-night/60 text-cream transition-colors group-hover:bg-olive-night/75">
                    <span className="text-center">
                      <span className="block font-display text-4xl">
                        +{total - PREVIEW.length + 1}
                      </span>
                      <span className="caps mt-1 block text-[0.62rem]">More photos</span>
                      <span className="sr-only">, view all {total}</span>
                    </span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {openIndex !== null && (
        <PhotoViewer
          title="Samisthi Aranya in photos"
          photos={GALLERY_ITEMS}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </Section>
  );
}
