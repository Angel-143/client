import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useProjects, useCategories } from '../hooks/useQueries'
import ProjectCard from '../components/projects/ProjectCard'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import { cn } from '../lib/constants'

export default function Projects() {
  const { data: projects, isLoading } = useProjects()
  const { data: categories } = useCategories()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')

  const activeCategory = searchParams.get('category') || 'all'
  const [sortBy, setSortBy] = useState('newest')

  const filtered = useMemo(() => {
    if (!projects) return []
    let result = [...projects]
    if (activeCategory !== 'all') {
      const cat = categories?.find((c) => c.slug === activeCategory)
      if (cat) result = result.filter((p) => p.category_id === cat.id)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.short_description?.toLowerCase().includes(q)
      )
    }
    if (sortBy === 'popular') result.sort((a, b) => b.sales_count - a.sales_count)
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    return result
  }, [projects, activeCategory, search, sortBy, categories])

  const setCategory = (slug: string) => {
    if (slug === 'all') setSearchParams({})
    else setSearchParams({ category: slug })
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge color="brand" className="mb-3">Marketplace</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">All Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Browse our collection of premium source code</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="!pl-10"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCategory('all')}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
              activeCategory === 'all'
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            All
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.slug)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                activeCategory === cat.slug
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size={32} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">No projects found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
