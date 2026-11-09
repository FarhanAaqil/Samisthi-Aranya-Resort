// Central Data & Configuration Source of Truth for Samisthi Aranya Resorts
// Edit room tariffs, category counts, phone/WhatsApp details, Google Maps links, and review URLs here.

export interface RoomPhoto {
  src: string;
  webp: string;
  alt: string;
  caption: string;
  variantTag: 'AC' | 'Non-AC' | 'Suite' | 'Balcony & View';
}

export interface RoomCategory {
  id: string;
  name: string;
  shortLabel: string;
  occupancyGuests: number;
  totalRooms: number;
  acTariffINR: number;
  nonAcTariffINR: number;
  summary: string;
  highlights: string[];
  whatsappPrefill: string;
  photos: RoomPhoto[];
}

export interface FacilityItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  details: string;
  image?: string;
  visualLabel?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  webp: string;
  alt: string;
  caption: string;
  group:
    | 'rooms-2p'
    | 'rooms-4p'
    | 'rooms-6p-suite'
    | 'pool'
    | 'lawns-exterior'
    | 'balconies-corridors'
    | 'events';
  groupLabel: string;
}

export interface NearbyDestination {
  id: string;
  name: string;
  badge: string;
  isPrimaryHighlight?: boolean;
  description: string;
  mapsUrl: string;
  verificationNote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const RESORT_CONFIG = {
  brandName: 'Samisthi Aranya Resorts',
  tagline: 'Where Nature Meets Luxury.',
  localitySummary:
    'Mannanur — Srisailam Highway Corridor, Near Amrabad Tiger Reserve & Srisailam Dam View Point, Telangana',
  // Do not invent a unconfirmed street number; use verified locality and direct Google Maps pin
  verifiedLocalityLabel: 'Near Mannanur, Srisailam Highway Region, Telangana, India',
  coordinates: {
    latitude: 16.3505042,
    longitude: 78.7507832,
  },
  contact: {
    phoneRaw: '7981583940',
    phoneDisplay: '+91 79815 83940',
    telHref: 'tel:+917981583940',
    whatsappHref: 'https://wa.me/917981583940',
    whatsappDefaultText:
      'Hello Samisthi Aranya Resorts team, I would like to enquire about room availability and tariffs for an upcoming stay.',
  },
  maps: {
    resortDirectionsUrl: 'https://maps.app.goo.gl/qJF7ig8nu8stzFhW6',
    srisailamDamViewPointUrl: 'https://maps.app.goo.gl/t8roSR29dQLuMqyE9',
    amarabadSafariGateUrl: 'https://maps.app.goo.gl/QXp46SM2mBZuUCMy5',
    octopusViewPointUrl: 'https://maps.app.goo.gl/LF679T3D1o5vqBF68',
    munnanurJungleResortUrl: 'https://maps.app.goo.gl/uVvbNh7McWDtNca47',
  },
  stayPolicy: {
    checkIn: '11:00 AM',
    checkOut: '11:00 AM the following day',
    durationLabel: '24-hour stay',
    gstIncluded: true,
    totalRoomsCount: 23,
    maxCombinedGuests: 68,
    bookingProcessNote:
      'This website is an official information and direct-enquiry experience. All room availability checks and final reservation confirmations are handled directly by our resort team over phone or WhatsApp.',
  },
  wholeResortBooking: {
    indicativeMinINR: 70000,
    indicativeMaxINR: 100000,
    priceRangeDisplay: '₹70,000 – ₹1,00,000 per day',
    pricingTypeLabel: 'Indicative Custom Quote (dependent on date & guest count)',
    supportedEvents: [
      'Family Gatherings & Reunions',
      'Birthday Celebrations',
      'Intimate Weddings & Pre-Wedding Functions',
      'Corporate Offsites & Seminars',
      'Team Outings & Nature Retreats',
    ],
  },
  // Pending owner inputs — update when supplied by owner
  pendingOwnerConfig: {
    googleReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || '',
    formattedPostalAddress: '', // Leave blank until owner confirms exact formatted postal address line
    socialLinks: [] as { label: string; url: string }[], // Hidden while empty
  },
  palette: {
    obsidian: '#120D0F',
    deepWine: '#682E4E',
    rose: '#E79AB2',
    paleRose: '#F6E7EC',
    gold: '#C9A227',
  },
};

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: '2-person-room',
    name: '2-Person Room',
    shortLabel: 'Couples & Solo Travellers',
    occupancyGuests: 2,
    totalRooms: 11,
    acTariffINR: 2500,
    nonAcTariffINR: 1500,
    summary:
      'Well-appointed double-occupancy rooms crafted for couples and peaceful two-guest stays, available in both AC and Non-AC variants with access to expansive sit-out balconies.',
    highlights: [
      '2 Guests Capacity • 11 Rooms Total in Category',
      'AC Variant: ₹2,500 / 24 hrs (GST Included)',
      'Non-AC Variant: ₹1,500 / 24 hrs (GST Included)',
      'In-room Wi-Fi, television & 24-hour pool + rain dance access included',
    ],
    whatsappPrefill:
      'Hello Samisthi Aranya Resorts, I would like to enquire about the 2-Person Room (AC ₹2,500 / Non-AC ₹1,500 per 24-hour stay).',
    photos: [
      {
        src: '/images/rooms/2p-IMG-20261102-WA0038.jpg',
        webp: '/images/rooms/2p-IMG-20261102-WA0038.webp',
        alt: '2-Person AC Room at Samisthi Aranya Resorts with double bed, split AC, wardrobe and wall-mounted TV',
        caption: '2-Person AC Room — Spacious double bed, split AC, wardrobe & TV unit',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/2p-IMG-20261102-WA0039.jpg',
        webp: '/images/rooms/2p-IMG-20261102-WA0039.webp',
        alt: 'Wide angle view of 2-Person AC Room with double bed and window curtains at Samisthi Aranya Resorts',
        caption: '2-Person AC Room — Wide interior perspective with seating & storage',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/2p-IMG-20261102-WA0046.jpg',
        webp: '/images/rooms/2p-IMG-20261102-WA0046.webp',
        alt: '2-Person AC Room opening onto green countryside view through balcony doors',
        caption: '2-Person AC Room — Natural daylight & direct balcony view',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/2p-IMG-20261102-WA0044.jpg',
        webp: '/images/rooms/2p-IMG-20261102-WA0044.webp',
        alt: '2-Person Double Room bed with marble-patterned headboard and framed tree artwork',
        caption: '2-Person Room (Non-AC / Standard Layout) — Double bed & warm lighting',
        variantTag: 'Non-AC',
      },
      {
        src: '/images/rooms/2p-IMG-20261102-WA0045.jpg',
        webp: '/images/rooms/2p-IMG-20261102-WA0045.webp',
        alt: '2-Person Double Room freshly dressed white linens and swan towel art',
        caption: '2-Person Room — Freshly prepared double bed with welcome towel art',
        variantTag: 'Non-AC',
      },
      {
        src: '/images/rooms/2p-IMG-20261102-WA0040.jpg',
        webp: '/images/rooms/2p-IMG-20261102-WA0040.webp',
        alt: 'Sliding glass door leading to private sit-out balcony with chairs',
        caption: 'Private Balcony Access — Glass doors opening to outdoor seating',
        variantTag: 'Balcony & View',
      },
      {
        src: '/images/rooms/2p-IMG-20261102-WA0041.jpg',
        webp: '/images/rooms/2p-IMG-20261102-WA0041.webp',
        alt: 'Outdoor balcony table and chairs overlooking green fields near Mannanur',
        caption: 'Balcony Sit-Out — Outdoor table & seating overlooking open greenery',
        variantTag: 'Balcony & View',
      },
      {
        src: '/images/rooms/2p-IMG-20261102-WA0043.jpg',
        webp: '/images/rooms/2p-IMG-20261102-WA0043.webp',
        alt: 'Wide balcony view with outdoor seating and scenic rural horizon at Samisthi Aranya Resorts',
        caption: 'Panoramic Balcony View — Open skies and peaceful natural surroundings',
        variantTag: 'Balcony & View',
      },
    ],
  },
  {
    id: '4-person-room',
    name: '4-Person Room',
    shortLabel: 'Families & Small Groups',
    occupancyGuests: 4,
    totalRooms: 7,
    acTariffINR: 4000,
    nonAcTariffINR: 2500,
    summary:
      'Generously proportioned family rooms featuring two side-by-side double beds, restful interiors, and both AC and Non-AC options for families or groups of four.',
    highlights: [
      '4 Guests Capacity • 7 Rooms Total in Category',
      'AC Variant: ₹4,000 / 24 hrs (GST Included)',
      'Non-AC Variant: ₹2,500 / 24 hrs (GST Included)',
      'Two full double beds, television, Wi-Fi & 24-hour pool + rain dance access',
    ],
    whatsappPrefill:
      'Hello Samisthi Aranya Resorts, I would like to enquire about the 4-Person Family Room (AC ₹4,000 / Non-AC ₹2,500 per 24-hour stay).',
    photos: [
      {
        src: '/images/rooms/4p-IMG-20261102-WA0005(1).jpg',
        webp: '/images/rooms/4p-IMG-20261102-WA0005(1).webp',
        alt: '4-Person AC Family Room at Samisthi Aranya Resorts with two double beds and split AC',
        caption: '4-Person AC Room — Dual double beds with wooden headboards & split AC',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/4p-IMG-20261102-WA0006.jpg',
        webp: '/images/rooms/4p-IMG-20261102-WA0006.webp',
        alt: 'Spacious 4-Person AC Room showing two double beds, wardrobe and window curtains',
        caption: '4-Person AC Room — Generous floor area & twin double-bed layout',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/4p-IMG-20261102-WA0007.jpg',
        webp: '/images/rooms/4p-IMG-20261102-WA0007.webp',
        alt: '4-Person AC Room with white linens, towel art and wardrobe at Samisthi Aranya Resorts',
        caption: '4-Person AC Room — Bright family accommodation with storage & seating',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/4p-IMG-20261102-WA0008(1).jpg',
        webp: '/images/rooms/4p-IMG-20261102-WA0008(1).webp',
        alt: '4-Person AC Room wide angle view of twin double beds',
        caption: '4-Person AC Room — Comfortable layout for four guests',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/4p-IMG-20261102-WA0019(1).jpg',
        webp: '/images/rooms/4p-IMG-20261102-WA0019(1).webp',
        alt: 'Close-up of two side-by-side double beds and bedside table in 4-Person Room',
        caption: '4-Person Room — Side-by-side double beds with central bedside table',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/4p-IMG-20261107-WA0035(1).jpg',
        webp: '/images/rooms/4p-IMG-20261107-WA0035(1).webp',
        alt: '4-Person Non-AC Room with two double beds and wall fan at Samisthi Aranya Resorts',
        caption: '4-Person Non-AC Room — Twin double beds with natural ventilation & fan',
        variantTag: 'Non-AC',
      },
      {
        src: '/images/rooms/4p-IMG-20261107-WA0034.jpg',
        webp: '/images/rooms/4p-IMG-20261107-WA0034.webp',
        alt: '4-Person Room interior showing recessed ceiling lighting and twin double beds',
        caption: '4-Person Room — Warm recessed ceiling lighting & twin double beds',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/4p-IMG-20261107-WA0036.jpg',
        webp: '/images/rooms/4p-IMG-20261107-WA0036.webp',
        alt: '4-Person AC Room showing wall-mounted television facing the beds',
        caption: '4-Person AC Room — Wall-mounted television & window view',
        variantTag: 'AC',
      },
    ],
  },
  {
    id: '6-person-room',
    name: '6-Person Room',
    shortLabel: 'Extended Families & Groups',
    occupancyGuests: 6,
    totalRooms: 2,
    acTariffINR: 6000,
    nonAcTariffINR: 3500,
    summary:
      'Expansive multi-bed group rooms designed so families and friend groups of up to six can stay together comfortably, complete with wide balcony terrace sit-outs.',
    highlights: [
      '6 Guests Capacity • 2 Rooms Total in Category',
      'AC Variant: ₹6,000 / 24 hrs (GST Included)',
      'Non-AC Variant: ₹3,500 / 24 hrs (GST Included)',
      'Multi-bed layout, TV panel, Wi-Fi & 24-hour pool + rain dance access',
    ],
    whatsappPrefill:
      'Hello Samisthi Aranya Resorts, I would like to enquire about the 6-Person Group Room (AC ₹6,000 / Non-AC ₹3,500 per 24-hour stay).',
    photos: [
      {
        src: '/images/rooms/6p-IMG-20261102-WA0032.jpg',
        webp: '/images/rooms/6p-IMG-20261102-WA0032.webp',
        alt: '6-Person Group Room at Samisthi Aranya Resorts with multiple beds, split AC and TV panel',
        caption: '6-Person Room — Multi-bed group layout with split AC, wardrobe & TV unit',
        variantTag: 'AC',
      },
      {
        src: '/images/rooms/6p-IMG-20261102-WA0042.jpg',
        webp: '/images/rooms/6p-IMG-20261102-WA0042.webp',
        alt: 'Spacious covered balcony sit-out with table and chairs overlooking greenery',
        caption: 'Group Balcony Terrace — Covered outdoor sit-out overlooking the landscape',
        variantTag: 'Balcony & View',
      },
    ],
  },
  {
    id: 'suite-room',
    name: 'Suite',
    shortLabel: 'Private Lounge + Bedroom Suite',
    occupancyGuests: 2,
    totalRooms: 3,
    acTariffINR: 6000,
    nonAcTariffINR: 5000,
    summary:
      'Our premier two-guest suites feature a dedicated front living lounge with an L-shaped sofa and coffee table opening into a private adjoining bedroom.',
    highlights: [
      '2 Guests Capacity • 3 Suites Total in Category',
      'AC Variant: ₹6,000 / 24 hrs (GST Included)',
      'Non-AC Variant: ₹5,000 / 24 hrs (GST Included)',
      'Separate living lounge with L-shaped sofa + private adjoining bedroom',
    ],
    whatsappPrefill:
      'Hello Samisthi Aranya Resorts, I would like to enquire about the Suite (2 Guests, Living Lounge + Bedroom — AC ₹6,000 / Non-AC ₹5,000 per 24-hour stay).',
    photos: [
      {
        src: '/images/rooms/suite-IMG-20261102-WA0020.jpg',
        webp: '/images/rooms/suite-IMG-20261102-WA0020.webp',
        alt: 'Suite at Samisthi Aranya Resorts showing private living lounge with L-shaped sofa and adjoining bedroom',
        caption: 'Suite — Private living lounge with L-shaped sofa & doorway to adjoining bedroom',
        variantTag: 'Suite',
      },
      {
        src: '/images/rooms/suite-IMG-20261102-WA0023.jpg',
        webp: '/images/rooms/suite-IMG-20261102-WA0023.webp',
        alt: 'Suite lounge seating area looking into the private bedroom at Samisthi Aranya Resorts',
        caption: 'Suite Lounge & Bedroom — Separate sitting area and private bedroom suite',
        variantTag: 'Suite',
      },
      {
        src: '/images/rooms/suite-IMG-20261102-WA0026.jpg',
        webp: '/images/rooms/suite-IMG-20261102-WA0026.webp',
        alt: 'Suite double bed dressed with heart-shaped welcome towel arrangement',
        caption: 'Suite Bedroom — Double bed with welcome floral & towel presentation',
        variantTag: 'Suite',
      },
      {
        src: '/images/rooms/suite-IMG-20261102-WA0027.jpg',
        webp: '/images/rooms/suite-IMG-20261102-WA0027.webp',
        alt: 'Close-up of decorative welcome towel art on Suite bedding at Samisthi Aranya Resorts',
        caption: 'Suite Welcome Detail — Thoughtful presentation for special stays',
        variantTag: 'Suite',
      },
    ],
  },
];

export const CONFIRMED_FACILITIES: FacilityItem[] = [
  {
    id: 'swimming-pools',
    title: 'Main Pool & Dedicated Kids’ Pool',
    badge: '24 Hours • Included in Tariff',
    description:
      'Take a refreshing dip at any hour in our illuminated main swimming pool suitable for adults and children, alongside a separate dedicated kids’ swimming pool.',
    details:
      'Pool access is available 24 hours and is included in your room tariff. Swimwear and swimming gear are available at the resort for guests to use while swimming.',
    image: '/images/resort/AISelect_20261110_005115_Maps.jpg',
  },
  {
    id: 'rain-dance',
    title: '24-Hour Rain Dance Arena',
    badge: '24 Hours • Included in Tariff',
    description:
      'Celebrate with family and friends under our dedicated rain dance facility, included with your stay at no additional charge.',
    details: 'Available 24 hours and included in the room tariff for registered resort guests.',
    visualLabel: 'Rain dance',
  },
  {
    id: 'vegetarian-restaurant',
    title: 'Pure Vegetarian Restaurant',
    badge: 'Vegetarian Only • Charged Separately',
    description: 'Enjoy vegetarian food at the on-site restaurant, with covered courtyard seating.',
    details:
      'Strictly vegetarian-only restaurant. Food and beverages are charged separately and are not included in the room tariffs.',
    visualLabel: 'Pure vegetarian dining',
  },
  {
    id: 'garden-outdoor-sports',
    title: 'Expansive Lawns & Outdoor Sports',
    badge: 'Equipment Provided • No Extra Charge',
    description:
      'Enjoy open-air matches of cricket, football, volleyball, and fun garden games across our manicured green lawns.',
    details:
      'Guests may use resort sports equipment at no separate charge or bring their own gear for family and team games.',
    image: '/images/resort/AISelect_20261110_004937_Maps.jpg',
  },
  {
    id: 'conference-hall',
    title: 'Conference Hall & Event Spaces',
    badge: 'Corporate & Private Functions',
    description:
      'Host corporate meetings, training seminars, family get-togethers, birthdays, and weddings in a calm natural setting.',
    details:
      'Dedicated conference hall and expansive courtyard lawn spaces tailored for group gatherings and celebrations.',
    visualLabel: 'Meetings & gatherings',
  },
  {
    id: 'campfire-on-request',
    title: 'Evening Campfire (On Request)',
    badge: 'Special Occasions • On Request',
    description:
      'Arrange a campfire for a special occasion or group stay and enjoy an evening together outdoors.',
    details:
      'Available on request and for special occasions only; it is not a scheduled daily facility.',
    visualLabel: 'Campfire on request',
  },
  {
    id: 'guest-essentials',
    title: 'Guest Essentials',
    badge: 'Available On Site',
    description:
      'Stay connected and comfortable with Wi-Fi and televisions in rooms, on-site parking, and swimwear and swimming gear available for use at the pool.',
    details:
      'Sports equipment is provided for cricket, football, volleyball and garden games. Guests may also bring their own equipment.',
    visualLabel: 'Comfort & convenience',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // Lawns & Exterior (5)
  {
    id: 'gal-hero-lawn',
    src: '/images/hero/IMG-20261107-WA0040(1).jpg',
    webp: '/images/hero/IMG-20261107-WA0040(1).webp',
    alt: 'Samisthi Aranya Resorts main building and expansive green lawn at twilight',
    caption:
      'Samisthi Aranya Resorts — Main building and manicured central lawn under the evening sky',
    group: 'lawns-exterior',
    groupLabel: 'Lawns & Exterior',
  },
  {
    id: 'gal-night-facade',
    src: '/images/resort/AISelect_20261110_004813_Maps.jpg',
    webp: '/images/resort/AISelect_20261110_004813_Maps.webp',
    alt: 'Samisthi Aranya Resorts exterior facade illuminated at night with warm lights',
    caption: 'Evening Arrival — Illuminated resort facade and welcoming entrance porch',
    group: 'lawns-exterior',
    groupLabel: 'Lawns & Exterior',
  },
  {
    id: 'gal-day-lawn',
    src: '/images/resort/AISelect_20261110_004937_Maps.jpg',
    webp: '/images/resort/AISelect_20261110_004937_Maps.webp',
    alt: 'Daylight view of the green lawn and resort wing at Samisthi Aranya Resorts',
    caption: 'Daylight Grounds — Expansive green lawn for outdoor sports and leisure',
    group: 'lawns-exterior',
    groupLabel: 'Lawns & Exterior',
  },
  {
    id: 'gal-hills-view',
    src: '/images/resort/AISelect_20261110_005053_Maps.jpg',
    webp: '/images/resort/AISelect_20261110_005053_Maps.webp',
    alt: 'View across Samisthi Aranya Resorts lawn toward the surrounding green hills',
    caption: 'Natural Surroundings — Elevated view of the lawn and nearby hills',
    group: 'lawns-exterior',
    groupLabel: 'Lawns & Exterior',
  },
  {
    id: 'gal-promenade-wide',
    src: '/images/resort/AISelect_20261110_004924_Maps.jpg',
    webp: '/images/resort/AISelect_20261110_004924_Maps.webp',
    alt: 'Covered checkered-tile courtyard pavilion bordering the green lawn',
    caption: 'Covered Courtyard Pavilion — Shaded seating area overlooking the garden',
    group: 'lawns-exterior',
    groupLabel: 'Lawns & Exterior',
  },
  // Pool (3)
  {
    id: 'gal-pool-close',
    src: '/images/resort/AISelect_20261110_005115_Maps.jpg',
    webp: '/images/resort/AISelect_20261110_005115_Maps.webp',
    alt: 'Illuminated swimming pool at night at Samisthi Aranya Resorts',
    caption: 'Main Swimming Pool — 24-hour access included in room tariff',
    group: 'pool',
    groupLabel: 'Swimming Pool',
  },
  {
    id: 'gal-pool-night-vertical',
    src: '/images/resort/AISelect_20261110_004758_Maps.jpg',
    webp: '/images/resort/AISelect_20261110_004758_Maps.webp',
    alt: 'Nighttime poolside view with glowing water and resort silhouette',
    caption: 'Evening Poolside — Calm waters under the night sky',
    group: 'pool',
    groupLabel: 'Swimming Pool',
  },
  {
    id: 'gal-pool-deck',
    src: '/images/resort/AISelect_20261110_005149_Maps.jpg',
    webp: '/images/resort/AISelect_20261110_005149_Maps.webp',
    alt: 'Pool deck and resort wing illuminated at night',
    caption: 'Illuminated Poolside — Resort pool area after dark',
    group: 'pool',
    groupLabel: 'Swimming Pool',
  },
  // Balconies & Corridors (3)
  {
    id: 'gal-corridor-walkway',
    src: '/images/resort/AISelect_20261110_004836_Maps.jpg',
    webp: '/images/resort/AISelect_20261110_004836_Maps.webp',
    alt: 'Long covered checkered promenade walkway along the lawn',
    caption: 'Garden Promenade — Covered walkway connecting dining and lawn areas',
    group: 'balconies-corridors',
    groupLabel: 'Balconies & Corridors',
  },
  {
    id: 'gal-upper-corridor-1',
    src: '/images/resort/IMG-20261107-WA0044.jpg',
    webp: '/images/resort/IMG-20261107-WA0044.webp',
    alt: 'Upper floor verandah and railing overlooking the central courtyard',
    caption: 'Upper Verandah — Airy open-air corridor overlooking the courtyard',
    group: 'balconies-corridors',
    groupLabel: 'Balconies & Corridors',
  },
  {
    id: 'gal-upper-corridor-2',
    src: '/images/resort/IMG-20261107-WA0045.jpg',
    webp: '/images/resort/IMG-20261107-WA0045.webp',
    alt: 'Wide upper-level corridor with polished tiles and courtyard railings',
    caption: 'Architectural Atrium — Spacious upper-level guest room access corridor',
    group: 'balconies-corridors',
    groupLabel: 'Balconies & Corridors',
  },
  // Events & Gatherings (2)
  {
    id: 'gal-event-campfire',
    src: '/images/resort/IMG-20261107-WA0049.jpg',
    webp: '/images/resort/IMG-20261107-WA0049.webp',
    alt: 'Guests gathered for a group activity in the resort courtyard',
    caption: 'Family & Group Gathering — A shared courtyard space for get-togethers',
    group: 'events',
    groupLabel: 'Events & Gatherings',
  },
  {
    id: 'gal-event-celebration',
    src: '/images/resort/IMG-20261107-WA0050.jpg',
    webp: '/images/resort/IMG-20261107-WA0050.webp',
    alt: 'Birthday and celebration stage setup with balloon backdrop in the courtyard',
    caption: 'Private Celebrations — Custom event setups for birthdays and family milestones',
    group: 'events',
    groupLabel: 'Events & Gatherings',
  },
  // 2-Person Rooms (8 + 1 resort room view)
  {
    id: 'gal-2p-38',
    src: '/images/rooms/2p-IMG-20261102-WA0038.jpg',
    webp: '/images/rooms/2p-IMG-20261102-WA0038.webp',
    alt: '2-Person AC Room with double bed, split AC and TV panel',
    caption: '2-Person AC Room — Double bed, split AC, wardrobe & TV unit',
    group: 'rooms-2p',
    groupLabel: '2-Person Rooms',
  },
  {
    id: 'gal-2p-39',
    src: '/images/rooms/2p-IMG-20261102-WA0039.jpg',
    webp: '/images/rooms/2p-IMG-20261102-WA0039.webp',
    alt: '2-Person AC Room wide interior perspective',
    caption: '2-Person AC Room — Spacious layout for two guests',
    group: 'rooms-2p',
    groupLabel: '2-Person Rooms',
  },
  {
    id: 'gal-2p-46',
    src: '/images/rooms/2p-IMG-20261102-WA0046.jpg',
    webp: '/images/rooms/2p-IMG-20261102-WA0046.webp',
    alt: '2-Person AC Room with open curtains showing green view outside',
    caption: '2-Person AC Room — Bright interior opening to outdoor balcony',
    group: 'rooms-2p',
    groupLabel: '2-Person Rooms',
  },
  {
    id: 'gal-2p-44',
    src: '/images/rooms/2p-IMG-20261102-WA0044.jpg',
    webp: '/images/rooms/2p-IMG-20261102-WA0044.webp',
    alt: '2-Person Room double bed with marble-effect headboard',
    caption: '2-Person Room — Comfortable double bed & warm lighting',
    group: 'rooms-2p',
    groupLabel: '2-Person Rooms',
  },
  {
    id: 'gal-2p-45',
    src: '/images/rooms/2p-IMG-20261102-WA0045.jpg',
    webp: '/images/rooms/2p-IMG-20261102-WA0045.webp',
    alt: '2-Person Room freshly prepared double bed with swan towel art',
    caption: '2-Person Room — Crisp linens and welcome towel presentation',
    group: 'rooms-2p',
    groupLabel: '2-Person Rooms',
  },
  {
    id: 'gal-2p-40',
    src: '/images/rooms/2p-IMG-20261102-WA0040.jpg',
    webp: '/images/rooms/2p-IMG-20261102-WA0040.webp',
    alt: 'Private balcony sliding glass door from 2-Person Room',
    caption: '2-Person Room Balcony Door — Direct access to outdoor seating',
    group: 'rooms-2p',
    groupLabel: '2-Person Rooms',
  },
  {
    id: 'gal-2p-41',
    src: '/images/rooms/2p-IMG-20261102-WA0041.jpg',
    webp: '/images/rooms/2p-IMG-20261102-WA0041.webp',
    alt: 'Private balcony table and chairs overlooking green fields',
    caption: '2-Person Room Balcony — Outdoor seating with countryside views',
    group: 'rooms-2p',
    groupLabel: '2-Person Rooms',
  },
  {
    id: 'gal-2p-43',
    src: '/images/rooms/2p-IMG-20261102-WA0043.jpg',
    webp: '/images/rooms/2p-IMG-20261102-WA0043.webp',
    alt: 'Wide balcony sit-out overlooking green fields and hills',
    caption: '2-Person Room Balcony — Open horizon views',
    group: 'rooms-2p',
    groupLabel: '2-Person Rooms',
  },
  {
    id: 'gal-2p-maps-room',
    src: '/images/resort/AISelect_20261110_005030_Maps.jpg',
    webp: '/images/resort/AISelect_20261110_005030_Maps.webp',
    alt: 'Spacious double room interior with wooden bed and recessed ceiling lights',
    caption: 'Guest Room Interior — Spacious tiled floor and wooden double bed',
    group: 'rooms-2p',
    groupLabel: '2-Person Rooms',
  },
  // 4-Person Rooms (8)
  {
    id: 'gal-4p-05',
    src: '/images/rooms/4p-IMG-20261102-WA0005(1).jpg',
    webp: '/images/rooms/4p-IMG-20261102-WA0005(1).webp',
    alt: '4-Person AC Family Room with two double beds',
    caption: '4-Person AC Room — Two double beds for families and small groups',
    group: 'rooms-4p',
    groupLabel: '4-Person Rooms',
  },
  {
    id: 'gal-4p-06',
    src: '/images/rooms/4p-IMG-20261102-WA0006.jpg',
    webp: '/images/rooms/4p-IMG-20261102-WA0006.webp',
    alt: '4-Person AC Room twin double beds and wardrobe',
    caption: '4-Person AC Room — Dual double beds, split AC & wardrobe',
    group: 'rooms-4p',
    groupLabel: '4-Person Rooms',
  },
  {
    id: 'gal-4p-07',
    src: '/images/rooms/4p-IMG-20261102-WA0007.jpg',
    webp: '/images/rooms/4p-IMG-20261102-WA0007.webp',
    alt: '4-Person AC Room with white bedding and curtains',
    caption: '4-Person AC Room — Clean, restful layout for four guests',
    group: 'rooms-4p',
    groupLabel: '4-Person Rooms',
  },
  {
    id: 'gal-4p-08',
    src: '/images/rooms/4p-IMG-20261102-WA0008(1).jpg',
    webp: '/images/rooms/4p-IMG-20261102-WA0008(1).webp',
    alt: '4-Person AC Room wide perspective',
    caption: '4-Person AC Room — Spacious family accommodation',
    group: 'rooms-4p',
    groupLabel: '4-Person Rooms',
  },
  {
    id: 'gal-4p-19',
    src: '/images/rooms/4p-IMG-20261102-WA0019(1).jpg',
    webp: '/images/rooms/4p-IMG-20261102-WA0019(1).webp',
    alt: '4-Person Room twin double beds with bedside table and kettle tray',
    caption: '4-Person Room — Twin double beds with bedside conveniences',
    group: 'rooms-4p',
    groupLabel: '4-Person Rooms',
  },
  {
    id: 'gal-4p-34',
    src: '/images/rooms/4p-IMG-20261107-WA0034.jpg',
    webp: '/images/rooms/4p-IMG-20261107-WA0034.webp',
    alt: '4-Person Room interior showing ceiling lights and two double beds',
    caption: '4-Person Room — Warm lighting and generous floor space',
    group: 'rooms-4p',
    groupLabel: '4-Person Rooms',
  },
  {
    id: 'gal-4p-35',
    src: '/images/rooms/4p-IMG-20261107-WA0035(1).jpg',
    webp: '/images/rooms/4p-IMG-20261107-WA0035(1).webp',
    alt: '4-Person Non-AC Room with two double beds and wall fan',
    caption: '4-Person Non-AC Room — Comfortable four-guest room variant',
    group: 'rooms-4p',
    groupLabel: '4-Person Rooms',
  },
  {
    id: 'gal-4p-36',
    src: '/images/rooms/4p-IMG-20261107-WA0036.jpg',
    webp: '/images/rooms/4p-IMG-20261107-WA0036.webp',
    alt: '4-Person AC Room with wall-mounted television',
    caption: '4-Person AC Room — Entertainment and comfort for family stays',
    group: 'rooms-4p',
    groupLabel: '4-Person Rooms',
  },
  // 6-Person & Suites (6)
  {
    id: 'gal-suite-20',
    src: '/images/rooms/suite-IMG-20261102-WA0020.jpg',
    webp: '/images/rooms/suite-IMG-20261102-WA0020.webp',
    alt: 'Suite living lounge with L-shaped sofa and doorway to private bedroom',
    caption: 'Suite — Separate living lounge with L-shaped sofa & adjoining bedroom',
    group: 'rooms-6p-suite',
    groupLabel: '6-Person & Suites',
  },
  {
    id: 'gal-suite-23',
    src: '/images/rooms/suite-IMG-20261102-WA0023.jpg',
    webp: '/images/rooms/suite-IMG-20261102-WA0023.webp',
    alt: 'Suite lounge area looking into the private bedroom',
    caption: 'Suite — Private lounge and bedroom suite (2-guest capacity)',
    group: 'rooms-6p-suite',
    groupLabel: '6-Person & Suites',
  },
  {
    id: 'gal-suite-26',
    src: '/images/rooms/suite-IMG-20261102-WA0026.jpg',
    webp: '/images/rooms/suite-IMG-20261102-WA0026.webp',
    alt: 'Suite double bed with heart-shaped welcome towel arrangement',
    caption: 'Suite Bedroom — Welcome floral & towel presentation',
    group: 'rooms-6p-suite',
    groupLabel: '6-Person & Suites',
  },
  {
    id: 'gal-suite-27',
    src: '/images/rooms/suite-IMG-20261102-WA0027.jpg',
    webp: '/images/rooms/suite-IMG-20261102-WA0027.webp',
    alt: 'Close-up of decorative heart-shaped welcome towel on Suite bed',
    caption: 'Suite Welcome Detail — Crafted for special getaways',
    group: 'rooms-6p-suite',
    groupLabel: '6-Person & Suites',
  },
  {
    id: 'gal-6p-32',
    src: '/images/rooms/6p-IMG-20261102-WA0032.jpg',
    webp: '/images/rooms/6p-IMG-20261102-WA0032.webp',
    alt: '6-Person Room with multiple beds, split AC and TV panel',
    caption: '6-Person Group Room — Multi-bed layout for up to 6 guests',
    group: 'rooms-6p-suite',
    groupLabel: '6-Person & Suites',
  },
  {
    id: 'gal-6p-42',
    src: '/images/rooms/6p-IMG-20261102-WA0042.jpg',
    webp: '/images/rooms/6p-IMG-20261102-WA0042.webp',
    alt: 'Covered balcony sit-out with outdoor seating overlooking green fields',
    caption: 'Balcony Terrace — Spacious outdoor sit-out with scenic views',
    group: 'rooms-6p-suite',
    groupLabel: '6-Person & Suites',
  },
];

export const NEARBY_DESTINATIONS: NearbyDestination[] = [
  {
    id: 'srisailam-dam-view-point',
    name: 'Srisailam Dam View Point',
    badge: 'Featured Regional Landmark',
    isPrimaryHighlight: true,
    description:
      'A well-known regional landmark and the main sightseeing highlight suggested for guests exploring the Srisailam area.',
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=16.3505042%2C78.7507832&destination=16.0856741%2C78.8995965&travelmode=driving',
    verificationNote: 'Open Google Maps for directions from the resort.',
  },
  {
    id: 'amarabad-tiger-reserve-safari-gate',
    name: 'Amarabad Tiger Reserve - Jungle Safari Gate',
    badge: 'Wildlife & Forest Safari',
    description:
      'A nearby point of interest for visitors exploring the Amrabad forest region. Check current access rules and safari information with the relevant local authority before travelling.',
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=16.3505042%2C78.7507832&destination=16.2679999%2C78.7215682&travelmode=driving',
    verificationNote: 'Check current safari access rules and timings before travelling.',
  },
  {
    id: 'octopus-view-point',
    name: 'Octopus View Point',
    badge: 'Panoramic Valley Viewpoint',
    description:
      'A scenic viewpoint in the Srisailam region. Open the location pin for directions and current route information.',
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=16.3505042%2C78.7507832&destination=16.1540647%2C78.8817806&travelmode=driving',
    verificationNote: 'Open Google Maps for directions from the resort.',
  },
  {
    id: 'munnanur-jungle-resort',
    name: 'Munnanur Jungle Resort',
    badge: 'Mannanur Eco-Tourism Hub',
    description: 'A nearby destination along the Mannanur stretch of the Srisailam route.',
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=16.3505042%2C78.7507832&destination=16.375471%2C78.7569107&travelmode=driving',
    verificationNote: 'Open Google Maps for directions from the resort.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-tariffs-gst',
    question: 'What are the room tariffs and do they include GST?',
    answer:
      'Yes, all published room tariffs are per room for a 24-hour stay and include GST: 2-Person Room (11 rooms) is ₹2,500 AC / ₹1,500 Non-AC; 4-Person Room (7 rooms) is ₹4,000 AC / ₹2,500 Non-AC; 6-Person Room (2 rooms) is ₹6,000 AC / ₹3,500 Non-AC; and Suite (3 suites, 2-guest capacity) is ₹6,000 AC / ₹5,000 Non-AC.',
  },
  {
    id: 'faq-checkin-checkout',
    question: 'What are the check-in and check-out timings?',
    answer:
      'Standard check-in is at 11:00 AM and check-out is at 11:00 AM the following day, giving guests a full 24-hour stay experience.',
  },
  {
    id: 'faq-booking-process',
    question: 'How do I check availability and confirm a booking?',
    answer:
      'Samisthi Aranya Resorts handles all enquiries and reservations directly for personalised service. Simply tap Call Now (+91 79815 83940) or WhatsApp Enquiry on this page to speak directly with our resort team and confirm your booking.',
  },
  {
    id: 'faq-pool-raindance',
    question: 'Are the swimming pool and rain dance included in the room tariff?',
    answer:
      'Yes. Access to our main swimming pool, separate dedicated kids’ swimming pool, and rain dance facility is included in your room tariff and stated by the owner to be available 24 hours. Swimwear and swimming gear are also available for guests to use while swimming.',
  },
  {
    id: 'faq-food-restaurant',
    question: 'Is food included in the room tariff, and what type of cuisine is served?',
    answer:
      'Our on-site restaurant is strictly vegetarian-only. Meals and refreshments are charged separately and are not included in the room tariffs.',
  },
  {
    id: 'faq-sports-campfire',
    question: 'What outdoor games and evening activities are available?',
    answer:
      'Guests can enjoy cricket, football, volleyball, and fun garden games on our spacious lawn using resort sports equipment at no separate charge (or bring their own gear). An evening campfire can be arranged on request for special occasions.',
  },
  {
    id: 'faq-whole-resort',
    question:
      'Can we book the entire resort exclusively for a wedding, family event, or corporate outing?',
    answer:
      'Yes! With 23 rooms (combined capacity of 68 guests), a conference hall, and expansive lawns, whole-resort exclusive hire is available at an indicative custom quote range of ₹70,000 – ₹1,00,000 per day depending on your event date and guest count.',
  },
];
