import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCardSkeleton, EmptyState } from '@/components/ui/Skeleton';
import { cn } from '@/lib/constants';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
] as const;

const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<typeof sortOptions[number]['value']>('newest');
  const [difficulty, setDifficulty] = useState<string>('all');

  const categoryId = searchParams.get('category') ?? 'all';
  const { data: categories } = useCategories();
  const { data: projects, isLoading } = useProjects({
    category: categoryId,
    search,
    difficulty,
    sort,
  });

  const activeCategory = useMemo(() => categories?.find((c) => c.id === categoryId), [categories, categoryId]);

  function setCategory(id: string) {
    if (id === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', id);
    }
    setSearchParams(searchParams);
  }

  const hasFilters = categoryId !== 'all' || difficulty !== 'all' || search !== '';

  return (
    <div className="container-page py-10 sm:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Marketplace</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Browse {projects?.length ?? 0} premium, production-ready projects.</p>
      </div>

      {/* Filters bar */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-11"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-slate-400" />
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="input cursor-pointer py-2 text-sm">
              {sortOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="input cursor-pointer py-2 text-sm">
            <option value="all">All Levels</option>
            {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Category pills */}
      {categories && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('all')}
            className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-all', categoryId === 'all' ? 'bg-brand-600 text-white shadow-glow' : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800')}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-all', categoryId === c.id ? 'bg-brand-600 text-white shadow-glow' : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800')}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {hasFilters && (
        <button onClick={() => { setCategory('all'); setDifficulty('all'); setSearch(''); }} className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-error-600">
          <X size={14} /> Clear filters
        </button>
      )}

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No projects found"
          description={activeCategory ? `No projects in ${activeCategory.name} match your filters.` : 'Try adjusting your search or filters.'}
        />
      )}
    </div>
  );
}
