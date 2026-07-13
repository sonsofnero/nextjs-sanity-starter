import Link from 'next/link'
import clsx from 'clsx'

import type {ThemeButtonProps} from '@/config/types'

export default function PrimaryButton(props: ThemeButtonProps) {
  const buttonStyle = clsx(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition',
    'bg-stone-900 text-white hover:bg-stone-700',
    props.className,
  )

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={buttonStyle}>
        {props.text}
      </Link>
    )
  }

  if ('text' in props) {
    return (
      <button type={props.type || 'button'} className={buttonStyle} onClick={props.onClick}>
        {props.text}
      </button>
    )
  }

  return null
}
