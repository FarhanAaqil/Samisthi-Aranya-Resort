import { MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { NAV_ITEMS } from '@/data/nav';
import { RESORT } from '@/data/resort';
import { telHref, whatsappHref } from '@/lib/links';

export function Footer() {
  return (
    <footer className="on-dark bg-wine-deep text-petal/85">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="full" tone="dark" />
            <p className="mt-5 font-display text-2xl text-rose-soft italic">{RESORT.tagline}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-petal/70">
              A nature retreat in {RESORT.locality}. Rooms are booked directly with the resort team
              by phone or WhatsApp.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-gold-light">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              Reach us
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-gold-light"
                >
                  <Phone className="size-4 text-gold-light" aria-hidden="true" />
                  {RESORT.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-gold-light"
                >
                  <MessageCircle className="size-4 text-gold-light" aria-hidden="true" />
                  Message on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={RESORT.maps.resortDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-gold-light"
                >
                  <MapPin className="size-4 text-gold-light" aria-hidden="true" />
                  Directions on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-petal/15 pt-6 text-xs text-petal/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {RESORT.name}
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-gold-light">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-gold-light">
                Terms and stay conditions
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
