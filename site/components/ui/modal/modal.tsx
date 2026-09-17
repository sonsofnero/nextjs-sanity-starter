'use client'

import {
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithRef,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import {clsx} from 'clsx'
import {acquireScrollLock} from './scrollLock'

type ModalProps = Omit<
  ComponentPropsWithRef<'dialog'>,
  'open' | 'title' | 'children'
> & {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: ReactNode
  closeOnBackdropClick?: boolean
}

function isBackdropPointer(event: MouseEvent<HTMLDialogElement>): boolean {
  if (event.defaultPrevented || event.target !== event.currentTarget) {
    return false
  }
  const rect = event.currentTarget.getBoundingClientRect()
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
}

function useModalLifecycle(open: boolean, ref: ModalProps['ref']) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useImperativeHandle(ref, () => {
    if (!dialogRef.current) throw new Error('Modal dialog is not mounted')
    return dialogRef.current
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !open) return
    const previousFocus = document.activeElement
    dialog.showModal()
    const release = acquireScrollLock()
    return () => {
      // Removing an underlying dialog must not steal focus from a newer modal.
      const shouldRestoreFocus =
        document.activeElement === document.body ||
        dialog.contains(document.activeElement)
      dialog.close()
      release()
      if (
        shouldRestoreFocus &&
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected
      ) {
        previousFocus.focus()
      }
    }
  }, [open])
  return dialogRef
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  closeOnBackdropClick = false,
  className,
  ref,
  onCancel,
  onClose,
  onClick,
  onPointerDown,
  ...props
}: ModalProps): ReactElement {
  const dialogRef = useModalLifecycle(open, ref)
  const backdropPointer = useRef(false)
  const titleId = useId()
  const descriptionId = useId()

  return (
    <dialog
      {...props}
      ref={dialogRef}
      className={clsx(
        'm-auto max-h-[calc(100%-2rem)] w-[min(32rem,calc(100%-2rem))] overflow-auto rounded-lg bg-surface p-6 text-ink backdrop:bg-black/50',
        className,
      )}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        onCancel?.(event)
        if (event.defaultPrevented) return
        event.preventDefault()
        onOpenChange(false)
      }}
      onClose={(event) => {
        onClose?.(event)
        if (!event.currentTarget.open && open) onOpenChange(false)
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        backdropPointer.current = isBackdropPointer(event)
      }}
      onClick={(event) => {
        onClick?.(event)
        if (
          closeOnBackdropClick &&
          backdropPointer.current &&
          isBackdropPointer(event)
        ) {
          onOpenChange(false)
        }
        backdropPointer.current = false
      }}
    >
      <button type="button" onClick={() => onOpenChange(false)}>
        Close
      </button>
      <h2 id={titleId}>{title}</h2>
      {description && <p id={descriptionId}>{description}</p>}
      {children}
    </dialog>
  )
}
