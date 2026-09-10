# Component toolkit

Reusable frontend code lives under `site/components`; `site/app` holds routes and layouts. The `@/*` alias resolves to `site/`. Use camelCase filenames and named imports from each component's file, including in slices. React component identifiers remain PascalCase for JSX. There is no shared barrel to couple unrelated components or client boundaries.

## Styling foundations

Customize `site/styles/foundations.css` first. Tailwind 4 reads its CSS `@theme` tokens and `@utility` declarations through `site/styles/globals.css`; no JavaScript theme configuration is needed. Tokens cover fonts, semantic colors, panel radius, and gutters. Typography utilities and explicit top/bottom section-padding utilities provide reusable responsive defaults.

```css
/* Edit the existing @theme block in site/styles/foundations.css. */
@theme {
  --color-canvas: #fafaf9;
  --color-ink: #0c0a09;
  --radius-panel: 2rem;
}
```

```tsx
import {Container} from '@/components/ui/container'

export function Introduction() {
  return (
    <section className="bg-canvas text-ink section-padding-top-80 section-padding-bottom-80">
      <Container gutter className="rounded-panel bg-surface p-6">
        <h1 className="typography-heading-1">A new project</h1>
        <p className="typography-body-primary">Start with the foundations.</p>
      </Container>
    </section>
  )
}
```

For Sanity-controlled spacing use `getModulePadding` from `@/components/slices/padding`. It maps supported values to literal utility names and supplies defaults; avoid constructing arbitrary Tailwind class names from CMS strings.

## Core components

```tsx
import {Button} from '@/components/ui/button'
import {ButtonLink} from '@/components/ui/buttonLink'
import {Container} from '@/components/ui/container'
import {CategoryPill} from '@/components/ui/categoryPill'
import {SanityImage} from '@/components/media/sanityImage'
import {Video} from '@/components/media/video'
import {PortableTextRenderer} from '@/components/portableText/portableTextRenderer'
```

- `Button` renders a native button and defaults to `type="button"`. Set `type="submit"` for forms. `ButtonLink` renders Next.js `Link` for navigation. Both accept `variant="primary"`, `"secondary"`, or `"outline"`, plus native props and `className`.
- `Container` renders a centered div. `size` is `content` (default), `header`, or `wide`. Gutters are opt-in with `gutter`, useful when a surrounding section does not already supply horizontal padding.
- `CategoryPill` renders a span with a required `label`; it has no navigation or selection behavior.
- `SanityImage` takes a Sanity `image` source and required `alt`. Missing or invalid images render nothing. It derives dimensions, honors crop/hotspot through the Sanity URL builder, and passes image props through to Next.js Image. Supply accurate `sizes`; `fill` requires a positioned parent with dimensions.
- `Video` is a native video with controls enabled by default. Pass video props and track/source children as needed.
- `PortableTextRenderer` accepts nullable `value`, `className`, and optional `components` overrides. Overrides merge with the existing block, list, mark, and custom-type mappings.

```tsx
<Button disabled>Save</Button>
<ButtonLink href="/about" variant="outline">About</ButtonLink>
<CategoryPill label="News" />
<Video src="/intro.mp4" preload="metadata" aria-label="Introduction" />
```

With `image` and `body` from your typed Sanity query:

```tsx
<SanityImage image={image} alt="Describe the image" width={1200} sizes="(min-width: 768px) 50vw, 100vw" />
<PortableTextRenderer value={body} />
```

## FAQ and modal

```tsx
'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Accordion, AccordionItem} from '@/components/ui/accordion/accordion'
import {Modal} from '@/components/ui/modal/modal'

export function Questions() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Accordion mode="single">
        <AccordionItem title="How do I start?" defaultOpen>
          <p>Install dependencies and configure your environment files.</p>
        </AccordionItem>
        <AccordionItem title="Where are the styles?">
          <p>Edit site/styles/foundations.css.</p>
        </AccordionItem>
      </Accordion>
      <Button onClick={() => setOpen(true)}>More information</Button>
      <Modal open={open} onOpenChange={setOpen} title="More information" description="Project setup details">
        <p>Use the README to work through setup.</p>
      </Modal>
    </>
  )
}
```

`AccordionItem` uses native `details` and `summary`, preserving keyboard and disclosure behavior before hydration and without JavaScript. `Accordion` defaults to `mode="single"`, grouping items with a shared native name. Use `mode="multiple"` to allow independent open items. `defaultOpen` sets the initial state; this is an uncontrolled disclosure, so do not use it as a controlled `open` prop. Only one item should start open in a single group. Use `summaryClassName` and `contentClassName` for styling.

`Modal` is controlled: own `open` in the caller and respond to `onOpenChange`. It calls native `dialog.showModal()`, labels the dialog with `title` and optional `description`, and includes a close button. Escape requests closure. Backdrop dismissal is opt-in with `closeOnBackdropClick`; pressing inside and releasing outside does not count as a backdrop click.

Native dialog behavior contains focus while open. The wrapper restores the previously focused connected element when appropriate on close and locks page scrolling while dialogs are open, releasing the lock after the last owner closes. Keep an accessible trigger and meaningful title. Use this focused client boundary inside otherwise server-rendered content.

## Verification and intentional entrypoints

Run `pnpm test` for unit/rendering checks and `pnpm test:browser` for actual browser interaction behavior. `pnpm check` also regenerates types, lints, type-checks, and builds both workspaces; browser tests are separate.

The example homepage demonstrates the slice contract rather than every component. Toolkit modules remain deliberate direct-import entrypoints for new projects even if no current route imports them. An unused-code report is evidence for review, not authority to delete those modules.
