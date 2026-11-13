import { RESORT } from '@/data/resort';
import { ROOM_CATEGORIES } from '@/data/rooms';

export interface BookingRequest {
  /** yyyy-mm-dd from a date input, or empty when the guest hasn't chosen yet. */
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
}

export const ANY_ROOM = 'any';
export const WHOLE_RESORT = 'whole-resort';

export const ROOM_OPTIONS: Array<{ value: string; label: string }> = [
  { value: ANY_ROOM, label: 'Any room' },
  ...ROOM_CATEGORIES.map((room) => ({ value: room.id, label: room.name })),
  { value: WHOLE_RESORT, label: 'The whole resort' },
];

export const GUEST_OPTIONS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11 to 20',
  '21 or more',
];

/** Parses yyyy-mm-dd as a local calendar date, so time zones can't shift the day. */
function parseDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

const dateFormat = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/** Today as yyyy-mm-dd in the visitor's own time zone, for the date inputs' `min`. */
export function todayISO(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Returns a problem to show the guest, or null when the request can be sent. */
export function validateBooking({ checkIn, checkOut }: BookingRequest): string | null {
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);
  if (start && end && end <= start) return 'Check-out needs to be after check-in.';
  return null;
}

/** The WhatsApp message a guest sends to ask about availability. */
export function bookingMessage({ checkIn, checkOut, guests, room }: BookingRequest): string {
  const roomLabel = ROOM_OPTIONS.find((option) => option.value === room)?.label;
  const what =
    room === WHOLE_RESORT
      ? 'booking the whole resort'
      : room && room !== ANY_ROOM && roomLabel
        ? `the ${roomLabel}`
        : 'a room';

  const start = parseDate(checkIn);
  const end = parseDate(checkOut);
  let when = 'my dates are flexible';
  if (start && end) {
    const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000);
    when = `from ${dateFormat.format(start)} to ${dateFormat.format(end)} (${nights} ${nights === 1 ? 'night' : 'nights'})`;
  } else if (start) {
    when = `arriving on ${dateFormat.format(start)}`;
  }

  const who = guests ? ` for ${guests} ${guests === '1' ? 'guest' : 'guests'}` : '';

  return `Hello ${RESORT.name}, I'd like to check availability for ${what} ${when}${who}. Thank you.`;
}
