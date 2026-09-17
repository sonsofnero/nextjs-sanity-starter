import type {Metadata} from 'next'

import {fallbackSiteName} from '@/lib/site'
import {resolveOpenGraphImage, type SanityImageSource} from '@/sanity/images'

export type SeoInput = {
  title?: string | null
  description?: string | null
  image?: SanityImageSource | null
  noIndex?: boolean | null
} | null

export type SettingsInput = {
  siteName?: string | null
  description?: string | null
  image?: SanityImageSource | null
  noIndex?: boolean | null
} | null

/**
 * Next.js replaces (does not deep-merge) each metadata key a page returns, and an
 * explicit `undefined` clears the layout's value. So: only set keys we have values for,
 * and make `openGraph` complete every time.
 */
export function buildMetadata({
  seo,
  settings,
  fallbackTitle,
  path,
}: {
  seo?: SeoInput
  settings?: SettingsInput
  fallbackTitle?: string | null
  path: string
}): Metadata {
  const title = seo?.title || fallbackTitle || undefined
  const description = seo?.description || settings?.description || undefined
  const image =
    resolveOpenGraphImage(seo?.image) ?? resolveOpenGraphImage(settings?.image)

  const metadata: Metadata = {
    alternates: {canonical: path},
    openGraph: {
      type: 'website',
      siteName: settings?.siteName || fallbackSiteName,
      url: path,
      ...(title ? {title} : {}),
      ...(description ? {description} : {}),
      ...(image ? {images: [image]} : {}),
    },
  }
  if (title) metadata.title = title
  if (description) metadata.description = description
  if (seo?.noIndex || settings?.noIndex) {
    metadata.robots = {index: false, follow: false}
  }
  return metadata
}
