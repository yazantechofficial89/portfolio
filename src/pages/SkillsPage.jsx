import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Cloud
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

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
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-3">
            Technical Stack
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tools, Frameworks & <span className="text-gradient">Technologies</span>
          </h1>
          <p className="mt-4 text-base text-slate-400">
            A comprehensive breakdown of the languages, runtimes, frameworks, and cloud utilities I deploy to ship robust web systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
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
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-purple-500/40 backdrop-blur-sm transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition-all">
                    <Zap className="w-5 h-5" />
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
          ))}
        </div>

        {/* Architectural Competencies */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold">
              Software Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Engineering Disciplines & Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {architecturalCompetencies.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
