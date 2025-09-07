import { createClient } from '@supabase/supabase-js';

type UserRole = 'patient' | 'doctor';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string | null;
  phone?: string | null;
  address?: string | null;
  created_at: string;
  updated_at: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Helper function to handle Supabase errors
const handleSupabaseError = (error: any, defaultMessage = 'An error occurred') => {
  console.error('Supabase Error:', error);
  throw new Error(error?.message || defaultMessage);
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) handleSupabaseError(error, 'Failed to fetch user profile');
  return data;
};

export const updateUserProfile = async (userId: string, updates: Partial<Omit<Profile, 'id' | 'email' | 'role' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) handleSupabaseError(error, 'Failed to update profile');
  return data as Profile | null;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) handleSupabaseError(error, 'Invalid login credentials');
  return data;
};

export const signUpWithEmail = async (email: string, password: string, userData: { full_name: string; role: 'patient' | 'doctor' }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: userData.full_name,
        role: userData.role,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) handleSupabaseError(error, 'Failed to create account');
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) handleSupabaseError(error, 'Failed to sign out');
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) handleSupabaseError(error, 'Failed to get session');
  return data.session;
};

export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};
