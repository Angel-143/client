import { useQuery } from '@tanstack/react-query'
import { supabase, type Project, type Category } from '../lib/supabase'

export function useProjects() {
  return useQuery<Project[]>({ queryKey: ['projects'], queryFn: async () => { const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false }); if (error) throw error; return data as Project[] } })
}
export function useFeaturedProjects() {
  return useQuery<Project[]>({ queryKey: ['projects', 'featured'], queryFn: async () => { const { data, error } = await supabase.from('projects').select('*').eq('is_featured', true).order('sales_count', { ascending: false }).limit(6); if (error) throw error; return data as Project[] } })
}
export function useProject(slug: string) {
  return useQuery<Project>({ queryKey: ['project', slug], queryFn: async () => { const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle(); if (error) throw error; return data as Project }, enabled: !!slug })
}
export function useCategories() {
  return useQuery<Category[]>({ queryKey: ['categories'], queryFn: async () => { const { data, error } = await supabase.from('categories').select('*').order('name'); if (error) throw error; return data as Category[] } })
}
