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
      className="m-auto max-h-[96vh] w-[min(96vw,68rem)] overflow-hidden border border-brass/30 bg-olive-deep p-0 text-cream shadow-lift backdrop:bg-olive-night/92"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <h2 className="truncate font-display text-2xl text-cream">{title}</h2>
          <p className="text-sm text-cream-soft">
            Photo {index + 1} of {photos.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="grid size-11 shrink-0 place-items-center border border-cream/25 text-cream transition-colors hover:border-brass hover:text-brass-light"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative h-[56vh] bg-olive-night sm:h-[64vh]">
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
              className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center bg-olive-deep/90 text-cream transition-colors hover:bg-olive-deep"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center bg-olive-deep/90 text-cream transition-colors hover:bg-olive-deep"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <div className="px-5 pt-4 pb-5 sm:px-6">
        <p className="text-sm text-cream-soft">{photo.caption}</p>
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
                    'relative block h-14 w-[4.5rem] overflow-hidden ring-2 ring-offset-2 ring-offset-olive-deep transition',
                    i === index ? 'ring-brass' : 'opacity-60 ring-transparent hover:opacity-100',
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
