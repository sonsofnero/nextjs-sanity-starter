import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vite'

export default defineConfig({
  root: 'tests/fixtures',
  define: {
    'process.env': JSON.stringify({
      NODE_ENV: 'development',
      NEXT_PUBLIC_SANITY_DATASET: 'production',
      NEXT_PUBLIC_SANITY_PROJECT_ID: 'testproject',
    }),
  },
  resolve: {alias: {'@': fileURLToPath(new URL('.', import.meta.url))}},
  css: {postcss: fileURLToPath(new URL('.', import.meta.url))},
  server: {host: '127.0.0.1', port: 4173, strictPort: true},
})
