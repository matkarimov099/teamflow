import { NotAccess } from '@/components/common/not-access';
import { NotFound } from '@/components/common/not-found';
import {
  AuthLayoutWrapper,
  MainLayoutWrapper,
  RootRedirect,
} from '@/components/common/router-components.tsx';
import { authRoutes } from '@/router/auth-routes.tsx';
import { mainRoutes } from '@/router/main-routes.tsx';
import { createBrowserRouter } from 'react-router';

/**
 * Application router without internationalization
 */
export const router = createBrowserRouter([
  // Root path redirect to dashboard
  {
    path: '/',
    element: <RootRedirect />,
  },

  // Main application routes
  {
    path: '/',
    element: <MainLayoutWrapper />,
    children: mainRoutes,
  },

  // Auth routes
  {
    path: '/auth',
    element: <AuthLayoutWrapper />,
    children: authRoutes,
  },

  // Error pages
  {
    path: '/not-access',
    element: <NotAccess />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
