import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon, LayoutDashboard, Shield, LogOut, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS, cn } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import toast from 'react-hot-toast';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [navRects, setNavRects] = useState<DOMRect[]>([]);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, isAdmin, signOut } = useAuth();
  const { theme, toggle } = useTheme();
  const isAuth = Boolean(profile);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setNavRects(navRefs.current.map((el) => el?.getBoundingClientRect()).filter(Boolean) as DOMRect[]);
  }, []);

  async function handleSignOut() {
    await signOut();
    toast.success('Signed out');
    navigate('/');
  }

  const indicatorStyle = (() => {
    const i = hoveredNav;
    if (i == null || !navRects[i]) return { opacity: 0 };
    const parent = navRefs.current[0]?.parentElement?.getBoundingClientRect();
    if (!parent) return { opacity: 0 };
    return {
      opacity: 1,
      x: navRects[i].left - parent.left,
      width: navRects[i].width,
    };
  })();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/80'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav with sliding pill indicator */}
        <div
          className="relative hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHoveredNav(null)}
        >
          <motion.div
            className="absolute top-1/2 h-9 -translate-y-1/2 rounded-lg bg-slate-100 dark:bg-slate-800/80"
            animate={indicatorStyle}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              ref={(el) => { navRefs.current[i] = el; }}
              onMouseEnter={() => setHoveredNav(i)}
              className={({ isActive }) =>
                cn(
                  'relative z-10 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!isAuth ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium transition-all hover:shadow-soft active:scale-95 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-xs font-bold text-white">
                  {profile?.full_name?.[0]?.toUpperCase() ?? 'U'}
                </span>
                <span className="max-w-[120px] truncate">{profile?.full_name || 'User'}</span>
                <ChevronDown size={14} className={cn('transition-transform', menuOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-card dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="border-b border-slate-100 px-4 py-2 dark:border-slate-800">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {profile?.full_name}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {profile?.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Shield size={16} /> Admin Dashboard
                      </Link>
                    )}
                    <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-error-700 transition-colors hover:bg-error-50 dark:text-red-300 dark:hover:bg-red-500/10"
                    >
                      <LogOut size={16} /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/95 md:hidden"
          >
            <div className="container-page space-y-1 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="my-2 h-px bg-slate-100 dark:bg-slate-800" />
              {!isAuth ? (
                <div className="flex gap-2">
                  <Link to="/login" className="btn-secondary flex-1">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary flex-1">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Shield size={16} /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-error-700 transition-colors hover:bg-error-50 dark:text-red-300 dark:hover:bg-red-500/10"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
