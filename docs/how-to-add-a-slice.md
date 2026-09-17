# How to add a slice

Keep the contract explicit: schema → GROQ projection → generated result type → component → registry. The `exampleSlice` is the working reference.

## Schema and query

1. Create the schema in `sanity/src/schemaTypes/objects/modules/content`, following `exampleSlice.ts`. Reuse `paddingFields` when the slice needs editor-controlled section spacing.
2. Register the schema in `sanity/src/schemaTypes/index.ts` and add it to the `of` array in `sanity/src/schemaTypes/objects/modules/pageBuilder.ts`.
3. Create its query fragment in `site/sanity/queries/modules/content`. Include `_type`, `_key`, and the fields the component consumes. Reuse `LINK_FRAGMENT`, `BUTTON_FRAGMENT`, `IMAGE_FRAGMENT`, and `PORTABLE_TEXT_FRAGMENT` from `site/sanity/queries/fragments.ts`; `exampleSlice` uses all four.
4. Import the fragment into `site/sanity/queries/pageBuilder.ts`. Update both the allowed `_type` filter and the projection; adding only the fragment will leave the new slice filtered out.
5. Run `pnpm typegen` so the generated page-query result includes the new slice.

## Component and registry

Create `site/components/slices/<sliceName>/<sliceName>.tsx` with a named export. Derive its props from generated query results using `SliceProps`; do not maintain a second handwritten CMS contract.

This copyable example uses the existing generated type:

```tsx
import {Container} from '@/components/ui/container'
import {PortableTextRenderer} from '@/components/portableText/portableTextRenderer'
import {getModulePadding} from '@/components/slices/padding'
import type {SliceProps} from '@/components/slices/sliceTypes'

export function ExampleSlice({heading, content, padding_top, padding_bottom}: SliceProps<'exampleSlice'>) {
  const {paddingTop, paddingBottom} = getModulePadding(padding_top, padding_bottom)
  if (!heading && !content?.length) return null

  return (
    <section className={`${paddingTop} ${paddingBottom}`}>
      <Container gutter>
        {heading && <h2 className="text-heading-2">{heading}</h2>}
        <PortableTextRenderer value={content} />
      </Container>
    </section>
  )
}
```

Replace the name and type discriminator for your new slice after TypeGen. Add the named import and `_type` key to `site/components/slices/sliceRegistry.ts`. Its explicit mapped type checks that every generated slice type has a compatible component. `PageBuilder` keeps each discriminator paired with its props through a generic dispatcher; avoid adding a second switch or registry.

Keep the slice server-rendered. Put event handlers and state in a focused client component; use the [toolkit](component-toolkit.md) for FAQ and modal interactions. Optional viewport entrance animation uses the named `ScrollReveal` import from `@/components/animation/scrollReveal`.

## Verify

Run `pnpm check`, then `pnpm test:browser` if interactions changed. Check the slice in Studio and on the page with empty and populated optional fields. Sanity results can be nullable even when a field has editor validation; normalize or guard data at the component boundary. Use `stegaClean` before interpreting decorated string values as class-map keys or other logic.

For an insert-menu thumbnail, add `sanity/static/<sliceName>.png` and the type name to `SLICE_PREVIEWS` in `pageBuilder.ts`; without one the slice shows its icon.
