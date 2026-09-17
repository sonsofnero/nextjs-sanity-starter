import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {EmptyPageState} from '@/components/starter/emptyPageState'
import {PageBuilder} from '@/components/slices/pageBuilder'
import {client} from '@/sanity/client'
import {sanityFetch} from '@/sanity/live'
import {buildMetadata} from '@/sanity/metadata'
import {PAGE_QUERY, PAGE_SLUGS_QUERY} from '@/sanity/queries/pages/standardPage'
import {getSiteSettings} from '@/sanity/siteSettings'
import {SANITY_TAG} from '@/sanity/tags'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({useCdn: false})
    .fetch(PAGE_SLUGS_QUERY, {}, {next: {tags: [SANITY_TAG]}})

  return (slugs ?? [])
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({slug}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  const [{data: page}, settings] = await Promise.all([
    sanityFetch({query: PAGE_QUERY, params: {slug}, stega: false, tags: [SANITY_TAG]}),
    getSiteSettings(),
  ])
  if (!page) return {}
  return buildMetadata({
    seo: page.seo,
    settings,
    fallbackTitle: page.title,
    path: `/${slug}`,
  })
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const {data: page} = await sanityFetch({
    query: PAGE_QUERY,
    params: {slug},
    tags: [SANITY_TAG],
  })

  if (!page) {
    notFound()
  }

  return (
    <>
      <PageBuilder blocks={page.modules} />
      <EmptyPageState
        show={!page.modules?.length}
        title={page.title || 'Untitled Page'}
        description="This page exists, but it does not have any modules yet. Add the Example Slice in Sanity Studio to start shaping the page."
      />
    </>
  )
}
