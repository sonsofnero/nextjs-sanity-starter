import type {
  HOME_PAGE_QUERY_RESULT,
  PAGE_QUERY_RESULT,
} from '@/sanity/sanity.types'

type PageData = NonNullable<HOME_PAGE_QUERY_RESULT | PAGE_QUERY_RESULT>
export type PageBuilderBlock = NonNullable<PageData['modules']>[number]
export type SliceMap = {
  [Type in PageBuilderBlock['_type']]: Extract<PageBuilderBlock, {_type: Type}>
}
export type SliceProps<Type extends keyof SliceMap> = SliceMap[Type]
