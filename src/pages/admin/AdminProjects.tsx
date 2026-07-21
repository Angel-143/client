import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, type Project } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatPrice, formatNumber, formatDate } from '@/lib/constants';
import toast from 'react-hot-toast';
import { Plus, Trash2, Star } from 'lucide-react';

export default function AdminProjects() {
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin', 'projects'],
    queryFn: async () => {
      const { data } = await supabase.from('projects').select('*, category:categories(*)').order('created_at', { ascending: false });
      return (data ?? []) as Project[];
    },
  });

  async function toggleFeatured(p: Project) {
    const { error } = await supabase.from('projects').update({ is_featured: !p.is_featured }).eq('id', p.id);
    if (error) { toast.error('Failed to update'); return; }
    toast.success(p.is_featured ? 'Unfeatured' : 'Featured');
    queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  }

  async function remove(p: Project) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    const { error } = await supabase.from('projects').delete().eq('id', p.id);
    if (error) { toast.error('Failed to delete'); return; }
    toast.success('Project deleted');
    queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage marketplace listings.</p>
        </div>
        <button onClick={() => toast.success('Coming soon')} className="btn-primary"><Plus size={16} /> Add Project</button>
      </div>

      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-2xl" />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/50">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Sales</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Updated</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {projects?.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.thumbnail_url ?? ''} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <span className="font-medium text-slate-900 dark:text-white">{p.title}</span>
                    </div>
                  </td>
                  <td className="p-4"><Badge variant="neutral">{p.category?.name ?? '—'}</Badge></td>
                  <td className="p-4 font-semibold">{formatPrice(p.price)}</td>
                  <td className="p-4 text-slate-500">{formatNumber(p.sales_count)}</td>
                  <td className="p-4">
                    <button onClick={() => toggleFeatured(p)} className="flex items-center gap-1">
                      <Star size={16} className={p.is_featured ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'} />
                    </button>
                  </td>
                  <td className="p-4 text-xs text-slate-500">{formatDate(p.last_updated)}</td>
                  <td className="p-4">
                    <button onClick={() => remove(p)} className="text-slate-400 transition-colors hover:text-error-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
