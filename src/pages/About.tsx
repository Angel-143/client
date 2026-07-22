import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Code2, Sparkles, Target, Heart } from 'lucide-react'
import Badge from '../components/ui/Badge'
import { SITE } from '../lib/constants'

const teamMembers = [
  { name: 'Aslok Singh Rajput', designation: 'Full-Stack Developer & Founder', bio: 'Building scalable web applications with React, Node.js and cloud infrastructure. Passionate about clean code and developer experience.', skills: ['React','TypeScript','Node.js','Supabase','AWS','Docker'], gradient: 'from-brand-500 via-brand-600 to-blue-700', social: { github: '#', linkedin: '#', email: '#' } },
  { name: 'Bikash Kushwaha', designation: 'Backend Engineer', bio: 'Database architect and API specialist. Loves designing systems that scale gracefully and perform under pressure.', skills: ['PostgreSQL','Node.js','Python','Redis','GraphQL','Kubernetes'], gradient: 'from-emerald-500 via-teal-600 to-cyan-700', social: { github: '#', linkedin: '#', email: '#' } },
  { name: 'Sandip Kumar Sah', designation: 'Frontend & UI Engineer', bio: 'Turning designs into pixel-perfect, accessible interfaces. Obsessed with animations, micro-interactions, and user delight.', skills: ['React','Tailwind CSS','Framer Motion','Figma','Next.js','Vite'], gradient: 'from-accent-500 via-accent-600 to-orange-600', social: { github: '#', linkedin: '#', email: '#' } },
]
const values = [
  { icon: Code2, title: 'Quality First', desc: 'Every line of code is reviewed, tested, and documented to meet production standards.' },
  { icon: Target, title: 'Developer Experience', desc: 'We build tools and projects that developers love to use. Clean setup, clear docs.' },
  { icon: Heart, title: 'Community Driven', desc: 'Your feedback shapes what we build. We listen, iterate, and ship what you need.' },
  { icon: Sparkles, title: 'Always Improving', desc: 'Lifetime updates on every project. We continuously refine and add features.' },
]
const timeline = [
  { year: '2023', title: 'Founded Myclientwork', desc: 'Started with a simple mission: help developers ship faster.' },
  { year: '2024', title: '50+ Projects Published', desc: 'Built a catalog of premium, production-ready source code.' },
  { year: '2025', title: '3,200+ Developers', desc: 'Growing community of developers trust our code.' },
  { year: '2026', title: 'Lifetime Updates Program', desc: 'Every purchase now includes free lifetime updates.' },
]

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 to-white dark:from-brand-950/20 dark:to-gray-950 py-20">
        <div className="absolute inset-0 -z-10"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-200/30 dark:bg-brand-900/20 rounded-full blur-3xl" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge color="brand" className="mb-5">About Us</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">We help developers <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">ship faster</span></h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">{SITE.name} is a premium source code marketplace based in {SITE.location}. We build production-ready projects so you can focus on what matters — launching your product.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><Badge color="brand" className="mb-3">Our Values</Badge><h2 className="text-3xl font-bold text-gray-900 dark:text-white">What drives us</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => { const Icon = v.icon; return (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-4 shadow-lg shadow-brand-500/25"><Icon size={22} className="text-white" /></div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><Badge color="accent" className="mb-3">Our Journey</Badge><h2 className="text-3xl font-bold text-gray-900 dark:text-white">How we got here</h2></div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2" />
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`relative flex items-center mb-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className="hidden sm:block flex-1" />
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-500 border-4 border-white dark:border-gray-950 z-10" />
                <div className="flex-1 ml-12 sm:ml-0 sm:pl-12">
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                    <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{item.year}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-white mt-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14"><Badge color="green" className="mb-3">Meet the Team</Badge><h2 className="text-3xl font-bold text-gray-900 dark:text-white">The people behind the code</h2><p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">A small, passionate team building tools for developers worldwide.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-gray-300/50 dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-1">
                <div className={`relative h-32 bg-gradient-to-br ${member.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-xl`}>
                      <span className="text-3xl font-bold text-white">{member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-16 pb-6 px-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm font-medium text-brand-600 dark:text-brand-400 mt-0.5">{member.designation}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-4">{member.skills.map(skill => <span key={skill} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">{skill}</span>)}</div>
                  <div className="flex justify-center gap-2 mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
                    {[Github, Linkedin, Mail].map((Icon, j) => <a key={j} href="#" className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-brand-600 hover:text-white transition-all"><Icon size={16} /></a>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
