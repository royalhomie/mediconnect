import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for OTP verification
        const { data: { user }, error: authError } = await supabase.auth.verifyOtp({
          token_hash: searchParams.get('token_hash') || '',
          type: 'email',
        });

        if (authError) throw authError;

        if (user) {
          // Get the user's role from their profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          if (profileError) throw profileError;

          setStatus('success');
          toast({
            title: 'Email verified!',
            description: 'Your email has been successfully verified.',
          });

          // Redirect based on user role
          setTimeout(() => {
            navigate(profile?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
          }, 2000);
        } else {
          throw new Error('No user found in session');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setError(error instanceof Error ? error.message : 'Failed to verify email');
        
        toast({
          title: 'Verification Error',
          description: 'The verification link is invalid or has expired. Please request a new one.',
          variant: 'destructive',
        });
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  const handleResendEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: searchParams.get('email') || '',
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      toast({
        title: 'Email resent!',
        description: 'Please check your email for the verification link.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resend verification email. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">Verifying your email...</h2>
            <p className="text-center text-sm text-gray-500">
              Please wait while we verify your email address.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-xl font-semibold">Email Verified!</h2>
            <p className="text-center text-sm text-gray-500">
              Your email has been successfully verified. Redirecting you to your dashboard...
            </p>
            <Button
              variant="link"
              onClick={() => navigate('/')}
              className="mt-4"
            >
              Go to Home
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h2 className="text-xl font-semibold">Verification Failed</h2>
            <p className="text-center text-sm text-gray-500">
              {error || 'The verification link is invalid or has expired.'}
            </p>
            <div className="mt-4 flex space-x-4">
              <Button onClick={handleResendEmail}>
                Resend Verification Email
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
