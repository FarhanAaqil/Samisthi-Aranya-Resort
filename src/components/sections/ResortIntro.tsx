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
    <Section id="resort" tone="olive" className="border-t border-cream/12">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
        <div className="grid grid-cols-[1.15fr_1fr] items-end gap-4 lg:col-span-6" data-reveal>
          <Picture
            photo={photos.grandStaircase}
            sizes="(min-width: 1024px) 26vw, 50vw"
            className="aspect-[3/4]"
          />
          <Picture
            photo={photos.corridorCourtyard}
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="mb-14 aspect-[4/5]"
            imageClassName="object-[40%_50%]"
          />
        </div>

        <div className="lg:col-span-6" data-reveal>
          <p className="caps text-brass-light">The resort</p>
          <h2 className="mt-5 font-display text-[2.5rem] leading-[1.08] text-balance sm:text-[3.3rem]">
            A forest resort near Srisailam and Mannanur
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-[1.05rem] leading-[1.85] text-cream-soft">
            <p>
              Samisthi Aranya Resorts sits on the Hyderabad–Srisailam highway near Mannanur, at the
              edge of the Nallamala forest. Forest-view balconies, wide verandahs over a green
              courtyard and lawns that turn gold every evening make every stay feel unhurried.
            </p>
            <p>
              Come for a quiet weekend with family, a celebration with friends, a team outing or a
              jungle safari into the Amrabad Tiger Reserve. The resort team looks after every
              booking personally, from the first call to check-out.
            </p>
          </div>
          <a href="#gallery" className="caps text-link mt-9">
            See the resort in photos
          </a>
        </div>
      </div>

      <dl className="mt-24 grid grid-cols-2 border-t border-cream/15 lg:grid-cols-4" data-reveal>
        {facts.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col border-b border-cream/15 py-8 pr-5 pl-5 odd:border-r odd:pl-0 sm:px-8 lg:border-r lg:border-b-0 lg:first:pl-0 lg:last:border-r-0"
          >
            <dt className="text-sm leading-snug text-cream-soft">{label}</dt>
            <dd className="order-first mb-3 font-display text-[2.1rem] leading-none text-brass-light sm:text-[2.5rem]">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
