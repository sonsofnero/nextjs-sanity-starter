import {cache} from 'react'

import {sanityFetch} from '@/sanity/live'
import {SITE_SETTINGS_QUERY} from '@/sanity/queries/siteSettings'
import {SANITY_TAG} from '@/sanity/tags'

/** Stega-free: these values feed <head> and robots, never visible editable text. */
export const getSiteSettings = cache(async () => {
  const {data} = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false,
    tags: [SANITY_TAG],
  })
  return data
})
