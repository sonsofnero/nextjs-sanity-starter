import type {MetadataRoute} from 'next'

import {siteUrl} from '@/lib/site'
import {client} from '@/sanity/client'
import {SITE_SETTINGS_QUERY} from '@/sanity/queries/siteSettings'
import {SANITY_TAG} from '@/sanity/tags'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await client.fetch(
    SITE_SETTINGS_QUERY,
    {},
    {stega: false, next: {revalidate: 3600, tags: [SANITY_TAG]}},
  )
  // Only the production deployment is indexable, and only once the site is launched.
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === 'production'
    : process.env.NODE_ENV === 'production'
  const indexable = isProduction && !settings?.noIndex

  return {
    rules: indexable
      ? {userAgent: '*', allow: '/', disallow: '/api/'}
      : {userAgent: '*', disallow: '/'},
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
