import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="container-page text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display text-[120px] font-extrabold leading-none tracking-tighter text-transparent sm:text-[180px]"
          style={{ WebkitTextStroke: '2px', WebkitTextStrokeColor: 'rgb(50 125 255)' }}
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Page not found
        </motion.h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-400">
          The page you are looking for may have been moved, deleted, or never existed.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            <Home size={16} /> Back home
          </Link>
          <Link to="/projects" className="btn-secondary">
            <Search size={16} /> Browse projects
          </Link>
        </div>
      </div>
    </section>
  );
}
