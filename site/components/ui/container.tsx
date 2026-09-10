import type {ComponentPropsWithRef} from 'react'
import clsx from 'clsx'

export type ContainerProps = ComponentPropsWithRef<'div'> & {
  size?: 'content' | 'header' | 'wide'
  gutter?: boolean
}
const widths = {content: 'max-w-4xl', header: 'max-w-5xl', wide: 'max-w-6xl'}

export function Container({
  size = 'content',
  gutter = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto w-full',
        widths[size],
        gutter && 'page-gutter',
        className,
      )}
      {...props}
    />
  )
}
