import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Contact', to: '/contact' },
] as const;

export const SITE = {
  name: 'MyClientWork',
  tagline: 'Premium Source Code Marketplace',
  description: 'A curated marketplace of production-ready source code for developers.',
  email: 'support@myclientwork.dev',
  phone: '+91 98765 43210',
  address: 'Bhubaneswar, Odisha, India',
  social: {
    github: 'https://github.com/myclientwork',
    twitter: 'https://twitter.com/myclientwork',
    linkedin: 'https://linkedin.com/company/myclientwork',
  },
};

export function formatPrice(price: number | string): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  return `$${n.toFixed(0)}`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}
