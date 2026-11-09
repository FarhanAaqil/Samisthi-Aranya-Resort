import { MessageCircle, Phone } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { photos } from '@/data/photos';
import { RESORT } from '@/data/resort';
import { TOTAL_GUESTS, TOTAL_ROOMS } from '@/data/rooms';
import { telHref, whatsappHref } from '@/lib/links';

export function Events() {
  return (
    <Section id="events" tone="wine">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            onDark
            eyebrow="Celebrations and exclusive stays"
            title="Take the whole resort for your own occasion"
            lead={`All ${TOTAL_ROOMS} rooms for up to ${TOTAL_GUESTS} guests, the conference hall and the open lawns, with nobody else on the property. Good for weddings, birthdays, family reunions and team outings.`}
          />

          <ul className="mt-8 flex flex-wrap gap-2.5" data-reveal>
            {RESORT.wholeResort.occasions.map((occasion) => (
              <li
                key={occasion}
                className="rounded-full border border-petal/25 px-4 py-2 text-sm text-petal/90"
              >
                {occasion}
              </li>
            ))}
          </ul>

          <div className="mt-9 rounded-3xl bg-petal/8 p-6 ring-1 ring-petal/20 sm:p-7" data-reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              Whole-resort booking, indicative
            </p>
            <p className="mt-2 font-display text-4xl font-semibold text-petal sm:text-5xl">
              {RESORT.wholeResort.rangeDisplay}
            </p>
            <p className="mt-2 text-sm text-petal/75">{RESORT.wholeResort.note}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <Button
              href={whatsappHref(RESORT.contact.eventMessage)}
              external
              variant="light"
              size="lg"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Ask for an event quote
            </Button>
            <Button href={telHref} variant="outlineLight" size="lg">
              <Phone className="size-4" aria-hidden="true" />
              Call the resort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-5" data-reveal>
          <Picture
            photo={photos.balloonCelebration}
            sizes="(min-width: 1024px) 20vw, 45vw"
            className="mt-10 aspect-[3/5] rounded-t-full rounded-b-[2rem]"
          />
          <Picture
            photo={photos.groupGathering}
            sizes="(min-width: 1024px) 20vw, 45vw"
            className="aspect-[3/5] rounded-t-full rounded-b-[2rem]"
          />
          <p className="col-span-2 text-center text-xs text-petal/65">
            A balloon setup and a group gathering in the courtyard.
          </p>
        </div>
      </div>
    </Section>
  );
}
