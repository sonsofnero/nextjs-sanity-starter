'use client'

import {useEffect, useState} from 'react'

export default function useInterceptingModal(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return {isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), setIsOpen}
}
