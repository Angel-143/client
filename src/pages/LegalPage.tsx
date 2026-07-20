import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { SITE } from '@/lib/constants';

type Kind = 'privacy' | 'terms' | 'refund';

const content: Record<Kind, { title: string; updated: string; sections: { h: string; p: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'January 2026',
    sections: [
      { h: 'Information we collect', p: 'We collect your name, email, country code, and WhatsApp number when you create an account. We also store purchase records and favorites linked to your account.' },
      { h: 'How we use your data', p: 'Your data is used to provide the marketplace service, process purchases, send transactional emails, and improve our offerings. We never sell your personal data.' },
      { h: 'Data storage', p: 'Data is stored securely in Supabase PostgreSQL with row-level security. Authentication uses Supabase Auth with hashed passwords.' },
      { h: 'Your rights', p: 'You may request export or deletion of your data at any time by contacting ' + SITE.email + '.' },
      { h: 'Cookies', p: 'We use essential cookies to keep you signed in and remember your theme preference. No third-party tracking cookies are used.' },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: 'January 2026',
    sections: [
      { h: 'License', p: 'Purchasing a project grants you a non-exclusive, worldwide, perpetual license to use the source code in personal and commercial projects, including client work.' },
      { h: 'Restrictions', p: 'You may not resell, sublicense, or redistribute the source code itself. You may not list it on another marketplace.' },
      { h: 'Refunds', p: 'Refunds are handled case-by-case. See our Refund Policy for details.' },
      { h: 'Account responsibility', p: 'You are responsible for keeping your credentials secure and for all activity under your account.' },
      { h: 'Liability', p: 'MyClientWork is provided "as is". We are not liable for damages arising from the use of purchased projects.' },
    ],
  },
  refund: {
    title: 'Refund Policy',
    updated: 'January 2026',
    sections: [
      { h: 'Digital goods', p: 'Because source code is a digital, non-returnable product, all sales are generally final.' },
      { h: 'Eligible refunds', p: 'If a project is materially broken or significantly different from its description, contact us within 14 days of purchase for a full refund.' },
      { h: 'How to request', p: 'Email ' + SITE.email + ' with your order ID and a description of the issue. We respond within 2 business days.' },
      { h: 'Denied requests', p: 'Refunds will not be granted for change of mind, failure to read requirements, or lack of technical knowledge.' },
    ],
  },
};

export default function LegalPage({ kind }: { kind: Kind }) {
  const doc = content[kind];
  return (
    <section className="relative overflow-hidden">
      <AnimatedBackground variant="subtle" />
      <div className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Legal</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{doc.title}</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: {doc.updated}</p>
          <div className="mt-10 space-y-8">
            {doc.sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-xl font-bold">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
