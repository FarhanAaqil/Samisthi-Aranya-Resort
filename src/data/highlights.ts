import { photos, type Photo } from './photos';

export interface Highlight {
  id: string;
  title: string;
  description: string;
  photo: Photo;
  /** Tile shape in the mosaic. */
  size: 'large' | 'wide' | 'small';
  /** Which part of the photo to keep in view when it is cropped to the tile. */
  focus?: string;
}

// What the resort is best for, in the owner's words, each with the closest real photograph.
export const HIGHLIGHTS: Highlight[] = [
  {
    id: 'spacious-resort',
    title: 'A spacious resort',
    description: 'Wide lawns, long verandahs and room to breathe across the whole property.',
    photo: photos.lawnHills,
    size: 'large',
  },
  {
    id: 'open-garden',
    title: 'Open gardens',
    description: 'Garden walkways and open lawns that turn gold at sunset.',
    photo: photos.walkwaySunset,
    size: 'wide',
  },
  {
    id: 'family-gathering',
    title: 'Family gatherings',
    description: 'Shaded seating and open lawns where the whole family can be together.',
    photo: photos.pavilion,
    size: 'small',
  },
  {
    id: 'get-together',
    title: 'Get-together programmes',
    description: 'Reunions, friends’ weekends and group get-togethers in the courtyard.',
    photo: photos.groupGathering,
    size: 'small',
  },
  {
    id: 'events-functions',
    title: 'Events and functions',
    description: 'Birthdays, anniversaries and private functions on the lawn or in the courtyard.',
    photo: photos.balloonCelebration,
    size: 'small',
    focus: 'object-[50%_80%]',
  },
  {
    id: 'corporate-gathering',
    title: 'Corporate gatherings',
    description: 'Meetings, offsites and team outings, with a conference hall on site.',
    photo: photos.reception,
    size: 'small',
  },
  {
    id: 'play-area',
    title: 'A play area',
    description: 'Open space where children can run and play while the adults relax.',
    photo: photos.lawnOpenSky,
    size: 'wide',
    focus: 'object-[50%_68%]',
  },
];
