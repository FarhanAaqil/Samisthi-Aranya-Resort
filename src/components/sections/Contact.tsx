import { ArrowUpRight, MapPin, MessageCircle, Phone, Star } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RESORT } from '@/data/resort';
import { telHref, whatsappHref } from '@/lib/links';

const steps = [
  'Call or message the resort team.',
  'Tell us your dates and how many are coming.',
  'We confirm availability and your booking directly.',
];

export function Contact() {
  const { googleReviewUrl, postalAddress, socialLinks } = RESORT;

  return (
    <Section id="contact" tone="petal">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Plan your stay"
            title="Talk to the team who will host you"
            lead="Bookings are handled personally, by phone or WhatsApp. There is no online booking or payment on this site, so you always speak to a real person."
          />

          <div
            className="mt-10 rounded-[1.75rem] border border-wine/12 bg-sand/60 p-6 shadow-soft sm:p-8"
            data-reveal
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
              Phone and WhatsApp
            </p>
            <a
              href={telHref}
              className="mt-2 block font-display text-4xl font-semibold text-wine sm:text-5xl"
            >
              {RESORT.contact.phoneDisplay}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={telHref} size="lg">
                <Phone className="size-4" aria-hidden="true" />
                Call now
              </Button>
              <Button href={whatsappHref()} external variant="secondary" size="lg">
                <MessageCircle className="size-4" aria-hidden="true" />
                Message on WhatsApp
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div
              className="rounded-[1.75rem] border border-wine/12 bg-sand/60 p-6 shadow-soft"
              data-reveal
            >
              <MapPin className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl font-semibold text-wine">Find us</h3>
              <p className="mt-1 text-ink-soft">{postalAddress || RESORT.locality}</p>
              <a
                href={RESORT.maps.resortDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-medium text-wine underline decoration-gold/70 underline-offset-4"
              >
                Open in Google Maps
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <div
              id="reviews"
              className="rounded-[1.75rem] border border-wine/12 bg-sand/60 p-6 shadow-soft"
              data-reveal
            >
              <Star className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl font-semibold text-wine">Guest reviews</h3>
              <p className="mt-1 text-ink-soft">
                Read what guests say about their stay on our Google Maps listing.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href={RESORT.maps.resortDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-wine underline decoration-gold/70 underline-offset-4"
                >
                  Read reviews
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                {googleReviewUrl && (
                  <a
                    href={googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-wine underline decoration-gold/70 underline-offset-4"
                  >
                    Write a review
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {socialLinks.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4 text-sm" data-reveal>
              {socialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-wine underline decoration-gold/70 underline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside
          className="on-dark self-start rounded-[1.75rem] bg-wine-deep p-7 text-petal shadow-lift sm:p-9 lg:col-span-5"
          data-reveal
        >
          <h3 className="font-display text-3xl font-semibold">How booking works</h3>
          <ol className="mt-6 space-y-5">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-light font-display text-lg font-semibold text-wine-deep">
                  {index + 1}
                </span>
                <span className="pt-1 text-petal/90">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-petal/20 pt-5 text-sm text-petal/70">
            Rates are per room for a 24-hour stay, GST included. The pool and rain dance are part of
            your stay; food is charged separately.
          </p>
        </aside>
      </div>
    </Section>
  );
}
