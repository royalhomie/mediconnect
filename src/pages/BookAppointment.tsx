import { useState } from 'react';
import { Calendar, Clock, User, FileText, CreditCard, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Doctor, TimeSlot } from '@/types';

// Mock doctor data
const mockDoctor: Doctor = {
  id: '1',
  email: 'dr.smith@mediconnect.com',
  firstName: 'John',
  lastName: 'Smith',
  role: 'doctor',
  specialization: 'Cardiologist',
  experience: 15,
  qualification: 'MD, FACC',
  bio: 'Experienced cardiologist specializing in preventive cardiology and heart disease management.',
  consultationFee: 150,
  rating: 4.8,
  reviewCount: 124,
  verified: true,
  availability: [],
  createdAt: new Date(),
  phone: '+1-555-0123'
};

// Mock time slots
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];
  
  times.forEach(time => {
    slots.push({
      time,
      isAvailable: Math.random() > 0.3, // 70% chance of being available
      isBooked: false
    });
  });
  
  return slots;
};

const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());

  const steps = [
    { number: 1, title: 'Select Date & Time', icon: Calendar },
    { number: 2, title: 'Patient Details', icon: User },
    { number: 3, title: 'Review & Payment', icon: CreditCard }
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-smooth",
            currentStep >= step.number
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted-foreground text-muted-foreground"
          )}>
            {currentStep > step.number ? (
              <ArrowRight className="h-5 w-5" />
            ) : (
              <step.icon className="h-5 w-5" />
            )}
          </div>
          <div className="ml-3 mr-8 hidden md:block">
            <div className={cn(
              "text-sm font-medium",
              currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
            )}>
              Step {step.number}
            </div>
            <div className={cn(
              "text-xs",
              currentStep >= step.number ? "text-muted-foreground" : "text-muted-foreground/60"
            )}>
              {step.title}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "w-16 h-px transition-smooth mr-8",
              currentStep > step.number ? "bg-primary" : "bg-muted-foreground/30"
            )} />
          )}
        </div>
      ))}
    </div>
  );

  const DateTimeStep = () => (
    <Card className="shadow-card border-none bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          Select Date & Time
        </CardTitle>
        <CardDescription>
          Choose your preferred appointment date and available time slot
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Doctor Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-medical rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {mockDoctor.firstName.charAt(0)}{mockDoctor.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Dr. {mockDoctor.firstName} {mockDoctor.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{mockDoctor.specialization}</p>
              <p className="text-sm text-primary font-medium">${mockDoctor.consultationFee} per session</p>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-3">
          <Label>Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div className="space-y-3 animate-fade-in">
            <Label>Available Time Slots</Label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  size="sm"
                  disabled={!slot.isAvailable || slot.isBooked}
                  onClick={() => setSelectedTime(slot.time)}
                  className="transition-smooth"
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Appointment Type */}
        <div className="space-y-3">
          <Label>Appointment Type</Label>
          <Select value={appointmentType} onValueChange={setAppointmentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select appointment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">General Consultation</SelectItem>
              <SelectItem value="follow-up">Follow-up Visit</SelectItem>
              <SelectItem value="emergency">Emergency Consultation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <Label>Additional Notes (Optional)</Label>
          <Textarea
            placeholder="Describe your symptoms or reason for visit..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );

  const PatientDetailsStep = () => (
    <Card className="shadow-card border-none bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2 text-primary" />
          Patient Details
        </CardTitle>
        <CardDescription>
          Please provide patient information for the appointment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" placeholder="Enter first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" placeholder="Enter last name" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" placeholder="Enter email address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" placeholder="Enter phone number" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input id="dateOfBirth" type="date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" placeholder="Enter full address" rows={2} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input id="emergencyContact" placeholder="Emergency contact name and phone" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
          <Textarea
            id="medicalHistory"
            placeholder="Any relevant medical history, current medications, allergies..."
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );

  const ReviewPaymentStep = () => (
    <div className="space-y-6">
      {/* Appointment Summary */}
      <Card className="shadow-card border-none bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            Appointment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Doctor</h4>
              <p className="text-muted-foreground">Dr. {mockDoctor.firstName} {mockDoctor.lastName}</p>
              <p className="text-sm text-muted-foreground">{mockDoctor.specialization}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Date & Time</h4>
              <p className="text-muted-foreground">
                {selectedDate ? format(selectedDate, "PPP") : "No date selected"}
              </p>
              <p className="text-sm text-muted-foreground">{selectedTime || "No time selected"}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Appointment Type</h4>
            <p className="text-muted-foreground">{appointmentType || "Not specified"}</p>
          </div>
          {notes && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Notes</h4>
              <p className="text-muted-foreground text-sm">{notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment */}
      <Card className="shadow-card border-none bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-primary" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Consultation Fee</span>
              <span className="font-semibold text-foreground">${mockDoctor.consultationFee}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-foreground">Platform Fee</span>
              <span className="font-semibold text-foreground">$5</span>
            </div>
            <hr className="my-3 border-border" />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-lg text-primary">${mockDoctor.consultationFee + 5}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" placeholder="MM/YY" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input id="cardName" placeholder="Enter name on card" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DateTimeStep />;
      case 2:
        return <PatientDetailsStep />;
      case 3:
        return <ReviewPaymentStep />;
      default:
        return <DateTimeStep />;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedDate && selectedTime && appointmentType;
      case 2:
        return true; // Add validation for required fields
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Book Appointment
          </h1>
          <p className="text-lg text-muted-foreground">
            Schedule your consultation in a few simple steps
          </p>
        </div>

        <StepIndicator />

        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button
              variant="medical"
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              variant="booking"
              className="flex items-center"
              disabled={!canProceed()}
            >
              Confirm Booking
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;