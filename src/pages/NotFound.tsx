import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-extrabold text-brand-600 dark:text-brand-400">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-sm text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary mt-6"><HomeIcon size={18} /> Back to Home</Link>
    </div>
  );
}
