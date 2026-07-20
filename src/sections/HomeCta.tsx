import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

export function HomeCta() {
  return (
    <section className="section">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <AnimatedBackground variant="subtle" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to ship your next project?
            </h2>
            <p className="mt-4 text-lg text-brand-100 text-balance">
              Join thousands of developers building faster with premium, production-ready source code.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-lg transition-transform hover:scale-105"
              >
                Create free account
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Browse marketplace
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
