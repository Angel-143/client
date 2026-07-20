import { Star } from 'lucide-react';
import { cn } from '@/lib/constants';

export function Rating({
  value,
  size = 14,
  showValue = false,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const half = i === full && hasHalf;
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled || half ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
              )}
              fill={filled ? 'currentColor' : half ? 'url(#half)' : 'none'}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          {value.toFixed(1)}
        </span>
      )}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
