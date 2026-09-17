import {defineQuery} from 'next-sanity'

export const SITEMAP_QUERY = defineQuery(`
  *[
    _type in ["homePage", "page"]
    && seo.noIndex != true
    && (_type == "homePage" || defined(slug.current))
  ]{
    _type,
    "slug": slug.current,
    _updatedAt
  }
`)
