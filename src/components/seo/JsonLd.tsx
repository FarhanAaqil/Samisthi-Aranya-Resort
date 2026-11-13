import { FAQS } from '@/data/faq';
import { RESORT } from '@/data/resort';
import { ROOM_CATEGORIES, TOTAL_GUESTS, TOTAL_ROOMS } from '@/data/rooms';
import { getSiteUrl } from '@/lib/site';

/** Embeds structured data safely inside a script tag. */
function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps the JSON safe to embed inside a script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

const lowest = Math.min(...ROOM_CATEGORIES.map((room) => room.nonAcRate));
const highest = Math.max(...ROOM_CATEGORIES.map((room) => room.acRate));

/**
 * Structured data for search engines, using only facts the owner has confirmed. There is
 * deliberately no rating or review markup until genuine review data is available.
 */
export function JsonLd() {
  const siteUrl = getSiteUrl();
  const absolute = (path: string) => (siteUrl ? `${siteUrl}${path}` : path);

  const resort = {
    '@context': 'https://schema.org',
    '@type': ['Resort', 'LodgingBusiness'],
    '@id': absolute('/#resort'),
    name: RESORT.name,
    alternateName: 'Samisthi Aranya',
    slogan: `${RESORT.motto}. ${RESORT.tagline}`,
    description: `A forest resort near Mannanur on the Hyderabad–Srisailam highway, at the edge of the Nallamala forest. ${TOTAL_ROOMS} rooms and suites for up to ${TOTAL_GUESTS} guests, forest-view balconies, a 24-hour pool and rain dance, jungle safaris into the Amrabad Tiger Reserve, and lawns for family, corporate and celebration events.`,
    url: siteUrl,
    logo: absolute('/brand/samisthi-aranya-logo.png'),
    image: [absolute('/og-resort.jpg'), absolute('/brand/samisthi-aranya-logo.png')],
    telephone: RESORT.contact.phoneE164,
    priceRange: `₹${lowest.toLocaleString('en-IN')} – ₹${highest.toLocaleString('en-IN')} per room, 24 hours`,
    currenciesAccepted: 'INR',
    hasMap: RESORT.maps.resortDirections,
    sameAs: [RESORT.maps.resortDirections],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESORT.coordinates.latitude,
      longitude: RESORT.coordinates.longitude,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mannanur',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
      ...(RESORT.postalAddress ? { streetAddress: RESORT.postalAddress } : {}),
    },
    containedInPlace: { '@type': 'Place', name: 'Nallamala forest, Telangana' },
    checkinTime: '11:00',
    checkoutTime: '11:00',
    numberOfRooms: TOTAL_ROOMS,
    maximumAttendeeCapacity: TOTAL_GUESTS,
    amenityFeature: [
      'Swimming pool (open 24 hours)',
      'Kids’ swimming pool',
      'Rain dance',
      'Forest-view balconies',
      'Jungle safari arranged to Amrabad Tiger Reserve',
      'Pure vegetarian restaurant',
      'Conference hall',
      'Lawns and open gardens',
      'Play area',
      'Outdoor games: cricket, football, volleyball',
      'Wi-Fi in rooms',
      'Parking',
    ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    containsPlace: ROOM_CATEGORIES.map((room) => ({
      '@type': room.id === 'suite' ? 'Suite' : 'HotelRoom',
      name: room.name,
      description: room.summary,
      occupancy: { '@type': 'QuantitativeValue', maxValue: room.guests },
    })),
    makesOffer: ROOM_CATEGORIES.flatMap((room) =>
      [
        ['AC', room.acRate],
        ['Non-AC', room.nonAcRate],
      ].map(([variant, price]) => ({
        '@type': 'Offer',
        name: `${room.name} (${variant}), 24-hour stay`,
        price,
        priceCurrency: 'INR',
        description: 'Per room for 24 hours, GST included. Booked directly with the resort.',
      })),
    ),
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };

  return (
    <>
      <Script data={resort} />
      <Script data={faq} />
    </>
  );
}
