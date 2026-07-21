import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import Logo from '../ui/Logo'
import { NAV_LINKS, SITE } from '../../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo textClassName="text-white" />
            <p className="mt-4 text-sm max-w-md">
              {SITE.tagline}. Buy production-ready source code projects with instant download and lifetime updates.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-600 flex items-center justify-center transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-600 flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-600 flex items-center justify-center transition-colors">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${SITE.email}`} className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-600 flex items-center justify-center transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Navigate</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>{SITE.email}</li>
              <li>{SITE.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="text-xs">Built with React, Vite & Supabase</p>
        </div>
      </div>
    </footer>
  )
}
