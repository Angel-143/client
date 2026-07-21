import { motion } from 'framer-motion';
import {
  Target, Heart, Users, Rocket, Code2, Github, Linkedin, Mail, Globe,
  Briefcase, GraduationCap, Sparkles,
} from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Badge } from '@/components/ui/Badge';

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

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  skills: string[];
  technologies: string[];
  experience: { role: string; company: string; period: string; description?: string }[];
  social: { github?: string; linkedin?: string; portfolio?: string; email?: string };
};

const team: TeamMember[] = [
  {
    id: 'aslok',
    name: 'Aslok Singh Rajput',
    role: 'Full-Stack Developer & Founder',
    bio: 'Full-stack engineer building production-grade web apps with the MERN stack and modern React ecosystems. Focused on clean architecture, performance, and developer experience.',
    skills: ['Frontend Architecture', 'Backend Design', 'REST & GraphQL APIs', 'UI/UX Implementation', 'Database Modeling', 'Performance Optimization'],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'TailwindCSS', 'Supabase', 'Docker'],
    experience: [
      { role: 'Full-Stack Developer', company: 'MyClientWork', period: '2023 — Present', description: 'Leading development of the premium source code marketplace and its project catalog.' },
      { role: 'MERN Stack Developer', company: 'Freelance', period: '2022 — 2023', description: 'Built and deployed production web applications for multiple international clients.' },
    ],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'aslok@example.com',
    },
  },
  {
    id: 'sandip',
    name: 'Sandip Kumar Sah',
    role: 'Backend & Systems Engineer',
    bio: 'Backend-focused engineer specializing in scalable Node.js services, database design, and API architecture. Passionate about reliability, observability, and clean code.',
    skills: ['Backend Architecture', 'API Design', 'Database Optimization', 'Authentication & Security', 'Microservices', 'CI/CD Pipelines'],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase', 'Docker', 'AWS', 'Linux'],
    experience: [
      { role: 'Backend Engineer', company: 'MyClientWork', period: '2023 — Present', description: 'Designing the data layer, auth flows, and admin services powering the marketplace.' },
      { role: 'Software Engineer', company: 'Freelance', period: '2022 — 2023', description: 'Delivered REST APIs and database systems for client products.' },
    ],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'sandip@example.com',
    },
  },
  {
    id: 'bikash',
    name: 'Bikash Kushwaha',
    role: 'Frontend Engineer & UI Specialist',
    bio: 'Frontend developer crafting responsive, accessible interfaces with React and TypeScript. Focused on design systems, animation, and pixel-perfect implementation.',
    skills: ['Frontend Development', 'Responsive Design', 'Accessibility', 'Design Systems', 'State Management', 'Cross-browser Testing'],
    technologies: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Redux Toolkit', 'React Query', 'Framer Motion', 'Vite', 'Storybook', 'Figma'],
    experience: [
      { role: 'Frontend Engineer', company: 'MyClientWork', period: '2023 — Present', description: 'Building the marketplace UI, design system, and customer-facing dashboards.' },
      { role: 'Frontend Developer', company: 'Freelance', period: '2022 — 2023', description: 'Shipped responsive landing pages and web apps for clients.' },
    ],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'bikash@example.com',
    },
  },
];

const socialLinks = [
  { key: 'github', icon: Github, label: 'GitHub' },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  { key: 'portfolio', icon: Globe, label: 'Portfolio' },
  { key: 'email', icon: Mail, label: 'Email' },
] as const;

export default function About() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="container-page py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="overline mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 dark:border-brand-500/30 dark:bg-brand-500/10">
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

      {/* ─── STATS ─── */}
      <section className="border-y border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900/40">
        <div className="container-page py-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="font-display text-3xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400 sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="overline mb-2">Our principles</p>
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
                className="card-hover group p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-400">
                  <v.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="section bg-white dark:bg-slate-900/40">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="overline mb-2">The team</p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Meet the developers</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              The people behind MyClientWork.
            </p>
          </div>

          <div className="space-y-8">
            {team.map((member, i) => (
              <TeamMemberCard key={member.id} member={member} index={i} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TeamMemberCard({ member, index, reverse }: { member: TeamMember; index: number; reverse: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2) }}
      className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft dark:border-slate-800/60 dark:bg-[#1E293B]"
    >
      <div className={`grid gap-0 lg:grid-cols-12 ${reverse ? 'lg:[direction:rtl]' : ''}`}>
        {/* Photo column */}
        <div className="relative lg:col-span-4 [direction:ltr]">
          <div className="relative aspect-square h-full min-h-[280px] overflow-hidden bg-gradient-to-br from-brand-600 via-violet-600 to-accent-500 lg:aspect-auto">
            <div className="absolute inset-0 bg-noise opacity-30" />
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-white">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 text-4xl font-bold backdrop-blur-md">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-widest text-white/80">
                  {member.role}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Details column */}
        <div className="space-y-6 p-6 sm:p-8 lg:col-span-8 [direction:ltr]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight">{member.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
                  <Briefcase size={14} /> {member.role}
                </p>
              </div>
              <div className="flex gap-2">
                {socialLinks.map(({ key, icon: Icon, label }) => {
                  const url = member.social[key as keyof typeof member.social];
                  if (!url) return null;
                  const href = key === 'email' ? `mailto:${url}` : url;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on ${label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:scale-105 hover:border-brand-300 hover:text-brand-600 active:scale-95 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:text-brand-400"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {member.bio}
            </p>
          </div>

          {/* Skills + Technologies two-column */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Sparkles size={12} className="text-accent-500" /> Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((s) => (
                  <Badge key={s} variant="brand">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Code2 size={12} className="text-violet-500" /> Technologies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.technologies.map((t) => (
                  <Badge key={t} variant="neutral">{t}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Experience timeline */}
          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <GraduationCap size={12} className="text-success-500" /> Experience
            </p>
            <ol className="relative space-y-3 border-l border-slate-200 pl-4 dark:border-slate-700">
              {member.experience.map((exp, idx) => (
                <li key={idx} className="relative">
                  <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-brand-500 ring-4 ring-brand-100 dark:ring-brand-500/20" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{exp.role}</p>
                    <span className="text-[11px] font-medium text-slate-400">{exp.period}</span>
                  </div>
                  <p className="text-xs text-brand-600 dark:text-brand-400">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{exp.description}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
