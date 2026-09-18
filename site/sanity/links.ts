import {stegaClean} from '@sanity/client/stega'

export type CmsLink = {
  href?: string | null
  linkType?: string | null
  url?: string | null
  blank?: boolean | null
  internalReference?: {
    _type?: string | null
    slug?: string | {current?: string | null} | null
  } | null
}

function safeDestination(value: string | null | undefined): string | null {
  if (!value) return null
  const href = stegaClean(value).trim()
  if (!href || /[\\\u0000-\u001f\u007f]/.test(href)) return null
  if (href.startsWith('/') && !href.startsWith('//')) return href
  if (href.startsWith('#')) return href
  if (/^(mailto|tel):\S+$/i.test(href)) return href
  if (/^https?:\/\//i.test(href)) {
    try {
      const url = new URL(href)
      return url.hostname ? href : null
    } catch {
      return null
    }
  }
  return null
}

export function resolveLink(link: CmsLink | null | undefined): string | null {
  if (!link) return null
  if (link.href != null) return safeDestination(link.href)
  if (stegaClean(link.linkType) === 'internal') {
    const reference = link.internalReference
    if (stegaClean(reference?._type) === 'homePage') return '/'
    const slug =
      typeof reference?.slug === 'string'
        ? reference.slug
        : reference?.slug?.current
    if (!slug) return null
    const cleanSlug = stegaClean(slug).trim()
    if (!cleanSlug || cleanSlug.startsWith('/') || cleanSlug.includes(':'))
      return null
    return safeDestination(`/${cleanSlug}`)
  }
  return safeDestination(link.url)
}
