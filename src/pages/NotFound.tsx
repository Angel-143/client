import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center">
        <p className="text-8xl font-bold bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block"><Button><Home size={16} /> Back to Home</Button></Link>
      </div>
    </div>
  )
}
