import clsx from 'clsx'

export default function ContainerInner({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={clsx('mx-auto w-full max-w-4xl', className)}>{children}</div>
}
