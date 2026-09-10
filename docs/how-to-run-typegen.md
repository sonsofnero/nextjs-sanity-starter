# How to run TypeGen

Sanity TypeGen keeps GROQ result types aligned with the Studio schema.

- `pnpm typegen:schema` extracts `sanity/schema.json`.
- `pnpm typegen:generate` generates `site/sanity/sanity.types.ts`.
- `pnpm typegen` runs both steps in order.

Run it whenever a schema, query fragment, or page-builder projection changes. The configuration lives in `sanity/sanity.cli.ts` and scans the frontend query files under `site/sanity`. Keep generated files committed; never hand-edit them.

1. Update schema registration and query projections together.
2. Run `pnpm typegen`.
3. Update components for the generated nullable output.
4. Run `pnpm type-check`, or `pnpm check` for the complete unit-test, lint, type-check, and build pipeline.

Import generated query types directly when needed:

```ts
import type {HOME_PAGE_QUERY_RESULT} from '@/sanity/sanity.types'
import type {SliceProps} from '@/components/slices/sliceTypes'

type HomePage = NonNullable<HOME_PAGE_QUERY_RESULT>
type ExampleSliceProps = SliceProps<'exampleSlice'>
```

`SliceProps` extracts a specific `_type` from generated page-query modules. Add the query projection and regenerate before using a new discriminator. The slice registry then checks coverage against that generated union.
