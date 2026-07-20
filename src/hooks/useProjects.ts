import { useQuery } from '@tanstack/react-query';
import { supabase, type Project, type Category } from '@/lib/supabase';

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (error) throw error;
      return (data ?? []) as Category[];
    },
    staleTime: 1000 * 60 * 10,
  });
}

export type ProjectFilters = {
  search?: string;
  category?: string;
  technology?: string;
  sort?: 'latest' | 'popular' | 'price_asc' | 'price_desc';
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  limit?: number;
  page?: number;
  pageSize?: number;
};

export function useProjects(filters: ProjectFilters = {}) {
  return useQuery<Project[]>({
    queryKey: ['projects', filters],
    queryFn: async () => {
      let query = supabase.from('projects').select('*, category:categories(*)');
      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        );
      }
      if (filters.category) query = query.eq('category_id', filters.category);
      if (filters.technology) query = query.filter('tech_stack', 'cs', `["${filters.technology}"]`);
      if (filters.minPrice !== undefined) query = query.gte('price', filters.minPrice);
      if (filters.maxPrice !== undefined) query = query.lte('price', filters.maxPrice);
      if (filters.featured) query = query.eq('is_featured', true);

      switch (filters.sort) {
        case 'popular':
          query = query.order('sales_count', { ascending: false });
          break;
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      if (filters.limit) query = query.limit(filters.limit);

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Project[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProject(slug: string) {
  return useQuery<Project | null>({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, category:categories(*)')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return (data as Project) ?? null;
    },
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedProjects(limit = 6) {
  return useQuery<Project[]>({
    queryKey: ['projects', { featured: true, limit }],
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
    staleTime: 1000 * 60 * 5,
  });
}

export function useAllTechnologies() {
  return useQuery<string[]>({
    queryKey: ['technologies'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('tech_stack');
      if (error) throw error;
      const set = new Set<string>();
      (data ?? []).forEach((row) => (row.tech_stack as string[] | null)?.forEach((t) => set.add(t)));
      return Array.from(set).sort();
    },
    staleTime: 1000 * 60 * 10,
  });
}
