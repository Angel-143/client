import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What do I get when I buy a project?',
    a: 'You receive the complete source code, documentation, setup instructions, and lifetime access to future updates. Some projects also include design assets and a live demo.',
  },
  {
    q: 'Are the projects production-ready?',
    a: 'Yes. Every project is reviewed for code quality, security, and best practices. They are designed to be deployed directly or extended into a real product.',
  },
  {
    q: 'Can I use these projects for client work?',
    a: 'Absolutely. The license permits use in personal and commercial projects, including client deliverables. You may not resell the source code itself.',
  },
  {
    q: 'How do I get support after purchase?',
    a: 'Each project includes access to the original author for questions and customization help. You can also reach out through our support center anytime.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Because source code is a digital good that cannot be returned, refunds are handled case-by-case. If a project is materially broken or misrepresented, contact us for a full refund.',
  },
  {
    q: 'Will I receive updates?',
    a: 'Yes — every purchase includes lifetime updates for the project you bought. You will be notified when a new version is released.',
  },
];

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            FAQ
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-slate-900 dark:text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
