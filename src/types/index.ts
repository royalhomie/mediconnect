// TypeScript interfaces for the healthcare booking system

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor';
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: Date;
  address?: Address;
  emergencyContact?: EmergencyContact;
  medicalHistory?: string[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  experience: number;
  qualification: string;
  bio?: string;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  availability: DoctorAvailability[];
  verified: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface DoctorAvailability {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  isActive: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'consultation' | 'follow-up' | 'emergency';
  notes?: string;
  prescription?: string;
  fee: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  isBooked: boolean;
}

export interface BookingFormData {
  doctorId: string;
  date: Date;
  time: string;
  type: Appointment['type'];
  notes?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface DoctorFilters {
  specialization?: string;
  availability?: 'today' | 'tomorrow' | 'this-week';
  rating?: number;
  fee?: { min: number; max: number };
  search?: string;
}

export const SPECIALIZATIONS = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Orthopedic',
  'Pediatrician',
  'Gynecologist',
  'ENT Specialist',
  'Ophthalmologist',
  'Psychiatrist',
] as const;

export type Specialization = typeof SPECIALIZATIONS[number];