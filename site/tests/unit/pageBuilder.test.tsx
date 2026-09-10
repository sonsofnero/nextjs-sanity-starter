import {renderToStaticMarkup} from 'react-dom/server'
import {describe, expect, it, vi} from 'vitest'
import {PageBuilder} from '@/components/slices/pageBuilder'
import type {PageBuilderBlock} from '@/components/slices/sliceTypes'

const block: PageBuilderBlock = {
  _type: 'exampleSlice',
  _key: 'example',
  heading: 'Example heading',
  eyebrow: null,
  body: null,
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
