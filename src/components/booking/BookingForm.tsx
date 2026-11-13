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
  /** Accessible name; must differ between forms shown on the same page. */
  label?: string;
}

/**
 * Collects dates, guests and a room type, then opens WhatsApp with a ready-made message. Nothing
 * is stored or sent anywhere else: the resort team confirms availability in the chat.
 */
export function BookingForm({
  layout,
  defaultRoom = ANY_ROOM,
  onSent,
  label: formLabel = 'Check availability',
}: BookingFormProps) {
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

  const label = cn('caps block text-brass-light', bar && 'text-[0.6rem]');
  const field = cn(
    'block w-full bg-transparent py-2 text-[0.95rem] outline-none transition-colors',
    bar
      ? 'border-b border-cream/30 text-cream focus:border-brass'
      : 'mt-2 border border-cream/25 px-3 py-3 text-cream focus:border-brass',
  );

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={formLabel}
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
            <option key={option} value={option} className="bg-olive-deep text-cream">
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
            <option key={option.value} value={option.value} className="bg-olive-deep text-cream">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={cn(bar ? 'ml-auto' : 'sm:col-span-2')}>
        <p
          role="alert"
          className={cn(
            'text-sm',
            bar
              ? 'absolute -top-9 right-6 bg-cream px-3 py-1 text-xs text-[#8a2b1d] empty:hidden'
              : 'mb-3 min-h-5 text-[#f2b8a8]',
          )}
        >
          {error}
        </p>
        <button
          type="submit"
          className={cn(
            'inline-flex h-12 items-center justify-center gap-2.5 bg-brass px-7 text-[0.68rem] font-medium tracking-[0.28em] whitespace-nowrap text-bark uppercase transition-colors duration-300 hover:bg-brass-light',
            !bar && 'w-full',
          )}
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Check on WhatsApp
        </button>
      </div>
      {!bar && (
        <p className="text-sm text-cream-soft sm:col-span-2">
          This opens WhatsApp with your request written out. The resort team replies to confirm
          availability. Nothing is booked or paid on this website.
        </p>
      )}
    </form>
  );
}
