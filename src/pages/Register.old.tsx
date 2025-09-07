import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, Heart, ArrowRight, ShieldCheck, Clock, Stethoscope, CalendarCheck, MessageSquareQuote } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Logo } from '@/components/ui/logo';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { register: signUp } = useAuth();
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
    
    if (!formData.acceptTerms) {
      toast({
        title: 'Error',
        description: 'You must accept the terms and conditions to register',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: "Passwords don't match!",
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
      await signUp(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`.trim(),
        formData.role
      );
      
      toast({
        title: 'Registration successful!',
        description: 'Please check your email to verify your account.',
      });
      
      // Redirect to login or dashboard
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please check your email to verify your account.' 
        } 
      });
      // if (error) throw error;
      // navigate('/verify-email');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const RegistrationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role Selection */}
      {renderRoleSelection()}
      
      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <Input
              id="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Email */}
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
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Phone */}
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
            required
          />
        </div>
      </div>

      {/* Date of Birth */}
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
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          {formData.password.length > 0 && (
            <div className="text-xs">
              {formData.password.length >= 8 ? (
                <span className="text-green-600">✓ Strong password</span>
              ) : (
                <span className="text-amber-600">At least 8 characters</span>
              )}
            </div>
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

      {/* Confirm Password */}
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

      {/* Terms */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
          className="mt-1"
        />
        <Label htmlFor="acceptTerms" className="text-sm leading-5">
          I agree to the{' '}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="medical"
        className="w-full"
        disabled={isLoading || !formData.acceptTerms}
      >
        {isLoading ? (
          "Creating account..."
        ) : (
          <>
            Create Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );

  const PatientRegistration = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" required />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </div>
  );

const DoctorRegistration = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-6">
        <div className="text-center mb-6">
          <Stethoscope className="h-10 w-10 mx-auto mb-4 text-medical-blue" />
          <h3 className="text-xl font-bold mb-2">Join Our Medical Network</h3>
          <p className="text-muted-foreground">
            We're currently accepting applications from qualified healthcare professionals.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor-email">Professional Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="doctor-email"
                type="email"
                placeholder="your.email@clinic.com"
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <select
              id="specialty"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue=""
              required
            >
              <option value="" disabled>Select your specialty</option>
              <option value="cardiology">Cardiology</option>
              <option value="dermatology">Dermatology</option>
              <option value="neurology">Neurology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="license">Medical License Number</Label>
            <Input
              id="license"
              type="text"
              placeholder="Enter your license number"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Availability</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" type="button">Full-time</Button>
              <Button variant="outline" type="button">Part-time</Button>
              <Button variant="outline" type="button" className="col-span-2">
                Specific hours
              </Button>
            </div>
          </div>
          
          <div className="pt-2">
            <Button type="submit" variant="medical" className="w-full" size="lg">
              Submit Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have a doctor account?{' '}
          <Link to="/doctor/login" className="text-medical-blue font-medium hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );

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
          <h1 className="text-4xl font-bold mb-2">Join Us Today</h1>
          <p className="text-white/80">Create your account to access personalized healthcare services.</p>
        </div>
        
        {/* Features */}
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Join Us Today!</h1>
          <p className="text-lg mb-8 text-white/90">Create your account to access personalized healthcare services and manage your appointments.</p>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">Join Us Today!</h1>
            <p className="text-lg mb-8 text-white/90">Create your account to access personalized healthcare services and manage your appointments.</p>
            
            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1 bg-white/10 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-white/80">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="mt-auto bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-white mr-2" />
                <span className="text-sm font-medium">Trusted by patients worldwide</span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <MessageSquareQuote className="absolute -left-2 -top-2 h-6 w-6 text-white/20" />
                  <p className="text-white/90 italic mb-4 pl-6">"{testimonials[currentTestimonial].quote}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{testimonials[currentTestimonial].author}</p>
                      <p className="text-sm text-white/70">{testimonials[currentTestimonial].role}</p>
                    </div>
                    <div className="flex space-x-1">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`h-2 w-2 rounded-full transition-colors ${currentTestimonial === index ? 'bg-white' : 'bg-white/30'}`}
                          aria-label={`View testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Logo textClassName="text-3xl" iconClassName="h-8 w-8" />
            <h2 className="mt-4 text-2xl font-bold">Create your account</h2>
            <p className="text-muted-foreground mt-2">Join us today to get started</p>
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription className="text-base">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-medical-blue hover:underline">
                  Sign in
                </Link>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-2">
              <Tabs defaultValue="patient" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="patient" className="flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    Patient
                  </TabsTrigger>
                  <TabsTrigger value="doctor" className="flex items-center justify-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Doctor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="patient" className="mt-0">
                  <PatientRegistration />
                </TabsContent>

                <TabsContent value="doctor" className="mt-0">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    // Handle doctor registration submission
                    alert('Doctor registration submitted! Our team will review your application.');
                  }}>
                    <DoctorRegistration />
                  </form>
                </TabsContent>
              </Tabs>
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