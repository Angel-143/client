const technologies = [
  'React 19', 'TypeScript', 'Next.js 14', 'Tailwind CSS', 'Node.js', 'Supabase',
  'PostgreSQL', 'Vite', 'React Native', 'Expo', 'Stripe', 'Prisma',
  'FastAPI', 'Python', 'Redis', 'Framer Motion', 'Zustand', 'Recharts',
];

export function HomeTechnologies() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Technologies
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Built with the modern stack
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Every project uses industry-standard, well-supported technologies.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500/40 dark:hover:text-brand-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
