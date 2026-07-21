import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Briefcase, Users as UsersIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useJobs, useCreateJob, useUpdateJob, useDeleteJob,
  useTeamMembers, useUpsertTeamMember,
  useAdminProjects,
} from '@/hooks/useData';
import { useCategories } from '@/hooks/useProjects';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { formatDate, cn } from '@/lib/constants';

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/* ============================= ADMIN JOBS ============================= */

export function AdminJobs() {
  const { data, isLoading } = useJobs();
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const list = data ?? [];

  function openNew() {
    setEditing(null);
    setShowForm(true);
  }
  function openEdit(job: any) {
    setEditing(job);
    setShowForm(true);
  }

  async function remove(id: string) {
    if (!confirm('Delete this job posting?')) return;
    try {
      await deleteJob.mutateAsync(id);
      toast.success('Job deleted');
    } catch (e: any) {
      toast.error(e.message ?? 'Failed');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Job Postings</h1>
          <p className="mt-1 text-sm text-slate-500">Create and manage open positions.</p>
        </div>
        <button onClick={openNew} className="btn-primary">
          <Plus size={16} /> New job
        </button>
      </div>

      {isLoading ? (
        <Skeleton className="mt-6 h-64 w-full" />
      ) : list.length === 0 ? (
        <div className="card mt-6 flex flex-col items-center gap-3 py-16 text-center">
          <Briefcase size={32} className="text-slate-300" />
          <p className="font-display text-lg font-semibold">No job postings yet</p>
          <button onClick={openNew} className="btn-secondary">Create your first job</button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {list.map((job) => (
            <div key={job.id} className="card flex items-center justify-between gap-4 p-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold">{job.title}</h3>
                  <Badge variant={job.status === 'active' ? 'brand' : 'neutral'}>{job.status}</Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  {job.department && <span>{job.department}</span>}
                  {job.location && <span>{job.location}</span>}
                  <span>{job.employment_type}</span>
                  <span>Posted {formatDate(job.created_at)}</span>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openEdit(job)} className="btn-ghost p-2"><Pencil size={15} /></button>
                <button onClick={() => remove(job.id)} className="btn-ghost p-2 text-error-500"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <JobForm
          job={editing}
          onClose={() => setShowForm(false)}
          onSave={async (payload) => {
            try {
              if (editing) await updateJob.mutateAsync({ id: editing.id, ...payload });
              else await createJob.mutateAsync(payload);
              toast.success(editing ? 'Job updated' : 'Job created');
              setShowForm(false);
            } catch (e: any) {
              toast.error(e.message ?? 'Failed');
            }
          }}
        />
      )}
    </div>
  );
}

function JobForm({ job, onClose, onSave }: { job: any | null; onClose: () => void; onSave: (p: any) => void }) {
  const [form, setForm] = useState({
    title: job?.title ?? '',
    department: job?.department ?? '',
    location: job?.location ?? '',
    employment_type: job?.employment_type ?? 'Full-time',
    salary_range: job?.salary_range ?? '',
    description: job?.description ?? '',
    requirements: (job?.requirements ?? []).join('\n'),
    status: job?.status ?? 'active',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      slug: job?.slug ?? slugify(form.title) + '-' + Date.now().toString(36),
      department: form.department || null,
      location: form.location || null,
      employment_type: form.employment_type,
      salary_range: form.salary_range || null,
      description: form.description || null,
      requirements: form.requirements.split('\n').map((s: string) => s.trim()).filter(Boolean),
      status: form.status,
    };
    onSave(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.form
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={submit}
        className="card relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
      >
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        <h2 className="mb-5 font-display text-xl font-bold">{job ? 'Edit job' : 'New job posting'}</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Title *</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Department</label>
              <input className="input" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            </div>
            <div>
              <label className="label">Location</label>
              <input className="input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Remote / Bangalore" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Employment type</label>
              <select className="input" value={form.employment_type} onChange={(e) => setForm({ ...form, employment_type: e.target.value })}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>
            <div>
              <label className="label">Salary range</label>
              <input className="input" value={form.salary_range} onChange={(e) => setForm({ ...form, salary_range: e.target.value })} placeholder="e.g. $60k - $90k" />
            </div>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input min-h-[120px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="label">Requirements (one per line)</label>
            <textarea className="input min-h-[100px]" value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} placeholder={'3+ years React\nTypeScript experience'} />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" className="btn-primary">{job ? 'Save changes' : 'Create job'}</button>
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </motion.form>
    </div>
  );
}

/* ============================= ADMIN TEAM ============================= */

export function AdminTeam() {
  const { data, isLoading } = useTeamMembers();
  const upsert = useUpsertTeamMember();
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const list = data ?? [];

  async function toggleActive(member: any) {
    try {
      await upsert.mutateAsync({ id: member.id, is_active: !member.is_active });
      toast.success(member.is_active ? 'Hidden' : 'Visible');
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Team Members</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the public team showcase.</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary">
          <Plus size={16} /> Add member
        </button>
      </div>

      {isLoading ? (
        <Skeleton className="mt-6 h-64 w-full" />
      ) : list.length === 0 ? (
        <div className="card mt-6 flex flex-col items-center gap-3 py-16 text-center">
          <UsersIcon size={32} className="text-slate-300" />
          <p className="font-display text-lg font-semibold">No team members yet</p>
          <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-secondary">Add the first member</button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="flex items-center gap-3">
                {m.avatar_url ? (
                  <img src={m.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {m.full_name?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold">{m.full_name}</p>
                  <p className="truncate text-xs text-slate-500">{m.designation ?? '—'}</p>
                </div>
              </div>
              {m.skills?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.skills.slice(0, 4).map((s: string) => (
                    <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{s}</span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <Badge variant={m.is_active ? 'brand' : 'neutral'}>{m.is_active ? 'Visible' : 'Hidden'}</Badge>
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(m); setShowForm(true); }} className="btn-ghost p-2"><Pencil size={14} /></button>
                  <button onClick={() => toggleActive(m)} className="btn-ghost p-2 text-xs">{m.is_active ? 'Hide' : 'Show'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <TeamForm
          member={editing}
          onClose={() => setShowForm(false)}
          onSave={async (payload) => {
            try {
              await upsert.mutateAsync(payload);
              toast.success(editing ? 'Member updated' : 'Member added');
              setShowForm(false);
            } catch (e: any) {
              toast.error(e.message ?? 'Failed');
            }
          }}
        />
      )}
    </div>
  );
}

function TeamForm({ member, onClose, onSave }: { member: any | null; onClose: () => void; onSave: (p: any) => void }) {
  const { profile } = useAuth();
  const [form, setForm] = useState({
    id: member?.id ?? null,
    profile_id: member?.profile_id ?? profile?.id ?? null,
    full_name: member?.full_name ?? profile?.full_name ?? '',
    designation: member?.designation ?? '',
    bio: member?.bio ?? '',
    skills: (member?.skills ?? []).join(', '),
    avatar_url: member?.avatar_url ?? profile?.avatar_url ?? '',
    display_order: member?.display_order ?? 0,
    is_active: member?.is_active ?? true,
    social_links: JSON.stringify(member?.social_links ?? {}, null, 2),
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    let social: any = {};
    try {
      social = form.social_links.trim() ? JSON.parse(form.social_links) : {};
    } catch {
      toast.error('Social links must be valid JSON');
      return;
    }
    onSave({
      id: form.id,
      profile_id: form.profile_id,
      full_name: form.full_name,
      designation: form.designation || null,
      bio: form.bio || null,
      skills: form.skills.split(',').map((s: string) => s.trim()).filter(Boolean),
      avatar_url: form.avatar_url || null,
      display_order: Number(form.display_order) || 0,
      is_active: form.is_active,
      social_links: social,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.form
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={submit}
        className="card relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
      >
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        <h2 className="mb-5 font-display text-xl font-bold">{member ? 'Edit member' : 'Add team member'}</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Full name *</label>
              <input className="input" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
            </div>
            <div>
              <label className="label">Designation</label>
              <input className="input" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Full Stack Developer" />
            </div>
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" className="btn-primary">{member ? 'Save changes' : 'Add member'}</button>
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </motion.form>
    </div>
  );
}

/* ============================= ADMIN PROJECT FORM ============================= */

export function AdminProjectsWithForm() {
  const { data, isLoading } = useAdminProjects();
  const { data: categories } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const list = data ?? [];

  async function remove(id: string) {
    if (!confirm('Delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) toast.error(error.message);
    else toast.success('Project deleted');
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Project Management</h1>
          <p className="mt-1 text-sm text-slate-500">Add and manage marketplace listings.</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary">
          <Plus size={16} /> New project
        </button>
      </div>

      {isLoading ? (
        <Skeleton className="mt-6 h-64 w-full" />
      ) : list.length === 0 ? (
        <div className="card mt-6 flex flex-col items-center gap-3 py-16 text-center">
          <p className="font-display text-lg font-semibold">No projects yet</p>
          <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-secondary">Add the first project</button>
        </div>
      ) : (
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/50">
              <tr>
                <th className="p-4 font-semibold">Project</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Sales</th>
                <th className="p-4 font-semibold">Featured</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {list.map((p: any) => (
                <tr key={p.id}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.thumbnail_url && <img src={p.thumbnail_url} alt="" className="h-10 w-14 rounded-lg object-cover" />}
                      <span className="font-medium">{p.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-500">{p.category?.name ?? '—'}</td>
                  <td className="p-4 font-semibold">${p.price}</td>
                  <td className="p-4 text-slate-500">{p.sales_count}</td>
                  <td className="p-4">{p.is_featured ? <Badge variant="brand">Yes</Badge> : <Badge variant="neutral">No</Badge>}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => { setEditing(p); setShowForm(true); }} className="btn-ghost p-2"><Pencil size={15} /></button>
                      <button onClick={() => remove(p.id)} className="btn-ghost p-2 text-error-500"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ProjectForm
          project={editing}
          categories={categories ?? []}
          onClose={() => setShowForm(false)}
          onSave={async (payload) => {
            try {
              if (editing) {
                const { error } = await supabase.from('projects').update(payload).eq('id', editing.id);
                if (error) throw error;
                toast.success('Project updated');
              } else {
                const { error } = await supabase.from('projects').insert(payload);
                if (error) throw error;
                toast.success('Project created');
              }
              setShowForm(false);
              window.location.reload();
            } catch (e: any) {
              toast.error(e.message ?? 'Failed');
            }
          }}
        />
      )}
    </div>
  );
}

function ProjectForm({ project, categories, onClose, onSave }: { project: any | null; categories: any[]; onClose: () => void; onSave: (p: any) => void }) {
  const [form, setForm] = useState({
    title: project?.title ?? '',
    short_description: project?.short_description ?? '',
    description: project?.description ?? '',
    category_id: project?.category_id ?? '',
    price: project?.price ?? 0,
    thumbnail_url: project?.thumbnail_url ?? '',
    live_demo_url: project?.live_demo_url ?? '',
    tech_stack: (project?.tech_stack ?? []).join(', '),
    features: (project?.features ?? []).join('\n'),
    difficulty: project?.difficulty ?? 'Intermediate',
    download_url: project?.download_url ?? '',
    is_featured: project?.is_featured ?? false,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      slug: project?.slug ?? slugify(form.title) + '-' + Date.now().toString(36),
      short_description: form.short_description || null,
      description: form.description || null,
      category_id: form.category_id || null,
      price: Number(form.price) || 0,
      thumbnail_url: form.thumbnail_url || null,
      live_demo_url: form.live_demo_url || null,
      tech_stack: form.tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean),
      features: form.features.split('\n').map((s: string) => s.trim()).filter(Boolean),
      difficulty: form.difficulty,
      download_url: form.download_url || null,
      is_featured: form.is_featured,
    };
    onSave(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.form
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={submit}
        className="card relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
      >
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        <h2 className="mb-5 font-display text-xl font-bold">{project ? 'Edit project' : 'New project'}</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Title *</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label className="label">Short description</label>
            <input className="input" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input min-h-[120px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Category</label>
              <select className="input" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                <option value="">None</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Price (USD)</label>
              <input type="number" step="0.01" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Thumbnail URL</label>
              <input className="input" value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} />
            </div>
            <div>
              <label className="label">Live demo URL</label>
              <input className="input" value={form.live_demo_url} onChange={(e) => setForm({ ...form, live_demo_url: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">Tech stack (comma separated)</label>
            <input className="input" value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} placeholder="React, Node, PostgreSQL" />
          </div>
          <div>
            <label className="label">Features (one per line)</label>
            <textarea className="input min-h-[80px]" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Difficulty</label>
              <select className="input" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>
            <div>
              <label className="label">Download URL</label>
              <input className="input" value={form.download_url} onChange={(e) => setForm({ ...form, download_url: e.target.value })} />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="rounded border-slate-300 text-brand-600" />
            Featured project
          </label>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" className="btn-primary">{project ? 'Save changes' : 'Create project'}</button>
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </motion.form>
    </div>
  );
}
