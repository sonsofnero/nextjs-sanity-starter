export default function SanityHugeIcon({name}: {name?: string}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-xs uppercase tracking-[0.14em] text-stone-500"
    >
      {name?.slice(0, 2) || 'ic'}
    </span>
  )
}
