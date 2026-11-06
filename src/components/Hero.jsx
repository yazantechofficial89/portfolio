import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Mail,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Github, Linkedin, Instagram, WhatsApp } from './Icons';
import { personalData } from '../data/portfolioData';
import { trackResumeDownload } from '../utils/trackResumeDownload';
import { launchDiwaliRocket } from '../utils/diwaliRocket';

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleDownload = () => {
    launchDiwaliRocket({ originX: 0.5 });
    trackResumeDownload('hero');
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-transparent">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-purple-200 tracking-wide font-mono">
                {personalData.status}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]"
            >
              Hi, I'm <span className="text-gradient">{personalData.name}</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-zinc-200 font-bold block mt-2">
                Full-Stack Web Developer
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-normal"
            >
              {personalData.tagline} Focused on architecting high-performing applications with
              <span className="text-purple-300 font-medium"> React</span>,
              <span className="text-indigo-300 font-medium"> Node.js</span>, and modern cloud databases.
            </motion.p>

            {/* CTA Buttons - Deep Purple & Dark Glass */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/20 shadow-lg shadow-black/50 hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="/api/download-resume?source=hero"
                download="Yazan_Gupta_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-purple-200 bg-[#0c0915]/80 hover:bg-[#140e24] border border-purple-500/25 hover:border-purple-500/40 hover:text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all text-sm"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Download CV</span>
              </a>

              <button
                onClick={copyEmailToClipboard}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-zinc-300 bg-[#0c0915]/50 hover:bg-[#140e24]/70 border border-purple-500/20 hover:border-purple-500/35 text-sm backdrop-blur-md transition-all"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span className="font-mono text-xs">Copy Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Social Links & Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex items-center gap-4 text-zinc-400"
            >
              <span className="text-xs uppercase tracking-wider font-mono text-purple-400/80">Connect:</span>
              <div className="flex items-center gap-2">
                <a
                  href={personalData.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#0c0915] border border-purple-500/20 hover:border-purple-500/50 hover:text-white text-zinc-400 backdrop-blur-md transition-all"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalData.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#0c0915] border border-purple-500/20 hover:border-purple-500/50 hover:text-purple-300 text-zinc-400 backdrop-blur-md transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalData.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#0c0915] border border-purple-500/20 hover:border-pink-500/50 hover:text-pink-400 text-zinc-400 backdrop-blur-md transition-all"
                  title="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={personalData.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#0c0915] border border-purple-500/20 hover:border-emerald-500/50 hover:text-emerald-400 text-zinc-400 backdrop-blur-md transition-all"
                  title="Chat on WhatsApp"
                >
                  <WhatsApp className="w-4 h-4 fill-current" />
                </a>
              </div>
              <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                📍 {personalData.location}
              </span>
            </motion.div>
          </div>

          {/* Right Column: 3D YG Brand Emblem Showcase (Festive Diwali Gold Edition) */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Obsidian Liquid Glass Showcase Card with Diwali Warm Golden Glow */}
              <div className="relative rounded-3xl liquid-glass border border-amber-500/25 p-8 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.18)] hover:shadow-[0_0_65px_rgba(245,158,11,0.3)] hover:border-amber-400/45 transition-all flex flex-col items-center text-center overflow-hidden group">
                {/* Warm Golden Specular Top Sheen */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

                {/* Top Header Bar - Diwali Edition */}
                <div className="w-full flex items-center justify-between mb-5 pb-3 border-b border-amber-500/20 text-xs font-mono relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-amber-200 border-amber-500/30 bg-amber-950/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                    <span className="text-sm">🪔</span>
                    <span className="font-semibold tracking-wide">Diwali Festive Edition</span>
                  </div>
                  <span className="text-amber-400/90 font-semibold tracking-wider">YG &bull; 2026</span>
                </div>

                {/* Center 3D YG Logo Display with Slow Continuous 3D Spin (Diwali Gold Theme) */}
                <div
                  className="relative my-4 flex items-center justify-center z-10"
                  style={{ perspective: 1000 }}
                >
                  {/* Radiant Diwali Diya Halo behind the spinning emblem */}
                  <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-amber-500/30 via-orange-500/25 to-yellow-300/30 blur-3xl pointer-events-none -z-10 animate-pulse" />

                  {/* Concentric Golden Aura Ring */}
                  <div className="absolute w-64 h-64 rounded-full border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.25)] pointer-events-none -z-10" />

                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{
                      repeat: Infinity,
                      ease: 'linear',
                      duration: 12,
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={() => launchDiwaliRocket({ originX: 0.72 })}
                    title="Diwali Festive Edition • Click to launch rocket!"
                    className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    {/* Front Face (Golden Diwali Logo) */}
                    <img
                      src="/yg-logo-diwali.png"
                      alt="Yazan Gupta (YG) Diwali Gold Emblem"
                      style={{ backfaceVisibility: 'hidden' }}
                      className="w-52 h-52 sm:w-60 sm:h-60 object-contain drop-shadow-[0_12px_28px_rgba(245,158,11,0.55)]"
                    />

                    {/* Back Face (pre-rotated so letters never appear inverted) */}
                    <img
                      src="/yg-logo-diwali.png"
                      alt="Yazan Gupta (YG) Diwali Gold Emblem Back"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                      className="absolute inset-0 w-52 h-52 sm:w-60 sm:h-60 object-contain drop-shadow-[0_12px_28px_rgba(245,158,11,0.55)]"
                    />
                  </motion.div>
                </div>

                {/* Name & Identity */}
                <div className="mt-2 relative z-10">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Yazan <span className="text-gradient">Gupta</span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    Full-Stack Engineer &bull; B.Tech CSE (Data Science)
                  </p>
                </div>

                {/* Bottom Tech Pills */}
                <div className="mt-6 pt-4 border-t border-amber-500/15 w-full flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono relative z-10">
                  <span className="px-3 py-1 rounded-full liquid-pill text-amber-100/90 border-amber-500/20 bg-amber-950/25">
                    React &bull; Next.js
                  </span>
                  <span className="px-3 py-1 rounded-full liquid-pill text-amber-100/90 border-amber-500/20 bg-amber-950/25">
                    Node.js &bull; Express
                  </span>
                  <span className="px-3 py-1 rounded-full liquid-pill text-amber-100/90 border-amber-500/20 bg-amber-950/25">
                    MongoDB &bull; Java
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid - Dark Purple Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {personalData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl liquid-glass-interactive"
            >
              <div className="text-3xl font-extrabold tracking-tight text-gradient">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
