import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Package, Download, Heart, User, Bell, History,
} from 'lucide-react';
import { cn } from '@/lib/constants';

const items = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/projects', label: 'Purchased Projects', icon: Package },
  { to: '/dashboard/downloads', label: 'Downloads', icon: Download },
  { to: '/dashboard/favorites', label: 'Favorites', icon: Heart },
  { to: '/dashboard/orders', label: 'Order History', icon: History },
  { to: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { to: '/dashboard/profile', label: 'Profile Settings', icon: User },
];

export function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="container-page py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card overflow-hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex w-full items-center justify-between p-4 lg:hidden"
            >
              <span className="font-semibold">Menu</span>
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
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
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
