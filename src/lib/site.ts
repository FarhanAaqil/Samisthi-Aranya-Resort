/**
 * Public origin of the site, used for canonical URLs, the sitemap and social previews.
 * Set NEXT_PUBLIC_SITE_URL once a domain is connected. Until then a Vercel production
 * build falls back to its own URL, a preview build to its preview URL, and local builds
 * have none.
 */
export function getSiteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (explicit) return explicit;
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return undefined;
}

/** Preview deployments and local builds should not be indexed. */
export function isIndexable(): boolean {
  return process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === 'production';
}
