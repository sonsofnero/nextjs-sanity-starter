# nextjs-sanity-starter

A neutral Next.js + Sanity starter with a typed page builder and a reusable component toolkit. It uses Next.js 16, Sanity 6, Tailwind CSS 4, GSAP, and pnpm workspaces.

## Getting started

1. Install Node 24 and pnpm 11.12.0. With Corepack available, run `corepack enable`.
2. Run `pnpm install` from the project root.
3. Copy `site/.env.example` to `site/.env.local` and `sanity/.env.example` to `sanity/.env`.
4. Set the copied environment values, site name in `site/lib/site.ts` and Site Settings, and Sanity project configuration.
5. Start the frontend with `pnpm dev:site` and Studio with `pnpm dev:sanity` in separate terminals.

Open `start-here/index.html` directly in a browser for the visual onboarding checklist.

## Where things live

- `site/app`: App Router routes, layouts, and route handlers only.
- `site/components`: reusable UI, media, Portable Text, animation, and page-builder slices.
- `site/lib`: site URL and fallback name.
- `site/sanity`: clients, queries, image helpers, preview integration, and generated types.
- `site/styles/foundations.css`: CSS-first Tailwind colors, radii, gutters, and responsive section spacing.
- `site/styles/typography.css`: local/Google font setup, body/heading font mappings, and responsive `text-*` typography utilities. `globals.css` imports both stylesheets and defines base styles.
- `sanity/src/schemaTypes`: Studio schemas, including `homePage`, `page`, `siteSettings`, the `exampleSlice` reference slice, and a Mux `videoSlice`.

The `@/*` alias resolves from `site/`. Use named imports directly from the owning file:

```tsx
import {ButtonLink} from '@/components/ui/buttonLink'
import {Container} from '@/components/ui/container'
```

The retained toolkit includes buttons, Container, SanityImage, Video, MuxVideo, PortableTextRenderer, CategoryPill, native disclosure accordions, and a controlled native-dialog Modal. These are useful starter entrypoints even when the example homepage does not import them. Draft mode, live preview, SEO, `/api/revalidate`, `robots.txt`, `sitemap.xml`, and the schema → query → generated props → slice registry flow remain part of the baseline.

## Checks

GitHub Actions verifies that generated Sanity types are committed, then runs lint, the Prettier check, and TypeScript for both workspaces — all without Sanity credentials. Vercel builds the website during deployment; run `pnpm check` locally before handing off changes.

- `pnpm check`: regenerate types, lint, check formatting, type-check, and build both workspaces.
- `pnpm check:deps`: inspect unused dependency candidates with fallow.
- `pnpm format`: format the repository with Prettier.

## Guides

- [New project setup checklist: Sanity + Vercel](docs/new-project-checklist.md)

- [Component toolkit and styling examples](docs/component-toolkit.md)
- [Add a slice](docs/how-to-add-a-slice.md)
- [Run TypeGen](docs/how-to-run-typegen.md)
- [Animation conventions](docs/architecture/animations.md)
