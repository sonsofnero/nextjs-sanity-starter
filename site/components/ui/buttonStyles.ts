import clsx from 'clsx'

export type ButtonVariant = 'primary' | 'secondary' | 'outline'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-action text-on-action hover:bg-action-hover',
  secondary: 'bg-muted text-action hover:bg-border',
  outline: 'border border-action text-action hover:bg-muted',
}

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  className?: string,
): string {
  return clsx(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    className,
  )
}
