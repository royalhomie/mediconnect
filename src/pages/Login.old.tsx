import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Clock, Stethoscope, CalendarCheck, MessageSquareQuote, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
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

const features: Feature[] = [
  {
    icon: <Clock className="h-6 w-6 text-medical-blue" />,
    title: "24/7 Access",
    description: "Book appointments anytime, anywhere"
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-medical-blue" />,
    title: "Secure & Private",
    description: "Your health data is always protected"
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-medical-blue" />,
    title: "Expert Doctors",
    description: "Board-certified healthcare professionals"
  },
  {
    icon: <CalendarCheck className="h-6 w-6 text-medical-blue" />,
    title: "Easy Scheduling",
    description: "Book appointments in just a few clicks"
  }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: signIn } = useAuth();
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
      await signIn(email, password);
      // Navigate to the intended page or default to dashboard
      navigate(from, { replace: true });
      
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
    } catch (error: any) {
      console.error('Login error:', error);
      
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid email or password',
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
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-white/20 [mask-image:linear-gradient(0deg,transparent,white)]" />
        
        {/* Logo and Tagline */}
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Logo className="h-10 w-10" />
            <span className="text-2xl font-bold">DocLink</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-white/80">Sign in to access your health dashboard and manage your appointments.</p>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-2 gap-6 mt-12 relative z-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="bg-white/10 p-2 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mt-auto pt-12 relative z-10">
          <div className="flex items-center space-x-2 text-sm text-white/70 mb-4">
            <ShieldCheck className="h-4 w-4" />
            <span>Trusted by thousands of patients</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-48 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 p-6"
              >
                <MessageSquareQuote className="h-6 w-6 text-white/50 mb-4" />
                <p className="text-lg font-medium mb-4">"{testimonials[currentTestimonial].quote}"</p>
                <div>
                  <p className="font-semibold">{testimonials[currentTestimonial].author}</p>
                  <p className="text-sm text-white/70">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 left-6 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${index === currentTestimonial ? 'bg-white' : 'bg-white/30'}`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
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
          
          <Card className="border-0 shadow-none lg:shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      disabled={isLoading}
                    />
                    <Label htmlFor="remember" className="text-sm font-medium leading-none">
                      Remember me
                    </Label>
                  </div>
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

                <p className="mt-6 text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-medium text-medical-blue hover:text-medical-blue/80 hover:underline">
                    Sign up now
                  </Link>
                </p>
              </form>
            </CardContent>

            <CardFooter className="px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500">
                By signing in, you agree to our{' '}
                <Link to="/terms" className="text-medical-blue hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-medical-blue hover:underline">
                  Privacy Policy
                </Link>
                .
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