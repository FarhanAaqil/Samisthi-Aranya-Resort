const ORIGIN = '16.3505042%2C78.7507832';

/** Google Maps driving directions from the resort pin to the destination. */
function directionsTo(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${latitude}%2C${longitude}&travelmode=driving`;
}

export interface NearbyPlace {
  id: string;
  name: string;
  kind: string;
  description: string;
  directionsUrl: string;
  featured?: boolean;
}

// No distances or drive times are shown until they are measured from a reliable route source.
export const NEARBY_PLACES: NearbyPlace[] = [
  {
    id: 'srisailam-dam-view-point',
    name: 'Srisailam Dam View Point',
    kind: 'The best-known sight nearby',
    description:
      'The well-known viewpoint over the Srisailam dam, and the one most guests head out to first.',
    directionsUrl: directionsTo(16.0856741, 78.8995965),
    featured: true,
  },
  {
    id: 'amrabad-safari-gate',
    name: 'Amrabad Tiger Reserve · Jungle Safari Gate',
    kind: 'Forest and wildlife',
    description:
      'The safari gate for the Amrabad forest. Check current access rules and timings with the forest office before you travel.',
    directionsUrl: directionsTo(16.2679999, 78.7215682),
  },
  {
    id: 'octopus-view-point',
    name: 'Octopus View Point',
    kind: 'Scenic viewpoint',
    description: 'A viewpoint in the Srisailam region with wide views over the valley.',
    directionsUrl: directionsTo(16.1540647, 78.8817806),
  },
  {
    id: 'munnanur-jungle-resort',
    name: 'Munnanur Jungle Resort',
    kind: 'Along the Mannanur stretch',
    description: 'Another stop along the Mannanur stretch of the Srisailam route.',
    directionsUrl: directionsTo(16.375471, 78.7569107),
  },
];
