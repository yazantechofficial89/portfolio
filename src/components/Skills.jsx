import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code,
  Server,
  Database,
  Wrench,
  Layers,
  Globe,
  GitBranch,
  Cloud,
  Zap,
  ArrowRight,
  Atom,
  HardDrive
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

const categories = [
  { key: 'all', label: 'All Technologies' },
  { key: 'frontend', label: 'Frontend', icon: Code },
  { key: 'backend', label: 'Backend & APIs', icon: Server },
  { key: 'database', label: 'Database & Storage', icon: Database },
  { key: 'tools', label: 'DevOps & Tools', icon: Wrench },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredSkills = () => {
    if (activeTab === 'all') {
      return [
        ...skillsData.frontend.map(s => ({ ...s, category: 'Frontend' })),
        ...skillsData.backend.map(s => ({ ...s, category: 'Backend' })),
        ...skillsData.database.map(s => ({ ...s, category: 'Database' })),
        ...skillsData.tools.map(s => ({ ...s, category: 'DevOps & Tools' })),
      ];
    }
    return (skillsData[activeTab] || []).map(s => ({
      ...s,
      category: categories.find(c => c.key === activeTab)?.label || 'Tech'
    }));
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section id="skills" className="py-24 relative bg-[#050507]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-zinc-300 text-xs font-mono tracking-wider uppercase mb-3">
            Technical Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tools, Frameworks &amp; <span className="text-silver-gradient">Technologies</span>
          </h2>
          <p className="mt-4 text-base text-zinc-400 font-normal">
            A production-proven technology stack I leverage to engineer performant, resilient, and scalable web applications.
          </p>
        </div>

        {/* Category Filter Tabs - Liquid Glass Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {categories.map((tab) => {
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.18)]'
                    : 'bg-white/[0.03] text-zinc-400 border-white/[0.08] hover:text-white hover:border-white/20 backdrop-blur-md'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid - Liquid Glass Cards */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {filteredSkills.map((skill, idx) => {
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
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="p-5 rounded-2xl liquid-glass-interactive group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                      <SkillIcon className="w-5 h-5 text-zinc-200 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-zinc-300 liquid-pill px-2.5 py-0.5 rounded-md">
                    {skill.level}%
                  </span>
                </div>

                {/* Refined Minimalist Progress Bar */}
                <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-gradient-to-r from-zinc-400 to-white h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Link to Full Skills Page */}
        <div className="mt-14 text-center">
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-pill hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-all shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] group"
          >
            <span>Explore Complete MERN Stack &amp; Architecture</span>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
