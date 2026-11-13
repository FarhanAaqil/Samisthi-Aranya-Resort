'use client';

import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';
import { telHref, whatsappHref } from '@/lib/links';

import { BookingForm } from './BookingForm';
import { useBooking } from './BookingProvider';

/**
 * Keeps booking within reach. On large screens an availability strip slides up once the visitor
 * has scrolled past the first screen. On phones a bar with Call, WhatsApp and Book is always at
 * the bottom, so the actions are never hidden behind the menu.
 */
export function BookingBar() {
  const { openBooking } = useBooking();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    // Wait until the hero, with its own availability strip, has scrolled away.
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 1.1);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <aside
        aria-label="Plan your stay"
        className={cn(
          'fixed inset-x-0 bottom-0 z-30 hidden border-t border-brass/30 bg-olive-deep/97 text-cream lg:block',
          'transition-transform duration-300 ease-out motion-reduce:transition-none',
          pastHero ? 'translate-y-0' : 'translate-y-full',
        )}
        inert={!pastHero}
      >
        <Container size="wide" className="relative flex items-center gap-10 py-3.5">
          <p className="shrink-0 font-display text-2xl leading-tight text-cream">
            Plan your
            <br />
            <span className="text-brass-light italic">stay</span>
          </p>
          <div className="flex-1">
            <BookingForm layout="bar" label="Quick availability check" />
          </div>
        </Container>
      </aside>

      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-brass/30 bg-olive-deep pb-[env(safe-area-inset-bottom)] text-cream lg:hidden"
      >
        <a
          href={telHref}
          className="flex h-16 flex-col items-center justify-center gap-1 text-[0.62rem] tracking-[0.24em] uppercase"
        >
          <Phone className="size-[1.15rem] text-brass-light" aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-16 flex-col items-center justify-center gap-1 border-x border-cream/10 text-[0.62rem] tracking-[0.24em] uppercase"
        >
          <MessageCircle className="size-[1.15rem] text-brass-light" aria-hidden="true" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => openBooking()}
          className="flex h-16 flex-col items-center justify-center gap-1 bg-brass text-[0.62rem] font-medium tracking-[0.24em] text-bark uppercase"
        >
          <CalendarDays className="size-[1.15rem]" aria-hidden="true" />
          Book
        </button>
      </nav>
    </>
  );
}
