import path from 'node:path';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
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
