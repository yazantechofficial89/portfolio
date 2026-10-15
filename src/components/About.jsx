import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Zap, Shield, Rocket, CheckCircle } from 'lucide-react';
import { personalData } from '../data/portfolioData';

const pillars = [
  {
    icon: Layout,
    title: 'Frontend Architecture',
    description: 'Specializing in React & Next.js ecosystems. Crafting responsive, fluid, accessible, and high-conversion user interfaces with pixel-perfect attention to detail.',
    color: 'from-purple-500 to-indigo-500',
    tags: ['React', 'Next.js', 'Tailwind', 'State Management'],
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    description: 'Engineering bulletproof server architectures, secure RESTful & GraphQL endpoints, authentication workflows, and microservice communication.',
    color: 'from-indigo-500 to-cyan-500',
    tags: ['Node.js', 'Express', 'JWT/OAuth', 'WebSockets'],
  },
  {
    icon: Database,
    title: 'Data & Cloud Infrastructure',
    description: 'Designing normalized relational databases, high-availability document stores, Redis caching layers, and containerized Docker environments.',
    color: 'from-cyan-500 to-emerald-500',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
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
    title: 'Product & Business Focus',
    desc: 'Building features that directly impact users and drive tangible business value.',
  },
  {
    title: 'End-to-End Reliability',
    desc: 'Strict error handling, input validation, and automated testing for zero downtime.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Web Solutions from <span className="text-gradient">Core to Interface</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            {personalData.bio}
          </p>
        </div>

        {/* 3 Pillars Cards */}
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
                className="relative group p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pillar.color} p-[1px] mb-6 shadow-lg shadow-purple-500/10`}>
                  <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/70 text-slate-300 border border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guiding Principles Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-purple-950/20 border border-slate-800 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold">
                Development Philosophy
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                How I Approach Software Engineering
              </h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                I prioritize writing code that is not just working today, but is easy to understand, test, and scale for years to come.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {principles.map((principle) => (
                <div key={principle.title} className="flex items-start gap-3.5">
                  <div className="p-1 rounded-full bg-purple-500/20 text-purple-400 mt-1 flex-shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{principle.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-normal">{principle.desc}</p>
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
