'use client';

import { X } from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ANY_ROOM } from '@/lib/booking';

import { BookingForm } from './BookingForm';

interface BookingContextValue {
  /** Opens the availability dialog, optionally with a room already chosen. */
  openBooking: (room?: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const value = useContext(BookingContext);
  if (!value) throw new Error('useBooking must be used inside BookingProvider');
  return value;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<string | null>(null);
  const openBooking = useCallback((choice: string = ANY_ROOM) => setRoom(choice), []);
  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {room !== null && <BookingDialog room={room} onClose={() => setRoom(null)} />}
    </BookingContext.Provider>
  );
}

function BookingDialog({ room, onClose }: { room: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="booking-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-[94vh] w-[min(94vw,40rem)] overflow-y-auto bg-ivory p-0 text-ink shadow-lift backdrop:bg-forest-deep/80"
    >
      <div className="flex items-start justify-between gap-6 border-b border-ink/10 px-6 py-5 sm:px-8">
        <div>
          <p className="eyebrow text-gold-deep">Plan your stay</p>
          <h2 id="booking-title" className="mt-2 font-display text-3xl font-medium text-forest">
            Check availability
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-11 shrink-0 place-items-center border border-ink/15 text-forest transition-colors hover:bg-forest hover:text-ivory"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <BookingForm layout="stacked" defaultRoom={room} onSent={onClose} />
      </div>
    </dialog>
  );
}
