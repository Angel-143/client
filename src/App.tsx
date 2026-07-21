import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Protected, AdminProtected } from '@/components/layout/Protected';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Loader2 } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60, retry: 1, refetchOnWindowFocus: false } },
});

const Home = lazy(() => import('@/pages/Home'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetails = lazy(() => import('@/pages/ProjectDetails'));
const About = lazy(() => import('@/pages/About'));
const Jobs = lazy(() => import('@/pages/Jobs'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const AuthCallback = lazy(() => import('@/pages/AuthCallback'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('@/pages/admin/AdminProjects'));
const AdminJobsTeam = lazy(() => import('@/pages/admin/AdminJobsTeam'));
const AdminPages = lazy(() => import('@/pages/admin/AdminPages'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="animate-spin text-brand-600" /></div>}>{element}</Suspense>;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth/callback" element={withSuspense(<AuthCallback />)} />
              <Route path="/login" element={withSuspense(<Login />)} />
              <Route path="/register" element={withSuspense(<Register />)} />
              <Route path="/forgot-password" element={withSuspense(<ForgotPassword />)} />

              <Route path="/" element={<PublicLayout>{withSuspense(<Home />)}</PublicLayout>} />
              <Route path="/projects" element={<PublicLayout>{withSuspense(<Projects />)}</PublicLayout>} />
              <Route path="/projects/:slug" element={<PublicLayout>{withSuspense(<ProjectDetails />)}</PublicLayout>} />
              <Route path="/about" element={<PublicLayout>{withSuspense(<About />)}</PublicLayout>} />
              <Route path="/jobs" element={<PublicLayout>{withSuspense(<Jobs />)}</PublicLayout>} />
              <Route path="/contact" element={<PublicLayout>{withSuspense(<Contact />)}</PublicLayout>} />

              <Route path="/dashboard" element={<Protected>{withSuspense(<Dashboard />)}</Protected>} />

              <Route path="/admin" element={<AdminProtected><AdminLayout>{withSuspense(<AdminDashboard />)}</AdminLayout></AdminProtected>} />
              <Route path="/admin/projects" element={<AdminProtected><AdminLayout>{withSuspense(<AdminProjects />)}</AdminLayout></AdminProtected>} />
              <Route path="/admin/jobs-team" element={<AdminProtected><AdminLayout>{withSuspense(<AdminJobsTeam />)}</AdminLayout></AdminProtected>} />
              <Route path="/admin/pages" element={<AdminProtected><AdminLayout>{withSuspense(<AdminPages />)}</AdminLayout></AdminProtected>} />

              <Route path="*" element={<PublicLayout>{withSuspense(<NotFound />)}</PublicLayout>} />
            </Routes>
            <Toaster position="top-right" toastOptions={{ className: '!bg-white !text-slate-900 dark:!bg-slate-900 dark:!text-white !rounded-xl !border !border-slate-200 dark:!border-slate-700 !shadow-card' }} />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
