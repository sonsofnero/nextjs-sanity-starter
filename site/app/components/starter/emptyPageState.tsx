interface EmptyPageStateProps {
  show?: boolean
  title: string
  description: string
}

export default function EmptyPageState({
  show = false,
  title,
  description,
}: EmptyPageStateProps) {
  if (!show) {
    return null
  }

  return (
    <section className="px-6 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm md:p-12">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
            Blank starter state
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-stone-600 md:text-lg">
            {description}
          </p>
        </div>
        <div className="grid gap-3 text-sm text-stone-600 md:grid-cols-2">
          <div className="rounded-2xl bg-stone-50 p-4">
            Add content in Sanity Studio under the page builder field.
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            Use `exampleSlice` as the reference when you create your next slice.
          </div>
        </div>
      </div>
    </section>
  )
}
