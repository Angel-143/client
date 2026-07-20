export const DEVELOPERS = ['Aslok Singh Rajput', 'Sandip Kumar', 'Bikash Kumar'] as const;

export const SITE = {
  name: 'MyClientWork',
  tagline: 'Premium Source Code Marketplace for Developers',
  email: 'hello@myclientwork.com',
  social: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    discord: 'https://discord.com',
  },
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Contact', to: '/contact' },
] as const;

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
