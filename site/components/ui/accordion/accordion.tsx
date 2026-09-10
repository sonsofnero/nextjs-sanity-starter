'use client'

import {
  createContext,
  useContext,
  useId,
  type ComponentPropsWithRef,
  type ReactElement,
  type ReactNode,
} from 'react'

const AccordionName = createContext<string | undefined>(undefined)

type AccordionProps = ComponentPropsWithRef<'div'> & {
  mode?: 'single' | 'multiple'
}

/** Native details grouping remains interactive before hydration and without JavaScript. */
export function Accordion({
  mode = 'single',
  children,
  ...props
}: AccordionProps): ReactElement {
  const id = useId()
  return (
    <AccordionName.Provider value={mode === 'single' ? id : undefined}>
      <div {...props}>{children}</div>
    </AccordionName.Provider>
  )
}

type AccordionItemProps = Omit<
  ComponentPropsWithRef<'details'>,
  'title' | 'name' | 'open'
> & {
  title: ReactNode
  defaultOpen?: boolean
  summaryClassName?: string
  contentClassName?: string
}

export function AccordionItem({
  title,
  defaultOpen,
  summaryClassName,
  contentClassName,
  children,
  ...props
}: AccordionItemProps): ReactElement {
  const name = useContext(AccordionName)
  return (
    <details {...props} name={name} open={defaultOpen}>
      <summary className={summaryClassName}>{title}</summary>
      <div className={contentClassName}>{children}</div>
    </details>
  )
}
