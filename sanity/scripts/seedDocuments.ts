type SeedDocument = {
  _id: string
  _type: string
  [key: string]: unknown
}

function paragraph(key: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `${key}-span`, marks: [], text}],
  }
}

/** Fixed IDs + createIfNotExists: running twice changes nothing. */
export const seedDocuments: SeedDocument[] = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Next.js Sanity Starter',
    description:
      'A neutral Next.js and Sanity starter with a typed page builder.',
    noIndex: true,
  },
  {
    _id: 'seed-example-page',
    _type: 'page',
    title: 'Example Page',
    slug: {_type: 'slug', current: 'example'},
    modules: [
      {
        _type: 'exampleSlice',
        _key: 'seed-page-intro',
        eyebrow: 'Example page',
        heading: 'A standard page built from slices.',
        content: [
          paragraph(
            'seed-page-p1',
            'Edit this page in Sanity Studio or delete it.',
          ),
        ],
        tone: 'muted',
        padding_top: '80',
        padding_bottom: '80',
      },
    ],
  },
  {
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home',
    modules: [
      {
        _type: 'exampleSlice',
        _key: 'seed-home-intro',
        eyebrow: 'Example slice',
        heading: 'Start here and replace this with your own content.',
        content: [
          paragraph(
            'seed-home-p1',
            'This slice shows the path from schema to query to component. Duplicate its structure when you add your first real module.',
          ),
        ],
        button: {
          _type: 'button',
          text: 'See the example page',
          variant: 'primary',
          linkType: 'internal',
          internalReference: {_type: 'reference', _ref: 'seed-example-page'},
          blank: false,
        },
        tone: 'default',
        padding_top: '80',
        padding_bottom: '80',
      },
    ],
  },
]
