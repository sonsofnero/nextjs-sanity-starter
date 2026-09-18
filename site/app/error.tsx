'use client'

import {useEffect} from 'react'

import {Button} from '@/components/ui/button'
import {Container} from '@/components/ui/container'

export default function RouteError({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="section-padding-top-160 section-padding-bottom-160">
      <Container gutter className="flex flex-col items-start gap-6">
        <h1 className="text-heading-2 text-ink">Something went wrong</h1>
        <p className="text-body-primary text-subtle">
          Try again. If the problem continues, come back in a few minutes.
        </p>
        <Button onClick={reset}>Try again</Button>
      </Container>
    </section>
  )
}
