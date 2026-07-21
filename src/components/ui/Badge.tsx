import { cn } from '../../lib/constants'

type BadgeColor = 'brand' | 'green' | 'amber' | 'red' | 'gray'

interface BadgeProps {
  children: React.ReactNode
  color?: BadgeColor
  className?: string
}

const colors: Record<BadgeColor, string> = {
  brand: 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300',
  green: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  red: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}

export default function Badge({ children, color = 'gray', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', colors[color], className)}>
      {children}
    </span>
  )
}
