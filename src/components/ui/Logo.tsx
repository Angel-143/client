import { Link } from 'react-router-dom';
import { cn } from '@/lib/constants';

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5', className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow transition-transform hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M6 18V6h2.2l4.8 7V6H15v12h-2.2L8 11v7H6z" fill="currentColor" /></svg>
      </span>
      {showText && <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">MyClient<span className="text-brand-600 dark:text-brand-400">Work</span></span>}
    </Link>
  );
}
