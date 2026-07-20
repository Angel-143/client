import { Link } from 'react-router-dom';
import { cn } from '@/lib/constants';

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2 group', className)} aria-label="MyClientWork">
      <img
        src="/1784378767326.png"
        alt="MyClientWork logo"
        className="h-10 w-10 rounded-full object-cover flex-shrink-0 transition-transform group-hover:scale-105"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          My<span className="text-brand-600">Client</span>Work
        </span>
      )}
    </Link>
  );
}
