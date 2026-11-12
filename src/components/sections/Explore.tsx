import { ArrowUpRight, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NEARBY_PLACES } from '@/data/nearby';
import { RESORT } from '@/data/resort';
import { whatsappHref } from '@/lib/links';

/** The jungle safari and the places nearby, on one forest-green band. */
export function Explore() {
  return (
    <Section id="explore" tone="forest">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            onDark
            eyebrow="The Nallamala"
            title="Into the Amrabad Tiger Reserve"
            lead="The resort arranges jungle safaris into the Amrabad Tiger Reserve, where the Nallamala forest is at its wildest. The safari is paid separately; the team will share timings and details when you book."
          />
          <div className="mt-10" data-reveal>
            <Button
              href={whatsappHref(RESORT.contact.safariMessage)}
              external
              variant="gold"
              size="lg"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Ask about the safari
            </Button>
          </div>
        </div>

        <div id="nearby" className="scroll-mt-24 lg:col-span-7">
          <h3 className="eyebrow text-gold-light" data-reveal>
            Nearby
          </h3>
          <ul className="mt-6 border-t border-ivory/20">
            {NEARBY_PLACES.map((place) => (
              <li key={place.id} className="border-b border-ivory/20" data-reveal>
                <a
                  href={place.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <span>
                    <span className="eyebrow block text-[0.62rem] text-gold-light">
                      {place.featured ? 'Most visited · ' : ''}
                      {place.kind}
                    </span>
                    <span className="mt-2 block font-display text-[1.75rem] leading-tight text-ivory">
                      {place.name}
                    </span>
                    <span className="mt-2 block max-w-lg text-[0.95rem] leading-relaxed font-light text-ivory/75">
                      {place.description}
                    </span>
                  </span>
                  <span className="eyebrow inline-flex items-center gap-2 text-[0.65rem] text-gold-light">
                    Directions
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only">to {place.name} (opens Google Maps)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-light text-ivory/65" data-reveal>
            Journey times depend on the route and the season, so check them in Google Maps before
            you set out.
          </p>
        </div>
      </div>
    </Section>
  );
}
