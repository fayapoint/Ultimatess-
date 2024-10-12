import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Alias for the 'src' directory
    },
  },
  build: {
    outDir: 'build',  // Output directory for production build (change to 'build')
    rollupOptions: {
      // External dependencies if needed (empty for now)
      external: [],
    },
  },
  base: '/<repository-name>/',  // Replace <repository-name> with your GitHub repo name if deploying to GitHub Pages
});
