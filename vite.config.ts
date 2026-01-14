import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isTest = mode === 'test';
  
  return {
    // Base path for GitHub Pages - matches repository name
    // Use root path for test builds
    base: isTest ? '/' : '/testing-feedback-january/',
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
    preview: {
      port: 4173,
      strictPort: false,
    },
    build: {
      outDir: 'docs',
      assetsDir: 'assets',
    },
  };
});


