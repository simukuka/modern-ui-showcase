import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` must match the GitHub Pages repository name.
// Change it to '/' if you deploy to a custom domain (e.g. shaarzcosmetics.com) or Netlify/Vercel.
export default defineConfig({
  base: '/modern-ui-showcase/',
  plugins: [react()],
});
