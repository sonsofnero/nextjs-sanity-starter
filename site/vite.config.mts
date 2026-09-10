import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vite'

export default defineConfig({
  root: 'tests/fixtures',
  resolve: {alias: {'@': fileURLToPath(new URL('.', import.meta.url))}},
  css: {postcss: fileURLToPath(new URL('.', import.meta.url))},
  server: {host: '127.0.0.1', port: 4173, strictPort: true},
})
