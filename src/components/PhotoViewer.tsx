'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import type { Photo } from '@/data/photos';
import { cn } from '@/lib/cn';

interface PhotoViewerProps {
  /** Shown as the dialog's accessible name. */
  title: string;
  photos: Photo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * Full-screen photo viewer built on the native <dialog> element, which gives us a real focus
 * trap, an inert page behind it and Escape-to-close without extra code. Mount it only while open.
 */
export function PhotoViewer({ title, photos, index, onIndexChange, onClose }: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photo = photos[index];
  const many = photos.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    return () => {
      root.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, []);

  const step = (direction: 1 | -1) =>
    onIndexChange((index + direction + photos.length) % photos.length);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!many) return;
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-[94vh] w-[min(96vw,60rem)] overflow-hidden rounded-3xl bg-petal p-0 text-ink shadow-lift backdrop:bg-ink/75 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <h2 className="truncate font-display text-2xl font-semibold text-wine">{title}</h2>
          <p className="text-sm text-ink-soft">
            Photo {index + 1} of {photos.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-wine/30 text-wine transition-colors hover:bg-wine/8"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative h-[52vh] bg-clay sm:h-[58vh]">
        <Image
          key={photo.alt}
          src={photo.image}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 960px, 96vw"
          className="object-contain"
        />
        {many && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-petal/90 text-wine shadow-soft transition-colors hover:bg-petal"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-petal/90 text-wine shadow-soft transition-colors hover:bg-petal"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <div className="px-5 pt-4 pb-5 sm:px-6">
        <p className="text-sm text-ink-soft">{photo.caption}</p>
        {many && (
          <ul className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="All photos">
            {photos.map((item, i) => (
              <li key={item.alt} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={`Show photo ${i + 1}: ${item.caption}`}
                  aria-current={i === index ? 'true' : undefined}
                  className={cn(
                    'relative block h-14 w-[4.5rem] overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-petal transition',
                    i === index ? 'ring-wine' : 'opacity-70 ring-transparent hover:opacity-100',
                  )}
                >
                  <Image src={item.image} alt="" fill sizes="72px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
