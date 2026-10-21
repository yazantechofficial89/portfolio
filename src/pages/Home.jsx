import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Sparkles,
  Layers,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Star,
  Award
} from 'lucide-react';
import Hero from '../components/Hero';
import { projectsData, skillsData, personalData } from '../data/portfolioData';
import { Github } from '../components/Icons';

export default function Home() {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* About Preview Section */}
      <section className="py-20 relative border-t border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
                Meet The Developer
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Crafting robust applications with <span className="text-gradient">modern engineering</span>
              </h2>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                {personalData.bio}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/50 transition-all"
                >
                  <span>Read Full Story & Philosophy</span>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </Link>
                <Link
                  to="/experience"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <span>View Career Timeline</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 text-purple-400 flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Frontend Mastery</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Fast, accessible, and responsive client apps with React 19, Next.js, and Tailwind CSS.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/80 text-indigo-400 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Scalable APIs</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  High-throughput REST & GraphQL backends powered by Node.js, Express, and microservices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 relative bg-slate-950/80 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
                Selected Work
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <p className="mt-3 text-base text-slate-400 max-w-xl">
                A glimpse of full-stack products engineered for real-world impact and reliability.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600/90 hover:bg-purple-600 shadow-lg shadow-purple-600/20 transition-all self-start md:self-auto"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className={featuredProjects.length === 1 ? "max-w-2xl mx-auto" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/50 overflow-hidden shadow-xl shadow-black/30 hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`relative ${featuredProjects.length === 1 ? 'h-56 sm:h-64' : 'h-48'} w-full overflow-hidden bg-slate-950`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-800/80 text-purple-200 border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Architecture Teaser Banner */}
      <section className="py-20 relative border-t border-slate-900 bg-gradient-to-b from-slate-950/40 via-purple-950/10 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-8 sm:p-12 relative overflow-hidden backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Full-Stack Architecture
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Engineered with Modern Technologies & Best Practices
                </h3>
                <p className="mt-3 text-sm text-slate-300 max-w-xl leading-relaxed">
                  Specializing in the React 19 ecosystem, Node.js backend services, cloud databases, and scalable web solutions built for peak performance.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                <Link
                  to="/skills"
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all text-sm inline-flex items-center gap-2"
                >
                  <span>Explore Skills Matrix</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/certifications"
                  className="px-5 py-3 rounded-xl font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-sm inline-flex items-center gap-2"
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
      <section className="py-24 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Let's Collaborate
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Have a project in mind or looking to hire?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            I'm currently open for full-time software engineering roles and high-impact freelance projects. Let's build something exceptional together.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-xl shadow-purple-600/30 text-sm sm:text-base"
            >
              Get In Touch With Me
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 rounded-xl font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-all text-sm sm:text-base"
            >
              Browse Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
