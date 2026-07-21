import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './components/layout/PublicLayout'
import { AdminProtected } from './components/auth/Protected'
import AdminLayout from './components/layout/AdminLayout'
import Spinner from './components/ui/Spinner'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'))
const AdminJobsTeam = lazy(() => import('./pages/admin/AdminJobsTeam'))
const AdminPages = lazy(() => import('./pages/admin/AdminPages'))

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60, refetchOnWindowFocus: false } } })

function PageLoader() { return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size={32} /></div> }

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminProtected><AdminLayout /></AdminProtected>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="jobs-team" element={<AdminJobsTeam />} />
                  <Route path="pages" element={<AdminPages />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: '12px', background: '#1f2937', color: '#fff' } }} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
