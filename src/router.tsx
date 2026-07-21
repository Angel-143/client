import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { useAuth } from '@/context/AuthContext';
import type { JSX } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';
import { DashboardLayout } from '@/pages/dashboard/DashboardLayout';
import {
  DashboardProjects,
  DashboardDownloads,
  DashboardFavorites,
  DashboardOrders,
  DashboardNotifications,
  DashboardProfile,
} from '@/pages/dashboard/DashboardPages';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import {
  AdminUsers,
  AdminCategories,
  AdminOrders,
  AdminReviews,
  AdminMessages,
  AdminSettings,
} from '@/pages/admin/AdminPages';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetails = lazy(() => import('@/pages/ProjectDetails'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const AuthCallback = lazy(() => import('@/pages/AuthCallback'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const LegalPage = lazy(() => import('@/pages/LegalPage'));
const Jobs = lazy(() => import('@/pages/Jobs'));
import { AdminJobs, AdminTeam, AdminProjectsWithForm } from '@/pages/admin/AdminJobsTeam';

function withSuspense(el: JSX.Element) {
  return <Suspense fallback={<PageLoader />}>{el}</Suspense>;
}

// Redirects already-logged-in users away from auth pages.
function GuestOnly({ children }: { children: JSX.Element }) {
  const { profile, loading, isAdmin } = useAuth();
  if (loading) return <PageLoader />;
  if (profile) return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />;
  return children;
}

function Protected({ children, admin = false }: { children: JSX.Element; admin?: boolean }) {
  const { profile, loading, isAdmin } = useAuth();
  if (loading) return <PageLoader />;
  if (!profile) return <Navigate to="/login" replace />;
  if (admin && !isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: 'about', element: withSuspense(<About />) },
      { path: 'projects', element: withSuspense(<Projects />) },
      { path: 'projects/:slug', element: withSuspense(<ProjectDetails />) },
      { path: 'jobs', element: withSuspense(<Jobs />) },
      { path: 'contact', element: withSuspense(<Contact />) },
      { path: 'login', element: withSuspense(<GuestOnly><Login /></GuestOnly>) },
      { path: 'register', element: withSuspense(<GuestOnly><Register /></GuestOnly>) },
      { path: 'forgot-password', element: withSuspense(<ForgotPassword />) },
      { path: 'auth/callback', element: withSuspense(<AuthCallback />) },
      {
        path: 'dashboard',
        element: withSuspense(<Protected><DashboardLayout /></Protected>),
        children: [
          { index: true, element: withSuspense(<Dashboard />) },
          { path: 'projects', element: <DashboardProjects /> },
          { path: 'downloads', element: <DashboardDownloads /> },
          { path: 'favorites', element: <DashboardFavorites /> },
          { path: 'orders', element: <DashboardOrders /> },
          { path: 'notifications', element: <DashboardNotifications /> },
          { path: 'profile', element: <DashboardProfile /> },
        ],
      },
      {
        path: 'admin',
        element: withSuspense(<Protected admin><AdminLayout /></Protected>),
        children: [
          { index: true, element: withSuspense(<AdminDashboard />) },
          { path: 'users', element: <AdminUsers /> },
          { path: 'projects', element: <AdminProjectsWithForm /> },
          { path: 'categories', element: <AdminCategories /> },
          { path: 'orders', element: <AdminOrders /> },
          { path: 'reviews', element: <AdminReviews /> },
          { path: 'messages', element: <AdminMessages /> },
          { path: 'jobs', element: <AdminJobs /> },
          { path: 'team', element: <AdminTeam /> },
          { path: 'settings', element: <AdminSettings /> },
        ],
      },
      { path: 'privacy', element: withSuspense(<LegalPage kind="privacy" />) },
      { path: 'terms', element: withSuspense(<LegalPage kind="terms" />) },
      { path: 'refund', element: withSuspense(<LegalPage kind="refund" />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
]);
