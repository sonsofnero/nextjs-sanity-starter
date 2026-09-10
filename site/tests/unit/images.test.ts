import {expect, it} from 'vitest'
import {getSanityImageDimensions, urlForImage} from '@/sanity/images'

const image = {
  asset: {_ref: 'image-0123456789abcdef0123456789abcdef01234567-1200x800-jpg'},
  crop: {left: 0.25, right: 0, top: 0, bottom: 0},
  hotspot: {x: 0.8, y: 0.5, width: 0.1, height: 0.1},
}
it('uses cropped intrinsic dimensions', () => {
  expect(getSanityImageDimensions(image)).toEqual({width: 900, height: 800})
})
it('lets the Sanity builder apply crop and hotspot to a requested aspect ratio', () => {
  const url = new URL(
    urlForImage(image)!.width(400).height(400).fit('crop').url(),
  )
  expect(url.searchParams.get('rect')).toBe('400,0,800,800')
  expect(url.searchParams.get('w')).toBe('400')
  expect(url.searchParams.get('auto')).toBe('format')
})
it('returns no URL for missing or malformed image assets', () => {
  expect(urlForImage({})).toBeUndefined()
  expect(urlForImage({asset: {_ref: 'broken'}})).toBeUndefined()
})
