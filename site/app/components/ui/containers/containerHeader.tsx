import clsx from 'clsx'

export default function ContainerHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={clsx('mx-auto w-full max-w-5xl px-6 md:px-8 lg:px-12', className)}>{children}</div>
}
