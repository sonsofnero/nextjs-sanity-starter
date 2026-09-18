import '@/styles/globals.css'

import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'

import {fallbackSiteName, siteUrl} from '@/lib/site'
import {SanityLive} from '@/sanity/live'
import {getSiteSettings} from '@/sanity/siteSettings'
import {DisableDraftMode} from '@/components/site/disableDraftMode'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const siteName = settings?.siteName || fallbackSiteName

  return {
    metadataBase: new URL(siteUrl),
    title: {default: siteName, template: `%s | ${siteName}`},
    ...(settings?.description ? {description: settings.description} : {}),
    ...(settings?.noIndex ? {robots: {index: false, follow: false}} : {}),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  const {isEnabled} = await draftMode()

  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <SanityLive includeDrafts={isEnabled} />
        {isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        <main>{children}</main>
      </body>
    </html>
  )
}
