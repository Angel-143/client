import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, type ContactMessage } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDateTime } from '@/lib/constants';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminPages() {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['admin', 'messages'],
    queryFn: async () => {
      const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      return (data ?? []) as ContactMessage[];
    },
  });

  async function markRead(m: ContactMessage) {
    const { error } = await supabase.from('contact_messages').update({ status: 'read' }).eq('id', m.id);
    if (error) { toast.error('Failed'); return; }
    queryClient.invalidateQueries({ queryKey: ['admin', 'messages'] });
  }

  async function remove(m: ContactMessage) {
    if (!confirm('Delete this message?')) return;
    const { error } = await supabase.from('contact_messages').delete().eq('id', m.id);
    if (error) { toast.error('Failed'); return; }
    toast.success('Deleted');
    queryClient.invalidateQueries({ queryKey: ['admin', 'messages'] });
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Contact form submissions.</p>
      </div>

      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-2xl" />
      ) : messages && messages.length > 0 ? (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 dark:text-white">{m.name}</p>
                    <Badge variant={m.status === 'new' ? 'brand' : 'neutral'}>{m.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{m.email}</p>
                  <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">{m.subject}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{m.message}</p>
                  <p className="mt-2 text-xs text-slate-400">{formatDateTime(m.created_at)}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  {m.status === 'new' && <button onClick={() => markRead(m)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800"><MailOpen size={16} /></button>}
                  <button onClick={() => remove(m)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/10"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <Mail size={32} className="text-slate-300" />
          <p className="text-sm text-slate-400">No messages yet.</p>
        </div>
      )}
    </div>
  );
}
