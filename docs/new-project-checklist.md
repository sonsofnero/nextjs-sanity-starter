# New project checklist

Default setup: **website on Vercel, Studio hosted by Sanity**. Run commands from the repository root unless noted.

## 1. Create your project repository

- [ ] Save the finished starter changes before copying or using it as a GitHub template; uncommitted changes are not included in a template or clone.
- [ ] Create a new repository from the starter and clone it into a new folder.
- [ ] Install Node 24 and enable Corepack with `corepack enable`. The repository pins pnpm 11.12.0.
- [ ] Run `pnpm install`.

Keep the workspace package names initially: root scripts refer to `starter-site` and `starter-sanity`.

## 2. Create the Sanity project

- [ ] In [Sanity Manage](https://www.sanity.io/manage), create a project in the correct client/team organization.
- [ ] Create a dataset named `production`. Use public visibility for ordinary public website content; choose private if the project requires restricted published data.
- [ ] Copy the project ID.
- [ ] Under the project's API settings, create a **Viewer** token for draft previews. Save it for `SANITY_API_READ_TOKEN`; do not use an Editor token. [Token setup](https://www.sanity.io/docs/nextjs/configure-sanity-client-nextjs).
- [ ] Add CORS origins `http://localhost:3333` and `http://localhost:3000`, allowing credentials for Studio and authenticated preview. [CORS settings](https://www.sanity.io/docs/content-lake/cors).
- [ ] If the project uses video: in the Studio, open any Video slice and enter Mux API credentials when the Mux plugin prompts. Skip otherwise; remove `videoSlice` and `sanity-plugin-mux-input` if the project never needs video.

This repository already contains Studio. You do not need to scaffold another Studio with `sanity init`.

## 3. Configure local environments

- [ ] Copy the example files:

```sh
cp site/.env.example site/.env.local
cp sanity/.env.example sanity/.env
```

- [ ] Fill in `site/.env.local`:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_READ_TOKEN=your_viewer_token
```

- [ ] Fill in `sanity/.env`:

```dotenv
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
```

Keep tokens in the site's unprefixed environment variables, never in `NEXT_PUBLIC_*` or `SANITY_STUDIO_*` variables. The copied files are gitignored. `SANITY_REVALIDATION_SECRET` is optional. Sanity Live already refreshes content while a visitor has the page open; the webhook covers the case where nobody does. To enable it, generate a long random secret, set it in Vercel, and create a webhook in Sanity Manage (API → Webhooks) that POSTs to `https://your-domain/api/revalidate` on create, update, and delete with that secret.

## 4. Confirm the starter works locally

- [ ] Run `pnpm dev:site` and `pnpm dev:sanity` in separate terminals.
- [ ] Seed starter content: `SEED_CONFIRM_PROJECT_ID=your_project_id pnpm seed` (safe to re-run; never overwrites). Or create the Home Page and Site Settings by hand in Studio.
- [ ] Open Site Settings in Studio, set the site name, and publish.
- [ ] Add an Example Slice, fill it in, and publish.
- [ ] Check the website at `http://localhost:3000`.
- [ ] Open Studio's Presentation tool. Change a draft and confirm the preview updates; confirm unpublished edits do not appear on the normal published website.

## 5. Make it your project

- [ ] Update site metadata in `site/app/layout.tsx`, the favicon, and the title/logo in `sanity/sanity.config.ts`.
- [ ] Customize fonts and typography in `site/styles/typography.css`; customize colors, spacing, and radii in `site/styles/foundations.css`.
- [ ] Build your first slice using [the slice checklist](how-to-add-a-slice.md).
- [ ] Run `pnpm check`.
- [ ] Install the browser once with `pnpm --filter starter-site exec playwright install chromium`, then run `pnpm test:browser`.
- [ ] Commit and push the project, including the lockfile and generated Sanity types. GitHub Actions runs tests, lint, and TypeScript; no Sanity secrets or variables are needed in GitHub.

## 6. Deploy Studio to Sanity

- [ ] Run `pnpm --filter starter-sanity exec sanity login`.
- [ ] Run `pnpm --filter starter-sanity deploy` and choose a unique Studio hostname.
- [ ] Record the resulting `https://your-project.sanity.studio` URL. If the CLI saves a deployment app ID, commit that configuration.
- [ ] Confirm this Studio URL is allowed in Sanity CORS with credentials.

Sanity's deploy command builds and hosts Studio; rerun it after Studio/schema changes. [Studio hosting](https://www.sanity.io/docs/studio/deployment).

## 7. Deploy the website to Vercel

- [ ] Import the new Git repository into the correct Vercel team.
- [ ] Configure the project:

| Setting                              | Value                             |
| ------------------------------------ | --------------------------------- |
| Framework                            | Next.js                           |
| Root Directory                       | `site`                            |
| Node.js                              | 24.x                              |
| Install Command                      | Automatic pnpm install            |
| Build Command                        | `pnpm build` (runs inside `site`) |
| Output Directory                     | Next.js default                   |
| Include files outside Root Directory | Enabled for workspace files       |

- [ ] Add these environment variables for Production and, if needed, trusted Preview deployments:

```dotenv
ENABLE_EXPERIMENTAL_COREPACK=1
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-project.sanity.studio
NEXT_PUBLIC_SITE_URL=https://your-website-domain
SANITY_API_READ_TOKEN=your_viewer_token
```

- [ ] Deploy. Confirm the build log uses the repository's pinned pnpm version.

Vercel supports selecting a workspace as the [project root](https://vercel.com/docs/monorepos/monorepo-faq). Enable [Corepack](https://vercel.com/docs/builds/configure-a-build#corepack) so the root `packageManager` setting controls pnpm.

## 8. Connect production and finish

- [ ] Add the website's domain in Vercel and configure the DNS records Vercel provides.
- [ ] Add the actual website origin to Sanity CORS for authenticated preview. Add only preview origins you control, not a platform-wide `*.vercel.app` wildcard.
- [ ] Create `sanity/.env.production.local` with `SANITY_STUDIO_PREVIEW_URL=https://your-website-domain`. This keeps local Studio pointed at localhost while deployed Studio previews production.
- [ ] Redeploy Studio with `pnpm --filter starter-sanity deploy`.
- [ ] Confirm Vercel's `NEXT_PUBLIC_SANITY_STUDIO_URL` matches the deployed Studio; redeploy the website if you change its environment variables.
- [ ] Before launch, turn off **Hide the entire site from search engines** in Site Settings.
- [ ] Verify production pages, images, links, mobile layout, Studio login, draft preview, publishing, and exiting draft mode. If Vercel deployment protection blocks the preview iframe, configure access for the intended editors.
- [ ] Invite the client/editors to the Sanity project with the appropriate roles and share the Studio URL.

You are ready to build. Website pushes deploy through Vercel; Studio changes deploy through the Sanity command above.
