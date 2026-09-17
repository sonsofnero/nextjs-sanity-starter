import type {MetadataRoute} from 'next'

import {siteUrl} from '@/lib/site'
import {client} from '@/sanity/client'
import {SITEMAP_QUERY} from '@/sanity/queries/sitemap'
import {SANITY_TAG} from '@/sanity/tags'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const documents = await client.fetch(
    SITEMAP_QUERY,
    {},
    {stega: false, next: {revalidate: 3600, tags: [SANITY_TAG]}},
  )

  return documents.map((document) => ({
    url: document._type === 'homePage' ? siteUrl : `${siteUrl}/${document.slug}`,
    lastModified: document._updatedAt,
  }))
}
