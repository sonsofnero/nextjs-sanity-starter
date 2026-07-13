import {PortableText} from '@portabletext/react'
import clsx from 'clsx'

import {portableTextComponents} from './PortableTextComponents'

interface PortableTextRendererProps {
  value: unknown
  className?: string
  components?: typeof portableTextComponents
}

export default function PortableTextRenderer({
  value,
  className,
  components,
}: PortableTextRendererProps) {
  if (!value) {
    return null
  }

  const normalizedValue = Array.isArray(value) ? value : [value]

  return (
    <div className={clsx('portable-text-content text-stone-800', className)}>
      <PortableText value={normalizedValue} components={components || portableTextComponents} />
    </div>
  )
}
