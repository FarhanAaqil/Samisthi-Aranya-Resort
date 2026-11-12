import Image from 'next/image';

import type { Photo } from '@/data/photos';
import { cn } from '@/lib/cn';

interface PictureProps {
  photo: Photo;
  /** Tells the browser how wide the image renders, so it downloads the right size. */
  sizes: string;
  priority?: boolean;
  /** Classes for the frame: give it an aspect ratio or a height and any rounding. */
  className?: string;
  /** Classes for the image itself, such as object position. */
  imageClassName?: string;
}

/** A photo that fills its frame. The frame must have a size, for example an aspect ratio. */
export function Picture({ photo, sizes, priority, className, imageClassName }: PictureProps) {
  return (
    <div className={cn('relative overflow-hidden bg-stone', className)}>
      <Image
        src={photo.image}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
