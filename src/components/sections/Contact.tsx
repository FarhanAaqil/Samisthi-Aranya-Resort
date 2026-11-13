import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';

import { BookingButton } from '@/components/booking/BookingButton';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RESORT } from '@/data/resort';
import { telHref, whatsappHref } from '@/lib/links';

const steps = [
  'Call, message on WhatsApp, or send your dates with the availability form.',
  'The resort team checks your dates and replies personally.',
  'Your booking is confirmed directly with the team. Nothing is paid on this website.',
];

function OutLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="caps inline-flex items-center gap-2 text-[0.65rem] text-cream underline decoration-brass underline-offset-[6px] hover:text-brass-light"
    >
      {children}
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function Contact() {
  const { googleReviewUrl, postalAddress, socialLinks } = RESORT;

  return (
    <Section id="contact" tone="olive">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Plan your stay"
            title="Talk to the team who will host you"
            lead="Every booking is handled personally, by phone or WhatsApp, so you always speak to someone at the resort."
          />

          <a
            href={telHref}
            className="figures mt-10 block font-display text-[2.6rem] leading-none text-cream hover:text-brass-light sm:text-[3.4rem]"
            data-reveal
          >
            {RESORT.contact.phoneDisplay}
          </a>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <BookingButton size="lg">Check availability</BookingButton>
            <Button href={whatsappHref()} external variant="secondary" size="lg">
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </Button>
            <Button href={telHref} variant="secondary" size="lg">
              <Phone className="size-4" aria-hidden="true" />
              Call
            </Button>
          </div>

          <ol className="mt-14 border-t border-cream/15" data-reveal>
            {steps.map((step, index) => (
              <li key={step} className="flex gap-6 border-b border-cream/15 py-5">
                <span className="font-display text-2xl leading-none text-brass-light">
                  0{index + 1}
                </span>
                <span className="text-cream-soft">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-12 lg:col-span-4 lg:col-start-9 lg:pt-4">
          <div data-reveal>
            <h3 className="caps text-brass-light">Find us</h3>
            <p className="mt-4 font-display text-2xl leading-snug text-cream">
              {postalAddress || RESORT.locality}
            </p>
            <div className="mt-4">
              <OutLink href={RESORT.maps.resortDirections}>Open in Google Maps</OutLink>
            </div>
          </div>

          <div id="reviews" data-reveal>
            <h3 className="caps text-brass-light">Guest reviews</h3>
            <p className="mt-4 leading-relaxed text-cream-soft">
              Read what guests say about their stay on our Google Maps listing.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <OutLink href={RESORT.maps.resortDirections}>Read reviews</OutLink>
              {googleReviewUrl && <OutLink href={googleReviewUrl}>Write a review</OutLink>}
            </div>
          </div>

          <div data-reveal>
            <h3 className="caps text-brass-light">Stay details</h3>
            <p className="mt-4 leading-relaxed text-cream-soft">
              Check-in {RESORT.stay.checkIn}, check-out {RESORT.stay.checkOut}. Rates are per room
              for 24 hours, GST included. The pool and rain dance are part of your stay; food and
              the safari are charged separately.
            </p>
          </div>

          {socialLinks.length > 0 && (
            <ul className="flex flex-wrap gap-6" data-reveal>
              {socialLinks.map((link) => (
                <li key={link.url}>
                  <OutLink href={link.url}>{link.label}</OutLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
