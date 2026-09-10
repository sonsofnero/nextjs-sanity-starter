import Image from 'next/image'
import type {ComponentPropsWithRef} from 'react'
import {
  getSanityImageDimensions,
  urlForImage,
  type SanityImageSource,
} from '@/sanity/images'

export type SanityImageProps = Omit<
  ComponentPropsWithRef<typeof Image>,
  'src' | 'width' | 'height'
> & {
  image: SanityImageSource | null | undefined
  width?: number
  height?: number
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  fill,
  sizes = '100vw',
  ...props
}: SanityImageProps) {
  const dimensions = getSanityImageDimensions(image)
  const builder = urlForImage(image)
  if (!dimensions || !builder) return null
  const outputWidth =
    width ??
    (height
      ? Math.round((height * dimensions.width) / dimensions.height)
      : dimensions.width)
  const outputHeight =
    height ?? Math.round((outputWidth * dimensions.height) / dimensions.width)
  const src = builder.width(outputWidth).height(outputHeight).fit('crop').url()
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : outputWidth}
      height={fill ? undefined : outputHeight}
      sizes={sizes}
    />
  )
}
