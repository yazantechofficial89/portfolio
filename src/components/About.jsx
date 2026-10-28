import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, CheckCircle, Sparkles } from 'lucide-react';
import { personalData } from '../data/portfolioData';

const pillars = [
  {
    icon: Layout,
    title: 'Frontend Architecture',
    description: 'Specializing in React & modern web ecosystems. Crafting responsive, fluid, accessible, and high-conversion user interfaces with pixel-perfect attention to detail.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'State Management'],
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    description: 'Engineering bulletproof server architectures, secure RESTful endpoints, JWT/OAuth workflows, and real-time Socket.io communication.',
    tags: ['Node.js', 'Express', 'JWT Auth', 'WebSockets'],
  },
  {
    icon: Database,
    title: 'Data & Cloud Infrastructure',
    description: 'Designing normalized relational schemas, document stores, indexing strategies, and automated cloud deployments on modern platforms.',
    tags: ['MongoDB', 'PostgreSQL', 'Cloudinary', 'Vercel / Render'],
  },
];

const principles = [
  {
    title: 'Performance-First Mindset',
    desc: 'Optimized bundle sizes, instant page loads, and smooth 60fps animations.',
  },
  {
    title: 'Clean & Scalable Code',
    desc: 'Modular, maintainable, self-documenting code with clear separation of concerns.',
  },
  {
    title: 'Product & Impact Focus',
    desc: 'Building features that solve real human challenges and create tangible value.',
  },
  {
    title: 'End-to-End Reliability',
    desc: 'Strict error handling, input validation, and defensive API architectures.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill text-purple-200 text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Web Solutions from <span className="text-gradient">Core to Interface</span>
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed font-normal">
            {personalData.bio}
          </p>
        </div>

        {/* 3 Pillars Cards - Dark Purple Glass Edition */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative group p-8 rounded-3xl liquid-glass-interactive"
              >
                {/* Purple Glass Icon Container */}
                <div className="w-13 h-13 rounded-2xl bg-[#0c0915] border border-purple-500/25 p-3 mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] flex items-center justify-center w-fit group-hover:scale-105 transition-all">
                  <Icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-purple-500/20">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-purple-950/40 text-purple-200 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guiding Principles Banner - Liquid Glass Panel */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl liquid-glass relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold">
                Development Philosophy
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                How I Approach Software Engineering
              </h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed font-normal">
                I prioritize writing code that is not just working today, but is easy to understand, test, and scale for years to come.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {principles.map((principle) => (
                <div key={principle.title} className="flex items-start gap-3.5">
                  <div className="p-1.5 rounded-full bg-purple-950/70 text-purple-400 mt-1 flex-shrink-0 border border-purple-500/30">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{principle.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-normal font-normal">{principle.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
