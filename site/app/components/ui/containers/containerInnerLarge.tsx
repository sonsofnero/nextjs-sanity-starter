import clsx from 'clsx'

export default function ContainerInnerLarge({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={clsx('mx-auto w-full max-w-6xl', className)}>{children}</div>
}
