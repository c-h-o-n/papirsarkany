import react from '@vitejs/plugin-react';
import path from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    //@ts-ignore
    react(),
  ],
  test: {
    environment: 'jsdom',
    dir: './src/tests/unit',
    env: loadEnv('', process.cwd(), ''),

    coverage: {
      include: ['src'],
      reporter: 'text',
      exclude: ['src/tests'],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@sanity': path.resolve(__dirname, 'sanity'),
    },
  },
});
