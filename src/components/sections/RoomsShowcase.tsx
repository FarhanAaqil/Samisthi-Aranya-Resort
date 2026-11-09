'use client';

import { Check, Images, MessageCircle, Phone, Users } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { PhotoViewer } from '@/components/PhotoViewer';
import { Button } from '@/components/ui/Button';
import type { RoomCategory } from '@/data/rooms';
import { cn } from '@/lib/cn';
import { formatINR } from '@/lib/format';
import { telHref, whatsappHref } from '@/lib/links';

type Variant = 'ac' | 'nonAc';

const VARIANTS: Array<{ id: Variant; label: string }> = [
  { id: 'ac', label: 'AC' },
  { id: 'nonAc', label: 'Non-AC' },
];

interface RoomsShowcaseProps {
  rooms: RoomCategory[];
}

export function RoomsShowcase({ rooms }: RoomsShowcaseProps) {
  const [variant, setVariant] = useState<Variant>('ac');
  const [viewer, setViewer] = useState<{ room: RoomCategory; index: number } | null>(null);

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3" data-reveal>
        <p id="rate-label" className="text-sm font-medium text-ink-soft">
          Show rates for
        </p>
        <div
          role="group"
          aria-labelledby="rate-label"
          className="inline-flex rounded-full border border-wine/25 bg-petal p-1"
        >
          {VARIANTS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={variant === id}
              onClick={() => setVariant(id)}
              className={cn(
                'h-10 min-w-24 rounded-full px-5 text-sm font-medium transition-colors',
                variant === id ? 'bg-wine text-petal' : 'text-wine hover:bg-wine/8',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-7 md:grid-cols-2">
        {rooms.map((room) => {
          const rate = variant === 'ac' ? room.acRate : room.nonAcRate;
          const otherRate = variant === 'ac' ? room.nonAcRate : room.acRate;
          const otherLabel = variant === 'ac' ? 'Non-AC' : 'AC';
          const cover = room.photos[0];

          return (
            <article
              key={room.id}
              data-reveal
              className="flex flex-col overflow-hidden rounded-[1.75rem] border border-wine/10 bg-petal shadow-soft"
            >
              <div className="group relative">
                <button
                  type="button"
                  onClick={() => setViewer({ room, index: 0 })}
                  aria-label={`View all ${room.photos.length} photos of the ${room.name}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden rounded-none bg-clay"
                >
                  <Image
                    src={cover.image}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </button>
                <p className="pointer-events-none absolute top-4 left-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-petal/95 px-3 py-1.5 text-wine">
                    <Users className="size-3.5" aria-hidden="true" />
                    Sleeps {room.guests}
                  </span>
                  <span className="rounded-full bg-petal/95 px-3 py-1.5 text-wine">
                    {room.count} {room.count === 1 ? 'room' : 'rooms'}
                  </span>
                </p>
                <p className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-wine/90 px-3.5 py-2 text-xs font-medium text-petal">
                  <Images className="size-3.5" aria-hidden="true" />
                  {room.photos.length} photos
                </p>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-xs font-semibold tracking-[0.18em] text-gold-deep uppercase">
                  {room.suits}
                </p>
                <h3 className="mt-1.5 font-display text-3xl font-semibold text-wine">
                  {room.name}
                </h3>
                <p className="mt-3 text-ink-soft">{room.summary}</p>

                <ul className="mt-5 grid gap-x-4 gap-y-2 text-sm text-ink sm:grid-cols-2">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="size-4 shrink-0 text-gold" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-wine/12 pt-5">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-ink-soft uppercase">
                      {variant === 'ac' ? 'AC' : 'Non-AC'} · per room · 24 hours
                    </p>
                    <p className="mt-1 font-display text-5xl leading-none font-semibold text-wine">
                      {formatINR(rate)}
                    </p>
                    <p className="mt-1.5 text-xs text-ink-soft">GST included</p>
                  </div>
                  <p className="pb-1 text-right text-sm text-ink-soft">
                    {otherLabel}
                    <br />
                    <span className="font-semibold text-wine">{formatINR(otherRate)}</span>
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Button href={whatsappHref(room.whatsappMessage)} external>
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Ask on WhatsApp
                  </Button>
                  <Button href={telHref} variant="secondary">
                    <Phone className="size-4" aria-hidden="true" />
                    Call to book
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {viewer && (
        <PhotoViewer
          title={viewer.room.name}
          photos={viewer.room.photos}
          index={viewer.index}
          onIndexChange={(index) => setViewer({ room: viewer.room, index })}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  );
}
