import { useQuery } from '@tanstack/react-query'
import { FolderKanban, DollarSign, ShoppingCart, MessageSquare, Users, Star, ArrowUpRight } from 'lucide-react'
import { supabase, type Project, type ContactMessage, type Order } from '../../lib/supabase'
import { formatPrice, formatDate } from '../../lib/constants'
import Badge from '../../components/ui/Badge'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const [projects, orders, messages, profiles, featured] = await Promise.all([
        supabase.from('projects').select('*'),
        supabase.from('orders').select('*'),
        supabase.from('contact_messages').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('projects').select('*').eq('is_featured', true),
      ])
      return {
        projectCount: projects.data?.length || 0,
        orderCount: orders.data?.length || 0,
        revenue: orders.data?.reduce((sum, o) => sum + Number(o.amount), 0) || 0,
        messageCount: messages.data?.length || 0,
        newMessages: messages.data?.filter(m => m.status === 'new').length || 0,
        userCount: profiles.data?.length || 0,
        featuredCount: featured.data?.length || 0,
      }
    },
  })

  const { data: recentProjects } = useQuery<Project[]>({
    queryKey: ['admin', 'recent-projects'],
    queryFn: async () => { const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(5); return data as Project[] },
  })

  const { data: recentMessages } = useQuery<ContactMessage[]>({
    queryKey: ['admin', 'recent-messages'],
    queryFn: async () => { const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5); return data as ContactMessage[] },
  })

  const { data: recentOrders } = useQuery<Order[]>({
    queryKey: ['admin', 'recent-orders'],
    queryFn: async () => { const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5); return data as Order[] },
  })

  const cards = [
    { label: 'Total Projects', value: stats?.projectCount ?? '—', sub: `${stats?.featuredCount ?? 0} featured`, icon: FolderKanban, color: 'from-brand-500 to-brand-700', bg: 'bg-brand-50 dark:bg-brand-900/20', text: 'text-brand-600 dark:text-brand-400' },
    { label: 'Revenue', value: stats ? formatPrice(stats.revenue) : '—', sub: `${stats?.orderCount ?? 0} orders`, icon: DollarSign, color: 'from-green-500 to-emerald-700', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' },
    { label: 'Messages', value: stats?.messageCount ?? '—', sub: `${stats?.newMessages ?? 0} new`, icon: MessageSquare, color: 'from-purple-500 to-violet-700', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
    { label: 'Users', value: stats?.userCount ?? '—', sub: 'Registered', icon: Users, color: 'from-amber-500 to-orange-700', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {stats && stats.newMessages > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center justify-between">
          <p className="text-sm text-amber-800 dark:text-amber-200">You have {stats.newMessages} new message{stats.newMessages > 1 ? 's' : ''} to review.</p>
          <Link to="/admin/pages" className="text-sm font-medium text-amber-800 dark:text-amber-200 hover:underline flex items-center gap-1">View <ArrowUpRight size={14} /></Link>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <Icon size={20} className={card.text} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{isLoading ? '...' : card.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{card.label}</p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white">Recent Projects</h2>
            <Link to="/admin/projects" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentProjects?.map(p => (
              <div key={p.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">{p.thumbnail_url && <img src={p.thumbnail_url} alt="" className="w-full h-full object-cover" />}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.title}</p>
                  <p className="text-xs text-gray-400">{formatDate(p.created_at)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatPrice(p.price)}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 justify-end"><Star size={10} className="fill-amber-400 text-amber-400" /> {p.rating.toFixed(1)}</p>
                </div>
              </div>
            ))}
            {(!recentProjects || recentProjects.length === 0) && <p className="p-8 text-center text-gray-400 text-sm">No projects yet.</p>}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white">Recent Messages</h2>
            <Link to="/admin/pages" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentMessages?.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">{m.name[0]?.toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{m.name}</p>
                  <p className="text-xs text-gray-400 truncate">{m.subject || m.message}</p>
                </div>
                {m.status === 'new' && <Badge color="brand">New</Badge>}
              </div>
            ))}
            {(!recentMessages || recentMessages.length === 0) && <p className="p-8 text-center text-gray-400 text-sm">No messages yet.</p>}
          </div>
        </div>
      </div>

      {recentOrders && recentOrders.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800"><h2 className="font-bold text-gray-900 dark:text-white">Recent Orders</h2></div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentOrders.map(o => (
              <div key={o.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><ShoppingCart size={16} className="text-green-600 dark:text-green-400" /></div>
                  <div><p className="text-sm font-medium text-gray-900 dark:text-white">{formatPrice(Number(o.amount))}</p><p className="text-xs text-gray-400">{formatDate(o.created_at)}</p></div>
                </div>
                <Badge color={o.status === 'completed' ? 'green' : 'amber'}>{o.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
