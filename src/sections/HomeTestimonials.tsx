import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Full-stack Developer',
    avatar: 'https://i.pravatar.cc/100?img=12',
    rating: 5,
    text: 'MyClientWork saved me weeks of work. The Nexus dashboard was production-ready and beautifully designed. Worth every dollar.',
  },
  {
    name: 'Sofia Almeida',
    role: 'Indie Hacker',
    avatar: 'https://i.pravatar.cc/100?img=47',
    rating: 5,
    text: 'I shipped my SaaS MVP in 3 days using the Vertex starter kit. The code quality is exceptional and the support was instant.',
  },
  {
    name: 'Daniel Kim',
    role: 'Engineering Lead',
    avatar: 'https://i.pravatar.cc/100?img=33',
    rating: 4.5,
    text: 'The variety of projects is impressive. Our team bought three templates and they all integrated cleanly into our workflow.',
  },
  {
    name: 'Priya Nair',
    role: 'Freelance Developer',
    avatar: 'https://i.pravatar.cc/100?img=45',
    rating: 5,
    text: 'Best marketplace for source code I have used. Clean code, clear docs, and the lifetime updates are a huge bonus.',
  },
  {
    name: 'Marcus Bauer',
    role: 'Startup Founder',
    avatar: 'https://i.pravatar.cc/100?img=15',
    rating: 5,
    text: 'The Aurora e-commerce kit let us launch our store in a weekend. Stripe was already wired up. Incredible value.',
  },
  {
    name: 'Yuki Tanaka',
    role: 'ML Engineer',
    avatar: 'https://i.pravatar.cc/100?img=23',
    rating: 4.5,
    text: 'Lumina AI chat was a great foundation for our internal assistant. Streaming responses worked out of the box.',
  },
];

export function HomeTestimonials() {
  return (
    <section className="section bg-white dark:bg-slate-900/40">
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Testimonials
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by developers worldwide
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card relative p-6"
            >
              <Quote className="absolute right-5 top-5 text-brand-100 dark:text-brand-500/10" size={40} />
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={14}
                    className={s < Math.floor(t.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}
                  />
                ))}
              </div>
              <blockquote className="relative text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
