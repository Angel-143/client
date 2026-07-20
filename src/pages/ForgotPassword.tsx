import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Logo } from '@/components/ui/Logo';

const schema = z.object({ email: z.string().email('Enter a valid email') });
type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onBlur' });

  async function onSubmit(data: FormData) {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success('Reset link sent. Check your inbox.');
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-12">
      <AnimatedBackground />
      <div className="w-full max-w-md px-4">
        <div className="card p-8">
          <div className="mb-6 text-center">
            <Logo className="justify-center" showText={false} />
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Reset password</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Enter your email and we will send you a reset link.
            </p>
          </div>

          {sent ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-accent-600 dark:bg-accent-500/15">
                <Mail size={22} />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                If an account exists for that email, a reset link is on its way.
              </p>
              <Link to="/login" className="btn-secondary w-full">
                <ArrowLeft size={16} /> Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <label className="label" htmlFor="email">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="email" type="email" className="input pl-10" placeholder="you@example.com" {...register('email')} />
                </div>
                {errors.email && <p className="mt-1 text-xs text-error-500">{errors.email.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3">
                {isSubmitting ? 'Sending...' : (<><Send size={16} /> Send reset link</>)}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Remembered your password?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
