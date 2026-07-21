import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowUpRight, Building2 } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Badge } from '@/components/ui/Badge';
import { useJobs } from '@/hooks/useJobs';
import { Skeleton, EmptyState } from '@/components/ui/Skeleton';

export default function Jobs() {
  const { data: jobs, isLoading } = useJobs();
  const activeJobs = jobs?.filter((j) => j.status === 'active') ?? [];

  return (
    <>
      <section className="relative overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="container-page py-20 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
            <span className="overline mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 dark:border-brand-500/30 dark:bg-brand-500/10"><Briefcase size={14} /> Careers</span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"><span className="heading-gradient">Join the MyClientWork team</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 text-balance">We're always looking for talented developers who care about quality. Explore our open positions below.</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
            </div>
          ) : activeJobs.length > 0 ? (
            <div className="space-y-4">
              {activeJobs.map((job, i) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="card-hover group flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{job.title}</h3>
                      <Badge variant="brand">{job.employment_type}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      {job.department && <span className="flex items-center gap-1.5"><Building2 size={14} /> {job.department}</span>}
                      {job.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>}
                      {job.salary_range && <span className="flex items-center gap-1.5"><Clock size={14} /> {job.salary_range}</span>}
                    </div>
                  </div>
                  <a href={`mailto:careers@myclientwork.dev?subject=Application: ${encodeURIComponent(job.title)}`} className="btn-primary shrink-0">
                    Apply <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Briefcase} title="No open positions right now" description="We don't have any active job openings at the moment. Check back soon or send us your resume." action={<a href="mailto:careers@myclientwork.dev" className="btn-primary mt-4">Send your resume</a>} />
          )}
        </div>
      </section>
    </>
  );
}
