import type { StaticImageData } from 'next/image';

import balloonCelebration from '@/assets/photos/events/balloon-celebration-setup.jpg';
import groupGathering from '@/assets/photos/events/group-gathering-in-courtyard.jpg';
import poolDeckNight from '@/assets/photos/pool/swimming-pool-deck-night.jpg';
import poolEvening from '@/assets/photos/pool/swimming-pool-evening-view.jpg';
import poolNight from '@/assets/photos/pool/swimming-pool-night.jpg';
import checkeredWalkway from '@/assets/photos/resort/checkered-walkway.jpg';
import entranceGazebo from '@/assets/photos/resort/entrance-courtyard-gazebo.jpg';
import entrancePorch from '@/assets/photos/resort/entrance-porch-wooden-pillars.jpg';
import facadeNight from '@/assets/photos/resort/facade-lit-at-night.jpg';
import grandStaircase from '@/assets/photos/resort/grand-staircase.jpg';
import guestWing from '@/assets/photos/resort/guest-wing-balconies.jpg';
import lawnGoldenHour from '@/assets/photos/resort/lawn-and-main-building-golden-hour.jpg';
import lawnHills from '@/assets/photos/resort/lawn-and-hills-wide.jpg';
import lawnOpenSky from '@/assets/photos/resort/lawn-under-open-sky.jpg';
import mainBuildingSky from '@/assets/photos/resort/main-building-under-open-sky.jpg';
import mainBuildingWalkway from '@/assets/photos/resort/main-building-and-covered-walkway.jpg';
import pavilion from '@/assets/photos/resort/pavilion-overlooking-lawn.jpg';
import reception from '@/assets/photos/resort/reception.jpg';
import corridorCourtyard from '@/assets/photos/resort/upper-corridor-courtyard-view.jpg';
import corridorLong from '@/assets/photos/resort/upper-corridor-long-view.jpg';
import walkwaySunset from '@/assets/photos/resort/walkway-at-sunset.jpg';
import doubleRoomWoodenBed from '@/assets/photos/rooms/double-room-wooden-bed.jpg';
import fourBedside from '@/assets/photos/rooms/four-person-bedside-table.jpg';
import fourCeiling from '@/assets/photos/rooms/four-person-ceiling-lights.jpg';
import fourTelevision from '@/assets/photos/rooms/four-person-television.jpg';
import fourTwinBeds from '@/assets/photos/rooms/four-person-twin-double-beds.jpg';
import fourWallFan from '@/assets/photos/rooms/four-person-wall-fan.jpg';
import fourWardrobe from '@/assets/photos/rooms/four-person-wardrobe-and-curtains.jpg';
import fourWide from '@/assets/photos/rooms/four-person-wide-view.jpg';
import fourLinens from '@/assets/photos/rooms/four-person-white-linens.jpg';
import balconyTerrace from '@/assets/photos/rooms/six-person-balcony-terrace.jpg';
import suiteHeart from '@/assets/photos/rooms/suite-bed-heart-towel.jpg';
import suiteLoungeBedroom from '@/assets/photos/rooms/suite-lounge-and-bedroom.jpg';
import suiteLounge from '@/assets/photos/rooms/suite-lounge-sofa.jpg';
import suiteTowelArt from '@/assets/photos/rooms/suite-towel-art-detail.jpg';
import twoAcDouble from '@/assets/photos/rooms/two-person-ac-double-bed.jpg';
import twoAcBalconyLight from '@/assets/photos/rooms/two-person-ac-room-balcony-light.jpg';
import twoAcWide from '@/assets/photos/rooms/two-person-ac-wide-view.jpg';
import twoBalconyFields from '@/assets/photos/rooms/two-person-balcony-open-fields.jpg';
import twoBalconyDoor from '@/assets/photos/rooms/two-person-balcony-glass-door.jpg';
import twoBalconySeating from '@/assets/photos/rooms/two-person-balcony-seating.jpg';
import twoHeadboard from '@/assets/photos/rooms/two-person-bed-artwork-headboard.jpg';
import twoTowelSwan from '@/assets/photos/rooms/two-person-bed-towel-swan.jpg';

export interface Photo {
  image: StaticImageData;
  /** Describes what is visible, for screen readers and search. */
  alt: string;
  /** Short line shown with the photo in galleries. */
  caption: string;
}

/** Every photograph on the site. Captions describe only what the picture shows. */
export const photos = {
  // Grounds and architecture
  lawnGoldenHour: {
    image: lawnGoldenHour,
    alt: 'Samisthi Aranya Resorts near Mannanur on the Srisailam highway: the main building across a wide green lawn in warm evening light',
    caption: 'The main building and lawn at golden hour',
  },
  mainBuildingSky: {
    image: mainBuildingSky,
    alt: 'The main building and lawn under a wide sky streaked with clouds',
    caption: 'Open skies over the main building',
  },
  lawnHills: {
    image: lawnHills,
    alt: 'A broad green lawn stretching towards the resort wings and low hills',
    caption: 'The lawn, with the hills beyond',
  },
  lawnOpenSky: {
    image: lawnOpenSky,
    alt: 'The resort lawn and guest wing under a clear blue sky',
    caption: 'Room to roam on the lawn',
  },
  mainBuildingWalkway: {
    image: mainBuildingWalkway,
    alt: 'The main building joined to a long covered walkway beside the garden',
    caption: 'The main building and its covered walkway',
  },
  guestWing: {
    image: guestWing,
    alt: 'The guest wing with a row of private balconies on the upper floor',
    caption: 'Balconies along the guest wing',
  },
  walkwaySunset: {
    image: walkwaySunset,
    alt: 'The sun setting beyond the lawn, seen from under a covered walkway with planted beds',
    caption: 'Sunset from the garden walkway',
  },
  checkeredWalkway: {
    image: checkeredWalkway,
    alt: 'A long covered walkway with a black and ivory checkered floor running beside the lawn',
    caption: 'The checkered garden walkway',
  },
  pavilion: {
    image: pavilion,
    alt: 'A shaded checkered-floor pavilion with seating that looks onto the lawn',
    caption: 'A shaded pavilion over the lawn',
  },
  entrancePorch: {
    image: entrancePorch,
    alt: 'The entrance porch framed by carved wooden pillars, looking down a checkered courtyard to a gazebo',
    caption: 'The entrance, framed in carved wood',
  },
  entranceGazebo: {
    image: entranceGazebo,
    alt: 'The entrance courtyard with a checkered floor leading to a tiled gazebo',
    caption: 'The arrival courtyard',
  },
  corridorLong: {
    image: corridorLong,
    alt: 'A long, bright upper-floor corridor with black railings overlooking the courtyard',
    caption: 'The upper corridor in morning light',
  },
  corridorCourtyard: {
    image: corridorCourtyard,
    alt: 'An upper-floor corridor with polished floors looking over the green courtyard',
    caption: 'Looking over the courtyard',
  },
  grandStaircase: {
    image: grandStaircase,
    alt: 'A wide granite staircase with a black railing rising from the lobby',
    caption: 'The main staircase',
  },
  reception: {
    image: reception,
    alt: 'The reception with a white marble-finish desk in a bright lobby',
    caption: 'The reception desk',
  },
  facadeNight: {
    image: facadeNight,
    alt: 'The resort building lit with warm string lights at night',
    caption: 'The resort lit up in the evening',
  },

  // Pool
  poolNight: {
    image: poolNight,
    alt: 'The illuminated swimming pool at night',
    caption: 'The main pool, lit after dark',
  },
  poolEvening: {
    image: poolEvening,
    alt: 'Poolside at night with glowing water and the resort building behind',
    caption: 'Poolside in the evening',
  },
  poolDeckNight: {
    image: poolDeckNight,
    alt: 'Pool deck and resort wing lit up at night',
    caption: 'The pool deck at night',
  },

  // Celebrations
  groupGathering: {
    image: groupGathering,
    alt: 'Guests gathered on the courtyard lawn, with the two-storey rooms around them',
    caption: 'A group gathering on the courtyard lawn',
  },
  balloonCelebration: {
    image: balloonCelebration,
    alt: 'Pink and white balloons arranged for a celebration in the courtyard',
    caption: 'A balloon setup for a family celebration',
  },

  // Two-person rooms
  twoAcDouble: {
    image: twoAcDouble,
    alt: 'Two-person AC room with a double bed, split AC, wardrobe and wall-mounted television',
    caption: 'Two-person AC room: double bed, wardrobe and television',
  },
  doubleRoomWoodenBed: {
    image: doubleRoomWoodenBed,
    alt: 'A spacious double room with a wooden bed, bedside table and long curtains',
    caption: 'A spacious double room with a wooden bed',
  },
  twoAcWide: {
    image: twoAcWide,
    alt: 'Wide view of a two-person AC room with a double bed, curtains and a seating corner',
    caption: 'A wider look at the two-person AC room',
  },
  twoAcBalconyLight: {
    image: twoAcBalconyLight,
    alt: 'Two-person AC room with a bed and an open balcony door onto green fields',
    caption: 'Daylight through the balcony door',
  },
  twoHeadboard: {
    image: twoHeadboard,
    alt: 'Double bed with a marble-pattern headboard and a framed tree painting above it',
    caption: 'Double bed with a marble-pattern headboard',
  },
  twoTowelSwan: {
    image: twoTowelSwan,
    alt: 'Freshly made double bed with white linen and a towel folded into a swan',
    caption: 'Fresh linen and a folded-towel welcome',
  },
  twoBalconyDoor: {
    image: twoBalconyDoor,
    alt: 'Sliding glass door opening from a room onto a balcony with chairs',
    caption: 'Glass doors onto the balcony',
  },
  twoBalconySeating: {
    image: twoBalconySeating,
    alt: 'Balcony table and chairs looking out over open fields',
    caption: 'Balcony seating over the fields',
  },
  twoBalconyFields: {
    image: twoBalconyFields,
    alt: 'Balcony with two chairs and a table, and a wide field view beyond the railing',
    caption: 'A sit-out with a wide, open view',
  },
  balconyTerrace: {
    image: balconyTerrace,
    alt: 'Covered balcony with a table and chairs overlooking green fields',
    caption: 'A covered balcony terrace',
  },

  // Four-person rooms
  fourTwinBeds: {
    image: fourTwinBeds,
    alt: 'Four-person AC room with two double beds side by side and a split AC',
    caption: 'Four-person AC room with two double beds',
  },
  fourWardrobe: {
    image: fourWardrobe,
    alt: 'Four-person room showing two double beds, a wardrobe and window curtains',
    caption: 'Two double beds, wardrobe and curtains',
  },
  fourLinens: {
    image: fourLinens,
    alt: 'Four-person room with white bedding, towel art and a wardrobe',
    caption: 'A bright family room with white linen',
  },
  fourWide: {
    image: fourWide,
    alt: 'Wide view of a four-person room with two double beds',
    caption: 'Plenty of floor space for a family of four',
  },
  fourBedside: {
    image: fourBedside,
    alt: 'Two double beds with a bedside table between them in a four-person room',
    caption: 'A bedside table between the two beds',
  },
  fourCeiling: {
    image: fourCeiling,
    alt: 'Four-person room with recessed ceiling lights and two double beds',
    caption: 'Warm ceiling lights over the two beds',
  },
  fourWallFan: {
    image: fourWallFan,
    alt: 'Four-person room with two double beds and a wall fan',
    caption: 'A four-person room with a wall fan',
  },
  fourTelevision: {
    image: fourTelevision,
    alt: 'Four-person room with a wall-mounted television facing the beds',
    caption: 'Television facing the beds',
  },

  // Suite
  suiteLounge: {
    image: suiteLounge,
    alt: 'Suite living lounge with an L-shaped sofa, coffee table and a doorway to the bedroom',
    caption: 'The suite lounge with its own L-shaped sofa',
  },
  suiteLoungeBedroom: {
    image: suiteLoungeBedroom,
    alt: 'Suite lounge seating with the private bedroom visible through the door',
    caption: 'Lounge and bedroom, side by side',
  },
  suiteHeart: {
    image: suiteHeart,
    alt: 'Suite double bed with a heart-shaped folded towel',
    caption: 'A heart-shaped towel welcome on the suite bed',
  },
  suiteTowelArt: {
    image: suiteTowelArt,
    alt: 'Close-up of a heart-shaped folded towel decorated with small details on the suite bed',
    caption: 'The small details, up close',
  },
} satisfies Record<string, Photo>;
