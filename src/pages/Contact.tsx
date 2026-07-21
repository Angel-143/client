import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, MessageSquare, CheckCircle2, Headphones } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { SITE } from '@/lib/constants';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const contactCards = [
  { icon: Mail, title: 'Email Us', value: SITE.email, href: `mailto:${SITE.email}`, description: 'We reply within 24 hours' },
  { icon: MapPin, title: 'Location', value: SITE.address, description: 'Bhubaneswar, Odisha, India' },
  { icon: Headphones, title: 'Support', value: '24/7 Developer Support', description: 'Direct access to authors' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onBlur' });

  async function onSubmit(data: FormData) {
    const { error } = await supabase.from('contact_messages').insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    if (error) {
      toast.error('Failed to send message. Please try again.');
      return;
    }
    toast.success('Message sent! We will get back to you soon.');
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="container-page py-20 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
            <span className="overline mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 dark:border-brand-500/30 dark:bg-brand-500/10">
              <MessageSquare size={14} /> Get in touch
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              <span className="heading-gradient">Let's build something together</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 text-balance">
              Questions about a project, need a custom build, or want to partner with us? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact info cards */}
            <div className="space-y-4">
              {contactCards.map((card, i) => (
                <motion.div key={card.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card-hover group p-6">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-400">
                    <card.icon size={20} />
                  </div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  {card.href ? (
                    <a href={card.href} className="mt-1 block text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400">{card.value}</a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">{card.value}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{card.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2">
              <div className="card p-6 sm:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success-50 text-success-500 dark:bg-success-500/15">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Message sent!</h3>
                    <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="label" htmlFor="name">Full Name</label>
                        <input id="name" className="input" placeholder="John Doe" {...register('name')} />
                        {errors.name && <p className="mt-1 text-xs text-error-600">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="label" htmlFor="email">Email</label>
                        <input id="email" type="email" className="input" placeholder="john@example.com" {...register('email')} />
                        {errors.email && <p className="mt-1 text-xs text-error-600">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="label" htmlFor="subject">Subject</label>
                      <input id="subject" className="input" placeholder="How can we help?" {...register('subject')} />
                      {errors.subject && <p className="mt-1 text-xs text-error-600">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <label className="label" htmlFor="message">Message</label>
                      <textarea id="message" rows={5} className="input resize-none" placeholder="Tell us about your project, question, or idea..." {...register('message')} />
                      {errors.message && <p className="mt-1 text-xs text-error-600">{errors.message.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-base">
                      {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
