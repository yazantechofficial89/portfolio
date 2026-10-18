import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Calendar, CheckCircle, GraduationCap, Award, ArrowRight } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-slate-950/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            My professional career path, key milestones, and technical contributions over the years.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800 space-y-12">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center text-purple-400 shadow-md shadow-purple-500/30 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                {exp.role.toLowerCase().includes('b.tech') || exp.role.toLowerCase().includes('bachelor') ? (
                  <GraduationCap className="w-4 h-4" />
                ) : exp.role.toLowerCase().includes('hackathon') || exp.role.toLowerCase().includes('youth') ? (
                  <Award className="w-4 h-4" />
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
                  <span className="text-xs font-medium text-slate-400">
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
            </motion.div>
          ))}
        </div>

        {/* View Full Timeline Link */}
        <div className="mt-14 text-center">
          <Link
            to="/experience"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white text-sm font-semibold transition-all shadow-lg hover:shadow-purple-950/40 group"
          >
            <span>Explore Complete Experience & Academic Timeline</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
