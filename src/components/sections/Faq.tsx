import { Plus } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQS } from '@/data/faq';

/** Native <details> keeps answers readable without JavaScript and keyboard-friendly by default. */
export function Faq() {
  return (
    <Section id="faq" tone="ivory">
      <div className="grid gap-14 lg:grid-cols-12">
        <SectionHeading
          eyebrow="Good to know"
          title="Questions guests often ask"
          className="lg:col-span-4"
        />

        <div className="border-t border-ink/15 lg:col-span-8" data-reveal>
          {FAQS.map((faq, index) => (
            <details
              key={faq.id}
              name="faq"
              open={index === 0}
              className="group border-b border-ink/15"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[1.45rem] leading-snug text-forest marker:hidden [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed font-light text-ink-soft">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
