import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Shield, Clock, Star, ArrowRight, Heart, Award, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BackgroundSections } from '@/components/sections/BackgroundSections';
import heroImage from '@/assets/hero-medical.jpg';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-powered appointment booking system that learns your preferences.',
      image: '/features/smart-scheduling.jpg',
      color: 'from-blue-500/20 to-indigo-500/20'
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Access to board-certified specialists with proven track records.',
      image: '/features/expert-doctors.jpg',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Bank-level encryption for your medical data and communications.',
      image: '/features/security.jpg',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Clock,
      title: '24/7 Care Access',
      description: 'Round-the-clock telemedicine support and emergency assistance.',
      image: '/features/support.jpg',
      color: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'MediConnect made it so easy to find and book an appointment with a specialist. The entire process was seamless!',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      content: 'As a doctor, MediConnect helps me manage my appointments efficiently. The platform is intuitive and reliable.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Patient',
      content: 'It\'s amazing how I can book appointments anytime and receive reminders. MediConnect has transformed my healthcare experience.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Patients' },
    { number: '500+', label: 'Verified Doctors' },
    { number: '50+', label: 'Specializations' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      <BackgroundSections />
      {/* Additional Sections */}
      <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Health,
                <span className="text-medical-orange"> Our Priority</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Connect with qualified doctors, book appointments instantly, and take control of your healthcare journey with MediConnect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/doctors">
                    Find Doctors
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency: (808) 985-7242
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <img
                src={heroImage}
                alt="Healthcare professionals"
                className="rounded-2xl shadow-medical w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-soft animate-float">
                <div className="flex items-center space-x-3">
                  <div className="bg-medical-green rounded-full p-2">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">24/7 Available</p>
                    <p className="text-xs text-muted-foreground">Emergency Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="inline-block text-3xl md:text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-medical-blue bg-clip-text text-transparent animate-gradient">
              Why Choose MediConnect?
            </h2>
            <p className="text-lg text-muted-foreground">
              We're committed to making healthcare accessible, convenient, and reliable for everyone.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-medical-blue animate-pulse" />
              <span className="inline-flex h-2 w-2 rounded-full bg-medical-green animate-pulse [animation-delay:0.2s]" />
              <span className="inline-flex h-2 w-2 rounded-full bg-medical-orange animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative border-none overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
                
                <CardHeader className="relative text-center pb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="mt-[-2rem] relative">
                    <div className="mx-auto mb-4 rounded-full bg-gradient-to-br from-background to-muted p-3 w-fit
                                ring-2 ring-border shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <feature.icon className="h-8 w-8 text-primary group-hover:text-medical-blue transition-colors" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-center relative">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-medical-blue">
                      Learn More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-medical-blue/5" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-medical-blue/10 to-transparent" />
        <div className="container relative">
          <div className="text-center mb-20">
            <h2 className="inline-block text-3xl md:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-green bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Book your appointment in three simple steps
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-medical-blue via-medical-green to-medical-orange transform -translate-y-1/2 hidden md:block" />
            
            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              <div className="relative text-center group bg-card hover:bg-gradient-to-b hover:from-card hover:to-muted/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-xl">
                <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="mx-auto mb-6 rounded-full bg-gradient-to-r from-medical-blue to-medical-blue/50 p-6 w-20 h-20
                              flex items-center justify-center text-2xl font-bold text-white
                              shadow-lg shadow-medical-blue/25
                              group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-medical-blue transition-colors">Choose Your Doctor</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">Browse through our list of qualified doctors and select the one that suits your needs.</p>
                </div>
              </div>

              <div className="relative text-center group bg-card hover:bg-gradient-to-b hover:from-card hover:to-muted/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-xl">
                <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="mx-auto mb-6 rounded-full bg-gradient-to-r from-medical-green to-medical-green/50 p-6 w-20 h-20
                              flex items-center justify-center text-2xl font-bold text-white
                              shadow-lg shadow-medical-green/25
                              group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-medical-green transition-colors">Pick a Time Slot</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">Select from available time slots that work best with your schedule.</p>
                </div>
              </div>

              <div className="relative text-center group bg-card hover:bg-gradient-to-b hover:from-card hover:to-muted/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-xl">
                <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="mx-auto mb-6 rounded-full bg-gradient-to-r from-medical-orange to-medical-orange/50 p-6 w-20 h-20
                              flex items-center justify-center text-2xl font-bold text-white
                              shadow-lg shadow-medical-orange/25
                              group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-medical-orange transition-colors">Confirm Booking</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">Complete your booking and receive instant confirmation with appointment details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials and Trust Indicators */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-medical-blue/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Testimonials Carousel */}
            <div className="space-y-8">
              <div>
                <h2 className="inline-block text-3xl md:text-4xl font-bold bg-gradient-to-r from-medical-blue via-medical-green to-medical-blue bg-clip-text text-transparent animate-gradient mb-4">
                  What Our Users Say
                </h2>
                <p className="text-lg text-muted-foreground">
                  Trusted by thousands of patients and doctors
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-medical-blue animate-pulse" />
                  <span className="inline-flex h-2 w-2 rounded-full bg-medical-green animate-pulse [animation-delay:0.2s]" />
                  <span className="inline-flex h-2 w-2 rounded-full bg-accent animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>

              <div className="relative">
                <Card className="relative group border-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/10 via-medical-green/10 to-accent/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  
                  <div className="absolute top-0 right-0 w-32 h-32">
                    <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/20 to-transparent rounded-bl-[100px] animate-pulse" />
                  </div>

                  <CardContent className="relative p-8 text-center">
                    <div className="absolute top-4 left-4 text-6xl font-serif text-medical-blue/10 select-none">"</div>
                    <div className="absolute bottom-4 right-4 text-6xl font-serif text-medical-blue/10 select-none transform rotate-180">"</div>
                    
                    <div className="flex justify-center mb-6 animate-float">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-6 w-6 text-yellow-400 fill-current transform transition-transform duration-300 hover:scale-125
                            ${i === 0 ? 'hover:rotate-12' : i === 4 ? 'hover:-rotate-12' : ''}`}
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>

                    <blockquote className="relative text-lg text-foreground mb-6 leading-relaxed
                      opacity-0 animate-fade-in [animation-delay:0.2s] [animation-fill-mode:forwards]">
                      <p className="relative z-10">"{testimonials[currentTestimonial].content}"</p>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-medical-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </blockquote>

                    <div className="flex items-center justify-center space-x-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-medical-blue via-medical-green to-accent rounded-full animate-gradient" />
                        <div className="relative w-12 h-12 bg-gradient-medical rounded-full flex items-center justify-center p-[2px] transform hover:scale-110 transition-transform duration-300">
                          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            <span className="text-base font-semibold bg-gradient-to-br from-medical-blue to-medical-green bg-clip-text text-transparent">
                              {testimonials[currentTestimonial].name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <div className="font-semibold text-foreground group-hover:text-medical-blue transition-colors duration-300">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {testimonials[currentTestimonial].role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation Arrows */}
                <button 
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-background/80 shadow-lg flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all duration-300 group"
                >
                  <ArrowRight className="w-5 h-5 transform rotate-180 group-hover:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-background/80 shadow-lg flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all duration-300 group"
                >
                  <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="flex justify-center space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`group relative w-4 h-4 rounded-full transition-all duration-300 
                      ${index === currentTestimonial ? 'scale-125' : 'hover:scale-110'}`}
                    onClick={() => setCurrentTestimonial(index)}
                  >
                    <div className={`absolute inset-0 rounded-full transition-all duration-300
                      ${index === currentTestimonial 
                        ? 'bg-gradient-to-r from-medical-blue to-medical-green animate-gradient' 
                        : 'bg-muted-foreground/30 group-hover:bg-medical-blue/50'}`} 
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r from-medical-blue to-medical-green rounded-full 
                      transition-opacity duration-300 opacity-0 group-hover:opacity-50 animate-pulse`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Trust Indicators */}
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-medical-green/10 rounded-full blur-2xl" />
              <div className="relative space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-medical-green to-accent bg-clip-text text-transparent animate-gradient mb-4">
                    Why Trust Us?
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Industry-leading standards that set us apart
                  </p>
                </div>

                <div className="grid gap-6">
                  {[
                    {
                      icon: Award,
                      title: "Certified Excellence",
                      description: "All our doctors are board-certified with verified credentials",
                      gradient: "from-medical-blue/20 to-medical-blue/5"
                    },
                    {
                      icon: Shield,
                      title: "100% Secure Platform",
                      description: "Bank-grade security for your medical data and communications",
                      gradient: "from-medical-green/20 to-medical-green/5"
                    },
                    {
                      icon: Heart,
                      title: "Patient-First Approach",
                      description: "Focused on delivering the best possible healthcare experience",
                      gradient: "from-accent/20 to-accent/5"
                    }
                  ].map((item, index) => (
                    <Card key={index} className="group border-none relative overflow-hidden hover:shadow-xl transition-all duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                      <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
                      <CardContent className="relative p-6 flex items-start space-x-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue to-medical-green rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative w-12 h-12 rounded-full bg-background flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-medical-blue group-hover:scale-110 transition-transform" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-medical-blue transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-medical">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of satisfied patients and experience healthcare booking like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/doctors">
                  Browse Doctors
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;