import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useOrders, useFavorites } from '@/hooks/useData';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { formatPrice, formatDate } from '@/lib/constants';
import { Skeleton } from '@/components/ui/Skeleton';

export function DashboardProjects() {
  const { data: orders, isLoading } = useOrders();
  if (isLoading) return <Skeleton className="h-64 w-full" />;
  const list = orders ?? [];
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Purchased Projects</h1>
      <p className="mt-1 text-sm text-slate-500">All the projects you have bought.</p>
      {list.length === 0 ? (
        <Empty />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {list.map((o: any) => (
            <div key={o.id} className="card overflow-hidden">
              <img src={o.project?.thumbnail_url} alt="" className="aspect-video w-full object-cover" />
              <div className="p-4">
                <Link to={`/projects/${o.project?.slug}`} className="font-display font-bold hover:text-brand-600">{o.project?.title}</Link>
                <p className="mt-1 text-xs text-slate-500">Purchased {formatDate(o.created_at)} • {formatPrice(Number(o.amount))}</p>
                <div className="mt-3 flex gap-2">
                  <button className="btn-primary flex-1 py-2"><Download size={14} /> Download</button>
                  <Link to={`/projects/${o.project?.slug}`} className="btn-secondary px-3 py-2"><Eye size={14} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DashboardDownloads() {
  const { data: orders, isLoading } = useOrders();
  if (isLoading) return <Skeleton className="h-64 w-full" />;
  const list = orders ?? [];
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Downloads</h1>
      <p className="mt-1 text-sm text-slate-500">Download your purchased source code.</p>
      {list.length === 0 ? <Empty /> : (
        <div className="mt-6 space-y-3">
          {list.map((o: any) => (
            <div key={o.id} className="card flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <img src={o.project?.thumbnail_url} alt="" className="h-10 w-14 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-semibold">{o.project?.title}</p>
                  <p className="text-xs text-slate-500">v1.0 • ZIP • {formatDate(o.created_at)}</p>
                </div>
              </div>
              <button className="btn-primary py-2"><Download size={14} /> Download</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DashboardFavorites() {
  const { data: favorites, isLoading } = useFavorites();
  if (isLoading) return <Skeleton className="h-64 w-full" />;
  const list = favorites ?? [];
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Favorites</h1>
      <p className="mt-1 text-sm text-slate-500">Projects you have saved for later.</p>
      {list.length === 0 ? <Empty label="No favorites yet" /> : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {list.map((f: any) => (
            <Link key={f.id} to={`/projects/${f.project?.slug}`} className="card flex gap-3 p-4 hover:border-brand-300">
              <img src={f.project?.thumbnail_url} alt="" className="h-16 w-24 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-semibold">{f.project?.title}</p>
                <p className="text-xs text-slate-500">{formatPrice(f.project?.price ?? 0)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function DashboardOrders() {
  const { data: orders, isLoading } = useOrders();
  if (isLoading) return <Skeleton className="h-64 w-full" />;
  const list = orders ?? [];
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Order History</h1>
      <p className="mt-1 text-sm text-slate-500">All your past transactions.</p>
      {list.length === 0 ? <Empty /> : (
        <div className="card mt-6 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/50">
              <tr>
                <th className="p-4 font-semibold">Project</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {list.map((o: any) => (
                <tr key={o.id}>
                  <td className="p-4 font-medium">{o.project?.title}</td>
                  <td className="p-4 text-slate-500">{formatDate(o.created_at)}</td>
                  <td className="p-4 font-semibold">{formatPrice(Number(o.amount))}</td>
                  <td className="p-4"><span className="badge bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function DashboardNotifications() {
  const items = [
    { title: 'Welcome to MyClientWork', body: 'Thanks for joining! Browse our featured projects to get started.', time: 'Just now', read: false },
    { title: 'New projects this week', body: '3 new premium projects were added to the marketplace.', time: '2d ago', read: false },
    { title: 'Update available', body: 'Nexus Analytics Dashboard v1.2 is out. Download it from your library.', time: '5d ago', read: true },
    { title: 'Special offer', body: 'Get 20% off all templates this weekend only.', time: '1w ago', read: true },
  ];
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Notifications</h1>
      <p className="mt-1 text-sm text-slate-500">Stay up to date with your account.</p>
      <div className="mt-6 space-y-3">
        {items.map((n) => (
          <div key={n.title} className={`card p-4 ${!n.read ? 'border-brand-200 dark:border-brand-500/30' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{n.body}</p>
              </div>
              {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
            </div>
            <p className="mt-2 text-[11px] text-slate-400">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardProfile() {
  const { profile, refreshProfile, isAdmin } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: profile?.full_name ?? '',
    country_code: profile?.country_code ?? '+91',
    whatsapp_number: profile?.whatsapp_number ?? '',
    avatar_url: profile?.avatar_url ?? '',
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.from('profiles').update(form).eq('id', profile!.id);
      if (error) throw error;
      await refreshProfile();
      toast.success('Profile updated');
    } catch (err: any) {
      toast.error(err?.message ?? 'Update failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Profile Settings</h1>
      <p className="mt-1 text-sm text-slate-500">Manage your account information.</p>
      <form onSubmit={save} className="card mt-6 max-w-lg space-y-4 p-6">
        <div>
          <label className="label">Full name</label>
          <input className="input" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" value={profile?.email ?? ''} disabled />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Country code</label>
            <input className="input" value={form.country_code} onChange={(e) => setForm({ ...form, country_code: e.target.value })} />
          </div>
          <div>
            <label className="label">WhatsApp number</label>
            <input className="input" value={form.whatsapp_number} onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="label">Avatar URL</label>
          <input className="input" value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} placeholder="https://..." />
        </div>
        <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save changes'}</button>
      </form>

      {isAdmin && <TeamMemberEditor />}
    </div>
  );
}

function TeamMemberEditor() {
  const { profile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: null as string | null,
    full_name: profile?.full_name ?? '',
    designation: '',
    bio: '',
    skills: '',
    avatar_url: profile?.avatar_url ?? '',
    display_order: 0,
    is_active: true,
    social_links: '',
  });
  const [loaded, setLoaded] = useState(false);

  async function load() {
    const { data } = await supabase.from('team_members').select('*').eq('profile_id', profile!.id).maybeSingle();
    if (data) {
      setForm({
        id: data.id,
        full_name: data.full_name ?? profile?.full_name ?? '',
        designation: data.designation ?? '',
        bio: data.bio ?? '',
        skills: (data.skills ?? []).join(', '),
        avatar_url: data.avatar_url ?? profile?.avatar_url ?? '',
        display_order: data.display_order ?? 0,
        is_active: data.is_active ?? true,
        social_links: JSON.stringify(data.social_links ?? {}, null, 2),
      });
    }
    setLoaded(true);
  }
  if (!loaded) load();

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    let social: any = {};
    try { social = form.social_links.trim() ? JSON.parse(form.social_links) : {}; }
    catch { toast.error('Social links must be valid JSON'); setSaving(false); return; }
    const payload = {
      profile_id: profile!.id,
      full_name: form.full_name,
      designation: form.designation || null,
      bio: form.bio || null,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      avatar_url: form.avatar_url || null,
      display_order: Number(form.display_order) || 0,
      is_active: form.is_active,
      social_links: social,
    };
    try {
      if (form.id) {
        const { error } = await supabase.from('team_members').update(payload).eq('id', form.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('team_members').insert(payload).select().single();
        if (error) throw error;
        setForm((f) => ({ ...f, id: data.id }));
      }
      toast.success('Team profile saved');
    } catch (e: any) {
      toast.error(e.message ?? 'Failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h2 className="mt-10 font-display text-2xl font-bold">Team Member Profile</h2>
      <p className="mt-1 text-sm text-slate-500">Your public team showcase entry — designation, skills, and bio.</p>
      <form onSubmit={save} className="card mt-6 max-w-lg space-y-4 p-6">
        <div>
          <label className="label">Full name</label>
          <input className="input" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        </div>
        <div>
          <label className="label">Designation</label>
          <input className="input" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Full Stack Developer" />
        </div>
        <div>
          <label className="label">Bio</label>
          <textarea className="input min-h-[100px]" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </div>
        <div>
          <label className="label">Skills (comma separated)</label>
          <input className="input" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="React, Node, TypeScript" />
        </div>
        <div>
          <label className="label">Avatar URL</label>
          <input className="input" value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} placeholder="https://..." />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Display order</label>
            <input type="number" className="input" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} />
          </div>
          <div>
            <label className="label">Visibility</label>
            <select className="input" value={form.is_active ? 'true' : 'false'} onChange={(e) => setForm({ ...form, is_active: e.target.value === 'true' })}>
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Social links (JSON)</label>
          <textarea className="input min-h-[80px] font-mono text-xs" value={form.social_links} onChange={(e) => setForm({ ...form, social_links: e.target.value })} placeholder='{"github":"https://...","linkedin":"https://..."}' />
        </div>
        <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save team profile'}</button>
      </form>
    </>
  );
}

function Empty({ label = 'No purchases yet' }: { label?: string }) {
  return (
    <div className="card mt-6 flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="font-display text-lg font-semibold">{label}</p>
      <Link to="/projects" className="btn-secondary">Browse projects</Link>
    </div>
  );
}
