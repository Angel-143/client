import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Headphones, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'
import Input, { Textarea } from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import { supabase } from '../lib/supabase'
import { SITE } from '../lib/constants'

const schema = z.object({ name: z.string().min(2, 'Name must be at least 2 characters'), email: z.string().email('Enter a valid email'), subject: z.string().optional(), message: z.string().min(10, 'Message must be at least 10 characters') })
type FormData = z.infer<typeof schema>

const infoCards = [
  { icon: Mail, title: 'Email Us', value: SITE.email, sub: 'We reply within 24 hours', gradient: 'from-brand-500 to-brand-700' },
  { icon: MapPin, title: 'Location', value: SITE.location, sub: 'Available worldwide', gradient: 'from-emerald-500 to-teal-700' },
  { icon: Headphones, title: 'Support', value: '24/7 Online', sub: 'Always here to help', gradient: 'from-amber-500 to-orange-700' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from('contact_messages').insert({ name: data.name, email: data.email, subject: data.subject || null, message: data.message })
    if (error) { toast.error('Failed to send message. Please try again.'); return }
    toast.success('Message sent successfully!'); setSubmitted(true); reset(); setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 to-white dark:from-brand-950/20 dark:to-gray-950 py-20">
        <div className="absolute inset-0 -z-10"><div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-200/30 dark:bg-brand-900/20 rounded-full blur-3xl" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge color="brand" className="mb-5">Contact</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Let's talk about your <span className="bg-gradient-to-r from-brand-600 to-blue-500 bg-clip-text text-transparent">project</span></h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">Have a question or need a custom project? We're here to help. Reach out and we'll get back to you within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {infoCards.map((card, i) => { const Icon = card.icon; return (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}><Icon size={24} className="text-white" /></div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">{card.title}</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{card.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{card.sub}</p>
              </motion.div>
            )})}
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center"><MessageSquare size={20} className="text-brand-600 dark:text-brand-400" /></div>
                <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Send a Message</h2><p className="text-sm text-gray-500 dark:text-gray-400">Fill out the form below</p></div>
              </div>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4"><CheckCircle2 size={32} className="text-green-600 dark:text-green-400" /></div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5"><Input label="Full Name" placeholder="John Doe" error={errors.name?.message} {...register('name')} /><Input label="Email Address" type="email" placeholder="john@example.com" error={errors.email?.message} {...register('email')} /></div>
                  <Input label="Subject" placeholder="What's this about?" error={errors.subject?.message} {...register('subject')} />
                  <Textarea label="Message" rows={5} placeholder="Tell us about your project or question..." error={errors.message?.message} {...register('message')} />
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">{isSubmitting ? 'Sending...' : 'Send Message'}<Send size={16} /></Button>
                </form>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <Clock size={28} className="mb-3" /><h3 className="font-bold text-lg">Response Time</h3><p className="text-brand-100 text-sm mt-1">We typically respond within 24 hours during business days.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Mon - Fri</span><span className="font-medium text-gray-900 dark:text-white">9:00 - 18:00</span></div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Saturday</span><span className="font-medium text-gray-900 dark:text-white">10:00 - 14:00</span></div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Sunday</span><span className="font-medium text-red-500">Closed</span></div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Connect</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Follow us on social media for updates.</p>
                <div className="flex gap-2">{['GitHub','Twitter','LinkedIn'].map(s => <a key={s} href="#" className="flex-1 text-center text-xs font-medium px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-brand-600 hover:text-white transition-all">{s}</a>)}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
