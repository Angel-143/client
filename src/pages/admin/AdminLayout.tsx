import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Users, Package, FolderTree, ShoppingCart, Star,
  Mail, Settings, Briefcase, Users as TeamIcon,
} from 'lucide-react';
import { cn } from '@/lib/constants';

const items = [
  { to: '/admin', label: 'Analytics', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/messages', label: 'Contact Messages', icon: Mail },
  { to: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/admin/team', label: 'Team', icon: TeamIcon },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="container-page py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card overflow-hidden">
            <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between p-4 lg:hidden">
              <span className="font-semibold">Admin menu</span>
            </button>
            <nav className={cn('flex flex-col gap-1 p-3', !open && 'hidden lg:flex')}>
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  end={it.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-brand-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    )
                  }
                >
                  <it.icon size={16} /> {it.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
