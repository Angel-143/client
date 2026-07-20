import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function HomeNewsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    toast.success('Subscribed! Watch your inbox for new drops.');
    setEmail('');
    setTimeout(() => setDone(false), 4000);
  }

  return (
    <section className="section pt-0">
      <div className="container-page">
        <div className="card mx-auto max-w-3xl p-8 text-center sm:p-12">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <Mail size={22} />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Get notified about new projects
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
            Join our newsletter for new project drops, exclusive discounts, and developer tips. No spam, ever.
          </p>
          <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input flex-1"
            />
            <button type="submit" className="btn-primary shrink-0">
              {done ? <CheckCircle2 size={18} /> : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
