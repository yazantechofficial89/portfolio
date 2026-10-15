import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Download,
  CheckCircle,
  GraduationCap,
  Calendar,
  Sparkles,
  Layout,
  Server,
  Database,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { personalData, experienceData } from '../data/portfolioData';

const pillars = [
  {
    icon: Layout,
    title: 'Frontend Architecture',
    description: 'Specializing in React & Next.js ecosystems. Crafting responsive, fluid, accessible, and high-conversion user interfaces with pixel-perfect attention to detail.',
    color: 'from-purple-500 to-indigo-500',
    tags: ['React 19', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'State Management'],
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    description: 'Engineering bulletproof server architectures, secure RESTful & GraphQL endpoints, authentication workflows, and microservice communication.',
    color: 'from-indigo-500 to-cyan-500',
    tags: ['Node.js', 'Express.js', 'REST & GraphQL', 'JWT / OAuth', 'WebSockets'],
  },
  {
    icon: Database,
    title: 'Data & Cloud Infrastructure',
    description: 'Designing normalized relational databases, high-availability document stores, Redis caching layers, and containerized Docker environments.',
    color: 'from-cyan-500 to-emerald-500',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'CI/CD Pipelines'],
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

export default function AboutPage() {
  const education = experienceData.find((e) => e.role.includes('Bachelor') || e.role.includes('Degree'));

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#a855f7', '#6366f1', '#38bdf8'],
    });
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
            About Me
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineering Web Solutions from <span className="text-gradient">Core to Interface</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {personalData.tagline}
          </p>
        </div>

        {/* Detailed Story Section */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-4">My Journey & Background</h2>
            <div className="text-sm sm:text-base text-slate-300 space-y-4 leading-relaxed whitespace-pre-line">
              {personalData.detailedStory}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
              <button
                onClick={handleConfetti}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/25 transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-sm"
              >
                <span>Let's Discuss Opportunities</span>
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </Link>
            </div>
          </div>

          {/* Quick Info & Education */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider block mb-3">
                Quick Facts
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-medium text-white">{personalData.location}</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-medium text-white">2+ Years</span>
                </li>
                <li className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Availability:</span>
                  <span className="font-medium text-emerald-400">Full-Time / Freelance</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Languages:</span>
                  <span className="font-medium text-white">English, Hindi</span>
                </li>
              </ul>
            </div>

            {education && (
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 text-purple-400 flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">{education.period}</span>
                <h3 className="text-base font-bold text-white mt-1">{education.role}</h3>
                <p className="text-xs text-purple-300 font-medium">{education.company}</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{education.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="mt-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-12">
            Core Engineering <span className="text-gradient">Expertise</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 backdrop-blur-sm transition-all duration-300 shadow-xl"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pillar.color} p-[1px] mb-6 shadow-lg shadow-purple-500/10`}>
                    <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Philosophy Banner */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-purple-950/20 border border-slate-800 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold">
                Development Philosophy
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                Guiding Principles
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
    </div>
  );
}
