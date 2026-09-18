'use client'

import {useIsPresentationTool} from 'next-sanity/hooks'
import {usePathname} from 'next/navigation'

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()
  const pathname = usePathname()

  // Presentation manages draft mode itself; null means "not determined yet".
  if (isPresentationTool !== false) return null

  return (
    // A plain anchor: leaving draft mode must be a full navigation so the cookie change applies.
    <a
      href={`/api/draft-mode/disable?redirect=${encodeURIComponent(pathname)}`}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-action px-4 py-2 text-sm text-on-action shadow-lg"
    >
      Disable Draft Mode
    </a>
  )
}
