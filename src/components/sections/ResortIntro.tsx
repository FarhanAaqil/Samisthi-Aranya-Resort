import { Picture } from '@/components/ui/Picture';
import { Section } from '@/components/ui/Section';
import { photos } from '@/data/photos';
import { TOTAL_GUESTS, TOTAL_ROOMS } from '@/data/rooms';

const facts = [
  { value: `${TOTAL_ROOMS} rooms`, label: `Rooms and suites for up to ${TOTAL_GUESTS} guests` },
  { value: '24 hours', label: 'Pool and rain dance, included in your stay' },
  { value: 'Safaris', label: 'Into the Amrabad Tiger Reserve, arranged by the resort' },
  { value: 'Pure veg', label: 'An on-site vegetarian restaurant' },
];

export function ResortIntro() {
  return (
    <Section id="resort" tone="ivory">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow flex items-center gap-4 text-gold-deep">
            <span aria-hidden="true" className="rule" />
            The resort
          </p>
          <h2 className="mt-6 font-display text-[2.6rem] leading-[1.06] font-medium text-balance text-forest sm:text-[3.4rem]">
            Where the road to Srisailam meets the forest
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed font-light text-ink-soft">
            <p>
              Samisthi Aranya sits among open skies and low hills near Mannanur, on the edge of the
              Nallamala forest. Wide verandahs look over a green courtyard, balconies face the
              fields, and the lawn turns gold every evening.
            </p>
            <p>
              Come for a quiet night with family, a celebration with friends, or a safari into the
              Amrabad Tiger Reserve. The resort team looks after every booking personally, from the
              first call to check-out.
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-6" data-reveal>
          <Picture
            photo={photos.walkwaySunset}
            sizes="(min-width: 1024px) 34vw, 90vw"
            className="ml-auto aspect-[4/5] w-full max-w-[30rem]"
          />
          <div className="absolute -bottom-12 left-0 w-[40%] max-w-[14rem] border-[10px] border-ivory max-lg:hidden">
            <Picture
              photo={photos.entrancePorch}
              sizes="(min-width: 1024px) 14rem, 40vw"
              className="aspect-[3/4]"
            />
          </div>
        </div>
      </div>

      <dl className="mt-24 grid grid-cols-2 border-t border-ink/12 lg:grid-cols-4" data-reveal>
        {facts.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col border-b border-ink/12 py-8 pr-5 pl-5 odd:border-r odd:pl-0 sm:px-8 lg:border-r lg:border-b-0 lg:first:pl-0 lg:last:border-r-0"
          >
            <dt className="text-sm leading-snug text-ink-soft">{label}</dt>
            <dd className="order-first mb-3 font-display text-[2.2rem] leading-none text-forest sm:text-[2.6rem]">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
