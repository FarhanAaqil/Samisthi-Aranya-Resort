import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
