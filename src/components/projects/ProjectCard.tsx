import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye, Code2 } from 'lucide-react';
import type { Project } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <Link to={`/projects/${project.slug}`} className="relative block overflow-hidden">
        <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={project.thumbnail_url ?? ''}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute left-3 top-3 flex gap-2">
          {project.is_featured && <Badge variant="brand">Featured</Badge>}
          <Badge variant={difficultyVariant[project.difficulty]}>{project.difficulty}</Badge>
        </div>
        <div className="absolute right-3 top-3 flex gap-1.5">
          <span className="flex items-center gap-1 rounded-full bg-slate-900/70 px-2 py-1 text-xs font-medium text-white backdrop-blur">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            {project.rating.toFixed(1)}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition-all duration-300 group-hover:bg-slate-900/40 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg">
            <Eye size={16} /> View Details
          </span>
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{project.category?.name ?? 'Uncategorized'}</Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Updated {formatDate(project.last_updated)}
          </span>
        </div>

        <Link to={`/projects/${project.slug}`}>
          <h3 className="font-display text-base font-bold text-slate-900 transition-colors hover:text-brand-600 dark:text-white">
            {project.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          {project.short_description ?? project.description?.slice(0, 120)}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              <Code2 size={10} /> {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
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
                'flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-rose-300 hover:text-rose-500 dark:border-slate-700 dark:text-slate-400'
              )}
            >
              <Heart size={16} />
            </button>
            <Link
              to={`/projects/${project.slug}`}
              className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <ShoppingCart size={15} /> Buy
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
