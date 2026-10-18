import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Download,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Award,
  Layers,
  Code2,
  Building2,
  Clock
} from 'lucide-react';
import { experienceData, personalData } from '../data/portfolioData';

export default function ExperiencePage() {
  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#a855f7', '#6366f1', '#38bdf8'],
    });
  };

  const getTimelineIcon = (role = '') => {
    const lower = role.toLowerCase();
    if (lower.includes('b.tech') || lower.includes('bachelor') || lower.includes('education')) {
      return GraduationCap;
    }
    if (lower.includes('hackathon') || lower.includes('youth') || lower.includes('award')) {
      return Award;
    }
    return Briefcase;
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-600/10 via-purple-600/10 to-indigo-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Career Journey &amp; Academic Foundation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Experience &amp; <span className="text-gradient">Education</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            A chronological timeline of my hands-on MERN stack development, B.Tech studies at Echelon Institute of Technology, and real-world project achievements.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleConfetti}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/25 transition-all text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete Resume</span>
            </button>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/40 transition-all text-sm"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </Link>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-white">1 Year</div>
            <div className="text-xs font-medium text-purple-300 mt-0.5">Hands-on MERN Experience</div>
            <p className="text-xs text-slate-400 mt-2">
              Building full-stack web applications with React, Node, Express, and MongoDB.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-white">2024–2028</div>
            <div className="text-xs font-medium text-emerald-300 mt-0.5">B.Tech in Computer Science</div>
            <p className="text-xs text-slate-400 mt-2">
              Echelon Institute of Technology, focusing on core CS &amp; software architecture.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-white">SevaSetu</div>
            <div className="text-xs font-medium text-cyan-300 mt-0.5">Live Production MERN App</div>
            <p className="text-xs text-slate-400 mt-2">
              Real-time socket chat, donation bridge, and full-stack cloud deployment.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800 space-y-12">
          {experienceData.map((exp, idx) => {
            const IconComp = getTimelineIcon(exp.role);

            return (
              <div key={idx} className="relative group">
                {/* Timeline Marker */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center text-purple-400 shadow-md shadow-purple-500/30 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <IconComp className="w-4 h-4" />
                </div>

                {/* Card Container */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 backdrop-blur-sm transition-all group-hover:-translate-y-1 shadow-xl shadow-black/20">
                  
                  {/* Top Bar: Period & Type */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    {exp.type && (
                      <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        {exp.type}
                      </span>
                    )}
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {exp.role}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-purple-400">
                    <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{exp.company}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Key Responsibilities &amp; Milestones:
                      </span>
                      {exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-normal">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills tags */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-slate-800/60 flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-mono text-slate-400 mr-1">Skills:</span>
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/70 text-slate-300 border border-slate-700/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link (if applicable) */}
                  {exp.link && (
                    <div className="mt-5 pt-4 border-t border-slate-800/60 flex justify-end">
                      {exp.link.startsWith('http') ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white text-xs font-semibold shadow-md transition-colors"
                        >
                          <span>{exp.linkText || 'View Details'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          to={exp.link}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                        >
                          <span>{exp.linkText || 'View Details'}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                        </Link>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Interested in collaborating or discussing an opportunity?
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              I am open to discussions regarding full-stack projects, internship roles, and team collaborations.
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
