import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RESORT } from '@/data/resort';
import { ROOM_CATEGORIES, TOTAL_GUESTS, TOTAL_ROOMS } from '@/data/rooms';
import { formatINR } from '@/lib/format';

import { RoomsShowcase } from './RoomsShowcase';

export function Rooms() {
  return (
    <Section id="rooms" tone="sand">
      <SectionHeading
        eyebrow="Rooms and rates"
        title="Four kinds of room, one simple rate card"
        lead={`Every rate is per room for a 24-hour stay, with check-in at ${RESORT.stay.checkIn} and check-out at ${RESORT.stay.checkOut}. GST is included. Call or message the team to confirm availability for your dates.`}
      />

      <RoomsShowcase rooms={ROOM_CATEGORIES} />

      <div
        role="region"
        aria-label="All room rates"
        // Focusable so keyboard users can scroll the table sideways on narrow screens.
        tabIndex={0}
        className="mt-12 overflow-x-auto rounded-[1.75rem] border border-wine/10 bg-petal shadow-soft"
        data-reveal
      >
        <table className="w-full text-left text-sm">
          <caption className="px-6 pt-5 pb-3 text-left font-display text-2xl font-semibold text-wine">
            All rates at a glance
          </caption>
          <thead>
            <tr className="border-y border-wine/12 text-xs tracking-[0.14em] text-ink-soft uppercase">
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                Room
              </th>
              <th scope="col" className="px-2 py-3 font-semibold sm:px-3">
                Sleeps
              </th>
              <th scope="col" className="px-3 py-3 font-semibold max-sm:hidden">
                Rooms
              </th>
              <th scope="col" className="px-2 py-3 text-right font-semibold sm:px-3">
                AC
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold sm:px-6">
                Non-AC
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-wine/10">
            {ROOM_CATEGORIES.map((room) => (
              <tr key={room.id}>
                <th scope="row" className="px-4 py-3.5 font-medium text-wine sm:px-6">
                  {room.name}
                </th>
                <td className="px-2 py-3.5 text-ink-soft sm:px-3">{room.guests}</td>
                <td className="px-3 py-3.5 text-ink-soft max-sm:hidden">{room.count}</td>
                <td className="px-2 py-3.5 text-right font-semibold text-ink sm:px-3">
                  {formatINR(room.acRate)}
                </td>
                <td className="px-4 py-3.5 text-right font-semibold text-ink sm:px-6">
                  {formatINR(room.nonAcRate)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-wine/12 bg-rose-soft/35 text-wine-deep">
              <th scope="row" className="px-4 py-3.5 font-semibold sm:px-6">
                The whole resort
              </th>
              <td className="px-2 py-3.5 font-semibold sm:px-3">Up to {TOTAL_GUESTS}</td>
              <td className="px-3 py-3.5 font-semibold max-sm:hidden">{TOTAL_ROOMS}</td>
              <td className="px-4 py-3.5 text-right text-xs sm:px-6" colSpan={2}>
                Per room, per 24 hours, GST included
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Section>
  );
}
