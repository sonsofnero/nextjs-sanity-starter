import {expect, it} from 'vitest'

import {toCssAspectRatio} from '@/components/media/aspectRatio'

it('converts Mux aspect ratios to CSS and falls back to 16 / 9', () => {
  expect(toCssAspectRatio('16:9')).toBe('16 / 9')
  expect(toCssAspectRatio('4:5')).toBe('4 / 5')
  expect(toCssAspectRatio('1.85:1')).toBe('1.85 / 1')
  expect(toCssAspectRatio(null)).toBe('16 / 9')
  expect(toCssAspectRatio('0:9')).toBe('16 / 9')
  expect(toCssAspectRatio('url(x)')).toBe('16 / 9')
})
