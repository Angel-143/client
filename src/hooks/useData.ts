import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type Favorite, type Order, type Review, type ContactMessage, type Project } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useCategories } from '@/hooks/useProjects';
export { useCategories };

export function useFavorites() {
  const { session } = useAuth();
  return useQuery<(Favorite & { project?: any })[]>({
    queryKey: ['favorites', session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*, project:projects(*, category:categories(*))')
        .eq('user_id', session!.user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as any[];
    },
    enabled: Boolean(session),
    staleTime: 1000 * 60 * 2,
  });
}

export function useToggleFavorite() {
  const { session } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (projectId: string) => {
      if (!session) throw new Error('Sign in to favorite projects');
      const { data: existing } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('project_id', projectId)
        .maybeSingle();
      if (existing) {
        await supabase.from('favorites').delete().eq('id', existing.id);
        return { favorited: false };
      }
      await supabase.from('favorites').insert({ user_id: session.user.id, project_id: projectId });
      return { favorited: true };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });
}

export function useOrders() {
  const { session } = useAuth();
  return useQuery<Order[]>({
    queryKey: ['orders', session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, project:projects(*, category:categories(*))')
        .eq('user_id', session!.user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as any[];
    },
    enabled: Boolean(session),
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateOrder() {
  const { session } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { projectId: string; amount: number }) => {
      if (!session) throw new Error('Sign in to purchase projects');
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: session.user.id,
          project_id: input.projectId,
          amount: input.amount,
          status: 'completed',
          transaction_id: `mcw_${Date.now()}`,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });
}

export function useReviews(projectId?: string) {
  return useQuery<Review[]>({
    queryKey: ['reviews', projectId],
    queryFn: async () => {
      let query = supabase.from('reviews').select('*, profile:profiles(full_name, avatar_url)');
      if (projectId) query = query.eq('project_id', projectId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as any[];
    },
    enabled: projectId === undefined || Boolean(projectId),
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { projectId: string; rating: number; comment: string }) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_d, vars) => qc.invalidateQueries({ queryKey: ['reviews', vars.projectId] }),
  });
}

export function useContactMessages() {
  return useQuery<ContactMessage[]>({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as ContactMessage[];
    },
  });
}

export function useCreateContactMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { name: string; email: string; subject: string; message: string }) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact-messages'] }),
  });
}

export function useAdminProjects() {
  return useQuery<Project[]>({
    queryKey: ['admin', 'projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, category:categories(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });
}

export function useJobs(filters: { status?: string } = {}) {
  return useQuery<any[]>({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      let query = supabase.from('jobs').select('*').order('created_at', { ascending: false });
      if (filters.status) query = query.eq('status', filters.status);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 2,
  });
}

export function useJob(slug: string) {
  return useQuery<any | null>({
    queryKey: ['job', slug],
    queryFn: async () => {
      const { data, error } = await supabase.from('jobs').select('*').eq('slug', slug).maybeSingle();
      if (error) throw error;
      return data ?? null;
    },
    enabled: Boolean(slug),
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: any) => {
      const { data, error } = await supabase.from('jobs').insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
}

export function useUpdateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: any) => {
      const { data, error } = await supabase.from('jobs').update(input).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
}

export function useTeamMembers(activeOnly = false) {
  return useQuery<any[]>({
    queryKey: ['team-members', { activeOnly }],
    queryFn: async () => {
      let query = supabase.from('team_members').select('*').order('display_order', { ascending: true });
      if (activeOnly) query = query.eq('is_active', true);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 2,
  });
}

export function useMyTeamMember() {
  const { session } = useAuth();
  return useQuery<any | null>({
    queryKey: ['team-member', session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('profile_id', session!.user.id)
        .maybeSingle();
      if (error) throw error;
      return data ?? null;
    },
    enabled: Boolean(session),
  });
}

export function useUpsertTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: any) => {
      if (input.id) {
        const { data, error } = await supabase.from('team_members').update(input).eq('id', input.id).select().single();
        if (error) throw error;
        return data;
      }
      const { data, error } = await supabase.from('team_members').insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['team-members'] });
      qc.invalidateQueries({ queryKey: ['team-member'] });
    },
  });
}

export function useAdminProfiles() {
  return useQuery<any[]>({
    queryKey: ['admin', 'profiles'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-data/users`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }
      const json = await res.json();
      return json.users ?? [];
    },
  });
}

export function useAdminOrders() {
  return useQuery<any[]>({
    queryKey: ['admin', 'orders'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-data/orders`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }
      const json = await res.json();
      return json.orders ?? [];
    },
  });
}
