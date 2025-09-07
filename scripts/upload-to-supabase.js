import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import 'dotenv/config';

// Initialize Supabase client
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

// Directory to upload
const uploadDir = './dist';
const bucketName = 'app';

// Function to get content type based on file extension
function getContentType(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  const types = {
    // HTML
    'html': 'text/html',
    'htm': 'text/html',
    
    // Styles
    'css': 'text/css',
    'scss': 'text/x-scss',
    'sass': 'text/x-sass',
    
    // Scripts
    'js': 'application/javascript',
    'mjs': 'application/javascript',
    'jsx': 'text/jsx',
    'ts': 'text/typescript',
    'tsx': 'text/tsx',
    
    // JSON
    'json': 'application/json',
    'webmanifest': 'application/manifest+json',
    
    // Images
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    'ico': 'image/x-icon',
    
    // Fonts
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'eot': 'application/vnd.ms-fontobject',
    'otf': 'font/otf',
    
    // Text
    'txt': 'text/plain',
    'md': 'text/markdown',
    'csv': 'text/csv',
    
    // Archives
    'zip': 'application/zip',
    'gz': 'application/gzip',
    'tar': 'application/x-tar',
    
    // Documents
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  };
  
  return types[ext] || 'application/octet-stream';
}

// Function to upload a file
async function uploadFile(filePath) {
  try {
    const fileContent = readFileSync(filePath);
    // Convert to relative path and normalize slashes
    const relativePath = relative(uploadDir, filePath).replace(/\\/g, '/');
    const contentType = getContentType(filePath);
    
    console.log(`Uploading ${relativePath} (${contentType})...`);
    
    // Try to upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(relativePath, fileContent, {
        contentType,
        cacheControl: 'public, max-age=31536000, immutable',
        upsert: true,
      });

    if (uploadError) {
      // If file exists, try to update it
      if (uploadError.message.includes('The resource already exists')) {
        console.log(`Updating existing file: ${relativePath}`);
        const { error: updateError } = await supabase.storage
          .from(bucketName)
          .update(relativePath, fileContent, {
            contentType,
            cacheControl: 'public, max-age=31536000, immutable',
            upsert: true,
          });
        
        if (updateError) {
          console.error(`Error updating ${relativePath}:`, updateError.message);
          throw updateError;
        }
        console.log(`Updated ${relativePath}`);
      } else {
        throw uploadError;
      }
    } else {
      console.log(`Successfully uploaded ${relativePath}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Recursive function to process directory
async function processDirectory(directory) {
  try {
    const files = readdirSync(directory);
    
    for (const file of files) {
      // Skip .DS_Store and other hidden files
      if (file.startsWith('.')) {
        continue;
      }
      
      const fullPath = join(directory, file);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        await processDirectory(fullPath);
      } else {
        await uploadFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error.message);
  }
}

// Start the upload process
async function main() {
  console.log('Starting upload to Supabase Storage...');
  
  try {
    // First, ensure the bucket exists
    const { data: bucket, error: bucketError } = await supabase.storage.getBucket(bucketName);
    
    if (bucketError) {
      if (bucketError.message.includes('not found')) {
        console.log(`Creating bucket ${bucketName}...`);
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true,
          allowedMimeTypes: ['image/*', 'text/*', 'application/javascript', 'application/json', 'font/*'],
          fileSizeLimit: 1024 * 1024 * 5, // 5MB
        });
        
        if (createError) {
          throw createError;
        }
        console.log(`Bucket ${bucketName} created successfully`);
      } else {
        throw bucketError;
      }
    }
    
    // Process all files in the dist directory
    await processDirectory(uploadDir);
    
    // Get public URL for the main page
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl('index.html');
    
    console.log('\nUpload completed successfully!');
    console.log('Your app is available at:');
    console.log(publicUrl);
    
  } catch (error) {
    console.error('Upload failed:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
