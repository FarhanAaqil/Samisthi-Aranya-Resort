import React from 'react';
import Link from 'next/link';
import { ObsidianLogo } from '@/components/ObsidianLogo';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-obsidian px-6 text-center text-palerose">
      <ObsidianLogo className="mx-auto w-full max-w-xs" />
      <p className="mt-4 text-xs tracking-[0.25em] text-gold uppercase">404 • Page Not Found</p>
      <h1 className="mt-2 font-serif text-3xl text-palerose sm:text-5xl">
        This Forest Path Leads Back to the Resort
      </h1>
      <p className="mt-3 max-w-md text-sm text-palerose/80">
        Samisthi Aranya Resorts is a single-page experience. Return to our main page to explore
        rooms, tariffs, facilities, and direct booking enquiries.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-widest text-obsidian uppercase transition-colors hover:bg-rose"
      >
        Return to Samisthi Aranya Resorts
      </Link>
    </main>
  );
}
