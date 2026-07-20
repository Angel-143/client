import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Download, Heart, DollarSign, TrendingUp, Bell, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOrders, useFavorites } from '@/hooks/useData';
import { formatPrice, formatNumber, formatDate } from '@/lib/constants';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Dashboard() {
  const { profile } = useAuth();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: favorites } = useFavorites();

  const totalSpent = (orders ?? []).reduce((sum, o) => sum + Number(o.amount), 0);

  const stats = [
    { label: 'Purchased', value: formatNumber(orders?.length ?? 0), icon: Package, color: 'text-brand-600 bg-brand-50 dark:bg-brand-500/10' },
    { label: 'Downloads', value: formatNumber(orders?.length ?? 0), icon: Download, color: 'text-accent-600 bg-accent-50 dark:bg-accent-500/10' },
    { label: 'Favorites', value: formatNumber(favorites?.length ?? 0), icon: Heart, color: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10' },
    { label: 'Total spent', value: formatPrice(totalSpent), icon: DollarSign, color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back, {profile?.full_name?.split(' ')[0] ?? 'Developer'} 👋
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Here is an overview of your account.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="card p-5"
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon size={18} />
            </div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
            <h2 className="font-display text-lg font-bold">Recent orders</h2>
            <Link to="/dashboard/orders" className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
              View all <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {ordersLoading ? (
              Array.from({ length: 3 }).map((_, i) => <div key={i} className="p-5"><Skeleton className="h-12 w-full" /></div>)
            ) : (orders ?? []).length === 0 ? (
              <div className="p-8 text-center">
                <Package size={28} className="mx-auto text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">No purchases yet.</p>
                <Link to="/projects" className="btn-secondary mt-4">Browse projects</Link>
              </div>
            ) : (
              (orders ?? []).slice(0, 5).map((o: any) => (
                <div key={o.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-3">
                    <img src={o.project?.thumbnail_url} alt="" className="h-10 w-14 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{o.project?.title}</p>
                      <p className="text-xs text-slate-500">{formatDate(o.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatPrice(Number(o.amount))}</p>
                    <span className="text-xs text-accent-600">{o.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 border-b border-slate-100 p-5 dark:border-slate-800">
            <Bell size={18} className="text-brand-600" />
            <h2 className="font-display text-lg font-bold">Notifications</h2>
          </div>
          <div className="space-y-3 p-5">
            {[
              { title: 'Welcome to MyClientWork', body: 'Thanks for joining! Browse our featured projects.', time: 'Just now' },
              { title: 'New projects this week', body: '3 new premium projects were added.', time: '2d ago' },
              { title: 'Update available', body: 'Nexus Analytics Dashboard v1.2 is out.', time: '5d ago' },
            ].map((n) => (
              <div key={n.title} className="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{n.body}</p>
                <p className="mt-1 text-[11px] text-slate-400">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
