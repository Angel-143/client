import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

function AuthGate({ children, requireAdmin }: { children: ReactNode; requireAdmin?: boolean }) {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="flex min-h-screen items-center justify-center"><Logo showText={false} /><Loader2 size={20} className="ml-3 animate-spin text-brand-600" /></div>;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export function Protected({ children }: { children: ReactNode }) { return <AuthGate>{children}</AuthGate>; }
export function AdminProtected({ children }: { children: ReactNode }) { return <AuthGate requireAdmin>{children}</AuthGate>; }
