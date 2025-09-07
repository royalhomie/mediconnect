import { Database as DatabaseGenerated } from '@/lib/database.types';

export type Database = DatabaseGenerated;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_ANON_KEY: string;
    }
  }
}
