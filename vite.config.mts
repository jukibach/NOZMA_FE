import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// Different modes:
// npm run build -- --mode staging
// npm run preview
export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: 'build',
    },
    server: {
      port: 8081,
    },
    plugins: [react(), tsconfigPaths()],
  }
})
