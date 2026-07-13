import type { ComponentType } from 'react'

import ExampleSlice from './exampleSlice/exampleSlice'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SLICE_COMPONENTS: Record<string, ComponentType<any>> = {
  exampleSlice: ExampleSlice,
}

export const SLICE_TYPES = Object.keys(SLICE_COMPONENTS).sort((a, b) =>
  a.localeCompare(b)
)
