import React, { useState, useEffect } from 'react';
import {
  Search,
  Star,
  CheckCircle2,
  ArrowUpRight,
  Code2
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Github } from '../components/Icons';

const PROJECTS_CACHE_KEY = 'yazan_live_projects';

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState(() => {
    try {
      const cached = localStorage.getItem(PROJECTS_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [isLoading, setIsLoading] = useState(() => {
    try {
      const cached = localStorage.getItem(PROJECTS_CACHE_KEY);
      if (cached && JSON.parse(cached).length > 0) return false;
    } catch {}
    return true;
  });
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically fetch projects from MongoDB API with instant SWR caching
  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) {
          if (isMounted) {
            setAllProjects(data.projects);
            setIsLoading(false);
            try {
              localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(data.projects));
            } catch {}
            return;
          }
        }
      } catch (e) {
        console.warn('API error fetching projects from MongoDB:', e);
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['All', ...Array.from(new Set(allProjects.map((p) => p.category))).filter(Boolean)];

  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All' || project.category === activeCategory;
    const matchesQuery =
      !searchQuery ||
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="pt-28 pb-20 bg-[#050308] text-zinc-100 min-h-screen relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-900/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-950/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-3">
            Portfolio Work
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Featured <span className="text-gradient">Projects &amp; Products</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal">
            A curated showcase of production-ready web applications, full-stack platforms, and developer tooling built by Yazan Gupta.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Input - Liquid Glass */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, tag, or stack..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#090611]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 backdrop-blur-md transition-colors"
            />
          </div>

          {/* Category Filter Buttons - Liquid Glass */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                    : 'bg-purple-950/20 border border-purple-500/15 text-zinc-400 hover:text-white hover:border-purple-500/30 backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>
            Showing {filteredProjects.length} of {allProjects.length} projects
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-purple-400 hover:underline cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Projects Grid - Liquid Glass Edition */}
        <div className={filteredProjects.length === 1 ? "mt-8 max-w-3xl mx-auto" : "mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
          {filteredProjects.map((project) => (
            <div
              key={project.id || project._id}
              className="group flex flex-col rounded-3xl liquid-glass-interactive overflow-hidden shadow-2xl"
            >
              {/* Image Preview */}
              <div className={`relative ${filteredProjects.length === 1 ? 'h-64 sm:h-72' : 'h-48'} w-full overflow-hidden bg-[#090611]`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement.querySelector('.project-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="project-fallback hidden w-full h-full flex-col items-center justify-center p-4 bg-gradient-to-br from-[#120726] via-[#1a0c36] to-[#090611] text-center">
                  <Code2 className="w-10 h-10 text-purple-400 mb-2 opacity-80" />
                  <span className="text-sm font-bold text-white line-clamp-1 px-2">{project.title}</span>
                  <span className="text-xs text-purple-300 font-mono mt-1">{project.category}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050308] via-black/40 to-transparent pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium liquid-pill text-purple-200">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium liquid-pill text-purple-200">
                      <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 font-normal">
                    {project.description}
                  </p>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      {project.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-purple-950/40 text-purple-200 border border-purple-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-purple-500/10 flex items-center justify-between">
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading & Empty States */}
        {isLoading ? (
          <div className="py-24 text-center rounded-3xl liquid-glass mt-8 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-400 rounded-full animate-spin mb-4" />
            <p className="text-sm font-mono text-zinc-400">Loading projects from MongoDB...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-3xl liquid-glass mt-8">
            <Code2 className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-sm text-zinc-500 mt-1">
              Add projects to your "projects" collection in MongoDB Atlas to display them here!
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
