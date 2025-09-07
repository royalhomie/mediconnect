import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User, Session, UserResponse } from '@supabase/supabase-js';
import { Profile, UserRole, UserPreferences } from '@/types/database.types';
import { supabase } from '@/lib/supabase';

interface UseAuthReturn {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string, userData: { full_name: string; role: UserRole }) => Promise<UserResponse>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<Profile>;
  refreshSession: () => Promise<Session | null>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      setProfile(profileData);
      return profileData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user profile',
        variant: 'destructive',
      });
      return null;
    }
  }, [toast]);

  // Handle auth state changes
  useEffect(() => {
    let mounted = true;
    let subscription: { unsubscribe: () => void } | null = null;

    const setupAuthListener = async () => {
      const { data: authData } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (!mounted) return;
          
          setLoading(true);
          const currentUser = session?.user ?? null;
          setUser(currentUser);
          setSession(session);

          if (currentUser) {
            await fetchUserProfile(currentUser.id);
          } else {
            setProfile(null);
          }
          setLoading(false);
        }
      );

      if (authData?.subscription) {
        subscription = { unsubscribe: authData.subscription.unsubscribe };
      }
    };

    // Get initial session
    const getInitialSession = async () => {
      if (!mounted) return;
      
      setLoading(true);
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession?.user) {
          if (mounted) {
            setUser(currentSession.user);
            await fetchUserProfile(currentSession.user.id);
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    setupAuthListener();
    getInitialSession();

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [fetchUserProfile]);

  const signIn = async (email: string, password: string, rememberMe = false): Promise<void> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user) {
        const userProfile = await fetchUserProfile(data.user.id);
        if (userProfile) {
          const role = userProfile.role || 'patient';
          const redirectPath = role === 'admin' 
            ? '/admin/dashboard' 
            : role === 'doctor' 
              ? '/doctor/dashboard' 
              : '/dashboard';
          
          navigate(redirectPath);
        }
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in. Please check your credentials.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name: string; role: UserRole }): Promise<UserResponse> => {
    try {
      setLoading(true);
      
      // Create auth user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            role: userData.role,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data?.user) {
        // Create profile in profiles table
        const now = new Date().toISOString();
        const profileData = {
          id: data.user.id,
          email: data.user.email || '',
          full_name: userData.full_name,
          phone: null,
          address: null,
          avatar_url: null,
          role: userData.role,
          preferences: {
            theme: 'system',
            notifications: { email: true, sms: false, push: true },
            language: 'en',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          last_sign_in_at: now,
          created_at: now,
          updated_at: now,
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(profileData);

        if (profileError) throw profileError;

        // Update local state with the full profile
        setProfile(profileData as unknown as Profile);
      }

      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setSession(null);
      
      navigate('/login');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign out',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update the user's profile
  const updateProfile = async (updates: Partial<Profile>): Promise<Profile> => {
    if (!user) throw new Error('Not authenticated');

    try {
      setLoading(true);
      
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };
      
      // Update in the database
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to update profile');

      // Update local state with the full profile
      const updatedProfile = {
        ...profile,
        ...data,
        updated_at: updateData.updated_at,
      } as Profile;
      
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Refresh the current session
  const refreshSession = async (): Promise<Session | null> => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        if (data.session.user) {
          await fetchUserProfile(data.session.user.id);
        }
        return data.session;
      }
      
      return null;
    } catch (error) {
      console.error('Error refreshing session:', error);
      await signOut();
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Send password reset email
  const resetPassword = async (email: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  };
  
  // Update the user's password using a reset token
  const updatePassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      setLoading(true);
      
      // First, verify the token
      const { data: { user }, error: tokenError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'recovery',
      });
      
      if (tokenError || !user) {
        throw new Error('Invalid or expired password reset link');
      }
      
      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (updateError) throw updateError;
      
      // Sign out the user after password reset for security
      await signOut();
      
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshSession,
    resetPassword,
    updatePassword,
  };
};

export default useAuth;
