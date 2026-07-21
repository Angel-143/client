import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FullPageSpinner } from '../../components/ui/Spinner'

export function Protected({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageSpinner />
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />
  return <>{children}</>
}

export function AdminProtected({ children }: { children: React.ReactNode }) {
  const { session, isAdmin, loading } = useAuth()

  if (loading) return <FullPageSpinner />
  if (!session) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}
