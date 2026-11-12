import { ChevronDown } from 'lucide-react';
import { getImageProps } from 'next/image';

import { BookingButton } from '@/components/booking/BookingButton';
import { Weather } from '@/components/Weather';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { photos } from '@/data/photos';
import { RESORT } from '@/data/resort';

/**
 * Full-screen opening photograph. Phones get the portrait shot of the main building and larger
 * screens the golden-hour landscape, through one <picture> so only the right file downloads.
 */
function HeroImage() {
  const shared = { alt: photos.lawnGoldenHour.alt, sizes: '100vw', fill: true } as const;
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ ...shared, src: photos.lawnGoldenHour.image });
  const {
    props: { srcSet: tallSrcSet, ...imgProps },
  } = getImageProps({ ...shared, src: photos.mainBuildingSky.image });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wideSrcSet} sizes="100vw" />
      <img
        {...imgProps}
        srcSet={tallSrcSet}
        alt={photos.lawnGoldenHour.alt}
        loading="eager"
        fetchPriority="high"
        className="object-cover object-[50%_60%] md:object-[50%_45%]"
      />
    </picture>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="on-dark relative flex min-h-[100svh] items-end overflow-hidden bg-forest-deep text-ivory"
    >
      <HeroImage />
      {/* Shade the photograph enough for the type to read, darkest where the words sit. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/45 to-forest-deep/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-forest-deep/70 via-forest-deep/25 to-transparent"
      />

      <Container size="wide" className="relative pt-36 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <h1>
            <span className="eyebrow flex items-center gap-4 text-gold-light">
              <span aria-hidden="true" className="rule bg-gold-light" />
              {RESORT.name}
            </span>{' '}
            <span className="mt-6 block font-display text-[3.4rem] leading-[0.98] font-medium sm:text-[5rem] lg:text-[6.5rem]">
              {RESORT.motto}
            </span>
          </h1>
          <p className="mt-5 font-display text-2xl text-gold-light italic sm:text-3xl">
            {RESORT.tagline}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed font-light text-ivory/85">
            Green lawns, a pool that never closes and jungle safaris into the Amrabad Tiger Reserve,
            at the edge of the Nallamala forest near Mannanur.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <BookingButton variant="gold" size="lg">
              Check availability
            </BookingButton>
            <Button href="#resort" variant="outlineLight" size="lg">
              Discover the resort
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-ivory/15 pt-6">
          <Weather />
          <a
            href="#resort"
            className="eyebrow inline-flex items-center gap-2 text-ivory/80 hover:text-ivory max-sm:hidden"
          >
            Scroll
            <ChevronDown className="size-4 motion-safe:animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
