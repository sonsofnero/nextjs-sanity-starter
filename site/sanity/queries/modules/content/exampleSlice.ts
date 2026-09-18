import {
  BUTTON_FRAGMENT,
  IMAGE_FRAGMENT,
  PADDING_FRAGMENT,
  PORTABLE_TEXT_FRAGMENT,
} from '../../fragments'

export const EXAMPLE_SLICE_QUERY = `
  _type == 'exampleSlice' => {
    _type,
    _key,
    eyebrow,
    heading,
    content[]{${PORTABLE_TEXT_FRAGMENT}},
    image{${IMAGE_FRAGMENT}},
    button{${BUTTON_FRAGMENT}},
    tone,
    ${PADDING_FRAGMENT}
  }
` as const
