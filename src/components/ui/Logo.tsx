import { Link } from 'react-router-dom'
import { cn } from '../../lib/constants'

type LogoProps = {
  className?: string
  showText?: boolean
  textClassName?: string
}

export default function Logo({ className, showText = true, textClassName }: LogoProps) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5 group', className)}>
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
          <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
            <path d="M8 20L14 10L20 20" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.5 17H17.5" stroke="white" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="24" cy="12" r="3" fill="#93c5fd" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-xl bg-brand-400/40 blur-lg -z-10 group-hover:bg-brand-400/60 transition-colors" />
      </div>
      {showText && (
        <span className={cn('text-xl font-bold tracking-tight text-gray-900 dark:text-white', textClassName)}>
          MyClient<span className="text-brand-500">Work</span>
        </span>
      )}
    </Link>
  )
}
