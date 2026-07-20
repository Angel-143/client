import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  ArrowLeft, ShoppingCart, Heart, Star, ExternalLink, Code2, CheckCircle2,
  Download, ShieldCheck, RefreshCw, Headphones, ChevronRight, Users,
} from 'lucide-react';
import { useProject, useProjects } from '@/hooks/useProjects';
import { useToggleFavorite, useCreateOrder } from '@/hooks/useData';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCardSkeleton } from '@/components/ui/Skeleton';
import { formatPrice, formatNumber, formatDate, cn } from '@/lib/constants';

const guarantees = [
  { icon: ShieldCheck, title: 'Secure checkout', desc: 'Stripe-encrypted payments.' },
  { icon: Download, title: 'Instant download', desc: 'Get the code right after purchase.' },
  { icon: RefreshCw, title: 'Lifetime updates', desc: 'Free updates forever.' },
  { icon: Headphones, title: 'Author support', desc: 'Direct help from the creator.' },
];

export default function ProjectDetails() {
  const { slug = '' } = useParams();
  const { data: project, isLoading } = useProject(slug);
  const { data: related } = useProjects({ limit: 3 });
  const toggleFavorite = useToggleFavorite();
  const createOrder = useCreateOrder();
  const { session } = useAuth();
  const navigate = useNavigate();
  const [purchasing, setPurchasing] = useState(false);

  async function handleBuy() {
    if (!session) {
      toast.error('Please sign in to purchase.');
      navigate('/login');
      return;
    }
    if (!project) return;
    setPurchasing(true);
    try {
      await createOrder.mutateAsync({ projectId: project.id, amount: project.price });
      toast.success('Purchase complete! Check your downloads.');
      navigate('/dashboard/downloads');
    } catch (err: any) {
      toast.error(err?.message ?? 'Purchase failed');
    } finally {
      setPurchasing(false);
    }
  }

  async function handleFavorite() {
    if (!session) {
      toast.error('Sign in to favorite projects.');
      navigate('/login');
      return;
    }
    try {
      const res = await toggleFavorite.mutateAsync(project!.id);
      toast.success(res.favorited ? 'Added to favorites' : 'Removed from favorites');
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed');
    }
  }

  if (isLoading) {
    return (
      <div className="container-page py-12">
        <ProjectCardSkeleton />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="font-display text-2xl font-bold">Project not found</p>
        <Link to="/projects" className="btn-primary">Back to projects</Link>
      </div>
    );
  }

  const relatedProjects = (related ?? []).filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      <div className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="container-page py-4">
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-brand-600">Home</Link>
            <ChevronRight size={14} />
            <Link to="/projects" className="hover:text-brand-600">Projects</Link>
            <ChevronRight size={14} />
            <span className="truncate text-slate-700 dark:text-slate-300">{project.title}</span>
          </nav>
        </div>
      </div>

      <section className="section">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <img
                src={project.thumbnail_url ?? ''}
                alt={project.title}
                className="aspect-video w-full object-cover"
              />
            </motion.div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{project.category?.name ?? 'Uncategorized'}</Badge>
              <Badge variant="brand">{project.difficulty}</Badge>
              {project.is_featured && <Badge variant="accent">Featured</Badge>}
              <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                <Star size={14} className="fill-amber-400 text-amber-400" /> {project.rating.toFixed(1)} ({formatNumber(project.sales_count)} sales)
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{project.short_description}</p>

            <div className="mt-8">
              <h2 className="font-display text-xl font-bold">Overview</h2>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-bold">Features</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-bold">Tech stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech_stack.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <Code2 size={14} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card sticky top-20 p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
                  {formatPrice(project.price)}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">one-time</span>
              </div>

              <div className="mt-5 space-y-2.5">
                <button
                  onClick={handleBuy}
                  disabled={purchasing}
                  className="btn-primary w-full py-3 text-base"
                >
                  {purchasing ? 'Processing...' : (<><ShoppingCart size={18} /> Buy Now</>)}
                </button>
                <div className="flex gap-2">
                  {project.live_demo_url && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary flex-1"
                    >
                      <ExternalLink size={16} /> Live demo
                    </a>
                  )}
                  <button
                    onClick={handleFavorite}
                    aria-label="Add to favorites"
                    className="btn-secondary aspect-square px-0"
                  >
                    <Heart size={18} />
                  </button>
                </div>
              </div>

              <dl className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm dark:border-slate-800">
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Category</dt>
                  <dd className="font-medium">{project.category?.name ?? '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Difficulty</dt>
                  <dd className="font-medium">{project.difficulty}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Rating</dt>
                  <dd className="font-medium"><Rating value={project.rating} showValue /></dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Sales</dt>
                  <dd className="font-medium">{formatNumber(project.sales_count)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Last updated</dt>
                  <dd className="font-medium">{formatDate(project.last_updated)}</dd>
                </div>
              </dl>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                {guarantees.map((g) => (
                  <div key={g.title} className="flex items-start gap-2">
                    <g.icon size={16} className="mt-0.5 shrink-0 text-accent-500" />
                    <div>
                      <p className="text-xs font-semibold">{g.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section pt-0">
          <div className="container-page">
            <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Related projects</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
