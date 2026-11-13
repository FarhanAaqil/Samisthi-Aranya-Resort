import { MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { NAV_ITEMS } from '@/data/nav';
import { RESORT } from '@/data/resort';
import { telHref, whatsappHref } from '@/lib/links';

export function Footer() {
  return (
    <footer className="bg-olive-night text-cream-soft">
      <Container className="py-20">
        <div className="grid items-start gap-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <Logo sizes="(min-width: 768px) 240px, 200px" className="h-48 md:h-56" />
          </div>

          <div className="md:col-span-4 md:col-start-5">
            <p className="font-display text-3xl leading-tight text-cream">{RESORT.motto}</p>
            <p className="caps mt-3 text-brass-light">{RESORT.tagline}</p>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">
              A retreat on the edge of the Nallamala forest, in {RESORT.locality}. Every booking is
              confirmed personally by the resort team.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-4">
            <nav aria-label="Footer">
              <h2 className="caps text-brass-light">Explore</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={`/${item.href}`} className="transition-colors hover:text-cream">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="caps text-brass-light">Reach us</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                <li>
                  <a href={telHref} className="inline-flex items-center gap-2.5 hover:text-cream">
                    <Phone className="size-4 text-brass" aria-hidden="true" />
                    {RESORT.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-cream"
                  >
                    <MessageCircle className="size-4 text-brass" aria-hidden="true" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={RESORT.maps.resortDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-cream"
                  >
                    <MapPin className="size-4 text-brass" aria-hidden="true" />
                    Directions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/12 pt-7 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {RESORT.name}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-cream">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cream">
                Terms and stay conditions
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
