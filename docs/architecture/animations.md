# Animation architecture

Use CSS in `site/styles/foundations.css` or component utilities for simple hover, focus, and color transitions. GSAP handles viewport entrance animation through `site/components/animation/scrollReveal.tsx`; Framer Motion is not included.

```tsx
import {ScrollReveal} from '@/components/animation/scrollReveal'

export function SectionContent() {
  return (
    <ScrollReveal className="mx-auto max-w-4xl" y={24} duration={0.6}>
      <h2 className="typography-heading-2">Section heading</h2>
    </ScrollReveal>
  )
}
```

Keep fetching and slices in Server Components. `ScrollReveal` owns the client boundary, scoped GSAP setup, ScrollTrigger, and cleanup. Its optional props are `as` (`div` or `section`), `y`, `duration`, `delay`, and `start`.

Content is visible in server-rendered HTML and without JavaScript. The wrapper respects `prefers-reduced-motion`, clears animation styles in that mode, and reverts its GSAP context on updates or unmount. Preserve that behavior when adding animation. Test reduced-motion settings and navigation cleanup as well as the visual effect.

Accordion uses native disclosure behavior and Modal uses native dialog behavior; neither needs GSAP to function. See the [component toolkit](../component-toolkit.md) for their interaction contracts.
