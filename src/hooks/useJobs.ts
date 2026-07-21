import { useQuery } from '@tanstack/react-query';
import { supabase, type Job } from '@/lib/supabase';

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Job[];
    },
  });
}
