import type {ComponentType} from 'react'
import {sliceComponents} from './sliceRegistry'
import type {PageBuilderBlock, SliceMap, SliceProps} from './sliceTypes'

type PageBuilderProps = {
  blocks?: (PageBuilderBlock | null)[] | null
}

// The generic key keeps a slice's component and props paired as the registry grows.
function renderSlice<Type extends keyof SliceMap>(
  block: SliceProps<Type> & {_type: Type},
) {
  const Slice: ComponentType<SliceProps<Type>> = sliceComponents[block._type]
  return <Slice key={block._key} {...block} />
}

export function PageBuilder({blocks}: PageBuilderProps) {
  return (blocks ?? []).map((block) => {
    if (!block) return null
    if (!Object.hasOwn(sliceComponents, block._type)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Unknown block type: ${block._type}`)
      }
      return null
    }
    return renderSlice(block)
  })
}
