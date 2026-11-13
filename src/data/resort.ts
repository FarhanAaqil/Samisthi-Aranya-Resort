// The single place to edit contact details, map links and stay policy.
// Room rates and counts live in rooms.ts; everything else on the page reads from here or from
// the other files in this folder.

export const RESORT = {
  name: 'Samisthi Aranya Resorts',
  tagline: 'Where Nature Meets Luxury.',
  /** The line from the logo, used as the headline. */
  motto: 'Breathe Nallamala',
  locality: 'Mannanur, on the Srisailam highway, Telangana',
  coordinates: { latitude: 16.3505042, longitude: 78.7507832 },

  contact: {
    phoneDisplay: '+91 79815 83940',
    phoneE164: '+917981583940',
    whatsappNumber: '917981583940',
    welcomeMessage:
      'Hello Samisthi Aranya Resorts team, I would like to enquire about room availability and tariffs for an upcoming stay.',
    safariMessage:
      'Hello Samisthi Aranya Resorts, I would like to know more about the jungle safari into the Amrabad Tiger Reserve.',
    eventMessage:
      'Hello Samisthi Aranya Resorts, I would like a custom quote for an event or an exclusive whole-resort booking.',
  },

  maps: {
    resortDirections: 'https://maps.app.goo.gl/qJF7ig8nu8stzFhW6',
  },

  stay: {
    checkIn: '11:00 AM',
    checkOut: '11:00 AM the next day',
    duration: '24-hour stay',
  },

  wholeResort: {
    rangeDisplay: '₹70,000 – ₹1,00,000 per day',
    note: 'An indicative range. The final quote depends on your dates and number of guests.',
    occasions: [
      'Family gatherings',
      'Birthdays',
      'Small weddings',
      'Corporate offsites',
      'Team outings',
    ],
  },

  /** Google's write-a-review link for the resort. NEXT_PUBLIC_GOOGLE_REVIEW_URL overrides it. */
  googleReviewUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || 'https://g.page/r/CZvWdC0fG1SoEAE/review',

  /** Leave empty until the owner confirms the postal line. */
  postalAddress: '',

  /** Hidden while empty. */
  socialLinks: [] as Array<{ label: string; url: string }>,
};
