import { Picture } from '@/components/ui/Picture';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HIGHLIGHTS } from '@/data/highlights';
import { TOTAL_GUESTS, TOTAL_ROOMS } from '@/data/rooms';
import { cn } from '@/lib/cn';

const shapes = {
  large: 'col-span-2 row-span-2',
  wide: 'col-span-2',
  small: 'col-span-1',
};

const sizes = {
  large: '(min-width: 1024px) 600px, 100vw',
  wide: '(min-width: 1024px) 600px, 100vw',
  small: '(min-width: 1024px) 300px, 50vw',
};

/** What the resort is made for: a mosaic of photographs, each with its caption. */
export function Highlights() {
  return (
    <Section id="highlights" tone="deep" containerSize="wide">
      <SectionHeading
        align="center"
        eyebrow="Made for gathering"
        title="Space for every occasion"
        lead={`${TOTAL_ROOMS} rooms for up to ${TOTAL_GUESTS} guests, open gardens and wide lawns: room for families, friends, functions and teams.`}
      />

      <ul className="mt-16 grid auto-rows-[13rem] grid-cols-2 gap-3 sm:auto-rows-[16rem] sm:gap-4 lg:auto-rows-[18rem] lg:grid-cols-4">
        {HIGHLIGHTS.map(({ id, title, description, photo, size, focus }) => (
          <li key={id} className={cn('group relative overflow-hidden', shapes[size])} data-reveal>
            <div className="absolute inset-0">
              <Picture
                photo={photo}
                sizes={sizes[size]}
                className="size-full"
                imageClassName={cn(
                  'transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none',
                  focus,
                )}
              />
            </div>
            {/* A shade along the bottom edge only, so the caption reads over any photograph. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-olive-night/90 via-olive-night/45 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <h3
                className={cn(
                  'font-display leading-tight text-cream',
                  size === 'large'
                    ? 'text-[1.9rem] sm:text-[2.4rem]'
                    : 'text-[1.3rem] sm:text-[1.55rem]',
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  'mt-1.5 max-w-sm text-[0.9rem] leading-snug text-cream-soft',
                  size === 'small' && 'max-sm:hidden',
                )}
              >
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
