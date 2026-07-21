import { cn } from '@/lib/constants';

type Variant = 'brand' | 'violet' | 'accent' | 'success' | 'warning' | 'error' | 'neutral' | 'outline';

const variants: Record<Variant, string> = {
  brand:   'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
  violet:  'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  accent:  'bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300',
  success: 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
  warning: 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500',
  error:   'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-600',
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  outline: 'border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300',
};

export function Badge({
  variant = 'neutral',
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn('badge', variants[variant], className)}>
      {children}
    </span>
  );
}
