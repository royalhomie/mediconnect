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

async function createBucket() {
  try {
    console.log('Creating bucket...');
    
    // Create the bucket
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('app', {
      public: true,
      allowedMimeTypes: ['image/*', 'text/*', 'application/javascript', 'application/json', 'font/*'],
      fileSizeLimit: 5242880, // 5MB
    });

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('Bucket already exists, updating CORS policy...');
      } else {
        throw bucketError;
      }
    } else {
      console.log('Bucket created successfully');
    }

    // Note: CORS settings need to be configured manually in the Supabase dashboard
    // Go to: https://app.supabase.com/project/tnqgntfrfuvlreqakoic/storage/settings/cors
    // Add the following origins:
    // - https://tnqgntfrfuvlreqakoic.supabase.co
    // - http://localhost:3000
    // - http://localhost:5173
    console.log('Please configure CORS settings in the Supabase dashboard:');
    console.log('https://app.supabase.com/project/tnqgntfrfuvlreqakoic/storage/settings/cors');
    console.log('Add these origins:');
    console.log('- https://tnqgntfrfuvlreqakoic.supabase.co');
    console.log('- http://localhost:3000');
    console.log('- http://localhost:5173');
    
  } catch (error) {
    console.error('Error setting up bucket:', error.message);
    process.exit(1);
  }
}

createBucket();
