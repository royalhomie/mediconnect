# Supabase Setup Guide

This guide will help you set up Supabase for the DocLink Schedule application.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up/log in
2. Click on "New Project"
3. Fill in your project details:
   - Name: `doclink-schedule` (or your preferred name)
   - Database Password: (generate a strong password and save it somewhere safe)
   - Region: Choose a region closest to your users
4. Click "Create new project"

## 2. Set Up Database Schema

1. In the Supabase dashboard, go to the SQL Editor
2. Click "New Query"
3. Copy the contents of `supabase/migrations/20250101000000_initial_schema.sql`
4. Paste it into the SQL editor and click "Run"

## 3. Configure Authentication

1. Go to Authentication > URL Configuration
2. Add your site URL to the "Site URL" field (e.g., `http://localhost:5173` for development)
3. Add `http://localhost:5173/auth/callback` to the "Redirect URLs"
4. Save your changes

## 4. Get API Keys

1. Go to Project Settings > API
2. Copy the following values:
   - Project URL (will be used as `VITE_SUPABASE_URL`)
   - `anon` public key (will be used as `VITE_SUPABASE_ANON_KEY`)

## 5. Configure Environment Variables

Create a `.env` file in the root of your project with the following content:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholders with the values from step 4.

## 6. Enable Email Authentication

1. Go to Authentication > Providers
2. Enable "Email" provider
3. Configure email templates if needed
4. Save your changes

## 7. Set Up Storage (Optional)

If you want to allow profile picture uploads:

1. Go to Storage > Policies
2. Click "New Policy"
3. Select "Create a policy from template"
4. Choose "Enable read access for all users"
5. Create another policy with "Enable insert access for authenticated users only"
6. Create another policy with "Enable update access for authenticated users only"

## 8. Test Your Setup

1. Start your development server: `npm run dev`
2. Try to sign up for a new account
3. Verify that you can log in and access protected routes

## Troubleshooting

- If you get CORS errors, make sure to add your local development URL to the allowed CORS origins in Supabase (Project Settings > API)
- If you have issues with authentication, check the browser console and network tab for errors
- Make sure your environment variables are correctly set and the Supabase URL and anon key are correct

## Deployment

When deploying to production:

1. Update the site URL and redirect URLs in Supabase to match your production domain
2. Set up a custom domain in Supabase if needed
3. Consider enabling additional security features like rate limiting and row-level security (RLS) policies
