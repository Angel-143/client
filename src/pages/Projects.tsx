import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Star, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { useProjects, useCategories, useAllTechnologies, type ProjectFilters } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCardSkeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { cn } from '@/lib/constants';

const PAGE_SIZE = 9;

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const categorySlug = params.get('category') ?? '';

  const { data: categories } = useCategories();
  const { data: technologies } = useAllTechnologies();

  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string>(
    categories?.find((c) => c.slug === categorySlug)?.id ?? ''
  );
  const [technology, setTechnology] = useState('');
  const [sort, setSort] = useState<ProjectFilters['sort']>('latest');
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const activeCategory = categories?.find((c) => c.slug === categorySlug);
  const filters: ProjectFilters = useMemo(
    () => ({
      search: search || undefined,
      category: categoryId || undefined,
      technology: technology || undefined,
      sort,
      maxPrice,
    }),
    [search, categoryId, technology, sort, maxPrice]
  );

  const { data, isLoading } = useProjects(filters);

  const all = data ?? [];
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const paged = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateCategory(slug: string) {
    const next = new URLSearchParams(params);
    if (slug) next.set('category', slug);
    else next.delete('category');
    setParams(next, { replace: true });
    const cat = categories?.find((c) => c.slug === slug);
    setCategoryId(cat?.id ?? '');
    setPage(1);
  }

  function clearFilters() {
    setSearch('');
    setTechnology('');
    setSort('latest');
    setMaxPrice(undefined);
    updateCategory('');
  }

  const activeFilterCount =
    (search ? 1 : 0) + (categoryId ? 1 : 0) + (technology ? 1 : 0) + (maxPrice !== undefined ? 1 : 0) + (sort !== 'latest' ? 1 : 0);

  return (
    <>
      <section className="relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        <div className="container-page py-14 sm:py-16">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="heading-gradient">Explore projects</span>
          </h1>
          <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
            Browse our curated catalog of premium, production-ready source code.
          </p>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container-page">
          {/* Search + sort bar */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search projects..."
                className="input pl-11"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as ProjectFilters['sort'])}
                className="input w-auto"
                aria-label="Sort"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={cn('btn-secondary', showFilters && 'border-brand-300 text-brand-600')}
              >
                <SlidersHorizontal size={16} /> Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] text-white">{activeFilterCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* Category pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => updateCategory('')}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                !categoryId ? 'bg-brand-600 text-white' : 'border border-slate-200 text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:text-slate-300'
              )}
            >
              All
            </button>
            {categories?.map((c) => (
              <button
                key={c.id}
                onClick={() => updateCategory(c.slug)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  categoryId === c.id ? 'bg-brand-600 text-white' : 'border border-slate-200 text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:text-slate-300'
                )}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Filters drawer */}
          {showFilters && (
            <div className="mb-6 card flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="label">Technology</label>
                <select
                  value={technology}
                  onChange={(e) => { setTechnology(e.target.value); setPage(1); }}
                  className="input"
                >
                  <option value="">All technologies</option>
                  {technologies?.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="label">Max price: ${maxPrice ?? 'Any'}</label>
                <input
                  type="range"
                  min={20}
                  max={150}
                  step={5}
                  value={maxPrice ?? 150}
                  onChange={(e) => { setMaxPrice(Number(e.target.value) >= 150 ? undefined : Number(e.target.value)); setPage(1); }}
                  className="w-full accent-brand-600"
                />
              </div>
              <button onClick={clearFilters} className="btn-ghost">
                <X size={16} /> Clear
              </button>
            </div>
          )}

          {activeCategory && (
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Showing projects in <span className="font-semibold text-brand-600 dark:text-brand-400">{activeCategory.name}</span>
            </p>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
            </div>
          ) : paged.length === 0 ? (
            <div className="card flex flex-col items-center justify-center gap-3 py-20 text-center">
              <Search size={32} className="text-slate-300" />
              <p className="font-display text-lg font-semibold">No projects found</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your filters or search.</p>
              <button onClick={clearFilters} className="btn-secondary mt-2">Clear filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paged.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
              </div>
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="btn-secondary disabled:opacity-40"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={cn(
                        'h-10 w-10 rounded-lg text-sm font-semibold transition-colors',
                        page === i + 1 ? 'bg-brand-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="btn-secondary disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
