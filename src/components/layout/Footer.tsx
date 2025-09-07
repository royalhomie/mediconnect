import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/logo';

const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-medical-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-medical-green/10 rounded-full blur-3xl" />

      {/* Pre-footer Newsletter Section */}
      <div className="relative border-b border-border/40">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-medical-blue to-medical-green bg-clip-text text-transparent">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-muted-foreground">
                Stay updated with medical news, health tips, and clinic updates
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full md:w-80 bg-background/50 backdrop-blur-sm border-medical-blue/20 focus:border-medical-blue/50"
              />
              <Button className="bg-gradient-to-r from-medical-blue to-medical-green hover:opacity-90 transition-opacity">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container py-16">
        <div className="grid gap-12 lg:grid-cols-5 md:grid-cols-2">
          {/* About Section */}
          <div className="lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Your trusted healthcare booking platform. We're committed to connecting patients with qualified healthcare professionals, ensuring accessible and efficient medical care for everyone.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group relative p-2 rounded-full bg-background hover:bg-medical-blue/5 transition-colors"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-medical-blue to-medical-green opacity-0 group-hover:opacity-10 transition-opacity" />
                  <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-medical-blue transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { text: 'Find Doctors', href: '/doctors' },
                { text: 'Book Appointment', href: '/book' },
                { text: 'Our Services', href: '/services' },
                { text: 'About Us', href: '/about' },
                { text: 'Contact', href: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="group flex items-center text-muted-foreground hover:text-medical-blue transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Doctors */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">For Doctors</h3>
            <ul className="space-y-3">
              {[
                { text: 'Join as Doctor', href: '/doctor/register' },
                { text: 'Doctor Dashboard', href: '/doctor/dashboard' },
                { text: 'Help Center', href: '/help' },
                { text: 'Terms & Conditions', href: '/terms' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="group flex items-center text-muted-foreground hover:text-medical-blue transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Contact Info</h3>
            <ul className="space-y-4">
              {[
                { 
                  icon: Phone, 
                  content: '+1 (555) 123-4567',
                  href: 'tel:+15551234567'
                },
                { 
                  icon: Mail, 
                  content: 'support@mediconnect.com',
                  href: 'mailto:support@mediconnect.com'
                },
                { 
                  icon: MapPin, 
                  content: '123 Healthcare Ave\nMedical District, NY 10001',
                  href: 'https://maps.google.com/?q=123+Healthcare+Ave+NY+10001'
                }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    className="group flex items-start space-x-3 text-muted-foreground hover:text-medical-blue transition-colors"
                  >
                    <div className="relative mt-1">
                      <div className="absolute inset-0 bg-medical-blue/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                      <item.icon className="h-5 w-5 relative text-medical-blue" />
                    </div>
                    <span className="leading-relaxed whitespace-pre-line">
                      {item.content}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MediConnect. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { text: 'Privacy Policy', href: '/privacy' },
                { text: 'Terms of Service', href: '/terms' },
                { text: 'Sitemap', href: '/sitemap' }
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="hover:text-medical-blue transition-colors"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;