import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';

interface LegalPageProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

/** Shared frame for the short policy pages. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <main id="main" className="pt-32 pb-24">
      <Container size="narrow">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to the resort
        </Link>
        <h1 className="mt-6 font-display text-5xl font-semibold text-forest">{title}</h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated {updated}</p>
        <div className="mt-10 space-y-5 leading-relaxed text-ink [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-forest [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </Container>
    </main>
  );
}
