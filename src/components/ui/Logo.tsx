import { Link } from 'react-router-dom'
import { cn } from '../../lib/constants'

type LogoProps = { className?: string; showText?: boolean; textClassName?: string; size?: 'sm' | 'md' | 'lg' }

export default function Logo({ className, showText = true, textClassName, size = 'md' }: LogoProps) {
  const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' }
  const textSizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' }
  return (
    <Link to="/" className={cn('flex items-center gap-2.5 group', className)}>
      <img
        src="/logo.svg"
        alt="Myclientwork"
        className={cn(sizes[size], 'rounded-lg transition-transform group-hover:scale-105')}
      />
      {showText && (
        <span className={cn('font-extrabold tracking-tight text-gray-900 dark:text-white', textSizes[size], textClassName)}>
          Myclient<span className="text-brand-600 dark:text-brand-400">work</span>
        </span>
      )}
    </Link>
  )
}
