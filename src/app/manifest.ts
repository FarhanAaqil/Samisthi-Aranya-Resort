import type { MetadataRoute } from 'next';

import { RESORT } from '@/data/resort';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: RESORT.name,
    short_name: 'Samisthi Aranya',
    description: `${RESORT.tagline} A nature retreat near Mannanur on the Srisailam highway.`,
    start_url: '/',
    display: 'browser',
    background_color: '#f5e6dc',
    theme_color: '#f5e6dc',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
