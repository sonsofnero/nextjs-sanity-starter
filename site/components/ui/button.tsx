import type {ComponentPropsWithRef} from 'react'
import {buttonStyles, type ButtonVariant} from './buttonStyles'

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: ButtonVariant
}

export function Button({
  variant,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, className)}
      {...props}
    />
  )
}
