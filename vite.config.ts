/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import removeAttribute from '@castlenine/vite-remove-attribute';


const IS_PRODUCTION = process.env.NODE_ENV == 'production';


export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  publicDir: 'src/public',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    IS_PRODUCTION && removeAttribute({
      extensions: ['tsx', 'jsx', 'ts', 'js'],
      attributes: ['data-testid', 'data-id'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '__tests__/setup.ts',
  },
});