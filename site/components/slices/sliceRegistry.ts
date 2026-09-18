import type {ComponentType} from 'react'
import {ExampleSlice} from './exampleSlice/exampleSlice'
import {VideoSlice} from './videoSlice/videoSlice'
import type {SliceMap, SliceProps} from './sliceTypes'

// Keep the mapped annotation: it preserves each discriminator's props at dispatch.
export const sliceComponents: {
  [Type in keyof SliceMap]: ComponentType<SliceProps<Type>>
} = {
  exampleSlice: ExampleSlice,
  videoSlice: VideoSlice,
}
