import clsx from 'clsx'

import {theme} from '@/config/theme'

export default function CategoryPill({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full bg-stone-100 px-3 py-1 text-stone-700',
        theme.typography.titleQuaternary,
        className,
      )}
    >
      {label}
    </span>
  )
}
