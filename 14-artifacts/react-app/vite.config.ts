import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global test functions like `test` and `expect`
    environment: "jsdom", // Required for React component testing
  },
})
