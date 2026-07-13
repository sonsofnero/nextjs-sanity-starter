import {defineQuery} from 'next-sanity'
import type {
  PAGE_QUERY_RESULT,
  PAGE_SLUGS_QUERY_RESULT,
} from '@/sanity/sanity.types'

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

export type PageQueryResult = PAGE_QUERY_RESULT
export type PageSlugsQueryResult = PAGE_SLUGS_QUERY_RESULT
