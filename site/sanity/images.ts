import {createImageUrlBuilder} from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
import {dataset, projectId} from '@/sanity/api'

export type SanityImageSource = {
  asset?: {_ref?: string; _id?: string; url?: string} | null
  alt?: string | null
  crop?: {bottom: number; left: number; right: number; top: number} | null
  hotspot?: {x: number; y: number; width: number; height: number} | null
}

const imageBuilder = createImageUrlBuilder({projectId, dataset})

export function getSanityImageDimensions(
  image: SanityImageSource | null | undefined,
) {
  const asset = image?.asset?._ref || image?.asset?._id || image?.asset?.url
  if (!asset) return undefined
  try {
    const {width, height} = getImageDimensions(asset)
    const crop = image?.crop
    return {
      width: Math.max(
        1,
        Math.round(width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0))),
      ),
      height: Math.max(
        1,
        Math.round(height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0))),
      ),
    }
  } catch {
    return undefined
  }
}

export function urlForImage(image: SanityImageSource | null | undefined) {
  if (!image || !getSanityImageDimensions(image)) return undefined
  // Passing the entire source leaves crop and hotspot calculations to Sanity.
  return imageBuilder
    .image({
      ...image,
      crop: image.crop ?? undefined,
      hotspot: image.hotspot ?? undefined,
      asset: image.asset ?? undefined,
    })
    .auto('format')
}

export function resolveOpenGraphImage(
  image: SanityImageSource | null | undefined,
  width = 1200,
  height = 627,
) {
  const url = urlForImage(image)?.width(width).height(height).fit('crop').url()
  if (!url) return undefined
  return {url, alt: image?.alt ?? '', width, height}
}
