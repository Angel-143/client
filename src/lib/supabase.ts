import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars missing — check .env');
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type Role = 'user' | 'admin';

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  country_code: string | null;
  whatsapp_number: string | null;
  role: Role;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category_id: string | null;
  seller_id: string | null;
  thumbnail_url: string | null;
  live_demo_url: string | null;
  tech_stack: string[];
  features: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  price: number;
  rating: number;
  sales_count: number;
  download_url: string | null;
  is_featured: boolean;
  last_updated: string;
  created_at: string;
  category?: Category | null;
};

export type Favorite = {
  id: string;
  user_id: string;
  project_id: string;
  created_at: string;
  project?: Project;
};

export type Order = {
  id: string;
  user_id: string;
  project_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  transaction_id: string | null;
  created_at: string;
  project?: Project;
};

export type Review = {
  id: string;
  user_id: string;
  project_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
};
