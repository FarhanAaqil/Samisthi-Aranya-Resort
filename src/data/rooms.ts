import { photos, type Photo } from './photos';

export interface RoomCategory {
  id: string;
  name: string;
  /** Who the room suits, shown beside the name. */
  suits: string;
  /** Guests the room is set up for. */
  guests: number;
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
    acRate: 2500,
    nonAcRate: 1500,
    summary:
      'A calm, airy double room with a private forest-view balcony, made for slow mornings with tea and golden evenings over the Nallamala.',
    features: ['Double bed', 'Forest-view balcony', 'Television and Wi-Fi', 'AC or Non-AC'],
    photos: [
      photos.twoAcDouble,
      photos.twoAcWide,
      photos.twoAcBalconyLight,
      photos.twoHeadboard,
      photos.twoTowelSwan,
      photos.doubleRoomWoodenBed,
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
    acRate: 4000,
    nonAcRate: 2500,
    summary:
      'A bright, generous room with two double beds, so the whole family or four friends can stay together in comfort.',
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
    id: 'suite',
    name: 'Suite',
    suits: 'Couples who want more space',
    guests: 2,
    acRate: 6000,
    nonAcRate: 5000,
    summary:
      'A private living lounge with an L-shaped sofa opens into its own bedroom: the most spacious and indulgent way to stay for two.',
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

/**
 * Resort-wide capacity as stated by the owner. Only these totals are published; the number of
 * rooms in each category is deliberately not shown on the site.
 */
export const TOTAL_ROOMS = 24;
export const TOTAL_GUESTS = 68;
