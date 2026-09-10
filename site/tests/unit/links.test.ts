import {describe, expect, it} from 'vitest'
import {resolveLink} from '@/sanity/links'

describe('resolveLink', () => {
  it('resolves CMS pages and a homepage without a slug', () => {
    expect(
      resolveLink({
        linkType: 'internal',
        internalReference: {_type: 'homePage'},
      }),
    ).toBe('/')
    expect(
      resolveLink({
        linkType: 'internal',
        internalReference: {_type: 'page', slug: 'about'},
      }),
    ).toBe('/about')
  })
  it.each([
    'https://example.com',
    '#details',
    'mailto:a@example.com',
    'tel:+15551234567',
    '/about',
  ])('preserves safe destinations: %s', (href) => {
    expect(resolveLink({href})).toBe(href)
  })
  it.each([
    'javascript:alert(1)',
    '//evil.test',
    '/\\evil.test',
    'data:text/html,hi',
    '',
    'https://',
    'java\nscript:alert(1)',
  ])('rejects unsafe or missing destination: %s', (href) => {
    expect(resolveLink({href})).toBeNull()
  })
  it('does not invent links for missing references', () => {
    expect(resolveLink(null)).toBeNull()
    expect(
      resolveLink({linkType: 'internal', internalReference: {_type: 'page'}}),
    ).toBeNull()
  })
})
