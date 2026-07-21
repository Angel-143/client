import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/constants'

interface SpinnerProps {
  className?: string
  size?: number
}

export default function Spinner({ className, size = 24 }: SpinnerProps) {
  return <Loader2 className={cn('animate-spin text-brand-500', className)} size={size} />
}

export function FullPageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Spinner size={40} />
    </div>
  )
}
