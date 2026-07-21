import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, Code2, Headphones, RefreshCw, Sparkles, Star, TrendingUp } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useFeaturedProjects, useCategories } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCardSkeleton } from '@/components/ui/Skeleton';
import { formatNumber } from '@/lib/constants';

const whyChooseUs = [
  { icon: ShieldCheck, title: 'Verified & Secure', description: 'Every project is reviewed for code quality, security, and best practices before listing.' },
  { icon: Zap, title: 'Instant Download', description: 'Get full source code immediately after purchase — no waiting, no friction.' },
  { icon: Code2, title: 'Production-Ready', description: 'Clean, typed, documented codebases you can deploy or extend on day one.' },
  { icon: RefreshCw, title: 'Free Updates', description: 'Receive future updates and improvements to every project you buy — for life.' },
  { icon: Headphones, title: 'Developer Support', description: 'Direct access to the original authors for questions and customization help.' },
  { icon: Sparkles, title: 'Premium Quality', description: 'Hand-picked, beautifully designed projects that stand out from the crowd.' },
];

export default function Home() {
  const { data: projects, isLoading } = useFeaturedProjects(6);
  const { data: categories } = useCategories();
  const totalProjects = 11;
  const totalSales = projects?.reduce((sum, p) => sum + p.sales_count, 0) ?? 2400;

  return (
    <>
      <section className="relative overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="container-page pt-16 pb-20 sm:pt-20 lg:pt-28 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 lg:pt-6">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-60" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-500" /></span>
                Premium source code marketplace
                <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">NEW</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Ship faster with <span className="heading-gradient">production-ready projects</span> — not boilerplate.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300 text-balance">
                MyClientWork is a curated marketplace of premium source code for developers. Buy full-stack apps, dashboards, templates, and AI tools — deploy in minutes, not months.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                <Link to="/projects" className="btn-primary group px-6 py-3 text-base">Browse Projects <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" /></Link>
                <Link to="/about" className="btn-secondary group px-6 py-3 text-base">Learn more <ArrowUpRight size={16} className="text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" /></Link>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-success-500" /> Secure checkout</span>
                <span className="flex items-center gap-1.5"><Zap size={15} className="text-accent-500" /> Instant access</span>
                <span className="flex items-center gap-1.5"><RefreshCw size={15} className="text-warning-500" /> Lifetime updates</span>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative lg:col-span-5 lg:pt-2">
              <div className="relative">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-brand-500/20 via-violet-500/10 to-accent-500/20 blur-2xl" />
                <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-card backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-error-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-warning-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-success-500/80" />
                    <span className="ml-3 inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"><Code2 size={10} /> myclientwork.dev</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'AI SaaS Starter', tag: 'AI & ML', price: '$49', color: 'from-brand-500 to-violet-500' },
                      { name: 'Stripe Dashboard', tag: 'Dashboards', price: '$39', color: 'from-accent-500 to-brand-500' },
                      { name: 'Notion Clone', tag: 'Web Apps', price: '$59', color: 'from-violet-500 to-accent-500' },
                    ].map((row, i) => (
                      <motion.div key={row.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }} className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 transition-colors hover:border-brand-200 hover:bg-white dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800">
                        <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${row.color} shadow-md`} />
                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{row.name}</p><p className="truncate text-xs text-slate-500 dark:text-slate-400">{row.tag}</p></div>
                        <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{row.price}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 px-4 py-2.5 text-white">
                    <div className="flex items-center gap-1.5"><Star size={14} className="fill-white text-white" /><span className="text-sm font-bold">4.8</span><span className="text-xs text-white/80">/ 5 · {formatNumber(totalSales)}+ sales</span></div>
                    <TrendingUp size={16} />
                  </div>
                </div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-4 -top-4 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:block">
                  <div className="flex items-center gap-2"><Zap size={14} className="text-accent-500" /><span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Instant download</span></div>
                </motion.div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -bottom-4 -left-4 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:block">
                  <div className="flex items-center gap-2"><RefreshCw size={14} className="text-warning-500" /><span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Lifetime updates</span></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/40">
        <div className="container-page py-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[{ label: 'Projects', value: `${totalProjects}+` }, { label: 'Downloads', value: `${formatNumber(totalSales)}+` }, { label: 'Developers', value: '8,500+' }, { label: 'Avg. Rating', value: '4.8★' }].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="text-center">
                <p className="font-display text-3xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400 sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="overline mb-2">Featured</p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Trending projects</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Hand-picked, high-quality codebases our community is loving right now.</p>
            </div>
            <Link to="/projects" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">View all <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />) : projects?.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {categories && categories.length > 0 && (
        <section className="section bg-white dark:bg-slate-900/40">
          <div className="container-page">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="overline mb-2">Browse</p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Explore by category</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">Find the perfect project across our curated categories.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <Link to={`/projects?category=${c.id}`} className="card-hover group flex flex-col items-center gap-3 p-5 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-400"><Code2 size={22} /></div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{c.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-white dark:bg-slate-900/40">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="overline mb-2">Why MyClientWork</p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Built for serious developers</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">We obsess over quality so you can focus on shipping.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.05 }} className="card-hover group p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-400"><item.icon size={22} /></div>
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-16 text-center sm:px-12 sm:py-20">
            <AnimatedBackground variant="subtle" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Ready to ship your next project?</h2>
              <p className="mt-4 text-lg text-brand-100 text-balance">Join thousands of developers building faster with premium, production-ready source code.</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/register" className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-lg transition-transform hover:scale-105">Create free account <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" /></Link>
                <Link to="/projects" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10">Browse marketplace</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
