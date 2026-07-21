import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye, Code2, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatNumber, formatDate, cn } from '@/lib/constants';

const difficultyVariant: Record<Project['difficulty'], 'accent' | 'brand' | 'warning' | 'error'> = {
  Beginner: 'accent',
  Intermediate: 'brand',
  Advanced: 'warning',
  Expert: 'error',
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200/60 hover:shadow-card dark:border-slate-800/60 dark:bg-[#1E293B] dark:hover:border-brand-500/20"
    >
      <Link to={`/projects/${project.slug}`} className="relative block overflow-hidden">
        {/* Accent gradient overlay on hover */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={project.thumbnail_url ?? ''}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>

        <div className="absolute left-3 top-3 z-20 flex gap-2">
          {project.is_featured && (
            <Badge variant="brand" className="shadow-sm">
              Featured
            </Badge>
          )}
          <Badge variant={difficultyVariant[project.difficulty]} className="shadow-sm">
            {project.difficulty}
          </Badge>
        </div>

        <div className="absolute right-3 top-3 z-20">
          <span className="flex items-center gap-1 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            {project.rating.toFixed(1)}
          </span>
        </div>

        {/* View details reveal */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="flex translate-y-2 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition-transform duration-300 group-hover:translate-y-0 dark:bg-white dark:text-slate-900">
            <Eye size={16} /> View Details
            <ArrowUpRight size={14} className="text-brand-600" />
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-3 p-5">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{project.category?.name ?? 'Uncategorized'}</Badge>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            Updated {formatDate(project.last_updated)}
          </span>
        </div>

        <Link to={`/projects/${project.slug}`}>
          <h3 className="font-display text-base font-bold leading-snug text-slate-900 transition-colors hover:text-brand-600 dark:text-white dark:hover:text-brand-400">
            {project.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          {project.short_description ?? project.description?.slice(0, 120)}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              <Code2 size={10} /> {tech}
            </span>
          ))}
          {project.tech_stack.length > 3 && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              +{project.tech_stack.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {formatPrice(project.price)}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {formatNumber(project.sales_count)} sales
            </span>
          </div>
          <div className="flex gap-1.5">
            <button
              aria-label="Add to favorites"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:scale-105 hover:border-rose-300 hover:text-rose-500 active:scale-95 dark:border-slate-700 dark:text-slate-400'
              )}
            >
              <Heart size={16} />
            </button>
            <Link
              to={`/projects/${project.slug}`}
              className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-600 px-3 text-sm font-semibold text-white shadow-glow transition-all hover:bg-brand-700 hover:shadow-[0_0_0_1px_rgb(37_99_235/0.5),0_6px_20px_rgb(37_99_235/0.3)] active:scale-95"
            >
              <ShoppingCart size={15} /> Buy
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
