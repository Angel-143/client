import { type ReactNode } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Briefcase, FileText, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/constants';

const adminLinks = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/jobs-team', label: 'Jobs & Team', icon: Briefcase },
  { to: '/admin/pages', label: 'Pages & Messages', icon: FileText },
];

export function AdminLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-6 space-y-6">
            <div className="flex items-center justify-between">
              <Logo />
            </div>
            <nav className="space-y-1">
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-brand-600 text-white shadow-glow'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    )
                  }
                >
                  <link.icon size={18} />
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <Link to="/" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400">
              <ArrowLeft size={16} /> Back to site
            </Link>
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          {children ?? <Outlet />}
        </main>
      </div>
      {/* Mobile nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
        <div className="flex items-center justify-around">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn('flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-medium', isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400')
              }
            >
              <link.icon size={18} />
              {link.label.split(' ')[0]}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
