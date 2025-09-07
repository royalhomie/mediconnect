import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  
  return {
    base: isProduction ? '/app/' : '/',
    define: {
      'process.env': {
        ...env,
        NODE_ENV: mode,
        VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL || 'https://tnqgntfrfuvlreqakoic.supabase.co'),
        VITE_PUBLIC_URL: isProduction 
          ? JSON.stringify('https://tnqgntfrfuvlreqakoic.supabase.co/storage/v1/object/public/app') 
          : JSON.stringify('')
      },
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'MediConnect',
          short_name: 'MediConnect',
          description: 'Your Healthcare Booking Platform',
          theme_color: '#000000',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/app/index.html',
          icons: [
            {
              src: '/app/features/favicon_io/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/app/features/favicon_io/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    server: {
      port: 5173,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1].toLowerCase();
            if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'].includes(ext)) {
              return 'images/[name]-[hash][extname]';
            }
            if (ext === 'css') {
              return 'assets/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
  };
});
