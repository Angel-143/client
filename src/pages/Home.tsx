import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Download, RefreshCw, Code2, Zap, Shield, Sparkles, Star, TrendingUp, Package } from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProjectCard from '../components/projects/ProjectCard'
import { useFeaturedProjects, useCategories } from '../hooks/useQueries'


const stats = [
  { label: 'Projects', value: '50+', icon: Package },
  { label: 'Downloads', value: '12K+', icon: Download },
  { label: 'Avg Rating', value: '4.9', icon: Star },
  { label: 'Developers', value: '3.2K', icon: TrendingUp },
]

const features = [
  { icon: Zap, title: 'Instant Download', desc: 'Get immediate access to source code after purchase. No waiting required.' },
  { icon: RefreshCw, title: 'Lifetime Updates', desc: 'Every project includes free lifetime updates. Always get the latest features.' },
  { icon: Shield, title: 'Production Ready', desc: 'Clean, tested, and documented code ready to deploy to production.' },
  { icon: Code2, title: 'Well Documented', desc: 'Comprehensive README and setup guides included with every project.' },
]

const techStack = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind', 'Supabase', 'PostgreSQL', 'Vite']

export default function Home() {
  const { data: featuredProjects } = useFeaturedProjects()
  const { data: categories } = useCategories()

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-brand-950/20 dark:via-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-200/30 dark:bg-brand-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge color="brand" className="mb-5 px-3 py-1">
                <Sparkles size={12} /> Premium Source Code Marketplace
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                Ship faster with{' '}
                <span className="bg-gradient-to-r from-brand-600 to-blue-500 bg-clip-text text-transparent">
                  production-ready
                </span>{' '}
                code
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                Buy premium, battle-tested source code projects. React, Next.js, Node.js and more — with instant download and lifetime updates.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/projects">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Projects <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-4 flex-wrap">
                <div className="flex -space-x-2">
                  {['A', 'B', 'S', 'R', 'K'].map((letter, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-950 bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Trusted by 3,200+ developers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-2xl bg-gray-900 dark:bg-black shadow-2xl overflow-hidden border border-gray-800">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-gray-500 ml-2 font-mono">myclientwork — terminal</span>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <span className="text-green-400">$</span>
                      <span className="text-gray-300">npm install myclientwork</span>
                    </div>
                    <div className="text-gray-600 text-xs">added 247 packages in 3.2s</div>
                    <div className="flex gap-3 pt-2">
                      <span className="text-green-400">$</span>
                      <span className="text-gray-300">npm run dev</span>
                    </div>
                    <div className="text-blue-400 text-xs pt-1">
                      ▸ VITE v6.0 ready in 210 ms
                    </div>
                    <div className="text-blue-400 text-xs">
                      ▸ ➜ Local: http://localhost:5173/
                    </div>
                    <div className="text-green-400 text-xs pt-2">✓ Build successful</div>
                    <div className="flex gap-3 pt-2">
                      <span className="text-green-400">$</span>
                      <span className="text-gray-300">deploy --production</span>
                    </div>
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-4 bg-green-400 inline-block ml-3"
                    />
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-3 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Download size={16} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Instant download</p>
                  <p className="text-[10px] text-gray-500">After purchase</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-3 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <RefreshCw size={16} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Lifetime updates</p>
                  <p className="text-[10px] text-gray-500">Always current</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center"
                >
                  <div className="inline-flex w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 items-center justify-center mb-3">
                    <Icon size={20} className="text-brand-600 dark:text-brand-400" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {featuredProjects && featuredProjects.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <Badge color="amber" className="mb-3">Featured</Badge>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Projects</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Most loved by the community</p>
              </div>
              <Link to="/projects" className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:gap-2 transition-all">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {categories && categories.length > 0 && (
        <section className="py-20 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge color="brand" className="mb-3">Categories</Badge>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Browse by Category</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/projects?category=${cat.slug}`}
                    className="block p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-brand-500 hover:shadow-lg transition-all text-center group"
                  >
                    <div className="text-2xl mb-2">{cat.icon || '📦'}</div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {cat.name}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge color="green" className="mb-3">Why Choose Us</Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Everything you need to ship</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
              We focus on quality, documentation, and developer experience so you can focus on building.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-4 shadow-lg shadow-brand-500/25">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to build something great?</h2>
            <p className="mt-4 text-brand-100 text-lg max-w-xl mx-auto">
              Join thousands of developers shipping faster with our premium source code.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/projects">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Projects <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto !border-white/30 !text-white hover:!bg-white/10">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
