import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase, type Role } from '@/lib/supabase';
import { Logo } from '@/components/ui/Logo';

type Status = 'exchanging' | 'loading_profile' | 'redirecting' | 'error';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>('exchanging');
  const [errorMsg, setErrorMsg] = useState('');
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;

    async function handleCallback() {
      try {
        // detectSessionInUrl is true on the client, so exchangeCodeForSession
        // is triggered automatically by getSession. We call it explicitly to
        // surface any OAuth error (e.g. access_denied from Google consent).
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
          window.location.href,
        );
        if (exchangeError) throw exchangeError;

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!session?.user) throw new Error('No session returned after Google sign-in.');

        if (cancelled) return;
        setStatus('loading_profile');

        // Poll for the profile row — the handle_new_user trigger creates it
        // asynchronously on the SIGNED_IN event, so it may not exist yet.
        let role: Role = 'user';
        for (let attempt = 0; attempt < 10; attempt++) {
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle();
          if (data) {
            role = (data.role as Role) ?? 'user';
            break;
          }
          await new Promise((r) => setTimeout(r, 250));
        }

        if (cancelled) return;
        setStatus('redirecting');
        navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true });
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Google sign-in failed.';
        setErrorMsg(msg);
        setStatus('error');
        // Clean up any partial session so the user can retry cleanly.
        await supabase.auth.signOut();
        setTimeout(() => navigate('/login', { replace: true }), 2200);
      }
    }

    handleCallback();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="w-full max-w-md px-4">
        <div className="card p-10 text-center">
          <Logo className="justify-center" showText={false} />

          {status === 'error' ? (
            <div className="mt-8 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-error-50 text-error-500 dark:bg-error-500/15">
                <AlertCircle size={28} />
              </div>
              <h1 className="font-display text-xl font-bold">Sign-in failed</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{errorMsg}</p>
              <p className="text-xs text-slate-400">Redirecting to login…</p>
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                {status === 'redirecting' ? (
                  <ShieldCheck size={28} />
                ) : (
                  <Loader2 size={28} className="animate-spin" />
                )}
              </div>
              <h1 className="font-display text-xl font-bold">
                {status === 'redirecting' ? 'Success!' : 'Completing sign-in…'}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {status === 'redirecting'
                  ? 'Taking you to your dashboard.'
                  : 'Securely connecting your Google account.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
