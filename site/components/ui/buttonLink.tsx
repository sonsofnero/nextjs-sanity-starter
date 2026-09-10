import Link from 'next/link'
import type {ComponentPropsWithRef} from 'react'
import {buttonStyles, type ButtonVariant} from './buttonStyles'

export type ButtonLinkProps = ComponentPropsWithRef<typeof Link> & {
  variant?: ButtonVariant
}

export function ButtonLink({variant, className, ...props}: ButtonLinkProps) {
  return <Link className={buttonStyles(variant, className)} {...props} />
}
