import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  resolve: {alias: {'@': fileURLToPath(new URL('.', import.meta.url))}},
  test: {
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: 'testproject',
      NEXT_PUBLIC_SANITY_DATASET: 'production',
    },
  },
})
