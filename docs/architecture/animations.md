# Animation architecture

GSAP is the application animation library for this starter. Do not add Framer Motion or
`motion/react` without an explicit architecture change.

Use `ScrollReveal` for viewport-based entrance animation. It keeps GSAP in a focused client
boundary while allowing page-builder slices and data fetching to remain server-rendered.
Simple hover, focus, and color transitions should stay in CSS.

Every animation must provide a `prefers-reduced-motion` path. Content must be visible in the
server-rendered document and must not depend on JavaScript animation to become accessible.
