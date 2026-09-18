import {ButtonLink} from '@/components/ui/buttonLink'
import {Container} from '@/components/ui/container'

export default function NotFound() {
  return (
    <section className="section-padding-top-160 section-padding-bottom-160">
      <Container gutter className="flex flex-col items-start gap-6">
        <p className="text-eyebrow text-caption">404</p>
        <h1 className="text-heading-2 text-ink">Page not found</h1>
        <p className="text-body-primary text-subtle">
          The page you are looking for has moved or no longer exists.
        </p>
        <ButtonLink href="/">Back to home</ButtonLink>
      </Container>
    </section>
  )
}
