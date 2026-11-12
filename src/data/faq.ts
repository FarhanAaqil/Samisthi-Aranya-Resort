import { RESORT } from './resort';
import { ROOM_CATEGORIES, TOTAL_GUESTS, TOTAL_ROOMS } from './rooms';
import { formatINR } from '@/lib/format';

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

const tariffSummary = ROOM_CATEGORIES.map(
  (room) => `${room.name} ${formatINR(room.acRate)} AC / ${formatINR(room.nonAcRate)} Non-AC`,
).join('; ');

export const FAQS: FaqEntry[] = [
  {
    id: 'tariffs',
    question: 'What do the rooms cost, and is GST included?',
    answer: `Rates are per room for a 24-hour stay and include GST: ${tariffSummary}.`,
  },
  {
    id: 'timings',
    question: 'What are the check-in and check-out times?',
    answer: `Check-in is at ${RESORT.stay.checkIn} and check-out is at ${RESORT.stay.checkOut}, so you get a full 24 hours.`,
  },
  {
    id: 'booking',
    question: 'How do I check availability and book?',
    answer: `Call or WhatsApp us on ${RESORT.contact.phoneDisplay}. The team checks availability for your dates and confirms your booking directly. There is no online booking or online payment on this website.`,
  },
  {
    id: 'pool',
    question: 'Are the pool and rain dance included?',
    answer:
      'Yes. The main pool, the kids’ pool and the rain dance are included in your room tariff and open 24 hours. Swimwear and swimming gear are available at the resort for guests to use.',
  },
  {
    id: 'food',
    question: 'Is food included?',
    answer:
      'No. The on-site restaurant is vegetarian only, and meals and drinks are charged separately from the room.',
  },
  {
    id: 'activities',
    question: 'What is there to do on site?',
    answer:
      'Cricket, football, volleyball and garden games on the lawn, using the resort’s equipment or your own at no extra charge. A campfire can be arranged on request for special occasions.',
  },
  {
    id: 'safari',
    question: 'Can you arrange a jungle safari?',
    answer:
      'Yes. The resort arranges jungle safaris into the Amrabad Tiger Reserve. The safari is paid separately from your room, and the team will share timings and details when you book.',
  },
  {
    id: 'whole-resort',
    question: 'Can we book the whole resort for an event?',
    answer: `Yes. With ${TOTAL_ROOMS} rooms for up to ${TOTAL_GUESTS} guests, a conference hall and open lawns, the resort suits weddings, family gatherings, birthdays and corporate outings. Exclusive hire is quoted individually, indicatively ${RESORT.wholeResort.rangeDisplay} depending on your dates and guest count.`,
  },
];
