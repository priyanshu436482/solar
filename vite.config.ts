import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

// See vite.base.ts in the classic template for the full rationale. Short
// version: BB_SPRITE_PREVIEW=1 is exported by the platform when it starts Vite
// on a sprite, and devtools is a local-dev affordance that only adds moving
// parts to an iframe preview. BB_IGNORED_DIRS backs the server.watch predicate,
// which keeps the watcher off the state miniflare and the TanStack router
// generator write into the repo root while dev is running.
const SPRITE_PREVIEW = process.env.BB_SPRITE_PREVIEW === '1'

const BB_IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'test-results',
  '.wrangler',
  '.tanstack',
  '.vite',
  '.turbo',
  'dist',
  '.output',
  '.nitro',
])

export default defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    // Vite APPENDS these to its own chokidar defaults rather than replacing
    // them. The predicate is the chokidar-4 fallback: v4 dropped glob support,
    // which would silently turn every string here into a no-op.
    watch: {
      ignored: [
        '**/.git/**',
        '**/node_modules/**',
        '**/test-results/**',
        '**/.wrangler/**',
        '**/.tanstack/**',
        '**/.vite/**',
        '**/.turbo/**',
        '**/dist/**',
        '**/.output/**',
        '**/.nitro/**',
        (p) => p.split('/').some((seg) => BB_IGNORED_DIRS.has(seg)),
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'chunks/[name]-[hash][extname]',
      },
    },
  },
  plugins: [
    ...(SPRITE_PREVIEW ? [] : [devtools()]),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})
