import { motion } from 'framer-motion';
import { Logo } from './Logo';

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Logo showText={false} />
      </motion.div>
      <div className="h-1 w-32 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-1/2 rounded-full bg-brand-500"
        />
      </div>
    </div>
  );
}
