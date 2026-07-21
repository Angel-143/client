import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, Briefcase, FileText, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/constants'

const adminLinks = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/jobs-team', label: 'Jobs & Team', icon: Briefcase },
  { href: '/admin/pages', label: 'Pages & Messages', icon: FileText },
]

export default function AdminLayout() {
  const location = useLocation()
  const { profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800">
          <Logo />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map((link) => {
            const active = location.pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors relative',
                  active
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="adminNav"
                    className="absolute inset-0 bg-brand-50 dark:bg-brand-900/30 rounded-xl -z-10"
                  />
                )}
                <Icon size={18} />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
            <Home size={16} /> Back to Site
          </Link>
          <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl w-full mt-1">
            Sign Out
          </button>
          <div className="mt-3 px-4 text-xs text-gray-400">
            Signed in as {profile?.full_name || profile?.email}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
          <Logo />
          <Link to="/" className="text-sm text-gray-500 flex items-center gap-1">
            <Home size={16} /> Exit
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around py-2 z-50">
          {adminLinks.map((link) => {
            const active = location.pathname === link.href
            const Icon = link.icon
            return (
              <Link key={link.href} to={link.href} className={cn('flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg', active ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500')}>
                <Icon size={20} />
                <span className="text-[10px]">{link.label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
