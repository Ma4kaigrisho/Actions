import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8", // Enables coverage reporting
      reporter: ["text", "lcov"], // Generates reports in different formats
    },
  },
});
