import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowUpRight, CheckCircle2, Code2 } from 'lucide-react';
import { Github } from './Icons';
import { projectsData } from '../data/portfolioData';
import ProjectImageCarousel from './ProjectImageCarousel';

export default function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  // Dynamically fetch projects from MongoDB API
  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) {
          if (isMounted) {
            setAllProjects(data.projects);
            return;
          }
        }
      } catch (e) {
        console.warn('API error fetching projects from MongoDB:', e);
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['All', ...Array.from(new Set(allProjects.map((p) => p.category))).filter(Boolean)];

  const filteredProjects =
    activeCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#050308]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill text-purple-200 text-xs font-mono tracking-wider uppercase mb-3">
              Portfolio Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient">Projects &amp; Products</span>
            </h2>
            <p className="mt-3 text-base text-zinc-400 max-w-xl font-normal">
              A curated selection of production-ready applications, civic platforms, and developer tooling I've built.
            </p>
          </div>

          {/* Filter Pills - Dark Purple Glass */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)] border border-purple-400/40'
                    : 'bg-[#0c0915]/60 border border-purple-500/20 text-zinc-400 hover:text-white hover:border-purple-500/40 backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Dark Purple Glass Edition */}
        <motion.div
          layout
          className={
            filteredProjects.length === 1
              ? "max-w-2xl mx-auto"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          }
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id || project._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group flex flex-col rounded-3xl liquid-glass-interactive overflow-hidden shadow-2xl"
              >
                {/* Multi-Image Carousel Preview */}
                <div className="relative">
                  <ProjectImageCarousel
                    images={project.images}
                    fallbackImage={project.image}
                    title={project.title}
                    category={project.category}
                    className={filteredProjects.length === 1 ? 'h-56 sm:h-64' : 'h-48'}
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

                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 font-normal">
                      {project.description}
                    </p>

                    {/* Key features */}
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

                  {/* Action Links */}
                  <div className="mt-6 pt-4 border-t border-purple-500/20 flex items-center justify-between">
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
