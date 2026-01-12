import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Base path for GitHub Pages - matches repository name
  base: '/testing-feedback-january/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tokens': path.resolve(__dirname, './tokens'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});


