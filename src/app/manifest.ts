import type { MetadataRoute } from 'next';

import { RESORT } from '@/data/resort';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: RESORT.name,
    short_name: 'Samisthi Aranya',
    description: `${RESORT.tagline} A nature retreat near Mannanur on the Srisailam highway.`,
    start_url: '/',
    display: 'browser',
    background_color: '#f6f2ea',
    theme_color: '#08230f',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
