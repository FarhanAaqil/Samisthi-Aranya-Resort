'use client';

import { MessageCircle } from 'lucide-react';
import { useId, useState } from 'react';

import {
  ANY_ROOM,
  bookingMessage,
  GUEST_OPTIONS,
  ROOM_OPTIONS,
  todayISO,
  validateBooking,
  type BookingRequest,
} from '@/lib/booking';
import { cn } from '@/lib/cn';
import { whatsappHref } from '@/lib/links';

interface BookingFormProps {
  /** `bar` lays the fields out in one row on a dark strip; `stacked` is for the dialog. */
  layout: 'bar' | 'stacked';
  defaultRoom?: string;
  /** Called after WhatsApp has been opened, so a dialog can close itself. */
  onSent?: () => void;
}

/**
 * Collects dates, guests and a room type, then opens WhatsApp with a ready-made message. Nothing
 * is stored or sent anywhere else: the resort team confirms availability in the chat.
 */
export function BookingForm({ layout, defaultRoom = ANY_ROOM, onSent }: BookingFormProps) {
  const id = useId();
  const [request, setRequest] = useState<BookingRequest>({
    checkIn: '',
    checkOut: '',
    guests: '2',
    room: defaultRoom,
  });
  const [error, setError] = useState<string | null>(null);

  const bar = layout === 'bar';
  const update =
    (field: keyof BookingRequest) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setRequest((current) => ({ ...current, [field]: event.target.value }));
      setError(null);
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const problem = validateBooking(request);
    if (problem) {
      setError(problem);
      return;
    }
    window.open(whatsappHref(bookingMessage(request)), '_blank', 'noopener,noreferrer');
    onSent?.();
  };

  // Today's date only exists in the browser, so set the minimum when a field is first used.
  const setMinToday = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.currentTarget.min) event.currentTarget.min = todayISO();
  };

  const label = cn('eyebrow block', bar ? 'text-[0.62rem] text-gold-light' : 'text-gold-deep');
  const field = cn(
    'block w-full bg-transparent py-2 text-[0.95rem] outline-none transition-colors',
    bar
      ? 'border-b border-ivory/30 text-ivory focus:border-gold-light'
      : 'mt-2 border border-ink/20 px-3 py-3 text-ink focus:border-forest',
  );

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Check availability"
      noValidate
      className={cn(bar ? 'flex items-end gap-6' : 'grid gap-5 sm:grid-cols-2')}
    >
      <div className={cn(bar && 'w-36')}>
        <label htmlFor={`${id}-in`} className={label}>
          Check-in
        </label>
        <input
          id={`${id}-in`}
          type="date"
          value={request.checkIn}
          onChange={update('checkIn')}
          onFocus={setMinToday}
          className={field}
        />
      </div>
      <div className={cn(bar && 'w-36')}>
        <label htmlFor={`${id}-out`} className={label}>
          Check-out
        </label>
        <input
          id={`${id}-out`}
          type="date"
          value={request.checkOut}
          min={request.checkIn || undefined}
          onChange={update('checkOut')}
          onFocus={setMinToday}
          className={field}
        />
      </div>
      <div className={cn(bar && 'w-28')}>
        <label htmlFor={`${id}-guests`} className={label}>
          Guests
        </label>
        <select
          id={`${id}-guests`}
          value={request.guests}
          onChange={update('guests')}
          className={field}
        >
          {GUEST_OPTIONS.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={cn(bar && 'w-48')}>
        <label htmlFor={`${id}-room`} className={label}>
          Room
        </label>
        <select id={`${id}-room`} value={request.room} onChange={update('room')} className={field}>
          {ROOM_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="text-ink">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={cn(bar ? 'ml-auto' : 'sm:col-span-2')}>
        <p
          role="alert"
          className={cn(
            'text-sm text-[#9b2c2c]',
            bar
              ? 'absolute -top-9 right-6 bg-ivory px-3 py-1 text-xs empty:hidden'
              : 'mb-3 min-h-5',
          )}
        >
          {error}
        </p>
        <button
          type="submit"
          className={cn(
            'inline-flex h-12 items-center justify-center gap-2.5 px-7 text-[0.72rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-300',
            bar
              ? 'bg-gold-light text-forest-deep hover:bg-ivory'
              : 'w-full bg-forest text-ivory hover:bg-forest-soft',
          )}
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Check on WhatsApp
        </button>
      </div>
      {!bar && (
        <p className="text-sm text-ink-soft sm:col-span-2">
          This opens WhatsApp with your request written out. The resort team replies to confirm
          availability. Nothing is booked or paid on this website.
        </p>
      )}
    </form>
  );
}
