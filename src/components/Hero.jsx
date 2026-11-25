import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
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

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#ff2a85', '#f59e0b', '#7c3aed', '#06b6d4', '#ffffff'],
    });
  };

  const handleDownload = () => {
    handleConfetti();
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
            {/* Availability Badge - GTA 6 Vice City Neon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-pill mb-6 shadow-[0_0_20px_rgba(255,42,133,0.3)] border border-[#ff2a85]/40"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2a85] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff2a85]"></span>
              </span>
              <span className="text-xs font-semibold text-pink-200 tracking-wide font-mono">
                🌴 VICE CITY &bull; {personalData.status}
              </span>
            </motion.div>

            {/* Headline - GTA 6 Vice City Sunset Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]"
            >
              Hi, I'm <span className="text-gradient">{personalData.name}</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-zinc-100 font-bold block mt-2">
                Full-Stack Web Developer
              </span>
            </motion.h1>

            {/* Subtitle with Vice Neon Accents */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal"
            >
              {personalData.tagline} Focused on architecting high-performing applications with
              <span className="text-[#ff2a85] font-semibold"> React</span>,
              <span className="text-[#f59e0b] font-semibold"> Node.js</span>, and
              <span className="text-[#06b6d4] font-semibold"> modern cloud databases</span>.
            </motion.p>

            {/* CTA Buttons - GTA 6 Vice City Sunset Gradients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#ff2a85] via-[#9333ea] to-[#f59e0b] hover:from-[#ff3d95] hover:to-[#fbbf24] border border-pink-300/30 shadow-[0_0_28px_rgba(255,42,133,0.45)] hover:shadow-[0_0_38px_rgba(255,42,133,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-pink-100 bg-[#0d0718]/80 hover:bg-[#1a0e30] border border-[#ff2a85]/35 hover:border-[#ff2a85]/60 hover:text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_18px_rgba(255,42,133,0.18)] transition-all text-sm"
              >
                <Download className="w-4 h-4 text-[#ff2a85]" />
                <span>Download CV</span>
              </a>

              <button
                onClick={copyEmailToClipboard}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-zinc-300 bg-[#0d0718]/60 hover:bg-[#1a0e30]/80 border border-[#ff2a85]/25 hover:border-[#ff2a85]/50 text-sm backdrop-blur-md transition-all"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#ff2a85]" />
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
              <span className="text-xs uppercase tracking-wider font-mono text-[#ff2a85] font-semibold">🌴 Connect:</span>
              <div className="flex items-center gap-2">
                <a
                  href={personalData.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#0d0718] border border-[#ff2a85]/25 hover:border-[#ff2a85]/60 hover:text-white hover:shadow-[0_0_15px_rgba(255,42,133,0.4)] text-zinc-400 backdrop-blur-md transition-all"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalData.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#0d0718] border border-[#ff2a85]/25 hover:border-[#06b6d4]/60 hover:text-[#06b6d4] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] text-zinc-400 backdrop-blur-md transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalData.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#0d0718] border border-[#ff2a85]/25 hover:border-[#ff2a85]/60 hover:text-[#ff2a85] hover:shadow-[0_0_15px_rgba(255,42,133,0.4)] text-zinc-400 backdrop-blur-md transition-all"
                  title="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={personalData.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#0d0718] border border-[#ff2a85]/25 hover:border-emerald-400/60 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] text-zinc-400 backdrop-blur-md transition-all"
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

          {/* Right Column: 3D YG Brand Emblem Showcase (GTA 6 Vice City Showcase) */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* GTA 6 Vice City Liquid Glass Showcase Card */}
              <div className="relative rounded-3xl liquid-glass border border-[#ff2a85]/25 p-8 sm:p-10 shadow-[0_0_45px_rgba(255,42,133,0.18)] flex flex-col items-center text-center overflow-hidden group">
                {/* Specular Top Sheen (Vice Sunset Highlight) */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff2a85]/50 to-transparent pointer-events-none" />

                {/* Top Header Bar */}
                <div className="w-full flex items-center justify-between mb-5 pb-3 border-b border-[#ff2a85]/20 text-xs font-mono relative z-10">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full liquid-pill text-zinc-200 hover:text-white hover:border-[#ff2a85]/60 transition-colors group/pill"
                    title="View Yazan Gupta Profile"
                  >
                    <img
                      src="/yazan-gupta.jpg"
                      alt="Yazan Gupta"
                      loading="eager"
                      className="w-5 h-5 rounded-full object-cover border border-[#ff2a85]/50 group-hover/pill:scale-110 transition-transform"
                    />
                    <span className="font-medium">Yazan Gupta</span>
                  </Link>
                  <span className="text-[#ff2a85] font-bold tracking-wider">🌴 VI &bull; 2026</span>
                </div>

                {/* Center 3D YG Logo Display with Slow Continuous 3D Spin */}
                <div
                  className="relative my-4 flex items-center justify-center z-10"
                  style={{ perspective: 1000 }}
                >
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{
                      repeat: Infinity,
                      ease: 'linear',
                      duration: 12,
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  >
                    {/* Front Face */}
                    <img
                      src="/yg-logo.png"
                      alt="Yazan Gupta (YG) Emblem"
                      loading="eager"
                      fetchPriority="high"
                      style={{ backfaceVisibility: 'hidden' }}
                      className="w-52 h-52 sm:w-60 sm:h-60 object-contain drop-shadow-[0_12px_28px_rgba(255,42,133,0.45)]"
                    />

                    {/* Back Face (pre-rotated so letters never appear inverted) */}
                    <img
                      src="/yg-logo.png"
                      alt="Yazan Gupta (YG) Emblem Back"
                      loading="eager"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                      className="absolute inset-0 w-52 h-52 sm:w-60 sm:h-60 object-contain drop-shadow-[0_12px_28px_rgba(255,42,133,0.45)]"
                    />
                  </motion.div>
                </div>

                {/* Name & Identity */}
                <div className="mt-2 relative z-10">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Yazan <span className="text-gradient">Gupta</span>
                  </h3>
                  <p className="text-xs text-pink-200/80 font-mono mt-1">
                    Full-Stack Engineer &bull; B.Tech CSE (Data Science)
                  </p>
                </div>

                {/* Bottom Tech Pills */}
                <div className="mt-6 pt-4 border-t border-[#ff2a85]/20 w-full flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono relative z-10">
                  <span className="px-3 py-1 rounded-full liquid-pill text-pink-100 border-[#ff2a85]/30">
                    React &bull; Next.js
                  </span>
                  <span className="px-3 py-1 rounded-full liquid-pill text-pink-100 border-[#ff2a85]/30">
                    Node.js &bull; Express
                  </span>
                  <span className="px-3 py-1 rounded-full liquid-pill text-pink-100 border-[#ff2a85]/30">
                    MongoDB &bull; Java
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid - GTA 6 Vice City Sunset Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {personalData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl liquid-glass-interactive border-[#ff2a85]/20 hover:border-[#ff2a85]/50"
            >
              <div className="text-3xl font-extrabold tracking-tight text-gradient">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
