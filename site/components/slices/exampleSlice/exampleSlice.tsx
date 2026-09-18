/**
 * Reference slice: typed Sanity props, responsive section spacing, Portable Text,
 * a Sanity image, and a CMS button resolved through resolveLink.
 * @example Rendered by PageBuilder from the exampleSlice GROQ projection.
 */
import clsx from 'clsx'
import {stegaClean} from '@sanity/client/stega'

import {ScrollReveal} from '@/components/animation/scrollReveal'
import {SanityImage} from '@/components/media/sanityImage'
import {PortableTextRenderer} from '@/components/portableText/portableTextRenderer'
import {ButtonLink} from '@/components/ui/buttonLink'
import type {ButtonVariant} from '@/components/ui/buttonStyles'
import {resolveLink} from '@/sanity/links'
import {getModulePadding} from '../padding'
import type {SliceProps} from '../sliceTypes'

type ExampleSliceProps = SliceProps<'exampleSlice'>

const toneClasses = {
  default: 'bg-surface',
  muted: 'bg-muted',
} as const

const buttonVariants: readonly ButtonVariant[] = [
  'primary',
  'secondary',
  'outline',
]

export function ExampleSlice({
  eyebrow,
  heading,
  content,
  image,
  button,
  tone,
  padding_top,
  padding_bottom,
}: ExampleSliceProps) {
  if (!heading && !content?.length) {
    return null
  }

  const {paddingTop, paddingBottom} = getModulePadding(
    padding_top,
    padding_bottom,
  )
  const cleanTone = stegaClean(tone)
  const toneClass =
    cleanTone && Object.hasOwn(toneClasses, cleanTone)
      ? toneClasses[cleanTone as keyof typeof toneClasses]
      : toneClasses.default
  const href = resolveLink(button)
  const variant = buttonVariants.find(
    (name) => name === stegaClean(button?.variant),
  )

  return (
    <section
      className={clsx('page-gutter', toneClass, paddingTop, paddingBottom)}
    >
      <ScrollReveal className="mx-auto flex w-full max-w-4xl flex-col gap-5 rounded-panel border border-border/80 p-8 md:p-12">
        {eyebrow ? (
          <p className="text-eyebrow text-caption">{eyebrow}</p>
        ) : null}
        {heading ? (
          <h2 className="max-w-3xl text-heading-2 font-semibold text-ink">
            {heading}
          </h2>
        ) : null}
        <PortableTextRenderer
          value={content}
          className="max-w-2xl text-subtle"
        />
        <SanityImage
          image={image}
          alt={image?.alt ?? ''}
          width={1200}
          sizes="(min-width: 64rem) 56rem, 100vw"
          className="h-auto w-full rounded-2xl"
        />
        {href && button?.text ? (
          <ButtonLink
            href={href}
            variant={variant}
            className="self-start"
            {...(button.blank
              ? {target: '_blank', rel: 'noopener noreferrer'}
              : {})}
          >
            {button.text}
          </ButtonLink>
        ) : null}
      </ScrollReveal>
    </section>
  )
}
