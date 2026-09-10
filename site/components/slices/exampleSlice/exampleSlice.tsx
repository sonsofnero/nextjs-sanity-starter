/**
 * Example of a typed Sanity slice with responsive section spacing and optional text.
 * @example Rendered by PageBuilder from the exampleSlice GROQ projection.
 */
import clsx from 'clsx'

import {ScrollReveal} from '@/components/animation/scrollReveal'
import type {SliceProps} from '../sliceTypes'
import {stegaClean} from '@sanity/client/stega'
import {getModulePadding} from '../padding'

type ExampleSliceProps = SliceProps<'exampleSlice'>

const toneClasses = {
  default: 'bg-surface',
  muted: 'bg-muted',
} as const

export function ExampleSlice({
  eyebrow,
  heading,
  body,
  tone,
  padding_top,
  padding_bottom,
}: ExampleSliceProps) {
  if (!heading && !body) {
    return null
  }

  const {paddingTop, paddingBottom} = getModulePadding(
    padding_top,
    padding_bottom,
  )

  return (
    <section
      className={clsx(
        'page-gutter',
        toneClasses[stegaClean(tone) ?? 'default'] ?? toneClasses.default,
        paddingTop,
        paddingBottom,
      )}
    >
      <ScrollReveal className="mx-auto flex w-full max-w-4xl flex-col gap-5 rounded-panel border border-border/80 p-8 md:p-12">
        {eyebrow ? (
          <p className="typography-eyebrow text-caption">{eyebrow}</p>
        ) : null}
        {heading ? (
          <h2 className="max-w-3xl typography-section-heading text-ink">
            {heading}
          </h2>
        ) : null}
        {body ? (
          <p className="max-w-2xl typography-section-body text-subtle">
            {body}
          </p>
        ) : null}
      </ScrollReveal>
    </section>
  )
}
