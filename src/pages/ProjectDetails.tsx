import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ShoppingCart, Heart, Star, Check, Code2, ExternalLink,
  Zap, ShieldCheck, RefreshCw, Clock, TrendingUp,
} from 'lucide-react';
import { useProject, useReviews } from '@/hooks/useProjects';
import { Badge } from '@/components/ui/Badge';
import { Skeleton, EmptyState } from '@/components/ui/Skeleton';
import { formatPrice, formatNumber, formatDate } from '@/lib/constants';
import { PackageX } from 'lucide-react';

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useProject(slug ?? '');
  const { data: reviews } = useReviews(project?.id ?? '');

  if (isLoading) {
    return (
      <div className="container-page py-10">
        <Skeleton className="mb-6 h-6 w-32" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-page py-20">
        <EmptyState icon={PackageX} title="Project not found" description="The project you're looking for doesn't exist or has been removed." action={<Link to="/projects" className="btn-primary mt-4">Browse all projects</Link>} />
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <Link to="/projects" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800/60 dark:bg-[#1E293B]">
            <img src={project.thumbnail_url ?? ''} alt={project.title} className="aspect-[16/9] w-full object-cover" />
          </motion.div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {project.is_featured && <Badge variant="brand">Featured</Badge>}
              <Badge variant="outline">{project.category?.name ?? 'Uncategorized'}</Badge>
              <Badge variant="neutral">{project.difficulty}</Badge>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{project.short_description}</p>
          </div>

          {/* Description */}
          {project.description && (
            <div className="card p-6">
              <h2 className="mb-3 font-display text-lg font-bold">Overview</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
            </div>
          )}

          {/* Features */}
          {project.features.length > 0 && (
            <div className="card p-6">
              <h2 className="mb-4 font-display text-lg font-bold">Features</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-success-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          {project.tech_stack.length > 0 && (
            <div className="card p-6">
              <h2 className="mb-4 font-display text-lg font-bold">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span key={tech} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <Code2 size={14} className="text-brand-500" /> {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {reviews && reviews.length > 0 && (
            <div className="card p-6">
              <h2 className="mb-4 font-display text-lg font-bold">Reviews ({reviews.length})</h2>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="border-b border-slate-100 pb-4 last:border-0 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'} />)}</div>
                      <span className="text-xs text-slate-400">{formatDate(r.created_at)}</span>
                    </div>
                    {r.comment && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{r.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: purchase panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="card p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-slate-900 dark:text-white">{formatPrice(project.price)}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">one-time</span>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5"><Star size={14} className="fill-amber-400 text-amber-400" /> {project.rating.toFixed(1)}</span>
                <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-slate-400" /> {formatNumber(project.sales_count)} sales</span>
              </div>

              <div className="mt-6 space-y-2.5">
                <button className="btn-primary w-full py-3 text-base"><ShoppingCart size={18} /> Buy Now</button>
                <button className="btn-secondary w-full"><Heart size={16} /> Add to Favorites</button>
              </div>

              {project.live_demo_url && (
                <a href={project.live_demo_url} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}

              <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Zap size={15} className="text-accent-500" /> Instant download</div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><ShieldCheck size={15} className="text-success-500" /> Secure checkout</div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><RefreshCw size={15} className="text-warning-500" /> Lifetime free updates</div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Clock size={15} className="text-slate-400" /> Updated {formatDate(project.last_updated)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
