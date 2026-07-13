# nextjs-sanity-starter

Minimal Next.js + Sanity starter for spinning up a new project with a page-builder baseline.

The starter uses Next.js 16, Sanity 6, pnpm workspaces, and GSAP. Framer Motion is intentionally not included.

## Apps

- `site`: Next.js frontend with a neutral layout, Sanity wiring, and one example slice.
- `sanity`: Sanity Studio with `homePage`, `page`, and the matching page-builder schema.

## Getting started

1. Install Node 24 and pnpm 11.12.0. With Corepack available, run `corepack enable`.
2. Run `pnpm install` from the project root.
3. Copy `site/.env.example` to `site/.env.local`.
4. Copy `sanity/.env.example` to `sanity/.env`.
5. Update the copied env values, site metadata, and Sanity project configuration for the new project.
6. Start the apps with `pnpm dev:site` and `pnpm dev:sanity`.

Run `pnpm check` before opening a pull request. It regenerates Sanity types, lints and type-checks the workspaces, and builds both the Next.js app and Sanity Studio.

## Visual guide

- Open `start-here/index.html` directly in your browser for a styled onboarding checklist that explains the repo layout, setup order, and first cleanup pass.

## What stays on purpose

- A single `exampleSlice` demonstrates the full slice contract across schema, query, and React component layers.
- The frontend keeps `components`, `config`, `utils`, and `sanity` inside `site/app` while preserving the `@/...` aliases.
- Draft mode, live preview wiring, and the page-builder renderer remain in place so new projects do not need to rediscover that setup.
- GSAP is isolated behind `components/animation/ScrollReveal.tsx` so slices remain Server Components.

## What was intentionally removed

- Branded layout chrome such as the inherited header, footer, and modal shell.
- Project-specific content models such as articles, navigation settings, shared modules, testimonials, FAQ, and team members.
- The full production slice catalog in the active registry. Only one example slice is wired into the starter now.

## Notes

- See `docs/how-to-add-a-slice.md` for the expected slice workflow.
- See `docs/how-to-run-typegen.md` for the TypeGen workflow.
- See `docs/architecture/animations.md` for animation conventions.
