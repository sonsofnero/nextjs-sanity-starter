function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:3000'
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, '')

/** Used until Site Settings has a site name. */
export const fallbackSiteName = 'Next.js Sanity Starter'
