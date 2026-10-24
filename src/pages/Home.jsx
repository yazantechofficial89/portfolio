import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Sparkles,
  Layers,
  ChevronRight,
  Star,
  Award,
  ArrowUpRight
} from 'lucide-react';
import Hero from '../components/Hero';
import { personalData } from '../data/portfolioData';
import { Github } from '../components/Icons';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) {
          if (isMounted) {
            setProjects(data.projects);
          }
        }
      } catch (e) {
        console.warn('Error fetching projects on Home:', e);
      }
    };
    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProjects = projects.filter((p) => p.featured !== false).slice(0, 3);

  return (
    <div className="bg-[#050308] text-zinc-100">
      {/* Hero Section */}
      <Hero />

      {/* About Preview Section - Dark Purple Glass */}
      <section className="py-20 relative border-t border-purple-500/15 bg-[#07050d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill text-purple-200 text-xs font-mono tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Meet The Developer
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Crafting robust applications with <span className="text-gradient">modern engineering</span>
              </h2>
              <p className="mt-4 text-base text-zinc-400 leading-relaxed font-normal">
                {personalData.bio}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(147,51,234,0.35)] transition-all"
                >
                  <span>Read Full Story &amp; Philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/experience"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-purple-300 transition-colors"
                >
                  <span>View Career Timeline</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl liquid-glass-interactive">
                <div className="w-10 h-10 rounded-xl bg-[#0c0915] text-purple-400 border border-purple-500/25 flex items-center justify-center mb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                  <Code2 className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="text-lg font-bold text-white">Frontend Mastery</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Fast, accessible, and responsive client applications with React 19, Next.js, and Tailwind CSS.
                </p>
              </div>

              <div className="p-6 rounded-2xl liquid-glass-interactive">
                <div className="w-10 h-10 rounded-xl bg-[#0c0915] text-purple-400 border border-purple-500/25 flex items-center justify-center mb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                  <Layers className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="text-lg font-bold text-white">Scalable APIs</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  High-throughput REST backends &amp; WebSockets powered by Node.js, Express, and modern cloud databases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section - Dark Purple Glass */}
      <section className="py-24 relative bg-[#050308] border-t border-purple-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill text-purple-200 text-xs font-mono tracking-wider uppercase mb-3">
                Selected Work
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <p className="mt-3 text-base text-zinc-400 max-w-xl font-normal">
                A glimpse of full-stack products engineered for real-world impact and reliability.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(147,51,234,0.35)] transition-all self-start md:self-auto"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="py-16 text-center rounded-3xl liquid-glass">
              <Code2 className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No projects loaded yet</h3>
              <p className="text-sm text-zinc-500 mt-1">
                Upload your projects to MongoDB Atlas to showcase them here!
              </p>
            </div>
          ) : (
            <div className={featuredProjects.length === 1 ? "max-w-2xl mx-auto" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
              {featuredProjects.map((project) => (
                <div
                  key={project.id || project._id}
                  className="group flex flex-col rounded-3xl liquid-glass-interactive overflow-hidden shadow-2xl"
                >
                  <div className={`relative ${featuredProjects.length === 1 ? 'h-56 sm:h-64' : 'h-48'} w-full overflow-hidden bg-[#0a0712]`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement.querySelector('.home-project-fallback');
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="home-project-fallback hidden w-full h-full flex-col items-center justify-center p-4 bg-gradient-to-br from-[#120726] via-[#1a0c36] to-[#090611] text-center">
                      <Code2 className="w-10 h-10 text-purple-400 mb-2 opacity-80" />
                      <span className="text-sm font-bold text-white line-clamp-1 px-2">{project.title}</span>
                      <span className="text-xs text-purple-300 font-mono mt-1">{project.category}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0714] via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium liquid-pill text-purple-200">
                        {project.category}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium liquid-pill text-purple-200">
                        <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                        Featured
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {(project.tags || []).slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-purple-950/40 text-purple-200 border border-purple-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-purple-500/20 flex items-center justify-between">
                      {project.demoUrl && project.demoUrl !== '#' && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <span>Live Demo</span>
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
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills & Architecture Teaser Banner */}
      <section className="py-20 relative border-t border-purple-500/15 bg-[#07050d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl liquid-glass p-8 sm:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill text-purple-200 text-xs font-mono font-medium uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Full-Stack Architecture
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Engineered with Modern Technologies &amp; Clean Patterns
                </h3>
                <p className="mt-3 text-sm text-zinc-400 max-w-xl leading-relaxed font-normal">
                  Specializing in the React ecosystem, Node.js backend services, cloud databases, and scalable web solutions built for peak performance.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                <Link
                  to="/skills"
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(147,51,234,0.35)] transition-all text-sm inline-flex items-center gap-2"
                >
                  <span>Explore Skills Matrix</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/certifications"
                  className="px-5 py-3 rounded-xl font-medium text-purple-200 liquid-pill hover:bg-purple-950/40 transition-all text-sm inline-flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Certifications</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Hire Me Call To Action */}
      <section className="py-24 relative overflow-hidden text-center bg-[#050308] border-t border-purple-500/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-pill text-purple-200 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Let's Collaborate
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Have a project in mind or looking to hire?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal">
            I'm currently open for full-time software engineering roles and high-impact freelance projects. Let's build something exceptional together.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_25px_rgba(147,51,234,0.4)] text-sm sm:text-base border border-purple-400/30"
            >
              Get In Touch With Me
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3.5 rounded-xl font-medium text-purple-200 liquid-pill hover:bg-purple-950/40 hover:text-white transition-all text-sm sm:text-base"
            >
              Browse Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
