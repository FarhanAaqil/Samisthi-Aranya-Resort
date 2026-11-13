import { Picture } from '@/components/ui/Picture';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FACILITIES } from '@/data/facilities';
import { photos } from '@/data/photos';

export function Experiences() {
  // The safari has its own section further down.
  const items = FACILITIES.filter((facility) => facility.id !== 'safari');

  return (
    <Section id="experiences" tone="olive">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Experiences"
            title="Slow days by the pool and on the lawn"
            lead="The pool, rain dance and lawn games are part of every stay. Only the restaurant is charged separately."
          />
          <div className="mt-12 grid grid-cols-2 gap-4" data-reveal>
            <Picture
              photo={photos.poolNight}
              sizes="(min-width: 1024px) 20vw, 45vw"
              className="col-span-2 aspect-[16/10]"
            />
            <Picture
              photo={photos.lawnHills}
              sizes="(min-width: 1024px) 10vw, 45vw"
              className="aspect-square"
            />
            <Picture
              photo={photos.pavilion}
              sizes="(min-width: 1024px) 10vw, 45vw"
              className="aspect-square"
            />
          </div>
        </div>

        <ul className="grid content-start gap-x-12 sm:grid-cols-2 lg:col-span-7 lg:pt-4">
          {items.map(({ id, icon: Icon, title, note, description }) => (
            <li key={id} className="border-t border-cream/15 py-8" data-reveal>
              <Icon className="size-6 text-brass" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-4 font-display text-[1.6rem] leading-tight text-cream">{title}</h3>
              <p className="caps mt-2 text-[0.62rem] text-brass-light">{note}</p>
              <p className="mt-3 leading-relaxed text-cream-soft">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
