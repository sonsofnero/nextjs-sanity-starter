import EmptyPageState from '@/components/starter/emptyPageState'
import PageBuilder from '@/components/slices/pageBuilder'
import {sanityFetch} from '@/sanity/live'
import {HOME_PAGE_QUERY} from '@/sanity/queries/pages'

export const revalidate = 60

export default async function HomePage() {
  const {data: page} = await sanityFetch({
    query: HOME_PAGE_QUERY,
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
