import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { Category } from '@/lib/supabase';

export function HomeCategories({ categories }: { categories: Category[] }) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Browse by category
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Find exactly what you need
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => {
            const Icon = (Icons as any)[cat.icon ?? 'Code2'] ?? Icons.Code2;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  to={`/projects?category=${cat.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/40"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-300">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm font-semibold">{cat.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
