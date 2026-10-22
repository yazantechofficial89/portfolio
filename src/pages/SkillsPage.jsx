import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Server,
  Database,
  Wrench,
  Zap,
  CheckCircle2,
  Layers,
  Cpu,
  BrainCircuit,
  MessageSquare,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Workflow,
  Atom,
  Globe,
  HardDrive,
  GitBranch,
  Cloud
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
  { title: "REST & Clean API Design", desc: "Crafting structured, versioned, documented, and secure endpoints." },
  { title: "Authentication & Security", desc: "JWT tokens, password hashing, session state, and CORS safety." },
  { title: "Real-Time WebSockets", desc: "Bidirectional live chat, unread notifications, and instant event routing." },
  { title: "Database Modeling & Schemas", desc: "Normalized relational & flexible document schemas with indexing." },
  { title: "Responsive Frontend Architecture", desc: "Mobile-first layouts, semantic accessible HTML, and modern state." },
  { title: "Performance Profiling", desc: "Sub-second FCP, non-blocking CSS, WebP media, and route code-splitting." },
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
    <div className="pt-28 pb-24 relative overflow-hidden bg-[#050308] text-zinc-100">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-900/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-950/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Technical Stack &amp; Architecture
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Skills, Architecture &amp; <span className="text-gradient">MERN Expertise</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            A comprehensive breakdown of how I engineer scalable full-stack web applications, solve complex problems, and foster collaborative teamwork.
          </p>
        </div>

        {/* 🌟 FEATURED SPOTLIGHT: MERN STACK DEVELOPMENT */}
        <section className="relative p-6 sm:p-10 lg:p-12 rounded-3xl liquid-glass shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-purple-500/10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono font-medium uppercase tracking-wider mb-3">
                <Workflow className="w-3.5 h-3.5 text-purple-400" />
                Core Specialization
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                MERN Stack Development
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                I build full-stack web applications using <strong className="text-white">MongoDB, Express.js, React, and Node.js</strong>. I enjoy creating responsive user interfaces, developing server-side functionality, and connecting applications to databases.
              </p>
            </div>

            {/* Live Proof Badge */}
            <div className="flex-shrink-0">
              <a
                href="https://sevasetu-3h83.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl liquid-pill text-xs font-mono text-purple-200 hover:text-white transition-all shadow-md group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>See Production MERN: <strong className="text-white">SevaSetu</strong></span>
                <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:text-white transition-colors" />
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
                  className="p-5 rounded-2xl liquid-glass-interactive group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-all mb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                    <IconComp className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold block mb-1">
                    {item.role}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-zinc-300 leading-snug">
                    {item.desc}
                  </p>
                  <p className="mt-2 text-[11px] text-zinc-500 leading-relaxed border-t border-purple-500/10 pt-2 font-normal">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🧠 WORK PHILOSOPHY & CORE STRENGTHS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-2">
              <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
              Core Strengths &amp; Mindset
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              How I Think, Collaborate &amp; Deliver
            </h2>
            <p className="mt-2 text-sm text-zinc-400 font-normal">
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
                  className="p-6 sm:p-7 rounded-2xl liquid-glass-interactive group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-950/50 border border-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                      <IconComp className="w-5 h-5 text-purple-300" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20">
                      {val.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400/80 mt-0.5 mb-3">
                    {val.tagline}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-2">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              Proficiency Matrix
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Tools, Libraries &amp; Runtimes
            </h2>
            <p className="mt-2 text-sm text-zinc-400 font-normal">
              Filter by engineering domain to explore specific proficiencies and tooling experience.
            </p>
          </div>

          {/* Category Filters - Liquid Glass */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((tab) => {
              const isSelected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                      : 'bg-purple-950/20 text-zinc-400 border-purple-500/15 hover:text-white hover:border-purple-500/30 backdrop-blur-md'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Skills Grid - Liquid Glass */}
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
                  className="p-5 rounded-2xl liquid-glass-interactive group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                        <SkillIcon className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-purple-300 liquid-pill px-2.5 py-0.5 rounded-md">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-purple-950/40 rounded-full h-1.5 overflow-hidden">
                    <div
                      style={{ width: `${skill.level}%` }}
                      className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🏛️ ARCHITECTURAL COMPETENCIES - Liquid Glass */}
        <section className="p-8 sm:p-12 rounded-3xl liquid-glass">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold">
              Software Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Engineering Disciplines &amp; Standards
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-normal">
              Industry practices I adhere to when designing resilient backend systems and client applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {architecturalCompetencies.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#090611]/80 border border-purple-500/15 hover:border-purple-500/35 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pl-6 font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🚀 CALL TO ACTION BANNER - Liquid Glass */}
        <div className="p-8 sm:p-10 rounded-3xl liquid-glass flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Interested in collaborating or hiring a MERN developer?
            </h3>
            <p className="text-sm text-zinc-400 mt-1 font-normal">
              Let's connect to discuss full-stack projects, architecture, or software engineering roles.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="px-5 py-2.5 rounded-xl liquid-pill text-zinc-300 hover:text-white text-xs font-semibold hover:bg-purple-950/40 transition-all"
            >
              Explore Projects
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-950/50 transition-all flex items-center gap-1.5"
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
