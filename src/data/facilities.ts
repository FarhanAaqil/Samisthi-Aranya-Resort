import type { LucideIcon } from 'lucide-react';
import {
  CloudRain,
  Compass,
  Flame,
  Presentation,
  Trophy,
  Utensils,
  Waves,
  Wifi,
} from 'lucide-react';

import { photos, type Photo } from './photos';

export interface Facility {
  id: string;
  title: string;
  /** Short note on cost or availability. */
  note: string;
  description: string;
  icon: LucideIcon;
  photo?: Photo;
}

export const FACILITIES: Facility[] = [
  {
    id: 'pools',
    title: 'Main pool and kids’ pool',
    note: 'Open 24 hours · included in your stay',
    description:
      'A lit main pool for adults and children, plus a separate pool just for the little ones. Swimwear and swimming gear are available at the resort for guests to use.',
    icon: Waves,
    photo: photos.poolNight,
  },
  {
    id: 'lawns',
    title: 'Lawns and outdoor games',
    note: 'Equipment provided · no extra charge',
    description:
      'Cricket, football, volleyball and garden games on a wide green lawn. Use the resort’s equipment or bring your own.',
    icon: Trophy,
    photo: photos.lawnHills,
  },
  {
    id: 'safari',
    title: 'Jungle safari',
    note: 'Arranged by the resort · paid separately',
    description:
      'The resort arranges jungle safaris into the Amrabad Tiger Reserve. Ask the team about timings when you book.',
    icon: Compass,
  },
  {
    id: 'rain-dance',
    title: 'Rain dance',
    note: 'Open 24 hours · included in your stay',
    description: 'A rain dance floor for the family and friends to cool off and play together.',
    icon: CloudRain,
  },
  {
    id: 'restaurant',
    title: 'Vegetarian restaurant',
    note: 'Pure vegetarian · charged separately',
    description:
      'Vegetarian meals served at the on-site restaurant. Food and drinks are not part of the room tariff.',
    icon: Utensils,
  },
  {
    id: 'conference',
    title: 'Conference hall',
    note: 'Meetings and private functions',
    description:
      'A hall for corporate meetings, seminars and family functions, with the lawns right outside.',
    icon: Presentation,
  },
  {
    id: 'campfire',
    title: 'Evening campfire',
    note: 'On request · special occasions',
    description:
      'We can arrange a campfire for a special occasion or group stay. Ask the team when you enquire.',
    icon: Flame,
  },
  {
    id: 'essentials',
    title: 'Everyday comforts',
    note: 'In every room and on site',
    description: 'Wi-Fi and a television in the rooms, and on-site parking for your vehicle.',
    icon: Wifi,
  },
];
