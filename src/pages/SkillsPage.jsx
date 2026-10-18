import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code,
  Server,
  Database,
  Wrench,
  Zap,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  Cloud,
  BrainCircuit,
  MessageSquare,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Workflow,
  Atom,
  Globe,
  HardDrive,
  GitBranch
} from 'lucide-react';
import { skillsData, mernStackData, coreValuesData } from '../data/portfolioData';

const categories = [
  { key: 'all', label: 'All Technologies' },
  { key: 'frontend', label: 'Frontend', icon: Code },
  { key: 'backend', label: 'Backend & APIs', icon: Server },
  { key: 'database', label: 'Database & Storage', icon: Database },
  { key: 'tools', label: 'DevOps & Tools', icon: Wrench },
];

const architecturalCompetencies = [
  { title: "REST & GraphQL API Design", desc: "Crafting structured, versioned, and documented endpoints." },
  { title: "Authentication & Security", desc: "OAuth 2.0, JWT tokens, RBAC permissions, and CORS safety." },
  { title: "Microservices & Distributed Systems", desc: "Decoupled services communicating via WebSockets & queues." },
  { title: "Database Modeling & Caching", desc: "Normalized schemas, Redis in-memory caching, indexing." },
  { title: "CI/CD & Containerization", desc: "Automated test suites, Docker containers, zero-downtime deploys." },
  { title: "Performance Profiling", desc: "Lighthouse 95+ audits, lazy loading, and code splitting." },
];

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredSkills = () => {
    if (activeTab === 'all') {
      return [
        ...skillsData.frontend.map((s) => ({ ...s, category: 'Frontend' })),
        ...skillsData.backend.map((s) => ({ ...s, category: 'Backend' })),
        ...skillsData.database.map((s) => ({ ...s, category: 'Database' })),
        ...skillsData.tools.map((s) => ({ ...s, category: 'DevOps & Tools' })),
      ];
    }
    return (skillsData[activeTab] || []).map((s) => ({
      ...s,
      category: categories.find((c) => c.key === activeTab)?.label || 'Tech',
    }));
  };

  const filteredSkills = getFilteredSkills();

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-cyan-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Technical Stack & Engineering Philosophy
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills, Architecture & <span className="text-gradient">MERN Expertise</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            A comprehensive breakdown of how I engineer scalable full-stack web applications, solve complex problems, and foster collaborative teamwork.
          </p>
        </div>

        {/* 🌟 FEATURED SPOTLIGHT: MERN STACK DEVELOPMENT */}
        <section className="relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-indigo-950/40 border border-indigo-500/30 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                <Workflow className="w-3.5 h-3.5 text-emerald-400" />
                Core Specialization
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                MERN Stack Development
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                I build full-stack web applications using <strong className="text-white">MongoDB, Express.js, React, and Node.js</strong>. I enjoy creating responsive user interfaces, developing server-side functionality, and connecting applications to databases.
              </p>
            </div>

            {/* Live Proof Badge */}
            <div className="flex-shrink-0">
              <a
                href="https://sevasetu-3h83.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-xs font-medium text-slate-200 hover:text-emerald-300 transition-all shadow-md group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>See Production MERN: <strong className="text-white group-hover:text-emerald-300">SevaSetu</strong></span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 transition-colors" />
              </a>
            </div>
          </div>

          {/* 4 MERN Component Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mernStackData.components.map((item, idx) => {
              const iconMap = {
                Database: Database,
                Server: Server,
                Code: Code,
                Layers: Layers,
              };
              const IconComp = iconMap[item.icon] || Code;

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90 hover:border-indigo-500/40 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:scale-110 transition-all mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block mb-1">
                    {item.role}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-slate-200 leading-snug">
                    {item.desc}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🧠 WORK PHILOSOPHY & CORE STRENGTHS (Problem Solving, Communication, Teamwork, My Approach) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-2">
              <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
              Core Strengths & Mindset
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              How I Think, Collaborate & Deliver
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Beyond syntax and frameworks, these core values shape my engineering standard and team contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValuesData.map((val, idx) => {
              const iconMap = {
                BrainCircuit: BrainCircuit,
                MessageSquare: MessageSquare,
                Users: Users,
                Target: Target,
              };
              const IconComp = iconMap[val.icon] || Sparkles;

              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-br ${val.gradient} bg-slate-900/50 border ${val.border} backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-950/30 group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${val.badgeColor}`}>
                      {val.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400/90 mt-0.5 mb-3">
                    {val.tagline}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ⚡ INTERACTIVE TECHNOLOGY MATRIX */}
        <section className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Proficiency Matrix
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Tools, Libraries & Runtimes
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Filter by engineering domain to explore specific proficiencies and tooling experience.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((tab) => {
              const isSelected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredSkills.map((skill) => {
              const techIconMap = {
                Atom: Atom,
                Globe: Globe,
                Server: Server,
                Layers: Layers,
                HardDrive: HardDrive,
                Database: Database,
                GitBranch: GitBranch,
                Cloud: Cloud,
              };
              const SkillIcon = techIconMap[skill.icon] || Zap;

              return (
                <div
                  key={skill.name}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-purple-500/40 backdrop-blur-sm transition-all group hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition-all">
                        <SkillIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/50 px-2.5 py-1 rounded-md border border-purple-500/20">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${skill.level}%` }}
                      className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🏛️ ARCHITECTURAL COMPETENCIES */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold">
              Software Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Engineering Disciplines & Standards
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Industry practices I adhere to when designing resilient backend systems and client applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {architecturalCompetencies.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🚀 CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Interested in collaborating or hiring a MERN developer?
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Let's connect to discuss full-stack projects, architecture, or software engineering roles.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              Explore Projects
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
