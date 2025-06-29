import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Generate service worker and manifest
    rollupOptions: {
      input: {
        main: './index.html',
        sw: './public/sw.js'
      }
    }
  },
  server: {
    // Enable HTTPS for PWA testing in development
    https: false, // Set to true if you have SSL certificates
    host: true, // Allow external connections for mobile testing
  }
});