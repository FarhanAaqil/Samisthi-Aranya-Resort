import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
      // Listing the key images helps them appear in Google Images for searches like
      // "resort near Srisailam".
      images: [`${siteUrl}/og-resort.jpg`, `${siteUrl}/brand/samisthi-aranya-logo.png`],
    },
    { url: `${siteUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
