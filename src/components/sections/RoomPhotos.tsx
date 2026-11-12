'use client';

import { Images } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { PhotoViewer } from '@/components/PhotoViewer';
import type { Photo } from '@/data/photos';

interface RoomPhotosProps {
  name: string;
  photos: Photo[];
}

/** The room's cover photograph; opens every photo of the room in the viewer. */
export function RoomPhotos({ name, photos }: RoomPhotosProps) {
  const [index, setIndex] = useState<number | null>(null);
  const cover = photos[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setIndex(0)}
        aria-label={`View all ${photos.length} photos of the ${name}`}
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-stone"
      >
        <Image
          src={cover.image}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        />
        <span className="eyebrow absolute right-0 bottom-0 inline-flex items-center gap-2 bg-forest-deep/85 px-4 py-3 text-[0.62rem] text-ivory">
          <Images className="size-3.5" aria-hidden="true" />
          {photos.length} photos
        </span>
      </button>

      {index !== null && (
        <PhotoViewer
          title={name}
          photos={photos}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setIndex(null)}
        />
      )}
    </>
  );
}
