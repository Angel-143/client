import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, X } from 'lucide-react';
import { useJobs } from '@/hooks/useData';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate } from '@/lib/constants';

export default function Jobs() {
  const { data: jobs, isLoading } = useJobs({ status: 'active' });
  const [selected, setSelected] = useState<any | null>(null);
  const list = jobs ?? [];

  return (
    <>
      <section className="relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        <div className="container-page py-14 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
              <Briefcase size={14} /> We're hiring
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="heading-gradient">Open positions</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Join our team and build the future of premium source code with us.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container-page">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
            </div>
          ) : list.length === 0 ? (
            <div className="card flex flex-col items-center justify-center gap-3 py-20 text-center">
              <Briefcase size={32} className="text-slate-300" />
              <p className="font-display text-lg font-semibold">No open positions right now</p>
              <p className="text-sm text-slate-500">Please check back soon — we post new roles regularly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {list.map((job, i) => (
                <motion.button
                  key={job.id}
                  onClick={() => setSelected(job)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="card group p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold group-hover:text-brand-600">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        {job.department && <span>{job.department}</span>}
                        {job.location && (
                          <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                        )}
                        <span className="flex items-center gap-1"><Clock size={13} /> {job.employment_type}</span>
                      </div>
                    </div>
                    <Badge variant="brand">{job.employment_type}</Badge>
                  </div>
                  {job.salary_range && (
                    <p className="mt-3 text-sm font-semibold text-brand-600 dark:text-brand-400">{job.salary_range}</p>
                  )}
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    View details <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && <JobModal job={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function JobModal({ job, onClose }: { job: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="card relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        <div className="mb-5">
          <h2 className="font-display text-2xl font-bold">{job.title}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            {job.department && <span>{job.department}</span>}
            {job.location && <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>}
            <span className="flex items-center gap-1"><Clock size={13} /> {job.employment_type}</span>
            <span>Posted {formatDate(job.created_at)}</span>
          </div>
          {job.salary_range && (
            <p className="mt-2 text-sm font-semibold text-brand-600 dark:text-brand-400">{job.salary_range}</p>
          )}
        </div>
        {job.description && (
          <div className="mb-5">
            <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-slate-500">Description</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">{job.description}</p>
          </div>
        )}
        {job.requirements?.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-slate-500">Requirements</h3>
            <ul className="space-y-1.5">
              {job.requirements.map((r: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> {r}
                </li>
              ))}
            </ul>
          </div>
        )}
        <a
          href={`mailto:hello@myclientwork.com?subject=Application: ${encodeURIComponent(job.title)}`}
          className="btn-primary w-full sm:w-auto"
        >
          Apply now <ArrowRight size={16} />
        </a>
      </motion.div>
    </div>
  );
}
