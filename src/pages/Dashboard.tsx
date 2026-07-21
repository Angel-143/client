import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, TrendingUp, Package, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Skeleton, EmptyState } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDate } from '@/lib/constants';

export default function Dashboard() {
  const { profile } = useAuth();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders', profile?.id],
    queryFn: async () => {
      const { data } = await supabase.from('orders').select('*, project:projects(*)').eq('user_id', profile!.id).order('created_at', { ascending: false });
      return data ?? [];
    },
    enabled: Boolean(profile?.id),
  });

  const { data: favorites, isLoading: favLoading } = useQuery({
    queryKey: ['favorites', profile?.id],
    queryFn: async () => {
      const { data } = await supabase.from('favorites').select('*, project:projects(*)').eq('user_id', profile!.id).order('created_at', { ascending: false });
      return data ?? [];
    },
    enabled: Boolean(profile?.id),
  });

  const totalSpent = orders?.reduce((sum, o) => sum + Number(o.amount), 0) ?? 0;
  const stats = [
    { icon: ShoppingBag, label: 'Orders', value: orders?.length ?? 0, color: 'text-brand-600 bg-brand-50 dark:bg-brand-500/10 dark:text-brand-400' },
    { icon: Heart, label: 'Favorites', value: favorites?.length ?? 0, color: 'text-error-600 bg-error-50 dark:bg-error-500/10 dark:text-error-500' },
    { icon: TrendingUp, label: 'Total Spent', value: formatPrice(totalSpent), color: 'text-success-600 bg-success-50 dark:bg-success-500/10 dark:text-success-500' },
  ];

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Welcome, {profile?.full_name?.split(' ')[0] ?? 'Developer'}</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Manage your purchases and saved projects.</p>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p><p className="mt-1 font-display text-2xl font-bold">{s.value}</p></div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}><s.icon size={20} /></div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="mb-4 font-display text-xl font-bold">Recent Orders</h2>
        {ordersLoading ? <Skeleton className="h-48 w-full rounded-2xl" /> : orders && orders.length > 0 ? (
          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"><Package size={18} /></div>
                  <div><p className="text-sm font-semibold text-slate-900 dark:text-white">{o.project?.title ?? 'Project'}</p><p className="text-xs text-slate-500">{formatDate(o.created_at)}</p></div>
                </div>
                <div className="flex items-center gap-3"><Badge variant={o.status === 'completed' ? 'success' : 'neutral'}>{o.status}</Badge><span className="font-semibold text-slate-900 dark:text-white">{formatPrice(o.amount)}</span></div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={ShoppingBag} title="No orders yet" description="Browse the marketplace and purchase your first project." action={<Link to="/projects" className="btn-primary mt-4">Browse Projects</Link>} />
        )}
      </div>
      <div>
        <h2 className="mb-4 font-display text-xl font-bold">Saved Projects</h2>
        {favLoading ? <Skeleton className="h-48 w-full rounded-2xl" /> : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((f) => (
              <Link key={f.id} to={`/projects/${f.project?.slug}`} className="card-hover group p-4">
                <div className="flex items-center gap-3">
                  <img src={f.project?.thumbnail_url ?? ''} alt="" className="h-14 w-14 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{f.project?.title}</p><p className="text-xs text-slate-500">{f.project?.category?.name}</p></div>
                  <ArrowUpRight size={16} className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState icon={Heart} title="No saved projects" description="Click the heart icon on any project to save it here." />
        )}
      </div>
    </div>
  );
}
