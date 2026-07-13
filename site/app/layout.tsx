import './globals.css'

import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'

import {SanityLive} from '@/sanity/live'
import {Providers} from './providers'
import {DisableDraftMode} from '@/components/site/disableDraftMode'

export const metadata: Metadata = {
  title: 'Next.js Sanity Starter',
  description: 'Minimal Next.js and Sanity starter with one example page-builder slice.',
}

export default async function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  const {isEnabled} = await draftMode()

  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-950 antialiased">
        <SanityLive includeDrafts={isEnabled} />
        {isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
