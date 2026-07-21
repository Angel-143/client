import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import { supabase, type Project } from '../../lib/supabase'
import { formatPrice, formatNumber } from '../../lib/constants'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

export default function AdminProjects() {
  const queryClient = useQueryClient()
  const [, setEditing] = useState<Project | null>(null)

  const { data: projects } = useQuery<Project[]>({
    queryKey: ['admin', 'projects'],
    queryFn: async () => {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
      return data as Project[]
    },
  })

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your project catalog</p>
        </div>
        <Button size="sm">
          <Plus size={16} /> Add Project
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Project</th>
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Price</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Sales</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Rating</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {projects?.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                      {project.thumbnail_url && <img src={project.thumbnail_url} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{project.title}</p>
                      {project.is_featured && <Badge color="amber" className="mt-0.5">Featured</Badge>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden sm:table-cell">{formatPrice(project.price)}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell">{formatNumber(project.sales_count)}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="inline-flex items-center gap-1 text-gray-700 dark:text-gray-300">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {project.rating.toFixed(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setEditing(project)} className="p-2 text-gray-400 hover:text-brand-600">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
