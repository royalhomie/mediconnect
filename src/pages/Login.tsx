import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The best healthcare experience I've ever had. The doctors are truly exceptional.",
    author: "Sarah Johnson",
    role: "Patient for 3 years"
  },
  {
    id: 2,
    quote: "Quick appointments and professional care. Highly recommended!",
    author: "Michael Chen",
    role: "New patient"
  },
  {
    id: 3,
    quote: "The online portal makes managing my health so much easier.",
    author: "Emma Wilson",
    role: "Patient for 1 year"
  }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn: login } = useAuth();
  const { toast } = useToast();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password, rememberMe);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Branding and Features */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-medical-blue to-medical-green p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Logo className="h-10 w-10" />
            <span className="text-2xl font-bold">DocLink</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-white/80">Sign in to access your personalized healthcare dashboard.</p>
        </div>
        
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-white/10 p-6 rounded-lg backdrop-blur-sm transition-opacity duration-500 ${
                index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            >
              <p className="italic">"{testimonial.quote}"</p>
              <p className="mt-2 font-medium">{testimonial.author}</p>
              <p className="text-sm text-white/70">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Logo className="h-10 w-10 text-medical-blue" />
              <span className="text-2xl font-bold text-gray-900">DocLink</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="text-muted-foreground">Enter your credentials to continue</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm font-medium text-medical-blue hover:underline"
                      onClick={(e) => isLoading && e.preventDefault()}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-me" 
                      checked={rememberMe}
                      onCheckedChange={() => setRememberMe(!rememberMe)}
                      disabled={isLoading}
                    />
                    <Label htmlFor="remember-me" className="text-sm font-medium leading-none">
                      Remember me
                    </Label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm font-medium text-medical-blue hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    type="button" 
                    disabled={isLoading}
                    className="h-10"
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button"
                    disabled={isLoading}
                    className="h-10"
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.108 0-.612.492-1.108 1.1-1.108s1.1.496 1.1 1.108c0 .612-.494 1.108-1.1 1.108zm8 6.891h-1.706v-3.6c0-.906-.241-1.4-1.082-1.4-.592 0-.988.4-1.1.8-.057.2-.05.5-.05.8v3.4h-1.7v-6h1.6v.9h.1c.2-.4.6-.9 1.3-1.2.8-.3 1.6-.2 2 .2.4.4.5.9.5 1.8v3.7z" />
                    </svg>
                    LinkedIn
                  </Button>
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-medical-blue hover:underline">
                  Sign up now
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-6 text-center space-y-3">
            <div className="text-xs text-gray-500">
              <p>Need help? <Link to="/contact" className="text-medical-blue hover:underline">Contact support</Link></p>
            </div>
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center text-sm text-medical-blue hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
