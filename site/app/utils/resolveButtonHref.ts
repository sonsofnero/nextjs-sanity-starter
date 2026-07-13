import type {ModuleButton} from '@/config/types'

export function resolveButtonHref(button?: ModuleButton | null) {
  if (!button) {
    return null
  }

  if (button.href) {
    return button.href
  }

  if (button.linkType === 'url' && button.url) {
    return button.url
  }

  const slug =
    typeof button.internalReference?.slug === 'string'
      ? button.internalReference.slug
      : button.internalReference?.slug?.current

  if (!slug) {
    return null
  }

  return button.internalType === 'homePage' ? '/' : `/${slug}`
}
