import {expect, it} from 'vitest'
import {renderToStaticMarkup} from 'react-dom/server'
import {Button} from '@/components/ui/button'
import {ButtonLink} from '@/components/ui/buttonLink'
import {Container} from '@/components/ui/container'
import {SanityImage} from '@/components/media/sanityImage'
import {Video} from '@/components/media/video'
import {PortableTextRenderer} from '@/components/portableText/portableTextRenderer'

it('preserves native button semantics and children', () => {
  const html = renderToStaticMarkup(
    <Button disabled aria-label="Save changes">
      <span>Save</span>
    </Button>,
  )
  expect(html).toContain('type="button"')
  expect(html).toContain('disabled=""')
  expect(html).toContain('<span>Save</span>')
  expect(html).toContain('aria-label="Save changes"')
})
it('renders button links as anchors', () => {
  expect(
    renderToStaticMarkup(<ButtonLink href="/about">About</ButtonLink>),
  ).toContain('href="/about"')
})
it('keeps container width and gutters independent', () => {
  expect(
    renderToStaticMarkup(<Container size="header">Hello</Container>),
  ).not.toContain('px-6')
  expect(
    renderToStaticMarkup(
      <Container size="wide" gutter>
        Hello
      </Container>,
    ),
  ).toContain('max-w-6xl page-gutter')
})
it('preserves native video props and track children', () => {
  const html = renderToStaticMarkup(
    <Video muted playsInline>
      <track kind="captions" src="/captions.vtt" />
    </Video>,
  )
  expect(html).toContain('playsInline=""')
  expect(html).toContain('<track')
})
it('merges a custom mark with default headings and renders missing links as text', () => {
  const html = renderToStaticMarkup(
    <PortableTextRenderer
      value={[
        {
          _type: 'block',
          _key: 'a',
          style: 'h2',
          markDefs: [{_type: 'link', _key: 'missing'}],
          children: [
            {_type: 'span', _key: 's', marks: ['missing'], text: 'Hello'},
          ],
        },
      ]}
      components={{marks: {strong: ({children}) => <b>{children}</b>}}}
    />,
  )
  expect(html).toContain('text-heading-2')
  expect(html).toContain('Hello</h2>')
  expect(html).not.toContain('<a')
})

it('renders Sanity image sizing, alt text, and native image props', () => {
  const html = renderToStaticMarkup(
    <SanityImage
      image={{
        asset: {
          _ref: 'image-0123456789abcdef0123456789abcdef01234567-1200x800-jpg',
        },
      }}
      alt="A landscape"
      width={600}
      sizes="50vw"
      loading="lazy"
      loader={({src, width}) => `${src}&w=${width}`}
    />,
  )
  expect(html).toContain('width="600"')
  expect(html).toContain('height="400"')
  expect(html).toContain('alt="A landscape"')
  expect(html).toContain('sizes="50vw"')
  expect(html).toContain('loading="lazy"')
})
