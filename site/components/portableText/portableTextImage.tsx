import {SanityImage} from '@/components/media/sanityImage'
import type {SanityImageSource} from '@/sanity/images'

type PortableTextImageValue = SanityImageSource & {caption?: string | null}

export function PortableTextImage({value}: {value: PortableTextImageValue}) {
  return (
    <figure className="mb-6">
      <SanityImage
        image={value}
        alt={value.alt ?? ''}
        width={1200}
        sizes="(min-width: 64rem) 56rem, 100vw"
        className="h-auto w-full rounded-2xl"
      />
      {value.caption ? (
        <figcaption className="mt-2 text-body-tertiary text-caption">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
