import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  }
})
