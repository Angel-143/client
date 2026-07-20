import { motion } from 'framer-motion';

export function HomeStats({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <section className="border-y border-slate-200/70 bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/40">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
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
  );
}
