import type { Metadata } from 'next';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center bg-olive pt-32 pb-16">
      <Container size="narrow" className="text-center">
        <Logo sizes="176px" className="mx-auto h-44" />
        <p className="mt-10 text-xs font-semibold tracking-[0.22em] text-brass-light uppercase">
          Page not found
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-balance text-cream sm:text-5xl">
          This path leads back to the resort
        </h1>
        <p className="mx-auto mt-4 max-w-md text-cream-soft">
          The page you were looking for isn’t here. Everything about the resort, from rooms and
          tariffs to directions, is on the home page.
        </p>
        <Button href="/" size="lg" className="mt-8">
          Back to Samisthi Aranya Resorts
        </Button>
      </Container>
    </main>
  );
}
