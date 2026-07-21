import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Star, Check, Zap, ExternalLink, ShoppingCart } from 'lucide-react'
import { useProject, useCategories } from '../hooks/useQueries'
import { formatPrice, formatNumber, formatDate } from '../lib/constants'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'

const difficultyColors: Record<string, 'green' | 'amber' | 'red'> = { Beginner: 'green', Intermediate: 'amber', Advanced: 'red' }

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: project, isLoading } = useProject(slug || '')
  const { data: categories } = useCategories()

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size={32} /></div>
  if (!project) return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project not found</h1><Link to="/projects" className="mt-4 inline-block text-brand-600 dark:text-brand-400 hover:underline">← Back to projects</Link></div>

  const category = categories?.find(c => c.id === project.category_id)

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-600 dark:hover:text-brand-400 mb-6"><ArrowLeft size={16} /> Back to Projects</Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-950 overflow-hidden mb-6 flex items-center justify-center">{project.thumbnail_url ? <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" /> : <Zap className="w-16 h-16 text-gray-300 dark:text-gray-700" />}</div>
            <div className="flex flex-wrap gap-2 mb-4">{category && <Badge color="brand">{category.name}</Badge>}<Badge color={difficultyColors[project.difficulty] || 'gray'}>{project.difficulty}</Badge>{project.is_featured && <Badge color="amber">Featured</Badge>}</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">{project.short_description}</p>
            {project.description && <div className="mt-6"><p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{project.description}</p></div>}
            {project.features.length > 0 && <div className="mt-8"><h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Features</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{project.features.map(f => <div key={f} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />{f}</div>)}</div></div>}
            {project.tech_stack.length > 0 && <div className="mt-8"><h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2><div className="flex flex-wrap gap-2">{project.tech_stack.map(t => <span key={t} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">{t}</span>)}</div></div>}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{formatPrice(project.price)}</div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Rating</span><div className="flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400" /><span className="font-medium text-gray-900 dark:text-white">{project.rating.toFixed(1)}</span></div></div>
                <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Sales</span><span className="font-medium text-gray-900 dark:text-white">{formatNumber(project.sales_count)}</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Updated</span><span className="font-medium text-gray-900 dark:text-white">{formatDate(project.last_updated)}</span></div>
              </div>
              <div className="mt-6 space-y-2">
                <Button size="lg" className="w-full"><ShoppingCart size={16} /> Buy Now</Button>
                {project.live_demo_url && <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="lg" className="w-full"><ExternalLink size={16} /> Live Demo</Button></a>}
                {project.download_url && <a href={project.download_url}><Button variant="ghost" size="lg" className="w-full"><Download size={16} /> Download</Button></a>}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                {[['Instant download', 'Lifetime updates', 'Production ready', 'Full source code']].flat().map(t => <div key={t} className="flex items-center gap-2"><Check size={14} className="text-green-500" /> {t}</div>)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
