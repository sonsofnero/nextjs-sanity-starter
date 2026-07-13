import clsx from 'clsx'

import ScrollReveal from '@/components/animation/ScrollReveal'
import type {PaddingModuleProps} from '@/config/types'
import {getModulePadding, initialPadding} from '@/utils/padding'

interface ExampleSliceProps extends PaddingModuleProps {
  eyebrow?: string
  heading?: string
  body?: string
  tone?: 'default' | 'muted'
}

const toneClasses = {
  default: 'bg-white',
  muted: 'bg-stone-100',
} as const

export default function ExampleSlice({
  eyebrow,
  heading,
  body,
  tone = 'default',
  padding_top = initialPadding.padding_top,
  padding_bottom = initialPadding.padding_bottom,
}: ExampleSliceProps) {
  if (!heading && !body) {
    return null
  }

  const {paddingTop, paddingBottom} = getModulePadding(padding_top, padding_bottom)

  return (
    <section
      className={clsx(
        'px-6 md:px-8 lg:px-12',
        toneClasses[tone] ?? toneClasses.default,
        paddingTop,
        paddingBottom,
      )}
    >
      <ScrollReveal className="mx-auto flex w-full max-w-4xl flex-col gap-5 rounded-[2rem] border border-stone-200/80 p-8 md:p-12">
        {eyebrow ? (
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
            {eyebrow}
          </p>
        ) : null}
        {heading ? (
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-stone-950 md:text-5xl">
            {heading}
          </h2>
        ) : null}
        {body ? (
          <p className="max-w-2xl text-base leading-7 text-stone-600 md:text-lg">
            {body}
          </p>
        ) : null}
      </ScrollReveal>
    </section>
  )
}
