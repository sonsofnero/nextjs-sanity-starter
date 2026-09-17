import {describe, expect, it} from 'vitest'

import {buildMetadata} from '@/sanity/metadata'

const asset = {
  _ref: 'image-0123456789abcdef0123456789abcdef01234567-2000x1000-jpg',
}
const settings = {
  siteName: 'Acme',
  description: 'Site description',
  image: {asset},
  noIndex: false,
}

describe('buildMetadata', () => {
  it('prefers page SEO over site defaults', () => {
    const metadata = buildMetadata({
      seo: {title: 'SEO title', description: 'SEO description', image: {asset}},
      settings,
      fallbackTitle: 'Doc title',
      path: '/about',
    })
    expect(metadata.title).toBe('SEO title')
    expect(metadata.description).toBe('SEO description')
    expect(metadata.alternates?.canonical).toBe('/about')
    expect(metadata.openGraph).toMatchObject({
      siteName: 'Acme',
      title: 'SEO title',
      images: [expect.objectContaining({width: 1200, height: 627})],
    })
  })

  it('falls back to the document title and site defaults', () => {
    const metadata = buildMetadata({seo: null, settings, fallbackTitle: 'Doc', path: '/x'})
    expect(metadata.title).toBe('Doc')
    expect(metadata.description).toBe('Site description')
    expect(metadata.openGraph?.images).toHaveLength(1)
  })

  it('omits keys it has no value for so the layout defaults still apply', () => {
    const metadata = buildMetadata({seo: null, settings: null, path: '/'})
    expect('title' in metadata).toBe(false)
    expect('description' in metadata).toBe(false)
    expect('robots' in metadata).toBe(false)
  })

  it('noindexes when either the page or the site asks for it', () => {
    const noIndex = {index: false, follow: false}
    expect(buildMetadata({seo: {noIndex: true}, settings, path: '/x'}).robots).toEqual(noIndex)
    expect(
      buildMetadata({seo: null, settings: {...settings, noIndex: true}, path: '/x'}).robots,
    ).toEqual(noIndex)
  })
})
