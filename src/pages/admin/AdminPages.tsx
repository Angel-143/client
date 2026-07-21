import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2, MailOpen } from 'lucide-react'
import { supabase, type ContactMessage } from '../../lib/supabase'
import { formatDateTime } from '../../lib/constants'
import Badge from '../../components/ui/Badge'

export default function AdminPages() {
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  const { data: messages } = useQuery<ContactMessage[]>({ queryKey: ['admin', 'messages'], queryFn: async () => { const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false }); return data as ContactMessage[] } })

  const markRead = async (msg: ContactMessage) => {
    await supabase.from('contact_messages').update({ status: 'read' }).eq('id', msg.id)
    queryClient.invalidateQueries({ queryKey: ['admin', 'messages'] })
    setSelected({ ...msg, status: 'read' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    queryClient.invalidateQueries({ queryKey: ['admin', 'messages'] })
    setSelected(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pages & Messages</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Contact form submissions</p>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[600px] overflow-y-auto">
            {messages?.map(m => (
              <button key={m.id} onClick={() => { setSelected(m); if (m.status === 'new') markRead(m) }} className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${selected?.id === m.id ? 'bg-brand-50 dark:bg-brand-900/20' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0"><p className="font-medium text-gray-900 dark:text-white text-sm truncate">{m.name}</p><p className="text-xs text-gray-500 truncate">{m.email}</p><p className="text-xs text-gray-400 mt-1 truncate">{m.subject || m.message}</p></div>
                  <div className="flex-shrink-0">{m.status === 'new' ? <Badge color="brand">New</Badge> : <Badge color="gray">Read</Badge>}</div>
                </div>
              </button>
            ))}
            {(!messages || messages.length === 0) && <p className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">No messages yet.</p>}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          {selected ? (
            <div>
              <div className="flex items-start justify-between mb-4"><div><h3 className="font-bold text-gray-900 dark:text-white">{selected.name}</h3><p className="text-sm text-gray-500">{selected.email}</p></div><button onClick={() => handleDelete(selected.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button></div>
              <p className="text-xs text-gray-400 mb-4">{formatDateTime(selected.created_at)}</p>
              {selected.subject && <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Subject: {selected.subject}</p>}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center"><MailOpen size={32} className="text-gray-300 dark:text-gray-700 mb-3" /><p className="text-gray-500 dark:text-gray-400 text-sm">Select a message to view details</p></div>
          )}
        </div>
      </div>
    </div>
  )
}
