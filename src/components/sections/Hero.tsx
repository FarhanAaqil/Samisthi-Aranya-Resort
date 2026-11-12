import { BedDouble, Phone, Utensils, Waves } from 'lucide-react';

import { Weather } from '@/components/Weather';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Picture } from '@/components/ui/Picture';
import { photos } from '@/data/photos';
import { RESORT } from '@/data/resort';
import { TOTAL_ROOMS } from '@/data/rooms';
import { telHref } from '@/lib/links';

const highlights = [
  { icon: BedDouble, label: `${TOTAL_ROOMS} rooms and suites` },
  { icon: Waves, label: 'Pool open 24 hours' },
  { icon: Utensils, label: 'Pure vegetarian dining' },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* Soft washes of colour behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-[34rem] rounded-full bg-rose-soft/55 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 size-[28rem] rounded-full bg-clay/80 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-gold-deep uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
            Mannanur · Srisailam highway
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] font-semibold text-balance text-wine sm:text-6xl lg:text-7xl">
            {RESORT.name}
          </h1>
          <p className="mt-3 font-display text-2xl text-gold-deep italic sm:text-3xl">
            {RESORT.tagline}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-soft">
            Green lawns, a pool that never closes and quiet rooms that look out over the fields. A
            family-friendly nature retreat near Mannanur, on the road to Srisailam.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#rooms" size="lg">
              See rooms and rates
            </Button>
            <Button href={telHref} variant="secondary" size="lg">
              <Phone className="size-4" aria-hidden="true" />
              Call the resort
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-ink-soft">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="size-[1.1rem] text-gold" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Weather />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:pl-10">
            {/* Offset outline that gives the arch some depth */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-[2rem] border border-gold/60 lg:left-10"
            />
            <Picture
              photo={photos.lawnGoldenHour}
              priority
              sizes="(min-width: 1024px) 560px, (min-width: 448px) 448px, 100vw"
              className="relative aspect-[4/5] rounded-t-full rounded-b-[2rem] shadow-lift"
              imageClassName="object-[24%_50%]"
            />
            <p className="absolute bottom-6 left-0 max-w-[15rem] rounded-2xl bg-petal/95 px-5 py-4 text-sm leading-snug text-ink-soft shadow-soft backdrop-blur-sm lg:left-2">
              <span className="block font-display text-xl font-semibold text-wine">
                Check-in {RESORT.stay.checkIn}
              </span>
              A full 24-hour stay, with check-out at {RESORT.stay.checkOut}.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
