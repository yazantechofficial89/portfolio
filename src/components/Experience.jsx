import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle, GraduationCap, Award } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-[#050507]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-zinc-300 text-xs font-mono tracking-wider uppercase mb-3">
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience &amp; <span className="text-silver-gradient">Education</span>
          </h2>
          <p className="mt-4 text-base text-zinc-400 font-normal">
            My professional career path, key milestones, and technical contributions over the years.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l border-white/15 space-y-12">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Marker - Obsidian Glass Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-black border border-white/30 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-110 group-hover:border-white transition-all">
                {exp.role.toLowerCase().includes('b.tech') || exp.role.toLowerCase().includes('bachelor') ? (
                  <GraduationCap className="w-4 h-4 text-zinc-200" />
                ) : exp.role.toLowerCase().includes('hackathon') || exp.role.toLowerCase().includes('youth') ? (
                  <Award className="w-4 h-4 text-zinc-200" />
                ) : (
                  <Briefcase className="w-4 h-4 text-zinc-200" />
                )}
              </div>

              {/* Card Container - Liquid Glass */}
              <div className="p-6 sm:p-8 rounded-3xl liquid-glass-interactive">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-200 liquid-pill px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    {exp.period}
                  </span>
                  <span className="text-xs font-medium text-zinc-400">
                    {exp.company}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {exp.role}
                </h3>

                <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-2">
                    {exp.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5 text-xs text-zinc-300">
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
      </div>
    </section>
  );
}
