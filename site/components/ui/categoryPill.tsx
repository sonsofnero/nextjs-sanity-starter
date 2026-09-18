import type {ComponentPropsWithRef} from 'react'
import clsx from 'clsx'

export type CategoryPillProps = Omit<
  ComponentPropsWithRef<'span'>,
  'children'
> & {label: string}

export function CategoryPill({label, className, ...props}: CategoryPillProps) {
  return (
    <span
      className={clsx(
        'text-title-quaternary inline-flex rounded-full bg-muted px-3 py-1 text-action-hover',
        className,
      )}
      {...props}
    >
      {label}
    </span>
  )
}
