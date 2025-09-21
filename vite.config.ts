import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Gestion Commandes Poulet',
        short_name: 'Poulet',
        description: 'Application de gestion des commandes de poulets',
        theme_color: '#fa8072',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/poulet/',
        scope: '/poulet/',
        orientation: 'portrait',
        icons: [
          {
            src: '/poulet/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/poulet/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  base: process.env.NODE_ENV === 'production' ? '/poulet/' : '/',
});
