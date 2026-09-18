import {defineQuery} from 'next-sanity'

import {PAGE_BUILDER_QUERY} from '../pageBuilder'

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    modules${PAGE_BUILDER_QUERY},
    seo
  }
`)

export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)][].slug.current
`)
