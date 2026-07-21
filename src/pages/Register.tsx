import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, User, Phone, Globe, UserPlus, Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/constants';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  countryCode: z.string().min(2, 'Select a country code'),
  whatsappNumber: z.string().min(6, 'Enter a valid number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  terms: z.boolean().refine((v) => v, 'You must accept the terms'),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

function strength(password: string): { score: number; label: string; color: string } {
  let s = 0;
  if (password.length >= 8) s++;
  if (/[A-Z]/.test(password)) s++;
  if (/[0-9]/.test(password)) s++;
  if (/[^A-Za-z0-9]/.test(password)) s++;
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-error-500', 'bg-error-500', 'bg-warning-500', 'bg-accent-500', 'bg-accent-600'];
  return { score: s, label: labels[s], color: colors[s] };
}

const countryCodes = ['+91', '+1', '+44', '+61', '+971', '+27', '+49', '+33'];

export default function Register() {
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onBlur' });

  const s = strength(password);

  async function handleGoogle() {
    setGoogleLoading(true);
    toast.loading('Redirecting to Google…', { id: 'google' });
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error, { id: 'google' });
      setGoogleLoading(false);
    }
  }

  async function onSubmit(data: FormData) {
    const { error } = await signUp({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      countryCode: data.countryCode,
      whatsappNumber: data.whatsappNumber,
    });
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Account created! Welcome to MyClientWork.');
    navigate('/dashboard');
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-12">
      <AnimatedBackground />
      <div className="w-full max-w-lg px-4">
        <div className="card p-8">
          <div className="mb-6 text-center">
            <Logo className="justify-center" showText={false} />
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Join the premium source code marketplace</p>
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
            {googleLoading ? 'Redirecting…' : 'Sign up with Google'}
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="label" htmlFor="fullName">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input id="fullName" className="input pl-10" placeholder="Jane Doe" {...register('fullName')} />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-error-500">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input id="email" type="email" className="input pl-10" placeholder="you@example.com" {...register('email')} />
              </div>
              {errors.email && <p className="mt-1 text-xs text-error-500">{errors.email.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="countryCode">Country</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select id="countryCode" className="input pl-10" {...register('countryCode')}>
                    {countryCodes.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {errors.countryCode && <p className="mt-1 text-xs text-error-500">{errors.countryCode.message}</p>}
              </div>
              <div>
                <label className="label" htmlFor="whatsappNumber">WhatsApp</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="whatsappNumber" className="input pl-10" placeholder="9876543210" {...register('whatsappNumber')} />
                </div>
                {errors.whatsappNumber && <p className="mt-1 text-xs text-error-500">{errors.whatsappNumber.message}</p>}
              </div>
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
                  onChange={(e) => { setPassword(e.target.value); }}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={cn('h-1.5 flex-1 rounded-full transition-colors', i < s.score ? s.color : 'bg-slate-200 dark:bg-slate-800')} />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-error-500">{errors.password.message}</p>}
            </div>
            <div>
              <label className="label" htmlFor="confirmPassword">Confirm password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  className="input px-10"
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                />
                <button type="button" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-error-500">{errors.confirmPassword.message}</p>}
            </div>
            <label className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <input type="checkbox" {...register('terms')} className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              <span>I agree to the <Link to="/terms" className="font-medium text-brand-600 hover:text-brand-700">Terms</Link> and <Link to="/privacy" className="font-medium text-brand-600 hover:text-brand-700">Privacy Policy</Link>.</span>
            </label>
            {errors.terms && <p className="text-xs text-error-500">{errors.terms.message}</p>}
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3">
              {isSubmitting ? 'Creating...' : (<><UserPlus size={16} /> Create account</>)}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
