import { ChevronDown } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQS } from '@/data/faq';

/** Native <details> keeps the answers readable without JavaScript and keyboard-accessible by default. */
export function Faq() {
  return (
    <Section id="faq" tone="sand" containerSize="narrow">
      <SectionHeading align="center" eyebrow="Good to know" title="Questions guests often ask" />

      <div className="mt-12 space-y-3" data-reveal>
        {FAQS.map((faq, index) => (
          <details
            key={faq.id}
            name="faq"
            open={index === 0}
            className="group rounded-2xl border border-wine/12 bg-petal shadow-soft open:border-wine/25"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 font-display text-xl font-semibold text-wine marker:hidden [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </summary>
            <p className="px-6 pb-6 text-ink-soft">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
