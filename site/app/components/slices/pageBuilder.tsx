import { SLICE_COMPONENTS } from './sliceRegistry'

/**
 * Page Builder Component
 * 
 * Main renderer for page builder modules. This component maps module types
 * to their corresponding React components and renders them in order.
 * 
 * @example
 * <PageBuilder blocks={data.pageBuilder} />
 */

interface PageBuilderBlock {
  _key: string
  _type: string
  [key: string]: unknown
}

interface PageBuilderProps {
  blocks?: (PageBuilderBlock | null)[] | null
}

/**
 * PageBuilder Component
 * Renders an array of page builder blocks/modules
 */
function PageBuilder({ blocks }: PageBuilderProps) {
  const normalizedBlocks = (blocks ?? []).filter(
    (block): block is PageBuilderBlock => block !== null
  )
  
  if (normalizedBlocks.length === 0) {
    return null
  }

  return (
    <>
      {normalizedBlocks.map((block) => {
        const SliceComponent = SLICE_COMPONENTS[block._type]

        if (!SliceComponent) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Unknown block type: ${block._type}`)
          }
          return null
        }

        // Convert null values to undefined so default parameters work
        const normalizedBlock = Object.fromEntries(
          Object.entries(block).map(([key, value]) => [
            key,
            value === null ? undefined : value,
          ])
        )

        return <SliceComponent key={block._key} {...normalizedBlock} />
      })}
    </>
  )
}

export default PageBuilder
