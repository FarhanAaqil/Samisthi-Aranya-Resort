import { photos, type Photo } from './photos';

export interface RoomCategory {
  id: string;
  name: string;
  /** Who the room suits, shown beside the name. */
  suits: string;
  /** Guests the room is set up for. */
  guests: number;
  /** Rooms of this kind on the property. Fixed count, not live availability. */
  count: number;
  /** Per room, per 24 hours, GST included. */
  acRate: number;
  nonAcRate: number;
  summary: string;
  features: string[];
  photos: Photo[];
  whatsappMessage: string;
}

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: 'two-person',
    name: 'Two-Person Room',
    suits: 'Couples and solo travellers',
    guests: 2,
    count: 11,
    acRate: 2500,
    nonAcRate: 1500,
    summary:
      'A quiet double room for two, with a comfortable bed and a balcony sit-out to watch the fields turn gold in the evening.',
    features: ['Double bed', 'Balcony sit-out', 'Television and Wi-Fi', 'AC or Non-AC'],
    photos: [
      photos.twoAcDouble,
      photos.twoAcWide,
      photos.twoAcBalconyLight,
      photos.twoHeadboard,
      photos.twoTowelSwan,
      photos.guestRoomWoodenBed,
      photos.twoBalconyDoor,
      photos.twoBalconySeating,
      photos.twoBalconyFields,
    ],
    whatsappMessage:
      'Hello Samisthi Aranya Resorts, I would like to enquire about the Two-Person Room (AC ₹2,500 / Non-AC ₹1,500 per 24-hour stay).',
  },
  {
    id: 'four-person',
    name: 'Four-Person Room',
    suits: 'Families and small groups',
    guests: 4,
    count: 7,
    acRate: 4000,
    nonAcRate: 2500,
    summary:
      'Two double beds under one roof, so a family or four friends can stay together without squeezing in.',
    features: ['Two double beds', 'Television and Wi-Fi', 'Wardrobe and seating', 'AC or Non-AC'],
    photos: [
      photos.fourTwinBeds,
      photos.fourWardrobe,
      photos.fourLinens,
      photos.fourWide,
      photos.fourBedside,
      photos.fourCeiling,
      photos.fourWallFan,
      photos.fourTelevision,
    ],
    whatsappMessage:
      'Hello Samisthi Aranya Resorts, I would like to enquire about the Four-Person Room (AC ₹4,000 / Non-AC ₹2,500 per 24-hour stay).',
  },
  {
    id: 'six-person',
    name: 'Six-Person Room',
    suits: 'Larger families and friend groups',
    guests: 6,
    count: 2,
    acRate: 6000,
    nonAcRate: 3500,
    summary:
      'Our largest room, with a multi-bed layout for up to six guests and a covered balcony terrace to share.',
    features: [
      'Multi-bed layout',
      'Covered balcony terrace',
      'Television and Wi-Fi',
      'AC or Non-AC',
    ],
    photos: [photos.sixMultiBed, photos.sixBalcony],
    whatsappMessage:
      'Hello Samisthi Aranya Resorts, I would like to enquire about the Six-Person Room (AC ₹6,000 / Non-AC ₹3,500 per 24-hour stay).',
  },
  {
    id: 'suite',
    name: 'Suite',
    suits: 'Couples who want more space',
    guests: 2,
    count: 3,
    acRate: 6000,
    nonAcRate: 5000,
    summary:
      'A private living lounge with an L-shaped sofa opens into its own bedroom, for a stay that feels more like a home.',
    features: ['Separate living lounge', 'Private bedroom', 'Television and Wi-Fi', 'AC or Non-AC'],
    photos: [
      photos.suiteLounge,
      photos.suiteLoungeBedroom,
      photos.suiteHeart,
      photos.suiteTowelArt,
    ],
    whatsappMessage:
      'Hello Samisthi Aranya Resorts, I would like to enquire about the Suite (2 guests, living lounge and bedroom, AC ₹6,000 / Non-AC ₹5,000 per 24-hour stay).',
  },
];

/** Totals are derived so they can never drift from the categories above. */
export const TOTAL_ROOMS = ROOM_CATEGORIES.reduce((sum, room) => sum + room.count, 0);
export const TOTAL_GUESTS = ROOM_CATEGORIES.reduce(
  (sum, room) => sum + room.count * room.guests,
  0,
);
