import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'

import {Logo} from './src/components/icons/Logo'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Starter Studio',
  icon: Logo,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({structure}),
    media(),
    muxInput(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  basePath: '/',
})
