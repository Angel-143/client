import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
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
  category?: Category;
};

export type Review = {
  id: string;
  user_id: string;
  project_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  project_id: string;
  created_at: string;
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

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
};

export type TeamMember = {
  id: string;
  profile_id: string | null;
  full_name: string;
  designation: string | null;
  bio: string | null;
  skills: string[];
  avatar_url: string | null;
  social_links: Record<string, string>;
  display_order: number;
  is_active: boolean;
};

export type Job = {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string | null;
  requirements: string[];
  salary_range: string | null;
  status: 'active' | 'closed';
  posted_by: string | null;
  created_at: string;
  updated_at: string;
};
