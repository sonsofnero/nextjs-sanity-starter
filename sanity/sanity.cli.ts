import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  deployment: {
    autoUpdates: false,
  },
  typegen: {
    enabled: true,
    path: '../site/sanity/queries/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: '../site/sanity/sanity.types.ts',
    overloadClientMethods: true,
    formatGeneratedCode: true,
  },
})
