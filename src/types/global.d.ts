/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_APP_ENV: 'development' | 'production' | 'test';
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  // Add any other global type declarations here
  interface Window {
    // Add any browser globals you need to access
  }
}

export {}; // This file needs to be a module
