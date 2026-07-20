import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, MessageCircle, Mail, Phone } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS, SITE, DEVELOPERS } from '@/lib/constants';

const categories = [
  { name: 'Web Apps', slug: 'web-apps' },
  { name: 'Mobile Apps', slug: 'mobile-apps' },
  { name: 'AI & ML', slug: 'ai-ml' },
  { name: 'Dashboards', slug: 'dashboards' },
  { name: 'E-Commerce', slug: 'ecommerce' },
  { name: 'Templates', slug: 'templates' },
];

const legal = [
  { name: 'Privacy Policy', to: '/privacy' },
  { name: 'Terms & Conditions', to: '/terms' },
  { name: 'Refund Policy', to: '/refund' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-page py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-slate-600 dark:text-slate-400">
              {SITE.tagline}. Buy production-ready projects, templates, and full-stack apps from a
              curated marketplace.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Github, href: SITE.social.github, label: 'GitHub' },
                { icon: Twitter, href: SITE.social.twitter, label: 'Twitter' },
                { icon: Linkedin, href: SITE.social.linkedin, label: 'LinkedIn' },
                { icon: MessageCircle, href: SITE.social.discord, label: 'Discord' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:text-brand-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">Categories</h4>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/projects?category=${c.slug}`}
                    className="text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">Legal</h4>
            <ul className="mt-4 space-y-2.5">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">Contact</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  <Mail size={14} /> {SITE.email}
                </a>
              </li>
              {SITE.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    <Phone size={14} /> {phone}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  Support center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 dark:border-slate-800 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 MyClientWork. All Rights Reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">Developed by</span>{' '}
            {DEVELOPERS.map((d, i) => (
              <span key={d}>
                {i > 0 && ' • '}
                <span className="font-medium text-slate-700 dark:text-slate-300">{d}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
