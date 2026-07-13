# How To Run TypeGen

This starter uses Sanity TypeGen to keep GROQ query result types aligned with the Studio schema.

## Commands

- `pnpm typegen:schema`: extracts the Studio schema into `sanity/schema.json`
- `pnpm typegen:generate`: generates `site/app/sanity/sanity.types.ts`
- `pnpm typegen`: runs both steps in order

## When To Run It

Run TypeGen any time you change:

- a Sanity schema
- a GROQ query or query fragment
- a page-builder projection
- a shared module projection

## Workflow

1. Make the schema and query changes.
2. Run `pnpm typegen`.
3. Update any frontend types or normalization helpers that need to reflect the new nullable output.
4. Run `pnpm type-check`.

## Notes

- The Sanity CLI config for TypeGen lives in `sanity/sanity.cli.ts`.
- Generated files should stay committed so the starter works out of the box.
