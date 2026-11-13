'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookingButton } from '@/components/booking/BookingButton';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Logo';
import { NAV_ITEMS } from '@/data/nav';
import { RESORT } from '@/data/resort';
import { cn } from '@/lib/cn';
import { telHref } from '@/lib/links';

// The wordmark sits in the middle with three links either side; Contact lives in the footer,
// the mobile menu and the booking bars.
const LEFT = NAV_ITEMS.slice(0, 3);
const RIGHT = NAV_ITEMS.slice(3, 6);

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Highlight the link for the section crossing the middle of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const targets = NAV_ITEMS.map((item) => document.getElementById(item.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveId(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [isHome]);

  const linkHref = (href: string) => (isHome ? href : `/${href}`);

  const navLink = (item: (typeof NAV_ITEMS)[number]) => {
    const active = isHome && activeId === item.href.slice(1);
    return (
      <a
        key={item.href}
        href={linkHref(item.href)}
        aria-current={active ? 'true' : undefined}
        className={cn(
          'caps relative py-2 text-[0.66rem] transition-colors hover:text-brass-light',
          active ? 'text-brass-light' : 'text-cream',
        )}
      >
        {item.label}
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-x-0 bottom-0 h-px origin-center bg-brass transition-transform duration-300',
            active ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </a>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-cream/15 bg-olive/97 text-cream">
      <div
        className={cn(
          'overflow-hidden border-b border-cream/12 transition-[max-height,opacity] duration-300 max-lg:hidden',
          scrolled ? 'max-h-0 border-transparent opacity-0' : 'max-h-10 opacity-100',
        )}
      >
        <Container
          size="wide"
          className="caps flex h-9 items-center justify-between text-[0.6rem] text-cream-soft"
        >
          <span>Mannanur · Nallamala forest · Telangana</span>
          <a href={telHref} className="hover:text-brass-light" tabIndex={scrolled ? -1 : 0}>
            {RESORT.contact.phoneDisplay}
          </a>
        </Container>
      </div>

      <Container
        size="wide"
        className={cn(
          'grid grid-cols-[1fr_auto_1fr] items-center gap-6 transition-[height] duration-300',
          scrolled ? 'h-[4.25rem]' : 'h-[5.25rem]',
        )}
      >
        <nav aria-label="Primary" className="flex items-center gap-8 max-xl:hidden">
          {LEFT.map(navLink)}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="grid size-11 place-items-center justify-self-start border border-cream/30 xl:hidden"
        >
          {menuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>

        <Link href="/" className="justify-self-center">
          <Wordmark compact={scrolled} />
        </Link>

        <div className="flex items-center justify-end gap-8">
          <nav aria-label="More" className="flex items-center gap-8 max-xl:hidden">
            {RIGHT.map(navLink)}
          </nav>
          <BookingButton variant="secondary" className="h-10 px-5 max-sm:hidden">
            Reserve
          </BookingButton>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-cream/12 bg-olive-deep xl:hidden"
        >
          <Container size="wide" className="pt-4 pb-8">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-cream/12">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={linkHref(item.href)}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 font-display text-[1.7rem] text-cream"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
