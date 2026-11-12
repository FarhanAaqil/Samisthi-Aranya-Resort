import type { Metadata, Viewport } from 'next';
import { Cinzel, Cormorant_Garamond, Jost } from 'next/font/google';

import { BookingBar } from '@/components/booking/BookingBar';
import { BookingProvider } from '@/components/booking/BookingProvider';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Reveal } from '@/components/layout/Reveal';
import { ScrollEffects } from '@/components/layout/ScrollEffects';
import { JsonLd } from '@/components/seo/JsonLd';
import { RESORT } from '@/data/resort';
import { TOTAL_ROOMS } from '@/data/rooms';
import { getSiteUrl, isIndexable } from '@/lib/site';

import './globals.css';

// Variable fonts: one file per style covers every weight used on the page.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

// Only the wordmark uses Cinzel, so only the one weight is loaded.
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-cinzel',
  display: 'swap',
});

const siteUrl = getSiteUrl();

const description = `A nature retreat on the edge of the Nallamala forest near Mannanur. ${TOTAL_ROOMS} AC and Non-AC rooms and suites, a 24-hour pool and rain dance, jungle safaris into the Amrabad Tiger Reserve and pure vegetarian dining, close to Srisailam Dam View Point.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? 'http://localhost:3000'),
  title: {
    default: `${RESORT.name} | Nature stay near Mannanur and Srisailam`,
    template: `%s | ${RESORT.name}`,
  },
  description,
  alternates: { canonical: '/' },
  robots: isIndexable() ? undefined : { index: false, follow: false },
  openGraph: {
    title: `${RESORT.name}: ${RESORT.tagline}`,
    description,
    siteName: RESORT.name,
    locale: 'en_IN',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/og-resort.jpg',
        width: 1200,
        height: 630,
        alt: 'The main building of Samisthi Aranya Resorts beside its green lawn at sunset',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#08230f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${cinzel.variable}`}>
      <body className="pb-[calc(4rem+env(safe-area-inset-bottom))] font-sans antialiased lg:pb-[5.25rem]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <BookingProvider>
          <ScrollEffects />
          <Header />
          {children}
          <Footer />
          <BookingBar />
        </BookingProvider>
        <Reveal />
        <JsonLd />
      </body>
    </html>
  );
}
