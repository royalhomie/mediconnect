import React, { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { Profile } from '@/types/database.types';
import { useAuth as useSupabaseAuth } from '@/hooks/useAuth';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface UserPermissions {
  canViewDashboard: boolean;
  canManageAppointments: boolean;
  canViewMedicalRecords: boolean;
  canManageUsers: boolean;
  canManageContent: boolean;
  canViewReports: boolean;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  role: UserRole;
  permissions: UserPermissions;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasAllRoles: (roles: UserRole[]) => boolean;
  hasPermission: (permission: keyof UserPermissions) => boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string, userData: { full_name: string; role: UserRole }) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<Profile>;
  refreshSession: () => Promise<any>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<void>;
}

const defaultPermissions: UserPermissions = {
  canViewDashboard: false,
  canManageAppointments: false,
  canViewMedicalRecords: false,
  canManageUsers: false,
  canManageContent: false,
  canViewReports: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getRolePermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'admin':
      return {
        canViewDashboard: true,
        canManageAppointments: true,
        canViewMedicalRecords: true,
        canManageUsers: true,
        canManageContent: true,
        canViewReports: true,
      };
    case 'doctor':
      return {
        canViewDashboard: true,
        canManageAppointments: true,
        canViewMedicalRecords: true,
        canManageUsers: false,
        canManageContent: false,
        canViewReports: true,
      };
    case 'patient':
    default:
      return {
        canViewDashboard: true,
        canManageAppointments: true,
        canViewMedicalRecords: false,
        canManageUsers: false,
        canManageContent: false,
        canViewReports: false,
      };
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    user,
    profile,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshSession,
    resetPassword,
    updatePassword,
  } = useSupabaseAuth();

  const role = useMemo<UserRole>(() => {
    if (!isAuthenticated || !user) return 'patient';
    // First check profile role, then fallback to email-based detection
    return (profile?.role as UserRole) || 'patient';
  }, [isAuthenticated, user, profile]);

  const permissions = useMemo<UserPermissions>(() => {
    if (!isAuthenticated) return defaultPermissions;
    return getRolePermissions(role);
  }, [isAuthenticated, role]);

  const hasRole = useCallback((checkRole: UserRole | UserRole[]): boolean => {
    if (!isAuthenticated) return false;
    if (Array.isArray(checkRole)) {
      return checkRole.includes(role);
    }
    return role === checkRole;
  }, [isAuthenticated, role]);

  const hasAnyRole = useCallback((roles: UserRole[]): boolean => {
    if (!isAuthenticated) return false;
    return roles.some(r => hasRole(r));
  }, [isAuthenticated, hasRole]);

  const hasAllRoles = useCallback((roles: UserRole[]): boolean => {
    if (!isAuthenticated) return false;
    return roles.every(r => hasRole(r));
  }, [isAuthenticated, hasRole]);

  const hasPermission = useCallback((permission: keyof UserPermissions): boolean => {
    if (!isAuthenticated) return false;
    return permissions[permission] || false;
  }, [isAuthenticated, permissions]);

  const isAdmin = hasRole('admin');

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthenticated,
        role: (profile?.role as UserRole) || 'patient',
        permissions: getRolePermissions((profile?.role as UserRole) || 'patient'),
        hasRole,
        hasAnyRole,
        hasAllRoles,
        hasPermission,
        isAdmin: hasRole('admin'),
        signIn,
        signUp,
        signOut,
        updateProfile,
        refreshSession,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
