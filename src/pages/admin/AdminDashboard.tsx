import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Package, ShoppingCart, DollarSign, TrendingUp, Star,
  ArrowUpRight, Mail,
} from 'lucide-react';
import { useAdminProjects, useAdminProfiles, useAdminOrders, useContactMessages, useReviews } from '@/hooks/useData';
import { formatPrice, formatNumber, formatDate } from '@/lib/constants';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminDashboard() {
  const { data: projects, isLoading: pLoading } = useAdminProjects();
  const { data: profiles } = useAdminProfiles();
  const { data: orders } = useAdminOrders();
  const { data: messages } = useContactMessages();
  const { data: reviews } = useReviews();

  const revenue = (orders ?? []).reduce((s: number, o: any) => s + Number(o.amount), 0);
  const avgRating = projects?.length
    ? (projects.reduce((s, p) => s + p.rating, 0) / projects.length).toFixed(2)
    : '—';

  const stats = [
    { label: 'Revenue', value: formatPrice(revenue), icon: DollarSign, color: 'text-accent-600 bg-accent-50 dark:bg-accent-500/10', delta: '+12.5%' },
    { label: 'Orders', value: formatNumber(orders?.length ?? 0), icon: ShoppingCart, color: 'text-brand-600 bg-brand-50 dark:bg-brand-500/10', delta: '+8.2%' },
    { label: 'Users', value: formatNumber(profiles?.length ?? 0), icon: Users, color: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10', delta: '+24.1%' },
    { label: 'Projects', value: formatNumber(projects?.length ?? 0), icon: Package, color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10', delta: '+3' },
  ];

  const cards = [
    { label: 'Avg. Rating', value: `${avgRating}★`, icon: Star },
    { label: 'Total Sales', value: formatNumber(projects?.reduce((s, p) => s + p.sales_count, 0) ?? 0), icon: TrendingUp },
    { label: 'New Messages', value: formatNumber(messages?.filter((m) => m.status === 'new').length ?? 0), icon: Mail },
    { label: 'Reviews', value: formatNumber(reviews?.length ?? 0), icon: Star },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Admin</p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">Dashboard Analytics</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Marketplace performance at a glance.</p>
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
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon size={18} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-accent-600">
                <ArrowUpRight size={12} /> {s.delta}
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card flex items-center gap-3 p-4">
            <c.icon size={18} className="text-brand-600" />
            <div>
              <p className="font-display text-lg font-bold">{c.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
            <h2 className="font-display text-lg font-bold">Top projects</h2>
            <Link to="/admin/projects" className="text-sm font-semibold text-brand-600">Manage</Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pLoading
              ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="p-4"><Skeleton className="h-10 w-full" /></div>)
              : (projects ?? []).slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.thumbnail_url ?? ''} alt="" className="h-10 w-14 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{p.title}</p>
                      <p className="text-xs text-slate-500">{formatNumber(p.sales_count)} sales</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(p.price)}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
            <h2 className="font-display text-lg font-bold">Recent messages</h2>
            <Link to="/admin/messages" className="text-sm font-semibold text-brand-600">View all</Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {(messages ?? []).slice(0, 5).map((m) => (
              <div key={m.id} className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{m.name}</p>
                  <span className="text-xs text-slate-400">{formatDate(m.created_at)}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{m.subject ?? m.message}</p>
              </div>
            ))}
            {(messages ?? []).length === 0 && (
              <p className="p-6 text-center text-sm text-slate-500">No messages yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
