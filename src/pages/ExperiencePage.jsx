import React from 'react';
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
  Building2,
  Clock
} from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function ExperiencePage() {
  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ffffff', '#a1a1aa', '#71717a', '#d4d4d8'],
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
    <div className="pt-28 pb-24 relative overflow-hidden bg-black text-zinc-100 min-h-screen">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-white/[0.02] blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-zinc-300 text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            Career Journey &amp; Academic Foundation
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Work Experience &amp; <span className="text-silver-gradient">Education</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            A chronological timeline of my hands-on MERN stack development, B.Tech studies at Echelon Institute of Technology, and real-world project achievements.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleConfetti}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-black bg-white hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.18)] transition-all text-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete Resume</span>
            </button>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-zinc-300 liquid-pill hover:bg-white/[0.08] hover:text-white transition-all text-sm"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>
        </div>

        {/* 3 Metric Cards - Liquid Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl liquid-glass-interactive">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
              <Clock className="w-5 h-5 text-zinc-200" />
            </div>
            <div className="text-2xl font-extrabold text-white text-silver-gradient">1 Year</div>
            <div className="text-xs font-medium text-zinc-300 font-mono mt-0.5">Hands-on MERN Experience</div>
            <p className="text-xs text-zinc-400 mt-2 font-normal">
              Building full-stack web applications with React, Node, Express, and MongoDB.
            </p>
          </div>

          <div className="p-6 rounded-2xl liquid-glass-interactive">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
              <GraduationCap className="w-5 h-5 text-zinc-200" />
            </div>
            <div className="text-2xl font-extrabold text-white text-silver-gradient">2024–2028</div>
            <div className="text-xs font-medium text-zinc-300 font-mono mt-0.5">B.Tech in Computer Science</div>
            <p className="text-xs text-zinc-400 mt-2 font-normal">
              Echelon Institute of Technology, focusing on core CS &amp; software architecture.
            </p>
          </div>

          <div className="p-6 rounded-2xl liquid-glass-interactive">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
              <Layers className="w-5 h-5 text-zinc-200" />
            </div>
            <div className="text-2xl font-extrabold text-white text-silver-gradient">SevaSetu</div>
            <div className="text-xs font-medium text-zinc-300 font-mono mt-0.5">Live Production MERN App</div>
            <p className="text-xs text-zinc-400 mt-2 font-normal">
              Real-time socket chat, donation bridge, and full-stack cloud deployment.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l border-white/15 space-y-12">
          {experienceData.map((exp, idx) => {
            const IconComp = getTimelineIcon(exp.role);

            return (
              <div key={idx} className="relative group">
                {/* Timeline Marker - Obsidian Glass Node */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-black border border-white/30 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-110 group-hover:border-white transition-all">
                  <IconComp className="w-4 h-4 text-zinc-200" />
                </div>

                {/* Card Container - Liquid Glass */}
                <div className="p-6 sm:p-8 rounded-3xl liquid-glass-interactive">
                  
                  {/* Top Bar: Period & Type */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-200 liquid-pill px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.period}
                    </span>
                    {exp.type && (
                      <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full liquid-pill text-zinc-400">
                        {exp.type}
                      </span>
                    )}
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {exp.role}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    <Building2 className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span>{exp.company}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                    {exp.description}
                  </p>

                  {/* Key Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-2.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                        Key Responsibilities &amp; Milestones:
                      </span>
                      {exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-normal">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills tags */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-mono text-zinc-500 mr-1">Skills:</span>
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link (if applicable) */}
                  {exp.link && (
                    <div className="mt-5 pt-4 border-t border-white/[0.08] flex justify-end">
                      {exp.link.startsWith('http') ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs shadow-md hover:bg-zinc-200 transition-colors"
                        >
                          <span>{exp.linkText || 'View Details'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          to={exp.link}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl liquid-pill hover:bg-white/[0.08] text-zinc-200 text-xs font-semibold transition-colors"
                        >
                          <span>{exp.linkText || 'View Details'}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                        </Link>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card - Liquid Glass */}
        <div className="p-8 sm:p-10 rounded-3xl liquid-glass flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Interested in collaborating or discussing an opportunity?
            </h3>
            <p className="text-sm text-zinc-400 mt-1 font-normal">
              I am open to discussions regarding full-stack projects, software engineering roles, and team collaborations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="px-5 py-2.5 rounded-xl liquid-pill text-zinc-300 hover:text-white text-xs font-semibold hover:bg-white/[0.08] transition-all"
            >
              Explore Projects
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-lg shadow-white/20 transition-all flex items-center gap-1.5"
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
