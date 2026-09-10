import {PADDING_FRAGMENT} from '../../fragments'

export const EXAMPLE_SLICE_QUERY = `
  _type == 'exampleSlice' => {
    _type,
    _key,
    eyebrow,
    heading,
    body,
    tone,
    ${PADDING_FRAGMENT}
  }
` as const
