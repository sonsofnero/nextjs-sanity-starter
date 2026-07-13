import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import EmptyPageState from '@/components/starter/emptyPageState'
import PageBuilder from '@/components/slices/pageBuilder'
import {client} from '@/sanity/client'
import {sanityFetch} from '@/sanity/live'
import {PAGE_QUERY, PAGE_SLUGS_QUERY} from '@/sanity/queries/pages'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.withConfig({useCdn: false}).fetch(PAGE_SLUGS_QUERY)

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
  const page = await client.fetch(PAGE_QUERY, {slug})

  return {
    title: page?.seo?.title || page?.title || 'Untitled Page',
    description: page?.seo?.description || undefined,
  }
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
