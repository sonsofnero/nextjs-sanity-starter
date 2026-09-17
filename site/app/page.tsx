import type {Metadata} from 'next'

import {EmptyPageState} from '@/components/starter/emptyPageState'
import {PageBuilder} from '@/components/slices/pageBuilder'
import {sanityFetch} from '@/sanity/live'
import {buildMetadata} from '@/sanity/metadata'
import {HOME_PAGE_QUERY} from '@/sanity/queries/pages/home'
import {getSiteSettings} from '@/sanity/siteSettings'
import {SANITY_TAG} from '@/sanity/tags'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const [{data: page}, settings] = await Promise.all([
    sanityFetch({query: HOME_PAGE_QUERY, stega: false, tags: [SANITY_TAG]}),
    getSiteSettings(),
  ])
  const {title, ...metadata} = buildMetadata({seo: page?.seo, settings, path: '/'})
  // The home page shows its SEO title verbatim, or the layout's default (the site name).
  return typeof title === 'string' ? {...metadata, title: {absolute: title}} : metadata
}

export default async function HomePage() {
  const {data: page} = await sanityFetch({
    query: HOME_PAGE_QUERY,
    tags: [SANITY_TAG],
  })

  return (
    <>
      <PageBuilder blocks={page?.modules} />
      <EmptyPageState
        show={!page?.modules?.length}
        title="Your starter is ready"
        description="Add an Example Slice to the Home Page in Sanity Studio, then use it as the reference point for future slices."
      />
    </>
  )
}
