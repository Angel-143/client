import { useQuery } from '@tanstack/react-query';
import { supabase, type Job, type TeamMember } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Briefcase, Users } from 'lucide-react';

export default function AdminJobsTeam() {
  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['admin', 'jobs'],
    queryFn: async () => {
      const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
      return (data ?? []) as Job[];
    },
  });

  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: ['admin', 'team_members'],
    queryFn: async () => {
      const { data } = await supabase.from('team_members').select('*').order('display_order', { ascending: true });
      return (data ?? []) as TeamMember[];
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center gap-2"><Briefcase size={20} className="text-brand-600" /><h1 className="font-display text-2xl font-bold tracking-tight">Jobs</h1></div>
        {jobsLoading ? <Skeleton className="h-48 w-full rounded-2xl" /> : jobs && jobs.length > 0 ? (
          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {jobs.map((j) => (
              <div key={j.id} className="flex items-center justify-between p-4">
                <div><p className="text-sm font-semibold text-slate-900 dark:text-white">{j.title}</p><p className="text-xs text-slate-500">{j.department} · {j.location} · {j.employment_type}</p></div>
                <Badge variant={j.status === 'active' ? 'brand' : 'neutral'}>{j.status}</Badge>
              </div>
            ))}
          </div>
        ) : <div className="card p-8 text-center text-sm text-slate-400">No job listings yet.</div>}
      </div>
      <div>
        <div className="mb-4 flex items-center gap-2"><Users size={20} className="text-violet-600" /><h1 className="font-display text-2xl font-bold tracking-tight">Team Members</h1></div>
        {membersLoading ? <Skeleton className="h-48 w-full rounded-2xl" /> : members && members.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {members.map((m) => (
              <div key={m.id} className="card p-4">
                <div className="flex items-center gap-3">
                  {m.avatar_url ? <img src={m.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">{m.full_name[0]}</div>}
                  <div><p className="text-sm font-semibold text-slate-900 dark:text-white">{m.full_name}</p><p className="text-xs text-slate-500">{m.designation}</p></div>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-slate-500">{m.bio}</p>
                <div className="mt-2 flex flex-wrap gap-1">{m.skills.slice(0, 3).map((s) => <Badge key={s} variant="neutral">{s}</Badge>)}</div>
              </div>
            ))}
          </div>
        ) : <div className="card p-8 text-center text-sm text-slate-400">No team members yet. The About page shows the static team cards.</div>}
      </div>
    </div>
  );
}
