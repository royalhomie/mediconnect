import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, Stethoscope, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Logo } from '@/components/ui/logo';

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

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    role: 'patient' as 'patient' | 'doctor'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const { toast } = useToast();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field: string, value: string | boolean | 'patient' | 'doctor') => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoleChange = (role: 'patient' | 'doctor') => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: 'Error',
        description: 'You must accept the terms and conditions',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters long',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(
        formData.email, 
        formData.password, 
        `${formData.firstName} ${formData.lastName}`.trim(),
        formData.role as 'patient' | 'doctor'
      );
      
      toast({
        title: 'Registration successful!',
        description: 'Please check your email to verify your account.',
      });
      
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please check your email to verify your account.',
          email: formData.email
        } 
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <div className="space-y-2">
      <Label>I am registering as a</Label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleRoleChange('patient')}
          className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
            formData.role === 'patient'
              ? 'border-medical-blue bg-medical-blue/10'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <User className="h-5 w-5 mr-2 text-medical-blue" />
          <span className="font-medium">Patient</span>
        </button>
        <button
          type="button"
          onClick={() => handleRoleChange('doctor')}
          className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
            formData.role === 'doctor'
              ? 'border-medical-blue bg-medical-blue/10'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Stethoscope className="h-5 w-5 mr-2 text-medical-blue" />
          <span className="font-medium">Doctor</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Branding and Features */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-medical-blue to-medical-green p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Logo className="h-10 w-10" />
            <span className="text-2xl font-bold">DocLink</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Join Us Today</h1>
          <p className="text-white/80">Create your account to access personalized healthcare services.</p>
        </div>
        
        <div className="space-y-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic">"{testimonial.quote}"</p>
              <p className="mt-2 font-medium">{testimonial.author}</p>
              <p className="text-sm text-white/70">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Logo className="mx-auto h-10 w-10" />
            <h2 className="mt-4 text-2xl font-bold">Create your account</h2>
            <p className="text-muted-foreground mt-2">Join us today to get started</p>
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <h2 className="text-2xl font-bold">Create Account</h2>
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-medical-blue hover:underline">
                  Sign in
                </Link>
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {renderRoleSelection()}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    {formData.password.length > 0 && (
                      <span className="text-xs">
                        {formData.password.length >= 8 ? (
                          <span className="text-green-600">✓ Strong password</span>
                        ) : (
                          <span className="text-amber-600">At least 8 characters</span>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                      minLength={8}
                      className="pl-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formData.password.length > 0 && (
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          formData.password.length < 4 
                            ? 'bg-red-500 w-1/4' 
                            : formData.password.length < 8 
                              ? 'bg-amber-500 w-2/4' 
                              : 'bg-green-500 w-full'
                        }`}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                      minLength={8}
                      className={`pl-10 ${
                        formData.confirmPassword.length > 0 && 
                        formData.password !== formData.confirmPassword 
                          ? 'border-red-500 focus-visible:ring-red-500' 
                          : ''
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <div className="flex items-center h-5">
                    <Checkbox 
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange('acceptTerms', checked === true)}
                      className="h-4 w-4 rounded"
                      aria-describedby="terms-description"
                    />
                  </div>
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="acceptTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{' '}
                      <a href="/terms" className="text-medical-blue hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-medical-blue hover:underline">
                        Privacy Policy
                      </a>
                    </label>
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
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-medical-blue hover:underline">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="text-medical-blue hover:underline">Privacy Policy</Link>.
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

export default Register;
