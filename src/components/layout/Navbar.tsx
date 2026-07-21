import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, cn } from '../../lib/constants'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { session, profile, isAdmin, signOut } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => { await signOut(); setUserMenuOpen(false); navigate('/') }

  return (
    <header className={cn('sticky top-0 z-50 transition-all duration-300', scrolled ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800' : 'bg-transparent')}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const active = location.pathname === link.href
              return (
                <Link key={link.href} to={link.href} className={cn('relative px-4 py-2 text-sm font-medium rounded-lg transition-colors', active ? 'text-brand-600 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white')}>
                  {link.label}
                  {active && <motion.div layoutId="navIndicator" className="absolute inset-0 bg-brand-50 dark:bg-brand-900/30 rounded-lg -z-10" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                </Link>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {session ? (
              <div className="relative hidden md:block">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-semibold">{profile?.full_name?.[0]?.toUpperCase() || 'U'}</div>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{profile?.full_name || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
                        </div>
                        {isAdmin && <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"><LayoutDashboard size={16} /> Dashboard</Link>}
                        <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"><LogOut size={16} /> Sign Out</button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
                <Link to="/register"><Button size="sm">Get Started</Button></Link>
              </div>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className={cn('block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors', location.pathname === link.href ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800')}>{link.label}</Link>
              ))}
              {!session && (
                <div className="pt-2 flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)}><Button variant="outline" size="sm" className="w-full">Sign In</Button></Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}><Button size="sm" className="w-full">Get Started</Button></Link>
                </div>
              )}
              {session && <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full rounded-lg"><LogOut size={16} /> Sign Out</button>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
