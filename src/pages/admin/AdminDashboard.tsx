import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderKanban, Users, Mail, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatNumber, formatDateTime } from '@/lib/constants';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const [projects, orders, messages, profiles] = await Promise.all([
        supabase.from('projects').select('*'),
        supabase.from('orders').select('*'),
        supabase.from('contact_messages').select('*'),
        supabase.from('profiles').select('*'),
      ]);
      return {
        projects: projects.data ?? [],
        orders: orders.data ?? [],
        messages: messages.data ?? [],
        profiles: profiles.data ?? [],
      };
    },
  });

  const totalRevenue = stats?.orders.reduce((sum, o) => sum + Number(o.amount), 0) ?? 0;
  const newMessages = stats?.messages.filter((m) => m.status === 'new').length ?? 0;

  const cards = [
    { icon: FolderKanban, label: 'Projects', value: stats?.projects.length ?? 0, color: 'text-brand-600 bg-brand-50 dark:bg-brand-500/10 dark:text-brand-400', link: '/admin/projects' },
    { icon: Users, label: 'Users', value: stats?.profiles.length ?? 0, color: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10 dark:text-violet-400' },
    { icon: Mail, label: 'Messages', value: stats?.messages.length ?? 0, sub: `${newMessages} new`, color: 'text-accent-600 bg-accent-50 dark:bg-accent-500/10 dark:text-accent-400', link: '/admin/pages' },
    { icon: DollarSign, label: 'Revenue', value: formatPrice(totalRevenue), color: 'text-success-600 bg-success-50 dark:bg-success-500/10 dark:text-success-500' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your marketplace at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)
          : cards.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="card p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{c.label}</p>
                      <p className="mt-1 font-display text-2xl font-bold">{c.value}</p>
                      {c.sub && <p className="text-xs text-brand-600 dark:text-brand-400">{c.sub}</p>}
                    </div>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.color}`}><c.icon size={20} /></div>
                  </div>
                  {c.link && (
                    <Link to={c.link} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                      View <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 font-display text-lg font-bold">Top Projects</h2>
          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {(stats?.projects ?? []).sort((a, b) => b.sales_count - a.sales_count).slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <img src={p.thumbnail_url ?? ''} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{p.title}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500"><TrendingUp size={12} /> {formatNumber(p.sales_count)} sales</p>
                  </div>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-display text-lg font-bold">Recent Messages</h2>
          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {(stats?.messages ?? []).slice(0, 5).map((m) => (
              <div key={m.id} className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{m.name}</p>
                  <Badge variant={m.status === 'new' ? 'brand' : 'neutral'}>{m.status}</Badge>
                </div>
                <p className="mt-1 truncate text-xs text-slate-500">{m.subject}</p>
                <p className="mt-0.5 text-xs text-slate-400">{formatDateTime(m.created_at)}</p>
              </div>
            ))}
            {(!stats?.messages || stats.messages.length === 0) && <p className="p-4 text-sm text-slate-400">No messages yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
