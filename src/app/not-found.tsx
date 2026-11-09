import React from 'react';
import Link from 'next/link';
import { ObsidianLogo } from '@/components/ObsidianLogo';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian text-palerose flex flex-col items-center justify-center px-6 text-center">
      <ObsidianLogo className="w-full max-w-xs mx-auto" />
      <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gold">404 • Page Not Found</p>
      <h1 className="mt-2 font-serif text-3xl sm:text-5xl text-palerose">
        This Forest Path Leads Back to the Resort
      </h1>
      <p className="mt-3 max-w-md text-sm text-palerose/80">
         Samisthi Aranya Resorts is a single-page experience. Return to our main page to explore rooms,
        tariffs, facilities, and direct booking enquiries.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-widest text-obsidian hover:bg-rose transition-colors"
      >
        Return to Samisthi Aranya Resorts
      </Link>
    </main>
  );
}
