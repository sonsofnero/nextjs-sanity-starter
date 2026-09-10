import {EXAMPLE_SLICE_QUERY} from './modules/content/exampleSlice'

export const PAGE_BUILDER_QUERY = `[_type == "exampleSlice"]{
  ${EXAMPLE_SLICE_QUERY},
  _type,
  _key
}` as const
