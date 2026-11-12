import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  // "/" for a real domain. The GitHub Pages demo builds with
  // BASE_PATH=/Samantha-Hairdressing-website-demo/ (see .github/workflows/pages.yml).
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    // Photos live in public/media and are served as-is.
    target: 'es2020',
  },
});
