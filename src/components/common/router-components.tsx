import { AuthGuard } from '@/components/common/auth-guard.tsx';
import { useAuthContext } from '@/hooks/use-auth-context';
import { AuthLayout } from '@/layout/AuthLayout.tsx';
import { DefaultLayout } from '@/layout/DefaultLayout.tsx';
import AuthContextProvider from '@/providers/auth-context-provider.tsx';
// import { Role } from '@/types/common.ts';
import { Navigate } from 'react-router';

/**
 * MainLayoutWrapper component with auth context and default layout
 */
export function MainLayoutWrapper() {
  return (
    <AuthContextProvider>
      <AuthGuard>
        <DefaultLayout />
      </AuthGuard>
    </AuthContextProvider>
  );
}

/**
 * AuthLayoutWrapper component with auth context and auth layout
 */
export function AuthLayoutWrapper() {
  return (
    <AuthContextProvider>
      <AuthLayout />
    </AuthContextProvider>
  );
}

/**
 * RootRedirect component to redirect based on user role
 * - Developers are redirected to time-tracking
 * - Other roles are redirected home
 */
export function RootRedirect() {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  // // Redirect developers to the time-tracking page by default
  // if (currentUser?.role === Role.DEVELOPER) {
  //   return <Navigate to="/time-tracking" replace />;
  // }

  // Redirect other roles to the home page
  return <Navigate to="/profile" replace />;
}
