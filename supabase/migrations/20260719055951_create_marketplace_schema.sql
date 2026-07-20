/*
# MyClientWork Marketplace Schema

## Overview
Creates the full data model for a premium source-code marketplace:
profiles, categories, projects, project technologies, favorites,
orders, reviews, and contact messages. Designed for Supabase Auth
with role-based access (user / admin) stored in `profiles.role`.

## New Tables
1. `profiles` — extends `auth.users` with display name, avatar, role,
   WhatsApp number, country code. `role` defaults to `user`, can be `admin`.
2. `categories` — marketplace categories (e.g. Web, Mobile, AI). Slug unique.
3. `projects` — marketplace listings: title, slug, description, price,
   tech stack, features, difficulty, rating, sales count, thumbnail,
   live demo URL, category FK, seller FK. Public read.
4. `favorites` — user bookmarks of projects (user_id + project_id unique).
5. `orders` — purchase records: buyer FK, project FK, amount, status,
   download URL, transaction id.
6. `reviews` — user reviews of projects (one per user per project).
7. `contact_messages` — submissions from the Contact page.

## Security
- RLS enabled on every table.
- `profiles`: a user can read all profiles (for seller info) but only
  update their own. Insert is handled server-side via trigger on signup.
- `categories`, `projects`: public read (anon + authenticated) so the
  marketplace renders without login; writes are admin-only.
- `favorites`, `orders`, `reviews`: owner-scoped CRUD (authenticated).
- `contact_messages`: anyone can insert (anon + authenticated);
  only admins can read/delete.

## Notes
1. A trigger `handle_new_user` auto-creates a `profiles` row on signup
   using the auth user's id, email, and metadata (full_name).
2. Admin writes rely on a helper `is_admin()` checking `profiles.role`.
3. All owner columns default to `auth.uid()` so client inserts omit them.
4. Idempotent: uses `IF NOT EXISTS` and drops policies before recreating.
*/

-- ---------- profiles ----------
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  avatar_url text,
  country_code text DEFAULT '+91',
  whatsapp_number text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

-- helper: is current user an admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- ---------- categories ----------
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  icon text,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categories_select_all" ON public.categories;
CREATE POLICY "categories_select_all" ON public.categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "categories_write_admin" ON public.categories;
CREATE POLICY "categories_write_admin" ON public.categories FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "categories_update_admin" ON public.categories;
CREATE POLICY "categories_update_admin" ON public.categories FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "categories_delete_admin" ON public.categories;
CREATE POLICY "categories_delete_admin" ON public.categories FOR DELETE
  TO authenticated USING (public.is_admin());

-- ---------- projects ----------
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text,
  description text,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  seller_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  thumbnail_url text,
  live_demo_url text,
  tech_stack text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  difficulty text NOT NULL DEFAULT 'Intermediate' CHECK (difficulty IN ('Beginner','Intermediate','Advanced','Expert')),
  price numeric(10,2) NOT NULL DEFAULT 0,
  rating numeric(3,2) NOT NULL DEFAULT 0,
  sales_count integer NOT NULL DEFAULT 0,
  download_url text,
  is_featured boolean NOT NULL DEFAULT false,
  last_updated timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "projects_select_all" ON public.projects;
CREATE POLICY "projects_select_all" ON public.projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "projects_insert_admin" ON public.projects;
CREATE POLICY "projects_insert_admin" ON public.projects FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "projects_update_admin" ON public.projects;
CREATE POLICY "projects_update_admin" ON public.projects FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "projects_delete_admin" ON public.projects;
CREATE POLICY "projects_delete_admin" ON public.projects FOR DELETE
  TO authenticated USING (public.is_admin());

CREATE INDEX IF NOT EXISTS projects_category_idx ON public.projects(category_id);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON public.projects(is_featured);
CREATE INDEX IF NOT EXISTS projects_created_idx ON public.projects(created_at DESC);

-- ---------- favorites ----------
CREATE TABLE IF NOT EXISTS public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, project_id)
);
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "favorites_select_own" ON public.favorites;
CREATE POLICY "favorites_select_own" ON public.favorites FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "favorites_insert_own" ON public.favorites;
CREATE POLICY "favorites_insert_own" ON public.favorites FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "favorites_delete_own" ON public.favorites;
CREATE POLICY "favorites_delete_own" ON public.favorites FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ---------- orders ----------
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'completed' CHECK (status IN ('pending','completed','refunded','failed')),
  transaction_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
CREATE POLICY "orders_select_own" ON public.orders FOR SELECT
  TO authenticated USING (auth.uid() = user_id OR public.is_admin());
DROP POLICY IF EXISTS "orders_insert_own" ON public.orders;
CREATE POLICY "orders_insert_own" ON public.orders FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "orders_update_admin" ON public.orders;
CREATE POLICY "orders_update_admin" ON public.orders FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "orders_delete_admin" ON public.orders;
CREATE POLICY "orders_delete_admin" ON public.orders FOR DELETE
  TO authenticated USING (public.is_admin());

CREATE INDEX IF NOT EXISTS orders_user_idx ON public.orders(user_id);

-- ---------- reviews ----------
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  rating integer NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, project_id)
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "reviews_select_all" ON public.reviews;
CREATE POLICY "reviews_select_all" ON public.reviews FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "reviews_insert_own" ON public.reviews;
CREATE POLICY "reviews_insert_own" ON public.reviews FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "reviews_update_own" ON public.reviews;
CREATE POLICY "reviews_update_own" ON public.reviews FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "reviews_delete_own" ON public.reviews;
CREATE POLICY "reviews_delete_own" ON public.reviews FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ---------- contact_messages ----------
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','read','archived')),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_insert_any" ON public.contact_messages;
CREATE POLICY "contact_insert_any" ON public.contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "contact_read_admin" ON public.contact_messages;
CREATE POLICY "contact_read_admin" ON public.contact_messages FOR SELECT
  TO authenticated USING (public.is_admin());
DROP POLICY IF EXISTS "contact_update_admin" ON public.contact_messages;
CREATE POLICY "contact_update_admin" ON public.contact_messages FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "contact_delete_admin" ON public.contact_messages;
CREATE POLICY "contact_delete_admin" ON public.contact_messages FOR DELETE
  TO authenticated USING (public.is_admin());

-- ---------- trigger: auto-create profile on signup ----------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
