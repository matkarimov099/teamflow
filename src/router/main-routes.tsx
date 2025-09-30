import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { PageTitle } from '@/components/common/page-title.tsx';
import AIAgents from '@/pages/ai-agents/AIAgents.tsx';
import Settings from '@/pages/settings/Settings.tsx';
import { lazy } from 'react';
import { Navigate } from 'react-router';
import type { RouteObject } from 'react-router';

// Lazy load all main components for better code splitting
const Home = lazy(() => import('@/pages/home/Home.tsx'));
const Dashboard = lazy(() => import('@/pages/dashboard/index.tsx'));
const Users = lazy(() => import('@/pages/users/Users.tsx'));
const Projects = lazy(() => import('@/pages/projects/Projects.tsx'));
const Analysis = lazy(() => import('@/pages/analysis/Analysis.tsx'));
const CreateAnalysis = lazy(() => import('@/pages/analysis/CreateAnalysis.tsx'));
const UserStats = lazy(() => import('@/pages/user-stats/UserStats.tsx'));

/**
 * Main application routes with required authentication
 */
export const mainRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="home" replace />,
  },
  {
    path: 'home',
    element: (
      <LazyComponent>
        <PageTitle title="Home" />
        <Home />
      </LazyComponent>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <LazyComponent>
        <PageTitle title="Dashboard" />
        <Dashboard />
      </LazyComponent>
    ),
  },
  {
    path: 'users',
    element: (
      <LazyComponent>
        <PageTitle title="Users" />
        <Users />
      </LazyComponent>
    ),
  },
  {
    path: 'ai-agents',
    element: (
      <LazyComponent>
        <PageTitle title="AI Agents" />
        <AIAgents />
      </LazyComponent>
    ),
  },
  {
    path: 'projects',
    element: (
      <LazyComponent>
        <PageTitle title="Projects" />
        <Projects />
      </LazyComponent>
    ),
  },
  {
    path: 'analysis',
    element: (
      <LazyComponent>
        <PageTitle title="Analysis" />
        <Analysis />
      </LazyComponent>
    ),
  },
  {
    path: 'analysis/create',
    element: (
      <LazyComponent>
        <PageTitle title="Create Analysis" />
        <CreateAnalysis />
      </LazyComponent>
    ),
  },
  {
    path: 'user-stats',
    element: (
      <LazyComponent>
        <PageTitle title="GitHub User Stats" />
        <UserStats />
      </LazyComponent>
    ),
  },
  {
    path: 'settings',
    element: (
      <LazyComponent>
        <PageTitle title="Settings" />
        <Settings />
      </LazyComponent>
    ),
  },
];
