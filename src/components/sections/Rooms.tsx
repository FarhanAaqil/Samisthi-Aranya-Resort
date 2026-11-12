import { BookingButton } from '@/components/booking/BookingButton';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RESORT } from '@/data/resort';
import { ROOM_CATEGORIES, TOTAL_GUESTS, TOTAL_ROOMS } from '@/data/rooms';
import { formatINR } from '@/lib/format';

import { RoomPhotos } from './RoomPhotos';

export function Rooms() {
  return (
    <Section id="rooms" tone="stone">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          eyebrow="Stay"
          title="Rooms and suites"
          lead="Every rate is per room for a full 24 hours and includes GST. Call or message the team to confirm availability for your dates."
        />
        <p className="max-w-xs text-sm leading-relaxed text-ink-soft" data-reveal>
          Check-in {RESORT.stay.checkIn}, check-out {RESORT.stay.checkOut}.
          <br />
          {TOTAL_ROOMS} rooms for up to {TOTAL_GUESTS} guests.
        </p>
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {ROOM_CATEGORIES.map((room) => (
          <article key={room.id} className="flex flex-col" data-reveal>
            <RoomPhotos name={room.name} photos={room.photos} />

            <p className="eyebrow mt-7 text-gold-deep">{room.suits}</p>
            <h3 className="mt-3 font-display text-[2rem] leading-tight font-medium text-forest">
              {room.name}
            </h3>
            <p className="mt-3 leading-relaxed font-light text-ink-soft">{room.summary}</p>

            <dl className="mt-6 grid grid-cols-2 border-y border-ink/15">
              <div className="border-r border-ink/15 py-4 pr-4">
                <dt className="eyebrow text-[0.62rem] text-ink-soft">AC</dt>
                <dd className="mt-1 font-display text-3xl text-forest">{formatINR(room.acRate)}</dd>
              </div>
              <div className="py-4 pl-5">
                <dt className="eyebrow text-[0.62rem] text-ink-soft">Non-AC</dt>
                <dd className="mt-1 font-display text-3xl text-forest">
                  {formatINR(room.nonAcRate)}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-ink-soft">
              Sleeps {room.guests} · {room.count} {room.count === 1 ? 'room' : 'rooms'} · per room,
              24 hours
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink">
              {room.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1 bg-gold" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <BookingButton room={room.id} variant="secondary" className="w-full">
                Check availability
              </BookingButton>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
