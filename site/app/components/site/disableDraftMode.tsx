'use client'

import Link from 'next/link'

export function DisableDraftMode() {
  return (
    <Link
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 rounded-full bg-white px-4 py-2 text-sm text-green-800 shadow-lg"
    >
      Disable Draft Mode
    </Link>
  )
}
