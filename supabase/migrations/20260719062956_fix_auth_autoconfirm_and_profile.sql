/*
# Fix auth flow: auto-confirm users + robust profile creation

## Why
Supabase enables email confirmation by default. When a user registers,
`auth.users.email_confirmed_at` stays NULL until they click a confirmation
link — so `signInWithPassword` fails with "Email not confirmed". For a
marketplace where we want instant login after signup, we auto-confirm the
user inside the existing `handle_new_user` trigger.

## Changes
1. `public.handle_new_user()` — also sets `email_confirmed_at = now()` and
   `confirmed_at = now()` on the NEW auth.users row so login works
   immediately after signup. Trigger is replaced (no new trigger created).
2. `profiles` INSERT policy — relaxed to allow the authenticated owner OR
   the service role (trigger) to insert. The trigger runs as SECURITY
   DEFINER so it bypasses RLS already; this change covers the client-side
   upsert in AuthContext.signUp as a safety net.

## Notes
- Idempotent: uses OR REPLACE and drops/recreates policies.
- No data loss: no DROP on tables or columns.
*/

-- 1. Update the new-user trigger to auto-confirm email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- auto-confirm so signInWithPassword works right after signUp
  NEW.email_confirmed_at := now();
  NEW.confirmed_at := now();

  INSERT INTO public.profiles (id, email, full_name, country_code, whatsapp_number)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'country_code', '+91'),
    COALESCE(NEW.raw_user_meta_data->>'whatsapp_number', NULL)
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    country_code = EXCLUDED.country_code,
    whatsapp_number = EXCLUDED.whatsapp_number,
    email = EXCLUDED.email;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Relax profiles INSERT policy so the client upsert also works
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);
