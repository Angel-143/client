import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import {
  useAdminProjects, useAdminProfiles, useAdminOrders, useOrders, useContactMessages, useReviews, useCategories,
} from '@/hooks/useData';
// AdminProjects export removed — replaced by AdminProjectsWithForm in AdminJobsTeam.tsx
import { formatPrice, formatDate, cn } from '@/lib/constants';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';

export function AdminUsers() {
  const { data, isLoading } = useAdminProfiles();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">User Management</h1>
      <p className="mt-1 text-sm text-slate-500">All registered users with purchase details.</p>
      {isLoading ? <Skeleton className="mt-6 h-64 w-full" /> : (
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/50">
              <tr>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Purchases</th>
                <th className="p-4 font-semibold">Total Spend</th>
                <th className="p-4 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {(data ?? []).map((u: any) => (
                <tr key={u.id}>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                        {u.full_name?.[0]?.toUpperCase() ?? 'U'}
                      </span>
                      <span className="font-medium">{u.full_name || '—'}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-500">{u.email ?? '—'}</td>
                  <td className="p-4 text-slate-500">
                    {u.country_code && u.whatsapp_number ? `${u.country_code} ${u.whatsapp_number}` : '—'}
                  </td>
                  <td className="p-4">
                    <Badge variant={u.role === 'admin' ? 'brand' : 'slate'}>{u.role}</Badge>
                  </td>
                  <td className="p-4 text-slate-500">{u.order_count ?? 0}</td>
                  <td className="p-4 font-semibold">{formatPrice(u.total_spend ?? 0)}</td>
                  <td className="p-4 text-slate-500">{formatDate(u.created_at)}</td>
                </tr>
              ))}
              {(data ?? []).length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-slate-500">No users yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminCategories() {
  const { data, isLoading } = useCategories();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Categories</h1>
      <p className="mt-1 text-sm text-slate-500">Marketplace categories.</p>
      {isLoading ? <Skeleton className="mt-6 h-40 w-full" /> : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(data ?? []).map((c: any) => (
            <div key={c.id} className="card flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-slate-500">{c.slug}</p>
              </div>
              <Badge variant="slate">{c.icon ?? 'Code2'}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdminOrders() {
  const { data, isLoading } = useAdminOrders();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Orders</h1>
      <p className="mt-1 text-sm text-slate-500">All marketplace transactions with buyer details.</p>
      {isLoading ? <Skeleton className="mt-6 h-64 w-full" /> : (
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/50">
              <tr>
                <th className="p-4 font-semibold">Project</th>
                <th className="p-4 font-semibold">Buyer</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {(data ?? []).map((o: any) => (
                <tr key={o.id}>
                  <td className="p-4 font-medium">{o.project?.title ?? '—'}</td>
                  <td className="p-4">{o.buyer?.full_name ?? '—'}</td>
                  <td className="p-4 text-slate-500">{o.buyer?.email ?? '—'}</td>
                  <td className="p-4 text-slate-500">
                    {o.buyer?.country_code && o.buyer?.whatsapp_number
                      ? `${o.buyer.country_code} ${o.buyer.whatsapp_number}`
                      : '—'}
                  </td>
                  <td className="p-4 font-semibold">{formatPrice(Number(o.amount))}</td>
                  <td className="p-4"><Badge variant="accent">{o.status}</Badge></td>
                  <td className="p-4 text-slate-500">{formatDate(o.created_at)}</td>
                </tr>
              ))}
              {(data ?? []).length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-slate-500">No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminReviews() {
  const { data, isLoading } = useReviews();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Reviews</h1>
      <p className="mt-1 text-sm text-slate-500">User reviews across all projects.</p>
      {isLoading ? <Skeleton className="mt-6 h-40 w-full" /> : (
        <div className="mt-6 space-y-3">
          {(data ?? []).map((r: any) => (
            <div key={r.id} className="card p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{r.profile?.full_name ?? 'Anonymous'}</p>
                <span className="text-sm">{r.rating}★</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{r.comment}</p>
              <p className="mt-1 text-xs text-slate-400">{formatDate(r.created_at)}</p>
            </div>
          ))}
          {(data ?? []).length === 0 && (
            <p className="card p-8 text-center text-sm text-slate-500">No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export function AdminMessages() {
  const { data, isLoading } = useContactMessages();
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');
  const filtered = (data ?? []).filter((m) => filter === 'all' || m.status === filter);

  async function updateStatus(id: string, status: 'read' | 'archived') {
    const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id);
    if (error) toast.error('Failed to update');
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Contact Messages</h1>
      <p className="mt-1 text-sm text-slate-500">Messages submitted via the contact form.</p>
      <div className="mt-4 flex gap-2">
        {(['all', 'new', 'read', 'archived'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn('rounded-full px-3 py-1 text-xs font-medium capitalize', filter === f ? 'bg-brand-600 text-white' : 'border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300')}
          >
            {f}
          </button>
        ))}
      </div>
      {isLoading ? <Skeleton className="mt-6 h-64 w-full" /> : (
        <div className="mt-6 space-y-3">
          {filtered.map((m) => (
            <div key={m.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{m.name} <span className="text-xs font-normal text-slate-500">({m.email})</span></p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{m.subject}</p>
                </div>
                <Badge variant={m.status === 'new' ? 'brand' : 'slate'}>{m.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{m.message}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => updateStatus(m.id, 'read')} className="btn-ghost py-1 text-xs">Mark read</button>
                <button onClick={() => updateStatus(m.id, 'archived')} className="btn-ghost py-1 text-xs">Archive</button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="card p-8 text-center text-sm text-slate-500">No messages.</p>}
        </div>
      )}
    </div>
  );
}

export function AdminSettings() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-slate-500">Marketplace configuration.</p>
      <div className="card mt-6 max-w-lg space-y-4 p-6">
        <div>
          <label className="label">Marketplace name</label>
          <input className="input" defaultValue="MyClientWork" />
        </div>
        <div>
          <label className="label">Support email</label>
          <input className="input" defaultValue="hello@myclientwork.com" />
        </div>
        <div>
          <label className="label">Commission rate (%)</label>
          <input className="input" type="number" defaultValue={10} />
        </div>
        <button className="btn-primary" onClick={() => toast.success('Settings saved (demo)')}>Save settings</button>
      </div>
    </div>
  );
}
