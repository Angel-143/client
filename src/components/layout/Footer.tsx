import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS, SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-950">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">{SITE.description}</p>
            <div className="flex gap-2">
              <a href={SITE.social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:scale-105 hover:border-brand-300 hover:text-brand-600 active:scale-95 dark:border-slate-700 dark:hover:border-brand-500/40">
                <Github size={16} />
              </a>
              <a href={SITE.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:scale-105 hover:border-brand-300 hover:text-brand-600 active:scale-95 dark:border-slate-700 dark:hover:border-brand-500/40">
                <Twitter size={16} />
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:scale-105 hover:border-brand-300 hover:text-brand-600 active:scale-95 dark:border-slate-700 dark:hover:border-brand-500/40">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-display text-sm font-bold text-slate-900 dark:text-white">Explore</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-display text-sm font-bold text-slate-900 dark:text-white">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link to="/login" className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">Login</Link></li>
              <li><Link to="/register" className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">Register</Link></li>
              <li><Link to="/dashboard" className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">Dashboard</Link></li>
              <li><Link to="/admin" className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-display text-sm font-bold text-slate-900 dark:text-white">Get in touch</h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {SITE.address}</li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /> {SITE.email}</li>
            </ul>
            <a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
              Contact us <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 pt-6 dark:border-slate-800/70 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Built with care for developers.</p>
        </div>
      </div>
    </footer>
  );
}
