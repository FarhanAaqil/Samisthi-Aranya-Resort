import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { RESORT_CONFIG, ROOM_CATEGORIES } from '@/data/resortData';

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined);

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: 'Samisthi Aranya Resorts | Nature Retreat Near Mannanur & Srisailam Dam View Point',
  description:
    'Samisthi Aranya Resorts — Where Nature Meets Luxury. Stay near Mannanur, Amrabad Tiger Reserve & Srisailam Dam View Point with 23 AC/Non-AC rooms & suites, 24-hour swimming pool, kids pool, rain dance & pure vegetarian dining.',
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  openGraph: {
    title: 'Samisthi Aranya Resorts — Where Nature Meets Luxury.',
    description:
      'Nature retreat near Mannanur & Srisailam Dam View Point featuring 23 AC & Non-AC rooms and suites, 24-hour pool & rain dance, spacious lawns, and direct WhatsApp/phone booking.',
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: 'Samisthi Aranya Resorts',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero/IMG-20261107-WA0040(1).webp',
        width: 1280,
        height: 960,
        alt: 'Samisthi Aranya Resorts main building and green lawn at twilight',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Truthful Schema.org LodgingBusiness / Hotel structured data (no fabricated review/rating fields)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: RESORT_CONFIG.brandName,
    slogan: RESORT_CONFIG.tagline,
    ...(siteUrl ? { url: siteUrl } : {}),
    telephone: '+91-79815-83940',
    image: siteUrl
      ? `${siteUrl}/images/hero/IMG-20261107-WA0040(1).webp`
      : '/images/hero/IMG-20261107-WA0040(1).webp',
    hasMap: RESORT_CONFIG.maps.resortDirectionsUrl,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESORT_CONFIG.coordinates.latitude,
      longitude: RESORT_CONFIG.coordinates.longitude,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mannanur',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    checkinTime: '11:00',
    checkoutTime: '11:00',
    numberOfRooms: RESORT_CONFIG.stayPolicy.totalRoomsCount,
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Main Swimming Pool & Dedicated Kids Pool (24 Hours)',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Rain Dance Facility (24 Hours)',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Pure Vegetarian Restaurant (Charged Separately)',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Conference Hall & Event Lawns',
        value: true,
      },
      { '@type': 'LocationFeatureSpecification', name: 'In-Room Wi-Fi & Television', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'On-Site Parking', value: true },
    ],
    containsPlace: ROOM_CATEGORIES.map((r) => ({
      '@type': 'HotelRoom',
      name: r.name,
      occupancy: {
        '@type': 'QuantitativeValue',
        maxValue: r.occupancyGuests,
      },
    })),
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-obsidian font-sans text-palerose antialiased">{children}</body>
    </html>
  );
}
