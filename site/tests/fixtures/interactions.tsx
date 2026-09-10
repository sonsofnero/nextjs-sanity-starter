'use client'

import {useState} from 'react'
import {Accordion, AccordionItem} from '../../components/ui/accordion/accordion'
import {Modal} from '../../components/ui/modal/modal'

export function Interactions() {
  const [open, setOpen] = useState(false)
  const [second, setSecond] = useState(false)
  const [mounted, setMounted] = useState(true)
  const [backdrop, setBackdrop] = useState(false)
  return (
    <main>
      <Accordion aria-label="First group">
        <AccordionItem title="First question" defaultOpen>
          First answer
        </AccordionItem>
        <AccordionItem title="Second question">Second answer</AccordionItem>
      </Accordion>
      <Accordion aria-label="Other group">
        <AccordionItem title="Independent question" defaultOpen>
          Independent answer
        </AccordionItem>
      </Accordion>
      <Accordion mode="multiple" aria-label="Multiple group">
        <AccordionItem title="Multiple first" defaultOpen>
          Multiple first answer
        </AccordionItem>
        <AccordionItem title="Multiple second">
          Multiple second answer
        </AccordionItem>
      </Accordion>
      <label>
        <input
          type="checkbox"
          checked={backdrop}
          onChange={(event) => setBackdrop(event.target.checked)}
        />
        Dismiss on backdrop
      </label>
      <button
        onClick={() => {
          setMounted(true)
          setOpen(true)
        }}
      >
        Open modal
      </button>
      <output aria-label="Modal state">{open ? 'open' : 'closed'}</output>
      {mounted && (
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Example modal"
          description="Example description"
          closeOnBackdropClick={backdrop}
        >
          <input aria-label="Modal input" />
          <button onClick={() => setSecond(true)}>Open second modal</button>
          <button
            onClick={() => {
              setMounted(false)
              setOpen(false)
            }}
          >
            Unmount modal
          </button>
        </Modal>
      )}
      <Modal open={second} onOpenChange={setSecond} title="Second modal">
        <button
          onClick={() => {
            setMounted(false)
            setOpen(false)
          }}
        >
          Unmount underlying modal
        </button>
      </Modal>
    </main>
  )
}
