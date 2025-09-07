import { useState, useMemo } from 'react';
import { Search, Filter, Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Doctor, SPECIALIZATIONS } from '@/types';

// Mock data - will be replaced with real API calls
const mockDoctors: Doctor[] = [
  {
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
    phone: '+1-555-0123',
    avatar: undefined
  },
  {
    id: '2',
    email: 'dr.johnson@mediconnect.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'doctor',
    specialization: 'Dermatologist',
    experience: 8,
    qualification: 'MD, Dermatology',
    bio: 'Board-certified dermatologist with expertise in medical and cosmetic dermatology.',
    consultationFee: 120,
    rating: 4.9,
    reviewCount: 98,
    verified: true,
    availability: [],
    createdAt: new Date(),
    phone: '+1-555-0124'
  },
  {
    id: '3',
    email: 'dr.chen@mediconnect.com',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'doctor',
    specialization: 'Neurologist',
    experience: 12,
    qualification: 'MD, PhD, Neurology',
    bio: 'Neurologist specializing in migraine treatment and neurological disorders.',
    consultationFee: 180,
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    availability: [],
    createdAt: new Date(),
    phone: '+1-555-0125'
  },
  {
    id: '4',
    email: 'dr.patel@mediconnect.com',
    firstName: 'Priya',
    lastName: 'Patel',
    role: 'doctor',
    specialization: 'General Physician',
    experience: 10,
    qualification: 'MBBS, MD',
    bio: 'Family medicine physician providing comprehensive primary care for all ages.',
    consultationFee: 100,
    rating: 4.6,
    reviewCount: 89,
    verified: true,
    availability: [],
    createdAt: new Date(),
    phone: '+1-555-0126'
  },
  {
    id: '5',
    email: 'dr.wilson@mediconnect.com',
    firstName: 'David',
    lastName: 'Wilson',
    role: 'doctor',
    specialization: 'Orthopedic',
    experience: 18,
    qualification: 'MD, Orthopedic Surgery',
    bio: 'Orthopedic surgeon with expertise in sports medicine and joint replacement.',
    consultationFee: 200,
    rating: 4.9,
    reviewCount: 203,
    verified: true,
    availability: [],
    createdAt: new Date(),
    phone: '+1-555-0127'
  },
  {
    id: '6',
    email: 'dr.garcia@mediconnect.com',
    firstName: 'Maria',
    lastName: 'Garcia',
    role: 'doctor',
    specialization: 'Pediatrician',
    experience: 14,
    qualification: 'MD, Pediatrics',
    bio: 'Pediatrician dedicated to providing compassionate care for children and adolescents.',
    consultationFee: 110,
    rating: 4.8,
    reviewCount: 167,
    verified: true,
    availability: [],
    createdAt: new Date(),
    phone: '+1-555-0128'
  }
];

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');

  const filteredDoctors = useMemo(() => {
    let filtered = mockDoctors;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by specialization
    if (selectedSpecialization && selectedSpecialization !== 'all') {
      filtered = filtered.filter(doctor => doctor.specialization === selectedSpecialization);
    }

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'fee-low':
          return a.consultationFee - b.consultationFee;
        case 'fee-high':
          return b.consultationFee - a.consultationFee;
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchQuery, selectedSpecialization, sortBy]);

  const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
    <Card className="hover:shadow-medical transition-smooth border-none shadow-card bg-gradient-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-semibold">
                {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">
                Dr. {doctor.firstName} {doctor.lastName}
                {doctor.verified && (
                  <Badge variant="secondary" className="ml-2">
                    Verified
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-base text-primary font-medium">
                {doctor.specialization}
              </CardDescription>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {doctor.experience} years exp.
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  {doctor.rating} ({doctor.reviewCount})
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-lg font-semibold text-foreground">
              <DollarSign className="h-5 w-5" />
              {doctor.consultationFee}
            </div>
            <span className="text-sm text-muted-foreground">per session</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {doctor.bio}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            Available Today
          </div>
          <Button variant="booking" size="sm">
            Book Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Find Your Doctor
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose from our network of qualified healthcare professionals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-muted/30 rounded-2xl p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors or specializations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {/* Specialization Filter */}
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {SPECIALIZATIONS.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="fee-low">Lowest Fee</SelectItem>
                <SelectItem value="fee-high">Highest Fee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Doctor Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No doctors found matching your criteria
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialization('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;