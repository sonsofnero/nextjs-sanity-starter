import {renderToStaticMarkup} from 'react-dom/server'
import {describe, expect, it} from 'vitest'

import {PortableTextRenderer} from '@/components/portableText/portableTextRenderer'

function linked(markDef: Record<string, unknown>) {
  return [
    {
      _type: 'block',
      _key: 'b',
      style: 'normal',
      markDefs: [{_key: 'm', _type: 'link', ...markDef}],
      children: [{_type: 'span', _key: 's', text: 'go', marks: ['m']}],
    },
  ]
}

describe('portable text', () => {
  it('renders internal references as relative links without a target', () => {
    const html = renderToStaticMarkup(
      <PortableTextRenderer
        value={linked({
          linkType: 'internal',
          internalReference: {_type: 'page', slug: 'about'},
        })}
      />,
    )
    expect(html).toContain('href="/about"')
    expect(html).not.toContain('target=')
  })

  it('opens blank links in a new tab safely', () => {
    const html = renderToStaticMarkup(
      <PortableTextRenderer
        value={linked({
          linkType: 'url',
          url: 'https://example.com',
          blank: true,
        })}
      />,
    )
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('renders image blocks with alt text and caption', () => {
    const html = renderToStaticMarkup(
      <PortableTextRenderer
        value={[
          {
            _type: 'imageType',
            _key: 'i',
            asset: {
              _ref: 'image-0123456789abcdef0123456789abcdef01234567-1200x800-jpg',
            },
            alt: 'A photo',
            caption: 'A caption',
          },
        ]}
      />,
    )
    expect(html).toContain('alt="A photo"')
    expect(html).toContain('A caption</figcaption>')
  })
})
