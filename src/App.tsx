import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import FindDoctors from "./pages/FindDoctors";
import BookAppointment from "./pages/BookAppointment";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallback";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider defaultTheme="system" storageKey="doclink-theme">
            <PWAInstallPrompt />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="doctors" element={<FindDoctors />} />
                <Route path="about" element={<About />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="auth/callback" element={<AuthCallback />} />
                <Route path="forgot-password" element={<RequestPasswordReset />} />
                <Route path="reset-password" element={<ResetPassword />} />
                
                {/* Protected routes */}
                {/* Admin routes */}
                <Route 
                  path="admin/*" 
                  element={
                    <ProtectedRoute 
                      roles="admin"
                      permissions={['canManageUsers', 'canManageContent']}
                      redirectTo="/unauthorized"
                    >
                      <div>Admin Dashboard (Coming Soon)</div>
                    </ProtectedRoute>
                  } 
                />
                
                {/* Doctor routes */}
                <Route 
                  path="doctor/*" 
                  element={
                    <ProtectedRoute 
                      roles="doctor"
                      permissions={['canViewDashboard', 'canManageAppointments']}
                    >
                      <DoctorDashboard />
                    </ProtectedRoute>
                  } 
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DoctorDashboard />} />
                  <Route path="appointments" element={<div>Doctor Appointments</div>} />
                  <Route path="patients" element={<div>My Patients</div>} />
                  <Route path="schedule" element={<div>My Schedule</div>} />
                </Route>
                
                {/* Patient routes */}
                <Route 
                  path="patient/*" 
                  element={
                    <ProtectedRoute 
                      roles="patient"
                      permissions={['canViewDashboard']}
                    >
                      <PatientDashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<PatientDashboard />} />
                  <Route path="appointments" element={<div>My Appointments</div>} />
                  <Route path="medical-records" element={<div>Medical Records</div>} />
                  <Route path="prescriptions" element={<div>Prescriptions</div>} />
                </Route>
                
                {/* Common protected routes */}
                <Route 
                  path="profile/*" 
                  element={
                    <ProtectedRoute>
                      <ProfileSettings />
                    </ProtectedRoute>
                  } 
                >
                  <Route index element={<Navigate to="settings" replace />} />
                  <Route path="settings" element={<ProfileSettings />} />
                  <Route path="notifications" element={<div>Notification Settings</div>} />
                  <Route path="security" element={<div>Security Settings</div>} />
                </Route>
                
                <Route 
                  path="book-appointment" 
                  element={
                    <ProtectedRoute permissions={['canManageAppointments']}>
                      <BookAppointment />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Error pages */}
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              {/* Redirect old routes */}
              <Route path="/book" element={<Navigate to="/book-appointment" replace />} />
              <Route path="/doctor/dashboard" element={<Navigate to="/doctor/dashboard" replace />} />
              
              </Routes>
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

export default App;
