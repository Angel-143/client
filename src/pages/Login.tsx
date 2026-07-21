import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Logo } from '@/components/ui/Logo';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onBlur' });

  async function onSubmit(data: FormData) {
    const { error } = await signIn(data.email, data.password);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Welcome back!');
    navigate('/dashboard');
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    toast.loading('Redirecting to Google…', { id: 'google' });
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error, { id: 'google' });
      setGoogleLoading(false);
    }
    // On success the browser redirects to Google — no need to clear loading.
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-12">
      <AnimatedBackground />
      <div className="w-full max-w-md px-4">
        <div className="card p-8">
          <div className="mb-6 text-center">
            <Logo className="justify-center" showText={false} />
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Sign in to your MyClientWork account</p>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="btn-secondary w-full"
          >
            {googleLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
              </svg>
            )}
            {googleLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input id="email" type="email" className="input pl-10" placeholder="you@example.com" {...register('email')} />
              </div>
              {errors.email && <p className="mt-1 text-xs text-error-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input px-10"
                  placeholder="••••••••"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-error-500">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <input type="checkbox" {...register('remember')} className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                Forgot password?
              </Link>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3">
              {isSubmitting ? 'Signing in...' : (<><LogIn size={16} /> Sign in</>)}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">Create one</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
