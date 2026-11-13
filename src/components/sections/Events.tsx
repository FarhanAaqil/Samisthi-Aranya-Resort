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
    <Section id="events" tone="olive">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-14">
        <div className="lg:order-2 lg:col-span-6">
          <SectionHeading
            eyebrow="Celebrations"
            title="The whole resort, for your occasion"
            lead={`All ${TOTAL_ROOMS} rooms for up to ${TOTAL_GUESTS} guests, the conference hall and the open lawns, with nobody else on the property.`}
          />

          <p className="mt-8 text-[0.95rem] text-cream" data-reveal>
            {RESORT.wholeResort.occasions.join(' · ')}
          </p>

          <div className="mt-10 border-y border-cream/15 py-7" data-reveal>
            <p className="caps text-[0.62rem] text-brass-light">Whole-resort booking, indicative</p>
            <p className="figures mt-3 font-display text-4xl text-cream sm:text-5xl">
              {RESORT.wholeResort.rangeDisplay}
            </p>
            <p className="mt-3 text-sm text-cream-soft">{RESORT.wholeResort.note}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <Button href={whatsappHref(RESORT.contact.eventMessage)} external size="lg">
              <MessageCircle className="size-4" aria-hidden="true" />
              Ask for a quote
            </Button>
            <Button href={telHref} variant="secondary" size="lg">
              <Phone className="size-4" aria-hidden="true" />
              Call the resort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 lg:order-1 lg:col-span-6" data-reveal>
          <Picture
            photo={photos.lawnOpenSky}
            sizes="(min-width: 1024px) 28vw, 60vw"
            className="col-span-3 aspect-[3/4]"
          />
          <div className="col-span-2 grid content-end gap-4">
            <Picture
              photo={photos.balloonCelebration}
              sizes="(min-width: 1024px) 18vw, 40vw"
              className="aspect-[3/4]"
            />
            <Picture
              photo={photos.entranceGazebo}
              sizes="(min-width: 1024px) 18vw, 40vw"
              className="aspect-square"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
