import { RESORT } from '@/data/resort';
import { ROOM_CATEGORIES, TOTAL_ROOMS } from '@/data/rooms';
import { getSiteUrl } from '@/lib/site';

/**
 * Structured data for search engines. Only facts the owner has confirmed are included:
 * there is deliberately no rating or review markup until genuine review data exists.
 */
export function JsonLd() {
  const siteUrl = getSiteUrl();

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: RESORT.name,
    slogan: RESORT.tagline,
    telephone: RESORT.contact.phoneE164,
    ...(siteUrl ? { url: siteUrl, image: `${siteUrl}/og-resort.jpg` } : {}),
    hasMap: RESORT.maps.resortDirections,
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
    },
    checkinTime: '11:00',
    checkoutTime: '11:00',
    numberOfRooms: TOTAL_ROOMS,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kids’ swimming pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Rain dance', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Vegetarian restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Conference hall', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi in rooms', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Jungle safari (arranged)', value: true },
    ],
    containsPlace: ROOM_CATEGORIES.map((room) => ({
      '@type': 'HotelRoom',
      name: room.name,
      occupancy: { '@type': 'QuantitativeValue', maxValue: room.guests },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps the JSON safe to embed inside a script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
