import react from '@vitejs/plugin-react';
import path from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    // @ts-expect-error - plugin type error due to multiple version of vite installed
    react(),
  ],
  test: {
    environment: 'jsdom',
    dir: './src/tests',
    exclude: ['e2e'],
    env: loadEnv('', process.cwd(), ''),
    coverage: {
      include: ['src'],
      reporter: 'text',
      exclude: ['src/tests', 'src/mocks'],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@sanity': path.resolve(__dirname, 'sanity'),
    },
  },
});
