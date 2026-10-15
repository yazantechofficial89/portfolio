import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  Calendar,
  CheckCircle,
  GraduationCap,
  Download,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
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

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
            Career Journey
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Experience & <span className="text-gradient">Education</span>
          </h1>
          <p className="mt-4 text-base text-slate-400">
            A comprehensive record of my professional experience, team leadership, architectural contributions, and academic foundation.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleConfetti}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 shadow-md transition-all text-sm"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Download Complete Resume</span>
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800 space-y-12">
          {experienceData.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center text-purple-400 shadow-md shadow-purple-500/30 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                {exp.role.includes('Bachelor') ? (
                  <GraduationCap className="w-4 h-4" />
                ) : (
                  <Briefcase className="w-4 h-4" />
                )}
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 backdrop-blur-sm transition-all group-hover:-translate-y-1 shadow-lg shadow-black/20">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {exp.company}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {exp.role}
                </h3>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                    {exp.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Interested in discussing a role?</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              I am available for interviews and exploratory discussions.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all text-sm inline-flex items-center gap-2 flex-shrink-0"
          >
            <span>Reach Out Directly</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
