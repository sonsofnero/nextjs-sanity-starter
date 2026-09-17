import {defineQuery} from 'next-sanity'

import {PAGE_BUILDER_QUERY} from '../pageBuilder'

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    title,
    modules${PAGE_BUILDER_QUERY},
    seo
  }
`)
