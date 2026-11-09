import { MessageCircle, Phone } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FACILITIES, type Facility } from '@/data/facilities';
import { telHref, whatsappHref } from '@/lib/links';

function Note({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-rose-soft/70 px-3 py-1 text-xs font-semibold text-wine-deep">
      {children}
    </span>
  );
}

function PhotoCard({
  facility,
}: {
  facility: Facility & { photo: NonNullable<Facility['photo']> };
}) {
  const { icon: Icon, photo } = facility;
  return (
    <article
      className="overflow-hidden rounded-[1.75rem] border border-wine/10 bg-sand/60 shadow-soft"
      data-reveal
    >
      <Picture
        photo={photo}
        sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
        className="aspect-[16/10]"
        imageClassName="object-[50%_60%]"
      />
      <div className="p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-rose-soft/70 text-wine">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <h3 className="font-display text-2xl font-semibold text-wine">{facility.title}</h3>
        </div>
        <p className="mt-3 text-ink-soft">{facility.description}</p>
        <p className="mt-4">
          <Note>{facility.note}</Note>
        </p>
      </div>
    </article>
  );
}

export function Experiences() {
  const withPhoto = FACILITIES.filter(
    (facility): facility is Facility & { photo: NonNullable<Facility['photo']> } =>
      facility.photo !== undefined,
  );
  const withoutPhoto = FACILITIES.filter((facility) => facility.photo === undefined);

  return (
    <Section id="experiences" tone="petal">
      <SectionHeading
        eyebrow="Experiences"
        title="Things to do between the pool and the lawn"
        lead="Most of what you see here is part of your stay. Only the restaurant is charged separately."
      />

      <div className="mt-12 grid gap-7 md:grid-cols-2">
        {withPhoto.map((facility) => (
          <PhotoCard key={facility.id} facility={facility} />
        ))}
      </div>

      <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {withoutPhoto.map(({ id, icon: Icon, title, note, description }) => (
          <article
            key={id}
            className="rounded-[1.75rem] border border-wine/10 bg-sand/60 p-6 shadow-soft sm:p-7"
            data-reveal
          >
            <span className="grid size-11 place-items-center rounded-full bg-rose-soft/70 text-wine">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-wine">{title}</h3>
            <p className="mt-2 text-ink-soft">{description}</p>
            <p className="mt-4">
              <Note>{note}</Note>
            </p>
          </article>
        ))}

        <article
          className="flex flex-col justify-between rounded-[1.75rem] bg-wine p-6 text-petal shadow-soft sm:p-7"
          data-reveal
        >
          <div>
            <h3 className="font-display text-2xl font-semibold">Planning something special?</h3>
            <p className="mt-2 text-petal/85">
              Tell us the occasion and the team will suggest how to make the most of the grounds.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={whatsappHref()} external variant="light">
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </Button>
            <Button
              href={telHref}
              variant="light"
              className="bg-transparent text-petal ring-1 ring-petal/50 hover:bg-petal/12"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call
            </Button>
          </div>
        </article>
      </div>
    </Section>
  );
}
