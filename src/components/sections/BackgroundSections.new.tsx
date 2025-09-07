import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Stethoscope,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "24/7 Medical Care",
    description: "Access to healthcare professionals around the clock",
    icon: Clock,
    bgImage: "/background/medical-care.jpg",
  },
  {
    title: "Expert Specialists",
    description: "Connect with experienced healthcare specialists",
    icon: Stethoscope,
    bgImage: "/background/specialists.jpg",
  },
  {
    title: "Easy Scheduling",
    description: "Book appointments with just a few clicks",
    icon: Calendar,
    bgImage: "/background/scheduling.jpg",
  },
  {
    title: "Patient-First Approach",
    description: "Personalized care tailored to your needs",
    icon: Heart,
    bgImage: "/background/patient-care.jpg",
  },
];

const benefits = [
  "Instant access to medical professionals",
  "Secure and confidential consultations",
  "Flexible scheduling options",
  "Comprehensive health records",
  "Follow-up care and monitoring",
  "Prescription management",
];

export function BackgroundSections() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[600px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/background/hero-medical.jpg")',
            filter: "brightness(0.7)",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl animate-fade-in">
            Your Health, Our Priority
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-200 animate-fade-in [animation-delay:200ms]">
            Experience healthcare that puts you first. Book appointments with top
            specialists and receive care from the comfort of your home.
          </p>
          <div className="flex gap-4 animate-fade-in [animation-delay:400ms]">
            <Button
              size="lg"
              className="bg-medical-blue hover:bg-medical-blue/90"
              asChild
            >
              <Link to="/doctors">Find a Doctor</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-medical-blue"
              asChild
            >
              <Link to="/register">Join Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground">
              Comprehensive healthcare solutions designed around you
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${feature.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
                <div className="relative z-10 p-6 text-white">
                  <feature.icon className="mb-4 h-8 w-8" />
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/background/benefits.jpg")',
            filter: "brightness(0.1)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="text-white">
              <h2 className="mb-6 text-3xl font-bold">
                Experience the Future of Healthcare
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="h-5 w-5 text-medical-blue" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="mt-8 bg-medical-blue hover:bg-medical-blue/90"
                asChild
              >
                <Link to="/book">Book an Appointment</Link>
              </Button>
            </div>
            <div className="relative hidden md:block">
              <img
                src="/background/doctor-consultation.jpg"
                alt="Doctor consultation"
                className="rounded-lg shadow-xl animate-fade-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-medical py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg">
            Join thousands of satisfied patients who trust us with their health
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-medical-blue"
              asChild
            >
              <Link to="/doctors">Find Doctors</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-medical-blue hover:bg-white/90"
              asChild
            >
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
