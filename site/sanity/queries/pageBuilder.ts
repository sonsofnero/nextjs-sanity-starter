import {EXAMPLE_SLICE_QUERY} from './modules/content/exampleSlice'
import {VIDEO_SLICE_QUERY} from './modules/content/videoSlice'

export const PAGE_BUILDER_QUERY = `[_type in ["exampleSlice", "videoSlice"]]{
  ${EXAMPLE_SLICE_QUERY},
  ${VIDEO_SLICE_QUERY},
  _type,
  _key
}` as const
