'use client'

import {useState} from 'react'

export default function useFAQAccordion(initialOpen: string | null = null) {
  const [openItem, setOpenItem] = useState<string | null>(initialOpen)

  function toggleItem(id: string) {
    setOpenItem((current) => (current === id ? null : id))
  }

  return {openItem, toggleItem}
}
