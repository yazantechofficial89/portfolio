import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Star,
  CheckCircle2,
  ArrowUpRight,
  Code2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Github } from '../components/Icons';
import ProjectImageCarousel from '../components/ProjectImageCarousel';
import { projectsData } from '../data/portfolioData';

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
    return Array.isArray(projectsData) && projectsData.length > 0 ? projectsData : [];
  });
  const [isLoading, setIsLoading] = useState(() => {
    try {
      const cached = localStorage.getItem(PROJECTS_CACHE_KEY);
      if (cached && JSON.parse(cached).length > 0) return false;
    } catch {}
    return !(Array.isArray(projectsData) && projectsData.length > 0);
  });
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryModal, setGalleryModal] = useState(null);

  // Dynamically fetch projects from MongoDB API with instant SWR caching
  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
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
    <div className="pt-28 pb-20 bg-transparent text-zinc-100 min-h-screen relative overflow-hidden">
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
              {/* Multi-Image Carousel Preview */}
              <div className="relative">
                <ProjectImageCarousel
                  images={project.images}
                  fallbackImage={project.image}
                  title={project.title}
                  category={project.category}
                  className={filteredProjects.length === 1 ? 'h-64 sm:h-72' : 'h-48'}
                  onOpenGallery={(idx) => setGalleryModal({ project, index: idx })}
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-10">
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
        {/* Full-Screen Project Gallery Modal */}
        <AnimatePresence>
          {galleryModal && (() => {
            const { project, index } = galleryModal;
            const modalImages = Array.isArray(project.images) && project.images.length > 0 
              ? project.images 
              : (project.image ? [project.image] : []);
            const activeIndex = Math.min(Math.max(0, index), modalImages.length - 1);
            const currentImg = modalImages[activeIndex] || project.image;

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setGalleryModal(null)}
                  className="fixed inset-0 bg-black/90 backdrop-blur-xl"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-5xl bg-[#090611] border border-purple-500/25 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 max-h-[92vh] flex flex-col"
                >
                  {/* Header */}
                  <div className="p-4 sm:p-5 border-b border-purple-500/15 flex items-center justify-between bg-[#050308]/90">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">
                        Screenshot {activeIndex + 1} of {modalImages.length} &bull; {project.category}
                      </p>
                    </div>

                    <button
                      onClick={() => setGalleryModal(null)}
                      className="p-2 rounded-xl liquid-pill text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Main Large Image */}
                  <div className="p-4 sm:p-6 bg-[#050308] flex-1 flex items-center justify-center overflow-auto max-h-[60vh] relative group">
                    <img
                      src={currentImg}
                      alt={`${project.title} screenshot ${activeIndex + 1}`}
                      className="max-w-full max-h-[55vh] object-contain rounded-xl shadow-2xl border border-purple-500/20"
                    />

                    {modalImages.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setGalleryModal({
                              project,
                              index: activeIndex === 0 ? modalImages.length - 1 : activeIndex - 1,
                            })
                          }
                          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-purple-900 border border-purple-500/30 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-all hover:scale-110"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setGalleryModal({
                              project,
                              index: activeIndex === modalImages.length - 1 ? 0 : activeIndex + 1,
                            })
                          }
                          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-purple-900 border border-purple-500/30 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-all hover:scale-110"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails Strip */}
                  {modalImages.length > 1 && (
                    <div className="p-3 bg-[#07040f] border-t border-purple-500/15 flex items-center justify-center gap-2 overflow-x-auto">
                      {modalImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryModal({ project, index: i })}
                          className={`h-14 w-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                            activeIndex === i
                              ? 'border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)] scale-105'
                              : 'border-purple-500/20 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`thumb ${i}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Footer Info */}
                  <div className="p-4 sm:p-5 border-t border-purple-500/15 bg-[#090611] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-zinc-300 max-w-xl line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-3">
                      {project.demoUrl && project.demoUrl !== '#' && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all"
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
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 liquid-pill hover:text-white transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
}
