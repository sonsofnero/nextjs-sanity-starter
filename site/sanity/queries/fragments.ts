/**
 * Padding Fragment
 * Fetches vertical padding configuration for modules
 */
export const PADDING_FRAGMENT = `
  padding_top,
  padding_bottom
` as const

/** Matches CmsLink in sanity/links.ts; dereferences only what resolveLink reads. */
export const LINK_FRAGMENT = `
  linkType,
  url,
  blank,
  internalReference->{_type, "slug": slug.current}
` as const

export const BUTTON_FRAGMENT = `
  text,
  variant,
  ${LINK_FRAGMENT}
` as const

export const IMAGE_FRAGMENT = `
  asset,
  crop,
  hotspot,
  alt,
  caption
` as const

export const PORTABLE_TEXT_FRAGMENT = `
  ...,
  _type == "imageType" => {_type, _key, ${IMAGE_FRAGMENT}},
  markDefs[]{
    ...,
    _type == "link" => {_type, _key, ${LINK_FRAGMENT}}
  }
` as const
