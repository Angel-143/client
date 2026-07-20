import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, MapPin, MessageSquare, Send, Phone } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useCreateContactMessage } from '@/hooks/useData';
import { SITE } from '@/lib/constants';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const createMessage = useCreateContactMessage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onBlur' });

  async function onSubmit(data: FormData) {
    try {
      await createMessage.mutateAsync(data);
      toast.success('Message sent! We will get back to you soon.');
      reset();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to send message');
    }
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <AnimatedBackground />
        <div className="container-page py-16 sm:py-20 text-center">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="heading-gradient">Get in touch</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-300 text-balance">
            Questions, feedback, or partnership ideas? We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-4">
            {[
              { icon: Mail, title: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: MessageSquare, title: 'Live chat', value: 'Mon–Fri, 9am–6pm IST' },
              { icon: Phone, title: 'Phone', value: '+91 98765 43210' },
              { icon: MapPin, title: 'Office', value: 'Bengaluru, Karnataka, India' },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href ?? '#'}
                className="card flex items-start gap-4 p-5 transition-colors hover:border-brand-300 dark:hover:border-brand-500/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  <c.icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{c.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{c.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5 p-6 sm:p-8" noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">Full name</label>
                  <input id="name" className="input" placeholder="Jane Doe" {...register('name')} />
                  {errors.name && <p className="mt-1 text-xs text-error-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="email">Email</label>
                  <input id="email" type="email" className="input" placeholder="you@example.com" {...register('email')} />
                  {errors.email && <p className="mt-1 text-xs text-error-500">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="label" htmlFor="subject">Subject</label>
                <input id="subject" className="input" placeholder="How can we help?" {...register('subject')} />
                {errors.subject && <p className="mt-1 text-xs text-error-500">{errors.subject.message}</p>}
              </div>
              <div>
                <label className="label" htmlFor="message">Message</label>
                <textarea id="message" rows={5} className="input resize-none" placeholder="Tell us more..." {...register('message')} />
                {errors.message && <p className="mt-1 text-xs text-error-500">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Sending...' : submitted ? 'Sent!' : (<><Send size={16} /> Send message</>)}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
