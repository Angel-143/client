import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Code2, Headphones, RefreshCw } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useFeaturedProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCardSkeleton } from '@/components/ui/Skeleton';
import { useCategories } from '@/hooks/useProjects';
import { formatNumber } from '@/lib/constants';
import { HomeCategories } from '@/sections/HomeCategories';
import { HomeTestimonials } from '@/sections/HomeTestimonials';
import { HomeFaq } from '@/sections/HomeFaq';
import { HomeCta } from '@/sections/HomeCta';
import { HomeStats } from '@/sections/HomeStats';
import { HomeTechnologies } from '@/sections/HomeTechnologies';
import { HomeNewsletter } from '@/sections/HomeNewsletter';

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: 'Verified & Secure',
    description: 'Every project is reviewed for code quality, security, and best practices before listing.',
  },
  {
    icon: Zap,
    title: 'Instant Download',
    description: 'Get full source code immediately after purchase — no waiting, no friction.',
  },
  {
    icon: Code2,
    title: 'Production-Ready',
    description: 'Clean, typed, documented codebases you can deploy or extend on day one.',
  },
  {
    icon: RefreshCw,
    title: 'Free Updates',
    description: 'Receive future updates and improvements to every project you buy — for life.',
  },
  {
    icon: Headphones,
    title: 'Developer Support',
    description: 'Direct access to the original authors for questions and customization help.',
  },
  {
    icon: Sparkles,
    title: 'Premium Quality',
    description: 'Hand-picked, beautifully designed projects that stand out from the crowd.',
  },
];

export default function Home() {
  const { data: projects, isLoading } = useFeaturedProjects(6);
  const { data: categories } = useCategories();
  const totalProjects = 11;
  const totalSales = projects?.reduce((sum, p) => sum + p.sales_count, 0) ?? 2400;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <AnimatedBackground />
        <div className="container-page py-20 sm:py-28 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300"
            >
              <Sparkles size={14} /> Premium Source Code Marketplace
            </motion.div>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="font-display text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              <span className="heading-gradient">Ship faster with</span>
              <br />
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                production-ready projects
              </span>
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 text-balance"
            >
              MyClientWork is a curated marketplace of premium source code for developers. Buy
              full-stack apps, dashboards, templates, and AI tools — deploy in minutes, not months.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link to="/projects" className="btn-primary group px-6 py-3 text-base">
                Browse Projects
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/about" className="btn-secondary px-6 py-3 text-base">
                Learn More
              </Link>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-accent-500" /> Secure checkout
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={15} className="text-brand-500" /> Instant access
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw size={15} className="text-amber-500" /> Lifetime updates
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <HomeStats
        stats={[
          { label: 'Projects', value: `${totalProjects}+` },
          { label: 'Downloads', value: `${formatNumber(totalSales)}+` },
          { label: 'Developers', value: '8,500+' },
          { label: 'Avg. Rating', value: '4.8★' },
        ]}
      />

      {/* FEATURED PROJECTS */}
      <section className="section">
        <div className="container-page">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Featured
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Trending projects
              </h2>
              <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-400">
                Hand-picked, high-quality codebases our community is loving right now.
              </p>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              View all
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
              : projects?.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <HomeCategories categories={categories ?? []} />

      {/* WHY CHOOSE US */}
      <section className="section bg-white dark:bg-slate-900/40">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Why MyClientWork
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built for serious developers
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              We obsess over quality so you can focus on shipping.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-400">
                  <item.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HomeTechnologies />
      <HomeTestimonials />
      <HomeFaq />
      <HomeCta />
      <HomeNewsletter />
    </>
  );
}
