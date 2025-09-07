import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnqgntfrfuvlreqakoic.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

async function listBucketContents() {
  try {
    const { data, error } = await supabase.storage
      .from('app')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (error) throw error;
    
    console.log('Bucket contents:');
    console.log(JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error listing bucket contents:', error.message);
  }
}

listBucketContents();
