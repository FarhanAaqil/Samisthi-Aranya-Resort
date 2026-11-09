import { photos, type Photo } from './photos';

export type GalleryGroup = 'grounds' | 'pool' | 'rooms' | 'celebrations';

export interface GalleryItem extends Photo {
  id: string;
  group: GalleryGroup;
}

export const GALLERY_GROUPS: Array<{ id: GalleryGroup | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'grounds', label: 'Grounds' },
  { id: 'pool', label: 'Pool' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'celebrations', label: 'Celebrations' },
];

const entries: Array<[keyof typeof photos, GalleryGroup]> = [
  ['lawnEvening', 'grounds'],
  ['poolNight', 'pool'],
  ['twoAcDouble', 'rooms'],
  ['coveredWalkway', 'grounds'],
  ['suiteLounge', 'rooms'],
  ['groupGathering', 'celebrations'],
  ['lawnDaylight', 'grounds'],
  ['fourTwinBeds', 'rooms'],
  ['poolEvening', 'pool'],
  ['facadeNight', 'grounds'],
  ['twoBalconySeating', 'rooms'],
  ['balloonCelebration', 'celebrations'],
  ['upperVerandah', 'grounds'],
  ['sixMultiBed', 'rooms'],
  ['poolDeckNight', 'pool'],
  ['lawnHills', 'grounds'],
  ['suiteHeart', 'rooms'],
  ['coveredPavilion', 'grounds'],
  ['twoBalconyFields', 'rooms'],
  ['upperCorridor', 'grounds'],
  ['fourLinens', 'rooms'],
  ['sixBalcony', 'rooms'],
  ['guestRoomWoodenBed', 'rooms'],
  ['twoTowelSwan', 'rooms'],
];

export const GALLERY_ITEMS: GalleryItem[] = entries.map(([key, group]) => ({
  id: key,
  group,
  ...photos[key],
}));
