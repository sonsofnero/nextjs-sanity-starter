import {defineQuery} from 'next-sanity'
import type {HOME_PAGE_QUERY_RESULT} from '@/sanity/sanity.types'

import {PAGE_BUILDER_QUERY} from '../pageBuilder'

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    title,
    modules${PAGE_BUILDER_QUERY},
    seo
  }
`)

export type HomePageQueryResult = HOME_PAGE_QUERY_RESULT
