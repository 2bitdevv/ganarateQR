/**
 * Canonical site URL for SEO (metadataBase, sitemap, robots, JSON-LD).
 * Priority: NEXT_PUBLIC_SITE_URL → VERCEL_URL → localhost.
 * Production default: https://ganarate-qr.vercel.app (see `.env.production`).
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}
