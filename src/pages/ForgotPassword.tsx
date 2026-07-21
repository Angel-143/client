import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Logo } from '@/components/ui/Logo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setSent(true);
    toast.success('Reset link sent!');
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <AnimatedBackground variant="auth" />
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center"><Logo /></div>
        <div className="card p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success-50 text-success-500 dark:bg-success-500/15">
                <CheckCircle2 size={28} />
              </div>
              <h1 className="font-display text-xl font-bold">Check your email</h1>
              <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">We've sent a password reset link to <span className="font-medium text-slate-700 dark:text-slate-300">{email}</span></p>
              <Link to="/login" className="btn-secondary mt-2"><ArrowLeft size={16} /> Back to login</Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-center">Reset password</h1>
              <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">Enter your email and we'll send you a reset link</p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="label" htmlFor="email">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input id="email" type="email" className="input pl-10" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                  {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Remember your password? <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
