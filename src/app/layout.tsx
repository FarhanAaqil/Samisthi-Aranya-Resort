import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Reveal } from '@/components/layout/Reveal';
import { ScrollEffects } from '@/components/layout/ScrollEffects';
import { JsonLd } from '@/components/seo/JsonLd';
import { RESORT } from '@/data/resort';
import { getSiteUrl, isIndexable } from '@/lib/site';

import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const siteUrl = getSiteUrl();

const description =
  'A nature retreat near Mannanur on the Srisailam highway. 23 AC and Non-AC rooms and suites, a 24-hour pool and rain dance, green lawns and pure vegetarian dining, close to Srisailam Dam View Point and Amrabad Tiger Reserve.';

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
  themeColor: '#f5e6dc',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-wine focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-petal"
        >
          Skip to content
        </a>
        <ScrollEffects />
        <Header />
        {children}
        <Footer />
        <Reveal />
        <JsonLd />
      </body>
    </html>
  );
}
