'use client';

import Image from 'next/image';
import { useState } from 'react';

import { PhotoViewer } from '@/components/PhotoViewer';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GALLERY_GROUPS, GALLERY_ITEMS, type GalleryGroup } from '@/data/gallery';
import { cn } from '@/lib/cn';

export function Gallery() {
  const [group, setGroup] = useState<GalleryGroup | 'all'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items =
    group === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.group === group);

  return (
    <Section id="gallery" tone="sand">
      <SectionHeading
        eyebrow="Gallery"
        title="The resort, as guests find it"
        lead="Every photograph here was taken at Samisthi Aranya Resorts. Tap any picture to see it larger."
      />

      <div
        role="group"
        aria-label="Filter photos"
        className="mt-8 flex flex-wrap gap-2"
        data-reveal
      >
        {GALLERY_GROUPS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={group === id}
            onClick={() => {
              setGroup(id);
              setOpenIndex(null);
            }}
            className={cn(
              'h-10 rounded-full border px-5 text-sm font-medium transition-colors',
              group === id
                ? 'border-wine bg-wine text-petal'
                : 'border-wine/30 text-wine hover:bg-wine/8',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="mt-8 columns-2 gap-4 sm:gap-5 lg:columns-3">
        {items.map((item, index) => (
          <li key={item.id} className="mb-4 break-inside-avoid sm:mb-5">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open photo: ${item.caption}`}
              className="group relative block w-full overflow-hidden rounded-2xl bg-clay shadow-soft"
            >
              <Image
                src={item.image}
                alt={item.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine-deep/80 to-transparent px-4 pt-10 pb-3 text-left text-xs leading-snug text-petal opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:hidden">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <PhotoViewer
          title="Resort gallery"
          photos={items}
          index={Math.min(openIndex, items.length - 1)}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </Section>
  );
}
