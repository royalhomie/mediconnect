import { useState } from 'react';
import { Calendar, Clock, Users, DollarSign, Settings, Bell, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Appointment } from '@/types';

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'p1',
    doctorId: 'd1',
    dateTime: new Date('2024-01-15T09:00:00'),
    duration: 30,
    status: 'scheduled',
    type: 'consultation',
    fee: 150,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    patientId: 'p2',
    doctorId: 'd1',
    dateTime: new Date('2024-01-15T10:30:00'),
    duration: 30,
    status: 'completed',
    type: 'follow-up',
    fee: 150,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    patientId: 'p3',
    doctorId: 'd1',
    dateTime: new Date('2024-01-15T14:00:00'),
    duration: 45,
    status: 'scheduled',
    type: 'consultation',
    fee: 150,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const DoctorDashboard = () => {
  const [availability, setAvailability] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  });

  const stats = [
    {
      title: 'Today\'s Appointments',
      value: '8',
      change: '+2 from yesterday',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'This Month\'s Patients',
      value: '124',
      change: '+12% from last month',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Earnings',
      value: '$12,450',
      change: '+8% from last month',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '96 reviews',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const upcomingAppointments = mockAppointments.filter(apt => 
    apt.status === 'scheduled' && new Date(apt.dateTime) > new Date()
  );

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const Overview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card border-none bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Schedule */}
      <Card className="shadow-card border-none bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Today's Schedule
          </CardTitle>
          <CardDescription>
            Your appointments for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>P{appointment.patientId.slice(-1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Patient #{appointment.patientId}</h4>
                    <p className="text-sm text-muted-foreground">
                      {appointment.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {appointment.duration} min
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {upcomingAppointments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No appointments scheduled for today
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Appointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Appointments</h2>
        <Button variant="medical">
          <Plus className="h-4 w-4 mr-2" />
          Block Time Slot
        </Button>
      </div>

      <Card className="shadow-card border-none bg-gradient-card">
        <CardContent className="p-0">
          <div className="space-y-2">
            {mockAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-smooth">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>P{appointment.patientId.slice(-1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Patient #{appointment.patientId}</h4>
                    <p className="text-sm text-muted-foreground">
                      {appointment.dateTime.toLocaleDateString()} at {appointment.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {appointment.type} • {appointment.duration} minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">${appointment.fee}</span>
                  <Badge variant="outline" className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* Availability Settings */}
      <Card className="shadow-card border-none bg-gradient-card">
        <CardHeader>
          <CardTitle>Weekly Availability</CardTitle>
          <CardDescription>
            Set your availability for each day of the week
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(availability).map(([day, isAvailable]) => (
            <div key={day} className="flex items-center justify-between">
              <Label htmlFor={day} className="capitalize font-medium">
                {day}
              </Label>
              <Switch
                id={day}
                checked={isAvailable}
                onCheckedChange={(checked) => 
                  setAvailability(prev => ({ ...prev, [day]: checked }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card className="shadow-card border-none bg-gradient-card">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your professional profile and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile Information
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Consultation Preferences
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Doctor Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your appointments and availability
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Overview />
          </TabsContent>
          
          <TabsContent value="appointments" className="mt-6">
            <Appointments />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;