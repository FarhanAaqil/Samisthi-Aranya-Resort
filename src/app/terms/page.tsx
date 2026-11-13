import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { RESORT } from '@/data/resort';

export const metadata: Metadata = {
  title: 'Terms and stay conditions',
  description: `Tariff, timing and booking conditions at ${RESORT.name}.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms and stay conditions" updated="12 November 2026">
      <p>
        These are the basic conditions for staying at {RESORT.name}. The resort team will happily
        talk you through anything here when you call.
      </p>

      <h2>Tariff and timing</h2>
      <ul>
        <li>Room rates on this website are per room, for a 24-hour stay, and include GST.</li>
        <li>
          Check-in is at {RESORT.stay.checkIn}. Check-out is at {RESORT.stay.checkOut}.
        </li>
        <li>
          The pool and rain dance are included in the room tariff. Food, drinks and the jungle
          safari are charged separately.
        </li>
      </ul>

      <h2>Booking</h2>
      <ul>
        <li>
          This website does not take bookings or payments. Availability and final confirmation are
          handled directly by the resort team on {RESORT.contact.phoneDisplay}, by call or WhatsApp.
        </li>
        <li>
          The number of rooms shown for each category is the total on the property, not live
          availability.
        </li>
      </ul>

      <h2>On the property</h2>
      <ul>
        <li>The restaurant is vegetarian only.</li>
        <li>
          Jungle safaris into the Amrabad Tiger Reserve are arranged by the resort and paid
          separately. Safari timings and access follow the forest department&apos;s rules.
        </li>
        <li>
          A campfire can be arranged on request for special occasions. It is not a scheduled daily
          activity.
        </li>
        <li>
          Whole-resort bookings and events are quoted individually, based on dates and guest count.
        </li>
      </ul>
    </LegalPage>
  );
}
