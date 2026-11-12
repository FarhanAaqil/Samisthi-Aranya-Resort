'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookingButton } from '@/components/booking/BookingButton';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Logo';
import { NAV_ITEMS } from '@/data/nav';
import { cn } from '@/lib/cn';

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

  // Over the hero photograph the bar is transparent with light text; everywhere else it is solid.
  const overPhoto = isHome && !scrolled && !menuOpen;
  const linkHref = (href: string) => (isHome ? href : `/${href}`);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,color] duration-300',
        overPhoto
          ? 'border-b border-ivory/15 bg-gradient-to-b from-forest-deep/55 to-transparent text-ivory'
          : 'border-b border-ink/10 bg-ivory text-ink',
      )}
    >
      <Container size="wide" className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/">
          <Wordmark tone={overPhoto ? 'light' : 'dark'} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = isHome && activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={linkHref(item.href)}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'relative py-2 text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-100',
                  active ? 'opacity-100' : 'opacity-80',
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <BookingButton variant={overPhoto ? 'outlineLight' : 'primary'} className="max-sm:hidden">
            Check availability
          </BookingButton>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={cn(
              'grid size-11 place-items-center border transition-colors xl:hidden',
              overPhoto ? 'border-ivory/40' : 'border-ink/20',
            )}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-ink/10 xl:hidden"
        >
          <Container size="wide" className="pt-4 pb-8">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-ink/10">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={linkHref(item.href)}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 font-display text-[1.7rem] font-medium text-forest"
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
