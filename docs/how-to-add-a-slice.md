# How To Add A Slice

This starter keeps the slice contract explicit: copy the `exampleSlice` pattern, then wire each new slice through schema, GROQ, and React.

Use the existing example as your map:

- Schema: `sanity/src/schemaTypes/objects/modules/content/exampleSlice.ts`
- Query: `site/app/sanity/queries/modules/content/exampleSlice.ts`
- Component: `site/app/components/slices/exampleSlice/exampleSlice.tsx`

## Studio

1. Create the schema in `sanity/src/schemaTypes/objects/modules/content`.
2. Export it from `sanity/src/schemaTypes/index.ts`.
3. Add it to the `of` array in `sanity/src/schemaTypes/objects/modules/pageBuilder.ts`.

## Frontend

1. Create the query fragment in `site/app/sanity/queries/modules/content`.
2. Add the fragment to `site/app/sanity/queries/pageBuilder.ts`.
3. Create the slice component in `site/app/components/slices/<sliceName>`.
4. Register the component in `site/app/components/slices/sliceRegistry.ts`.

## Type Safety

1. Run `pnpm typegen` after schema or query changes.
2. Use the generated types from `site/app/sanity/sanity.types.ts` where they improve clarity.
3. Normalize nullable Sanity data at the page or component boundary instead of pushing null handling deep into the tree.

## Notes

- Prefer the simplest direct implementation first.
- Keep schema names, query fragment names, and slice component names aligned.
- Keep slice fields boring and explicit until a second real slice proves a shared abstraction is worth it.
- Avoid adding a new abstraction until repeated slice work proves it is necessary.
- For viewport entrance animation, wrap the slice's inner container with `ScrollReveal`; keep the slice server-rendered and use CSS for simple hover and focus transitions.
