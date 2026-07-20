import { motion } from 'framer-motion';

export function AnimatedBackground({ variant = 'default' }: { variant?: 'default' | 'subtle' }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-light bg-[size:48px_48px] opacity-60 dark:bg-grid-dark" />
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-500/10" />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl dark:bg-accent-500/10"
      />
      {variant === 'default' && (
        <motion.div
          animate={{ y: [0, 24, 0], x: [0, -16, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl dark:bg-brand-500/10"
        />
      )}
    </div>
  );
}
