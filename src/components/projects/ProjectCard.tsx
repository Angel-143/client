import { Link } from 'react-router-dom'
import { Star, Download, Zap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '../../lib/supabase'
import { formatPrice, formatNumber, cn } from '../../lib/constants'
import Badge from '../ui/Badge'

const difficultyColors: Record<string, 'green' | 'amber' | 'red'> = {
  Beginner: 'green',
  Intermediate: 'amber',
  Advanced: 'red',
}

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-950 overflow-hidden">
        {project.thumbnail_url ? (
          <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Zap className="w-12 h-12 text-gray-300 dark:text-gray-700" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {project.is_featured && <Badge color="amber">Featured</Badge>}
          <Badge color={difficultyColors[project.difficulty] || 'gray'}>{project.difficulty}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full px-2.5 py-1 flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-900 dark:text-white">{project.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1 line-clamp-1">{project.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{project.short_description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium">
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 3 && (
            <span className="text-xs px-2 py-0.5 text-gray-400">+{project.tech_stack.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(project.price)}</span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Download size={12} /> {formatNumber(project.sales_count)}
            </span>
          </div>
          <Link
            to={`/projects/${project.slug}`}
            className={cn(
              'inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400',
              'group-hover:gap-2 transition-all'
            )}
          >
            View <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
