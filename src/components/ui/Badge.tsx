import type { ReactNode } from 'react';
import { cn } from '@/lib/constants';

type Variant = 'brand' | 'accent' | 'slate' | 'warning' | 'error' | 'outline';
const variants: Record<Variant, string> = {
  brand: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
  accent: 'bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300',
  slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  warning: 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-amber-300',
  error: 'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-red-300',
  outline: 'border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300',
};

export function Badge({
  children,
  variant = 'slate',
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return <span className={cn('badge', variants[variant], className)}>{children}</span>;
}
