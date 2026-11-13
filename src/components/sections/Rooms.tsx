import { BookingButton } from '@/components/booking/BookingButton';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RESORT } from '@/data/resort';
import { ROOM_CATEGORIES, TOTAL_GUESTS, TOTAL_ROOMS } from '@/data/rooms';
import { cn } from '@/lib/cn';
import { formatINR } from '@/lib/format';

import { RoomPhotos } from './RoomPhotos';

export function Rooms() {
  return (
    <Section id="rooms" tone="deep">
      <SectionHeading
        align="center"
        eyebrow="Stay"
        title="Rooms & Suites"
        lead={`${TOTAL_ROOMS} rooms for up to ${TOTAL_GUESTS} guests. Every rate is per room for a full 24 hours and includes GST, with check-in at ${RESORT.stay.checkIn} and check-out at ${RESORT.stay.checkOut}.`}
      />

      <div className="mt-20 space-y-20 lg:space-y-28">
        {ROOM_CATEGORIES.map((room, index) => (
          <article
            key={room.id}
            className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
            data-reveal
          >
            <div className={cn('lg:col-span-7', index % 2 === 1 && 'lg:order-2')}>
              <RoomPhotos name={room.name} photos={room.photos} />
            </div>

            <div className="lg:col-span-5">
              <p className="caps text-brass-light">
                {room.suits} · {room.count} {room.count === 1 ? 'room' : 'rooms'}
              </p>
              <h3 className="mt-4 font-display text-[2.4rem] leading-tight">{room.name}</h3>
              <p className="mt-4 max-w-md text-[1.05rem] leading-[1.85] text-cream-soft">
                {room.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-cream">
                {room.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="size-1 rotate-45 bg-brass" />
                    {feature}
                  </li>
                ))}
              </ul>

              <dl className="mt-8 grid max-w-sm grid-cols-2 border-y border-cream/15">
                <div className="py-4 pr-4">
                  <dt className="caps text-[0.6rem] text-cream-soft">AC</dt>
                  <dd className="figures mt-1 font-display text-[1.9rem] text-cream">
                    {formatINR(room.acRate)}
                  </dd>
                </div>
                <div className="border-l border-cream/15 py-4 pl-6">
                  <dt className="caps text-[0.6rem] text-cream-soft">Non-AC</dt>
                  <dd className="figures mt-1 font-display text-[1.9rem] text-cream">
                    {formatINR(room.nonAcRate)}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-cream-soft">
                Sleeps {room.guests} · per room, 24 hours, GST included
              </p>

              <BookingButton room={room.id} className="mt-9">
                Check availability
              </BookingButton>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
