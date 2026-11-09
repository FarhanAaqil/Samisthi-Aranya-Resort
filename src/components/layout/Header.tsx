'use client';

import { MessageCircle, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { NAV_ITEMS } from '@/data/nav';
import { RESORT } from '@/data/resort';
import { cn } from '@/lib/cn';
import { telHref, whatsappHref } from '@/lib/links';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  // Compact the bar once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Highlight the link for the section crossing the middle of the viewport.
  useEffect(() => {
    const targets = NAV_ITEMS.map((item) => document.getElementById(item.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        scrolled || menuOpen
          ? 'bg-sand/92 shadow-[0_1px_0_rgb(104_46_78/0.14)] backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-4 transition-[height] duration-300',
          scrolled ? 'h-16' : 'h-20',
        )}
      >
        <a href="#home" aria-label={`${RESORT.name}, back to the top`} className="rounded-lg">
          <Logo variant="full" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  active ? 'text-wine' : 'text-ink-soft hover:text-wine',
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href={telHref} variant="secondary" className="hidden sm:inline-flex">
            <Phone className="size-4" aria-hidden="true" />
            Call
          </Button>
          <Button href={whatsappHref()} external className="hidden sm:inline-flex">
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center rounded-full border border-wine/40 text-wine transition-colors hover:bg-wine/8 lg:hidden"
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
        <div id="mobile-menu" className="border-t border-wine/15 lg:hidden">
          <Container className="pt-3 pb-6">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-wine/10">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 font-display text-2xl font-semibold text-wine"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button href={telHref} variant="secondary" size="lg">
                <Phone className="size-4" aria-hidden="true" />
                Call
              </Button>
              <Button href={whatsappHref()} external size="lg">
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
