import { useQuery } from '@tanstack/react-query'
import { Plus, Briefcase, Users } from 'lucide-react'
import { supabase, type Job, type TeamMember } from '../../lib/supabase'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { formatDate } from '../../lib/constants'

export default function AdminJobsTeam() {
  const { data: jobs } = useQuery<Job[]>({ queryKey: ['admin', 'jobs'], queryFn: async () => { const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false }); return data as Job[] } })
  const { data: team } = useQuery<TeamMember[]>({ queryKey: ['admin', 'team'], queryFn: async () => { const { data } = await supabase.from('team_members').select('*').order('display_order'); return data as TeamMember[] } })

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Briefcase size={24} /> Jobs</h1><p className="text-gray-500 dark:text-gray-400">Manage job postings</p></div><Button size="sm"><Plus size={16} /> Add Job</Button></div>
        <div className="grid sm:grid-cols-2 gap-4">
          {jobs?.map(j => <div key={j.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"><div className="flex items-start justify-between"><div><h3 className="font-semibold text-gray-900 dark:text-white">{j.title}</h3><p className="text-sm text-gray-500 dark:text-gray-400">{j.department} · {j.location}</p></div><Badge color={j.status === 'active' ? 'green' : 'gray'}>{j.status}</Badge></div><p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{j.employment_type} · {j.salary_range || 'Salary TBD'}</p><p className="text-xs text-gray-400 mt-2">Posted {formatDate(j.created_at)}</p></div>)}
          {(!jobs || jobs.length === 0) && <p className="text-gray-500 dark:text-gray-400 text-sm col-span-2">No jobs posted yet.</p>}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-6"><div><h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Users size={24} /> Team Members</h2><p className="text-gray-500 dark:text-gray-400">Manage your team</p></div><Button size="sm"><Plus size={16} /> Add Member</Button></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {team?.map(m => <div key={m.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 text-center"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">{m.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div><h3 className="font-semibold text-gray-900 dark:text-white">{m.full_name}</h3><p className="text-sm text-brand-600 dark:text-brand-400">{m.designation}</p><div className="flex flex-wrap justify-center gap-1 mt-2">{m.skills.slice(0, 3).map(s => <span key={s} className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{s}</span>)}</div><Badge color={m.is_active ? 'green' : 'gray'} className="mt-3">{m.is_active ? 'Active' : 'Inactive'}</Badge></div>)}
          {(!team || team.length === 0) && <p className="text-gray-500 dark:text-gray-400 text-sm col-span-3">No team members yet.</p>}
        </div>
      </div>
    </div>
  )
}
