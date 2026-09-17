import {renderToStaticMarkup} from 'react-dom/server'
import {describe, expect, it, vi} from 'vitest'
import {PageBuilder} from '@/components/slices/pageBuilder'
import type {PageBuilderBlock} from '@/components/slices/sliceTypes'

vi.mock('@mux/mux-player-react', () => ({
  default: (props: {playbackId: string}) => (
    <div data-playback-id={props.playbackId} />
  ),
}))

const block: PageBuilderBlock = {
  _type: 'exampleSlice',
  _key: 'example',
  heading: 'Example heading',
  eyebrow: null,
  content: null,
  image: null,
  button: null,
  tone: null,
  padding_top: null,
  padding_bottom: null,
}

describe('page builder data boundary', () => {
  it('renders missing arrays and null blocks without wrappers', () => {
    expect(renderToStaticMarkup(<PageBuilder />)).toBe('')
    expect(renderToStaticMarkup(<PageBuilder blocks={[null]} />)).toBe('')
  })
  it('keeps nullable data and applies slice defaults', () => {
    const html = renderToStaticMarkup(<PageBuilder blocks={[null, block]} />)
    expect(html).toContain('Example heading')
    expect(html).toContain('section-padding-top-80')
    expect(html).toContain('bg-surface')
  })
  it('renders rich text, an image, and a resolved button', () => {
    const html = renderToStaticMarkup(
      <PageBuilder
        blocks={[
          {
            ...block,
            content: [
              {
                _type: 'block',
                _key: 'b',
                style: 'normal',
                markDefs: [],
                children: [
                  {_type: 'span', _key: 's', text: 'Rich body', marks: []},
                ],
              },
            ],
            image: {
              asset: {
                _ref: 'image-0123456789abcdef0123456789abcdef01234567-1200x800-jpg',
                _type: 'reference',
              },
              crop: null,
              hotspot: null,
              alt: 'Example image',
              caption: null,
            },
            button: {
              text: 'Read more',
              variant: 'outline',
              linkType: 'internal',
              url: null,
              blank: null,
              internalReference: {_type: 'page', slug: 'about'},
            },
          },
        ]}
      />,
    )
    expect(html).toContain('Rich body')
    expect(html).toContain('alt="Example image"')
    expect(html).toContain('href="/about"')
    expect(html).toContain('border-action')
  })
  it('renders a video slice only when a playback id exists', () => {
    const video = {
      _type: 'videoSlice' as const,
      _key: 'video',
      title: 'Intro',
      video: {playbackId: 'abc123', aspectRatio: '16:9'},
      padding_top: null,
      padding_bottom: null,
    }
    expect(renderToStaticMarkup(<PageBuilder blocks={[video]} />)).toContain(
      'data-playback-id="abc123"',
    )
    expect(
      renderToStaticMarkup(<PageBuilder blocks={[{...video, video: null}]} />),
    ).toBe('')
  })
  it('skips empty slices', () => {
    expect(
      renderToStaticMarkup(
        <PageBuilder blocks={[{...block, heading: null}]} />,
      ),
    ).toBe('')
  })
  it('skips unexpected CMS block types and warns in development', () => {
    vi.stubEnv('NODE_ENV', 'development')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      // An old deployment can encounter a newer schema despite its generated static type.
      const unknown = {
        ...block,
        _type: 'futureSlice',
      } as unknown as PageBuilderBlock
      expect(
        renderToStaticMarkup(
          <PageBuilder
            blocks={[
              unknown,
              {...unknown, _type: 'toString'} as unknown as PageBuilderBlock,
            ]}
          />,
        ),
      ).toBe('')
      expect(warn).toHaveBeenCalledWith('Unknown block type: futureSlice')
    } finally {
      warn.mockRestore()
      vi.unstubAllEnvs()
    }
  })
})
