import type { MetadataRoute } from 'next';

import { getSiteUrl, isIndexable } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: isIndexable() ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    ...(siteUrl && isIndexable() ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
