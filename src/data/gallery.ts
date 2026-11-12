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
  ['lawnGoldenHour', 'grounds'],
  ['walkwaySunset', 'grounds'],
  ['twoAcDouble', 'rooms'],
  ['entrancePorch', 'grounds'],
  ['poolNight', 'pool'],
  ['suiteLounge', 'rooms'],
  ['corridorLong', 'grounds'],
  ['lawnHills', 'grounds'],
  ['fourTwinBeds', 'rooms'],
  ['groupGathering', 'celebrations'],
  ['grandStaircase', 'grounds'],
  ['doubleRoomWoodenBed', 'rooms'],
  ['pavilion', 'grounds'],
  ['poolEvening', 'pool'],
  ['mainBuildingSky', 'grounds'],
  ['twoBalconySeating', 'rooms'],
  ['balloonCelebration', 'celebrations'],
  ['checkeredWalkway', 'grounds'],
  ['reception', 'grounds'],
  ['suiteHeart', 'rooms'],
  ['guestWing', 'grounds'],
  ['corridorCourtyard', 'grounds'],
  ['poolDeckNight', 'pool'],
  ['entranceGazebo', 'grounds'],
  ['fourLinens', 'rooms'],
  ['facadeNight', 'grounds'],
  ['balconyTerrace', 'rooms'],
];

export const GALLERY_ITEMS: GalleryItem[] = entries.map(([key, group]) => ({
  id: key,
  group,
  ...photos[key],
}));
