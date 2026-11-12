import { ArrowRight, Mountain, Trees, Waves } from 'lucide-react';

import { Picture } from '@/components/ui/Picture';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { photos } from '@/data/photos';

const qualities = [
  {
    icon: Trees,
    title: 'Room to spread out',
    text: 'A wide central lawn, shaded walkways and a courtyard that the rooms open onto.',
  },
  {
    icon: Waves,
    title: 'Water at any hour',
    text: 'The pool and rain dance are open around the clock and included in your stay.',
  },
  {
    icon: Mountain,
    title: 'On the way to Srisailam',
    text: 'Close to Srisailam Dam View Point and the Amrabad Tiger Reserve safari gate.',
  },
];

export function ResortIntro() {
  return (
    <Section id="resort" tone="petal">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="The resort"
            title="A calm place to stop, stay and breathe"
            lead="Set among open skies and low hills near Mannanur, Samisthi Aranya is built for slow, unhurried stays. Wide verandahs look over the courtyard, balconies face the fields, and the lawn is big enough for a proper game of cricket."
          />
          <p className="mt-4 max-w-xl text-pretty text-ink-soft" data-reveal>
            Come for a night with family, a celebration with friends, or a break on the road to
            Srisailam. The resort team looks after every booking personally, from the first call to
            check-out.
          </p>

          <ul className="mt-9 space-y-6">
            {qualities.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4" data-reveal>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-rose-soft/70 text-wine">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-wine">{title}</h3>
                  <p className="mt-0.5 text-ink-soft">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#gallery"
            className="mt-9 inline-flex items-center gap-2 font-medium text-wine underline decoration-gold/60 underline-offset-4 transition-colors hover:text-wine-deep"
          >
            Walk the grounds in photos
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-5 gap-4 lg:col-span-6" data-reveal>
          <Picture
            photo={photos.lawnOpenSky}
            sizes="(min-width: 1024px) 22vw, 40vw"
            className="col-span-3 row-span-2 min-h-80 rounded-[2rem] shadow-soft"
            imageClassName="object-[50%_60%]"
          />
          <Picture
            photo={photos.pavilion}
            sizes="(min-width: 1024px) 15vw, 30vw"
            className="col-span-2 aspect-square rounded-[2rem] shadow-soft"
          />
          <Picture
            photo={photos.corridorLong}
            sizes="(min-width: 1024px) 15vw, 30vw"
            className="col-span-2 aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-soft"
          />
        </div>
      </div>
    </Section>
  );
}
