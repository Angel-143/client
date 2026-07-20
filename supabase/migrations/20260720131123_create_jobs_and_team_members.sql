/*
# Create jobs and team_members tables

## Overview
Adds a job posting system (admin-managed, public read) and a team
members showcase (admin-managed, public read). The admin is also a
team member and can maintain their own designation, skills, and bio
through the dashboard profile.

## New Tables
1. `jobs` — job postings created by admin, visible to everyone.
   - id, title, slug (unique), department, location, employment_type,
     description, requirements (text[]), salary_range, status
     (active/closed), posted_by (admin FK), created_at, updated_at.
2. `team_members` — team showcase entries. Linked to a profile so the
   admin (who is also a team member) can edit their own entry from the
   dashboard profile page.
   - id, profile_id (FK profiles, unique so one entry per user),
     full_name, designation, bio, skills (text[]), avatar_url,
     social_links (jsonb), display_order, is_active, created_at.

## Security
- RLS enabled on both tables.
- Public read (anon + authenticated) so the website renders without
  login.
- All writes restricted to admins via public.is_admin().
- team_members also allows the linked profile owner to update their
  own row (so the admin can edit their team entry from the dashboard).

## Notes
1. Idempotent: uses IF NOT EXISTS and drops policies before recreating.
2. display_order defaults to 0; lower numbers appear first.
3. is_active controls visibility on the public team section.
*/

-- ---------- jobs ----------
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  department text,
  location text,
  employment_type text NOT NULL DEFAULT 'Full-time'
    CHECK (employment_type IN ('Full-time','Part-time','Contract','Internship','Remote')),
  description text,
  requirements text[] NOT NULL DEFAULT '{}',
  salary_range text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','closed')),
  posted_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "jobs_select_all" ON public.jobs;
CREATE POLICY "jobs_select_all" ON public.jobs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "jobs_insert_admin" ON public.jobs;
CREATE POLICY "jobs_insert_admin" ON public.jobs FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "jobs_update_admin" ON public.jobs;
CREATE POLICY "jobs_update_admin" ON public.jobs FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "jobs_delete_admin" ON public.jobs;
CREATE POLICY "jobs_delete_admin" ON public.jobs FOR DELETE
  TO authenticated USING (public.is_admin());

CREATE INDEX IF NOT EXISTS jobs_status_idx ON public.jobs(status);
CREATE INDEX IF NOT EXISTS jobs_created_idx ON public.jobs(created_at DESC);

-- ---------- team_members ----------
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  designation text,
  bio text,
  skills text[] NOT NULL DEFAULT '{}',
  avatar_url text,
  social_links jsonb NOT NULL DEFAULT '{}'::jsonb,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "team_select_all" ON public.team_members;
CREATE POLICY "team_select_all" ON public.team_members FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "team_insert_admin" ON public.team_members;
CREATE POLICY "team_insert_admin" ON public.team_members FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "team_update_admin_or_owner" ON public.team_members;
CREATE POLICY "team_update_admin_or_owner" ON public.team_members FOR UPDATE
  TO authenticated
  USING (public.is_admin() OR auth.uid() = profile_id)
  WITH CHECK (public.is_admin() OR auth.uid() = profile_id);

DROP POLICY IF EXISTS "team_delete_admin" ON public.team_members;
CREATE POLICY "team_delete_admin" ON public.team_members FOR DELETE
  TO authenticated USING (public.is_admin());

CREATE INDEX IF NOT EXISTS team_active_order_idx ON public.team_members(is_active, display_order);

-- updated_at trigger for jobs
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS jobs_set_updated_at ON public.jobs;
CREATE TRIGGER jobs_set_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();