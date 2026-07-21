import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, type Profile, type Role } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function loadProfile(userId: string): Promise<Profile | null> {
  for (let i = 0; i < 5; i++) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
    if (data) return data as Profile;
    if (error) return null;
    await new Promise((r) => setTimeout(r, 200));
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (!active) return;
      setSession(s);
      if (s?.user) { const p = await loadProfile(s.user.id); if (active) setProfile(p); }
      if (active) setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, s) => {
      setSession(s);
      if (s?.user) { const p = await loadProfile(s.user.id); setProfile(p); } else { setProfile(null); }
      setLoading(false);
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session, user: session?.user ?? null, profile, isAdmin: profile?.role === 'admin', loading,
    async signUp(email, password, fullName) {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
      return { error: error?.message ?? null };
    },
    async signIn(email, password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message ?? null };
    },
    async signInWithGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback`, queryParams: { access_type: 'offline', prompt: 'consent' } },
      });
      return { error: error?.message ?? null };
    },
    async signOut() { await supabase.auth.signOut(); setProfile(null); setSession(null); },
    async refreshProfile() { if (session?.user) { const p = await loadProfile(session.user.id); setProfile(p); } },
  }), [session, profile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export type { Role };
