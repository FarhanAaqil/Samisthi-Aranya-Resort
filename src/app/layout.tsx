import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Jost } from 'next/font/google';

import { BookingBar } from '@/components/booking/BookingBar';
import { BookingProvider } from '@/components/booking/BookingProvider';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Reveal } from '@/components/layout/Reveal';
import { ScrollEffects } from '@/components/layout/ScrollEffects';
import { JsonLd } from '@/components/seo/JsonLd';
import { RESORT } from '@/data/resort';
import { getSiteUrl, isIndexable } from '@/lib/site';

import './globals.css';

// Variable fonts: one file per style covers every weight used on the page.
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-bodoni',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

const siteUrl = getSiteUrl();

// About 155 characters, written for people first; the place names are what guests search for.
const description = `Forest-view rooms and suites near Mannanur on the Hyderabad–Srisailam highway. 24-hour pool, jungle safaris into Amrabad Tiger Reserve, lawns for family and corporate events.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? 'http://localhost:3000'),
  title: {
    default: `${RESORT.name} | Forest Resort near Srisailam & Mannanur`,
    template: `%s | ${RESORT.name}`,
  },
  description,
  applicationName: RESORT.name,
  category: 'travel',
  keywords: [
    'resort near Srisailam',
    'resort in Mannanur',
    'Nallamala forest resort',
    'Amrabad Tiger Reserve stay',
    'jungle safari Srisailam',
    'resort with swimming pool near Srisailam',
    'family resort Hyderabad Srisailam highway',
    'corporate outing resort Telangana',
  ],
  alternates: { canonical: '/' },
  robots: isIndexable()
    ? { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
    : { index: false, follow: false },
  openGraph: {
    title: `${RESORT.name}: ${RESORT.motto}. ${RESORT.tagline}`,
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
        alt: 'The Samisthi Aranya Resorts badge over the main building and lawn at sunset, near Mannanur',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  // Regional hints some search engines and map services still read.
  other: {
    'geo.region': 'IN-TG',
    'geo.placename': 'Mannanur, Nagarkurnool, Telangana',
    'geo.position': `${RESORT.coordinates.latitude};${RESORT.coordinates.longitude}`,
    ICBM: `${RESORT.coordinates.latitude}, ${RESORT.coordinates.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: '#4a4a22',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${bodoni.variable} ${jost.variable}`}>
      <body className="pb-[calc(4rem+env(safe-area-inset-bottom))] font-sans antialiased lg:pb-[5.25rem]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-brass focus:px-5 focus:py-3 focus:text-sm focus:text-bark"
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
