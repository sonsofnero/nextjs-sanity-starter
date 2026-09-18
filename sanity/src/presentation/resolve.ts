import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {route: '/', filter: `_type == "homePage"`},
    {route: '/:slug', filter: `_type == "page" && slug.current == $slug`},
  ]),
  locations: {
    homePage: defineLocations({
      select: {title: 'title'},
      resolve: (doc) => ({
        locations: [{title: doc?.title || 'Home', href: '/'}],
      }),
    }),
    page: defineLocations({
      select: {title: 'title', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: doc?.slug
          ? [{title: doc.title || 'Untitled', href: `/${doc.slug}`}]
          : [],
      }),
    }),
    siteSettings: defineLocations({
      message: 'Used on every page',
      tone: 'positive',
    }),
  },
}
