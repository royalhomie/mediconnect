import { Heart, Shield, Users, Award, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "We prioritize your health and comfort, ensuring every interaction is focused on your wellbeing and recovery."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your medical information is protected with bank-level security. We maintain the highest standards of privacy and confidentiality."
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Access to a carefully vetted network of qualified healthcare professionals across various specializations."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "All our healthcare providers are thoroughly screened, licensed, and continuously monitored for quality care delivery."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Patients" },
    { number: "500+", label: "Verified Doctors" },
    { number: "50+", label: "Specializations" },
    { number: "99.9%", label: "Uptime" }
  ];

  const features = [
    "Easy online appointment booking",
    "Secure telemedicine consultations", 
    "Digital health records management",
    "Real-time appointment notifications",
    "Multi-device accessibility",
    "24/7 emergency support"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              About MediConnect
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Revolutionizing healthcare access through technology, connecting patients with trusted medical professionals seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button asChild variant="secondary" size="lg">
                <Link to="/doctors">Find a Doctor</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/register">Join as Patient</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To democratize healthcare access by creating a seamless digital platform that connects patients with qualified healthcare providers, 
                making quality medical care accessible, affordable, and convenient for everyone, regardless of their location or circumstances.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Bridging the Healthcare Gap
                </h3>
                <p className="text-muted-foreground mb-6">
                  Healthcare should be a right, not a privilege. We believe that everyone deserves access to quality medical care, 
                  regardless of their geographical location, financial situation, or time constraints. Our platform removes traditional 
                  barriers and creates a direct connection between patients and healthcare providers.
                </p>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-card rounded-2xl p-8">
                <div className="text-center">
                  <div className="bg-gradient-medical w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">
                    Healthcare for All
                  </h4>
                  <p className="text-muted-foreground">
                    We're committed to making healthcare more accessible, efficient, and patient-focused through innovative technology solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do, from product development to patient care, 
              ensuring we deliver the highest quality healthcare experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none bg-gradient-card shadow-card hover:shadow-medical transition-smooth">
                <CardHeader className="text-center">
                  <div className="bg-gradient-medical w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Impact by Numbers
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by thousands of patients and healthcare providers worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-medical text-transparent bg-clip-text text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-medical">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of patients who have already discovered the convenience of digital healthcare. 
              Book your first appointment today and experience the future of medicine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link to="/register">Get Started Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/doctors">Browse Doctors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;