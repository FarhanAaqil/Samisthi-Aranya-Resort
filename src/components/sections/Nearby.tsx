import { ArrowUpRight, Binoculars, Landmark, Mountain, TreePine } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NEARBY_PLACES } from '@/data/nearby';
import { cn } from '@/lib/cn';

const icons: Record<string, typeof Landmark> = {
  'srisailam-dam-view-point': Landmark,
  'amrabad-safari-gate': TreePine,
  'octopus-view-point': Binoculars,
  'uma-maheswaram-temple': Mountain,
};

export function Nearby() {
  return (
    <Section id="nearby" tone="petal">
      <SectionHeading
        eyebrow="Explore nearby"
        title="Srisailam and the forest are close by"
        lead="Open any card for driving directions from the resort in Google Maps. Journey times depend on the route and the day, so check them there before you set out."
      />

      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {NEARBY_PLACES.map((place) => {
          const Icon = icons[place.id] ?? Landmark;
          return (
            <li key={place.id} className={cn(place.featured && 'lg:col-span-3')} data-reveal>
              <a
                href={place.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group flex h-full flex-col justify-between gap-8 rounded-[1.75rem] border p-6 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8',
                  place.featured
                    ? 'border-wine/20 bg-rose-soft/45 sm:flex-row sm:items-end'
                    : 'border-wine/10 bg-sand/60',
                )}
              >
                <div className={cn(place.featured && 'max-w-2xl')}>
                  <span className="grid size-12 place-items-center rounded-full bg-petal text-wine">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-gold-deep uppercase">
                    {place.kind}
                  </p>
                  <h3
                    className={cn(
                      'mt-1.5 font-display font-semibold text-wine',
                      place.featured ? 'text-4xl' : 'text-2xl',
                    )}
                  >
                    {place.name}
                  </h3>
                  <p className="mt-3 text-ink-soft">{place.description}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 font-medium text-wine">
                  <span className="underline decoration-gold/70 underline-offset-4">
                    Get directions
                  </span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
