import { useQuery } from '@tanstack/react-query'
import { FolderKanban, DollarSign, ShoppingCart, MessageSquare, TrendingUp } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { formatPrice } from '../../lib/constants'

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const [projects, orders, messages, profiles] = await Promise.all([
        supabase.from('projects').select('*'),
        supabase.from('orders').select('*'),
        supabase.from('contact_messages').select('*'),
        supabase.from('profiles').select('*'),
      ])
      return {
        projectCount: projects.data?.length || 0,
        orderCount: orders.data?.length || 0,
        revenue: orders.data?.reduce((sum, o) => sum + Number(o.amount), 0) || 0,
        messageCount: messages.data?.length || 0,
        newMessages: messages.data?.filter((m) => m.status === 'new').length || 0,
        userCount: profiles.data?.length || 0,
      }
    },
  })

  const cards = [
    { label: 'Projects', value: stats?.projectCount ?? '—', icon: FolderKanban, color: 'text-brand-600 bg-brand-100 dark:bg-brand-900/30' },
    { label: 'Revenue', value: stats ? formatPrice(stats.revenue) : '—', icon: DollarSign, color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
    { label: 'Orders', value: stats?.orderCount ?? '—', icon: ShoppingCart, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
    { label: 'Messages', value: stats?.messageCount ?? '—', icon: MessageSquare, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
    { label: 'Users', value: stats?.userCount ?? '—', icon: TrendingUp, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Overview</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Welcome to your admin dashboard</p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
            </div>
          )
        })}
      </div>

      {stats && stats.newMessages > 0 && (
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            You have {stats.newMessages} new message{stats.newMessages > 1 ? 's' : ''} to review.
          </p>
        </div>
      )}
    </div>
  )
}
