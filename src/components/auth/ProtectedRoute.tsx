import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types/database.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Required role(s) to access the route
   * Can be a single role or an array of roles
   */
  roles?: UserRole | UserRole[];
  /**
   * Required permissions to access the route
   * User must have all specified permissions
   */
  permissions?: Array<keyof import('@/providers/AuthProvider').UserPermissions>;
  /**
   * Redirect path when user is not authenticated
   * @default '/login'
   */
  redirectTo?: string;
  /**
   * Show loading state while checking auth status
   * @default true
   */
  showLoading?: boolean;
}

/**
 * A component that protects routes based on authentication status, roles, and permissions
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
  permissions = [],
  redirectTo = '/login',
  showLoading = true,
}) => {
  const { isAuthenticated, loading, hasRole, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading state if needed
  if (loading && showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if user has required role(s)
  if (roles) {
    const hasRequiredRole = hasRole(roles);
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  // Check if user has all required permissions
  if (permissions.length > 0) {
    const hasAllPermissions = permissions.every(permission => hasPermission(permission));
    if (!hasAllPermissions) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
