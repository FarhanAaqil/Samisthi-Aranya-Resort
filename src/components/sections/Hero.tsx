import { getImageProps } from 'next/image';

import { BookingButton } from '@/components/booking/BookingButton';
import { BookingForm } from '@/components/booking/BookingForm';
import { Weather } from '@/components/Weather';
import { Container } from '@/components/ui/Container';
import { photos } from '@/data/photos';
import { RESORT } from '@/data/resort';

/**
 * The opening photograph, shown as it is, with no tint. Phones get the portrait of the main
 * building and larger screens the golden-hour landscape, through one <picture> so only the right
 * file downloads.
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
        className="object-cover object-[50%_60%] md:object-[50%_55%]"
      />
    </picture>
  );
}

export function Hero() {
  return (
    <section id="home" className="bg-olive pt-[5.25rem] text-cream lg:pt-[7.5rem]">
      <div className="relative">
        <div className="relative h-[58svh] max-h-[46rem] min-h-[22rem] bg-olive-deep lg:h-[70svh]">
          <HeroImage />
        </div>

        {/* On large screens the availability form rests on the photograph's lower edge. */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-1/2 lg:block">
          <div className="relative mx-auto w-[min(92%,68rem)] border border-brass/25 bg-olive-deep px-8 py-5 shadow-lift">
            <BookingForm layout="bar" label="Check availability for your dates" />
          </div>
        </div>
      </div>

      <Container className="pt-16 pb-24 text-center lg:pt-32 lg:pb-28">
        <h1>
          <span className="caps block text-brass-light">{RESORT.name}</span>{' '}
          <span className="mt-6 block font-display text-[3.2rem] leading-[1] font-normal text-balance sm:text-[4.6rem] lg:text-[5.8rem]">
            Breathe <em className="italic">Nallamala</em>
          </span>
        </h1>
        <p className="caps mt-6 text-cream">{RESORT.tagline.replace(/\.$/, '')}</p>
        <div className="ornament mt-8" aria-hidden="true">
          <i />
        </div>
        <p className="mx-auto mt-8 max-w-[58ch] text-[1.08rem] leading-[1.85] text-cream-soft">
          A private retreat on the edge of the Nallamala forest near Mannanur. Wide lawns that turn
          gold every evening, a pool open around the clock, and jungle safaris into the Amrabad
          Tiger Reserve.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <BookingButton size="lg">Check availability</BookingButton>
          <a href="#resort" className="caps text-link text-cream">
            Discover the resort
          </a>
        </div>
        <div className="mt-12 flex justify-center">
          <Weather />
        </div>
      </Container>
    </section>
  );
}
