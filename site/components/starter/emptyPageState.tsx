interface EmptyPageStateProps {
  show?: boolean
  title: string
  description: string
}

/** Development and draft-mode aid only. Production visitors never see it. */
export function EmptyPageState({
  show = false,
  title,
  description,
}: EmptyPageStateProps) {
  if (!show) {
    return null
  }

  return (
    <section className="px-6 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-panel border border-border bg-surface p-8 shadow-sm md:p-12">
        <div className="space-y-3">
          <p className="text-eyebrow text-caption">Blank starter state</p>
          <h1 className="text-heading-2 font-semibold text-ink">{title}</h1>
          <p className="max-w-2xl text-body-large text-subtle">
            {description}
          </p>
        </div>
        <div className="grid gap-3 text-sm text-subtle md:grid-cols-2">
          <div className="rounded-2xl bg-canvas p-4">
            Add content in Sanity Studio under the page builder field.
          </div>
          <div className="rounded-2xl bg-canvas p-4">
            Use `exampleSlice` as the reference when you create your next slice.
          </div>
        </div>
      </div>
    </section>
  )
}
