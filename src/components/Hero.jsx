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

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#a855f7', '#6366f1', '#38bdf8', '#c084fc'],
    });
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-transparent">
      {/* Deep Space Cosmic Nebulae */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] cosmic-nebula blur-[130px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-indigo-950/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-950/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Modern Precision Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f70a_1px,transparent_1px),linear-gradient(to_bottom,#a855f70a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 shadow-[0_0_25px_rgba(147,51,234,0.35)] hover:shadow-[0_0_35px_rgba(147,51,234,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#contact"
                onClick={handleConfetti}
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

          {/* Right Column: Interactive Code Terminal Card - Dark Purple Glass */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Subtle ambient backdrop glow */}
              <div className="absolute -inset-1 rounded-3xl bg-purple-600/20 blur-2xl pointer-events-none"></div>

              <div className="relative rounded-2xl bg-[#0a0714]/90 border border-purple-500/25 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.12)] overflow-hidden">
                {/* Window header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#06040a]/80 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-400/20" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-400/20" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-400/20" />
                    <span className="ml-2 text-xs font-mono text-purple-300/70">developer.ts</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>fullstack</span>
                  </div>
                </div>

                {/* Code Body */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-zinc-300">
                  <p className="text-purple-400">
                    <span className="text-indigo-400 font-bold">const</span> developer = &#123;
                  </p>
                  <p className="pl-4">
                    name: <span className="text-emerald-300">'{personalData.name}'</span>,
                  </p>
                  <p className="pl-4">
                    role: <span className="text-emerald-300">'Full-Stack Engineer'</span>,
                  </p>
                  <p className="pl-4">
                    coreStack: [
                    <span className="text-amber-300">'React'</span>,{' '}
                    <span className="text-amber-300">'Node.js'</span>,{' '}
                    <span className="text-amber-300">'MongoDB'</span>,{' '}
                    <span className="text-amber-300">'Tailwind'</span>
                    ],
                  </p>
                  <p className="pl-4">
                    architecture: <span className="text-cyan-300">['REST APIs', 'WebSockets', 'MERN']</span>,
                  </p>
                  <p className="pl-4">
                    hardWorker: <span className="text-rose-400 font-semibold">true</span>,
                  </p>
                  <p className="pl-4">
                    hireable: <span className="text-emerald-400 font-semibold">true</span>,
                  </p>
                  <p className="pl-4">
                    motto: <span className="text-amber-300">'Turning ideas into fast, scalable code.'</span>,
                  </p>
                  <p className="text-purple-400">&#125;;</p>

                  <div className="mt-4 pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs text-zinc-400">
                    <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Compiled successfully
                    </span>
                    <span className="text-purple-300/60 font-mono">0 errors, 0 warnings</span>
                  </div>
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
