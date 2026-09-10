import {
  PortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from '@portabletext/react'
import clsx from 'clsx'
import {portableTextComponents} from './portableTextComponents'

export type PortableTextRendererProps = {
  value: PortableTextProps['value'] | null | undefined
  className?: string
  components?: PortableTextComponents
}

function mergeComponents(
  overrides: PortableTextComponents = {},
): PortableTextComponents {
  const merged = {...portableTextComponents, ...overrides}
  for (const key of ['block', 'list', 'listItem', 'marks', 'types'] as const) {
    const defaults = portableTextComponents[key]
    const override = overrides[key]
    if (typeof defaults === 'object' && typeof override === 'object') {
      Object.assign(merged, {[key]: {...defaults, ...override}})
    }
  }
  return merged
}

export function PortableTextRenderer({
  value,
  className,
  components,
}: PortableTextRendererProps) {
  if (!value) return null
  return (
    <div className={clsx('portable-text-content text-stone-800', className)}>
      <PortableText value={value} components={mergeComponents(components)} />
    </div>
  )
}
