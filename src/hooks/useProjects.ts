import { useQuery } from '@tanstack/react-query';
import { supabase, type Project, type Category, type Review } from '@/lib/supabase';

export function useProjects(filters?: {
  category?: string;
  search?: string;
  difficulty?: string;
  sort?: 'newest' | 'price-low' | 'price-high' | 'popular' | 'rating';
}) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      let q = supabase.from('projects').select('*, category:categories(*)');
      if (filters?.category && filters.category !== 'all') {
        q = q.eq('category_id', filters.category);
      }
      if (filters?.difficulty && filters.difficulty !== 'all') {
        q = q.eq('difficulty', filters.difficulty);
      }
      if (filters?.search) {
        q = q.or(`title.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`);
      }
      switch (filters?.sort) {
        case 'price-low': q = q.order('price', { ascending: true }); break;
        case 'price-high': q = q.order('price', { ascending: false }); break;
        case 'popular': q = q.order('sales_count', { ascending: false }); break;
        case 'rating': q = q.order('rating', { ascending: false }); break;
        default: q = q.order('created_at', { ascending: false });
      }
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });
}

export function useFeaturedProjects(limit = 6) {
  return useQuery({
    queryKey: ['projects', 'featured', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, category:categories(*)')
        .eq('is_featured', true)
        .order('sales_count', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, category:categories(*)')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data as Project | null;
    },
    enabled: Boolean(slug),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (error) throw error;
      return (data ?? []) as Category[];
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useReviews(projectId: string) {
  return useQuery({
    queryKey: ['reviews', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Review[];
    },
    enabled: Boolean(projectId),
  });
}
