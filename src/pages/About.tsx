import { motion } from 'framer-motion';
import { Target, Heart, Users, Rocket, Code2, Github, Linkedin, Mail, Globe } from 'lucide-react';
import { DEVELOPERS, SITE } from '@/lib/constants';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useTeamMembers } from '@/hooks/useData';
import { Skeleton } from '@/components/ui/Skeleton';

const values = [
  { icon: Target, title: 'Quality First', description: 'Every project is reviewed and held to a high bar before it reaches the marketplace.' },
  { icon: Heart, title: 'Developer-Centric', description: 'We build for developers, not around them. Clean code, clear docs, no fluff.' },
  { icon: Users, title: 'Community Driven', description: 'A growing community of makers and buyers who help each other ship faster.' },
  { icon: Rocket, title: 'Ship Faster', description: 'Skip the boilerplate. Start from a working, tested base and focus on what matters.' },
];

const stats = [
  { value: '11+', label: 'Premium Projects' },
  { value: '8.5K+', label: 'Developers' },
  { value: '2.4K+', label: 'Downloads' },
  { value: '4.8★', label: 'Avg. Rating' },
];

const socialIcons: Record<string, typeof Github> = { github: Github, linkedin: Linkedin, email: Mail, website: Globe };

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <AnimatedBackground />
        <div className="container-page py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
              <Code2 size={14} /> About MyClientWork
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              <span className="heading-gradient">A premium marketplace built by developers, for developers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 text-balance">
              MyClientWork was created to solve a simple problem: finding high-quality, production-ready
              source code should be easy. We curate, review, and sell premium projects so you can skip
              the boilerplate and ship real products faster.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900/40">
        <div className="container-page py-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400 sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Our values</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">The principles that guide everything we build.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  <v.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-slate-900/40">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">The team</p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Meet the developers</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              The people behind MyClientWork.
            </p>
          </div>
          <TeamGrid />
        </div>
      </section>
    </>
  );
}

function TeamGrid() {
  const { data, isLoading } = useTeamMembers(true);
  if (isLoading) return <Skeleton className="h-64 w-full" />;
  const members = data ?? [];
  if (members.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 py-16 text-center">
        <Users size={32} className="text-slate-300" />
        <p className="font-display text-lg font-semibold">Team showcase coming soon</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m: any, i: number) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="card group overflow-hidden p-6 text-center"
        >
          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-brand-50 transition-transform group-hover:scale-105 dark:ring-brand-500/10">
            {m.avatar_url ? (
              <img src={m.avatar_url} alt={m.full_name} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand-600 text-2xl font-bold text-white">
                {m.full_name?.[0]?.toUpperCase() ?? 'U'}
              </div>
            )}
          </div>
          <h3 className="font-display text-lg font-bold">{m.full_name}</h3>
          {m.designation && <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{m.designation}</p>}
          {m.bio && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{m.bio}</p>}
          {m.skills?.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {m.skills.map((s: string) => (
                <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{s}</span>
              ))}
            </div>
          )}
          <div className="mt-4 flex justify-center gap-2">
            {m.social_links && typeof m.social_links === 'object' &&
              Object.entries(m.social_links).map(([key, url]: [string, any]) => {
                const Icon = socialIcons[key.toLowerCase()] ?? Globe;
                return (
                  <a key={key} href={url} target="_blank" rel="noreferrer" aria-label={key}
                     className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400">
                    <Icon size={16} />
                  </a>
                );
              })}
            <a href={`mailto:${SITE.email}`} aria-label="Email"
               className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400">
              <Mail size={16} />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
