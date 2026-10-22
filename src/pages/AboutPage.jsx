import React from 'react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import {
  Download,
  GraduationCap,
  Calendar,
  Sparkles,
  Target,
  BrainCircuit,
  MessageSquare,
  Users,
  ArrowRight,
  Layers,
  BookOpen,
  Send
} from 'lucide-react';
import { Github, Linkedin, WhatsApp } from '../components/Icons';
import { personalData } from '../data/portfolioData';

const skillsAndStrengths = [
  {
    title: 'MERN Stack Development',
    desc: 'Building full-stack applications with MongoDB, Express.js, React, and Node.js.',
    icon: Layers,
    badge: 'Core Technical Stack',
  },
  {
    title: 'Problem Solving',
    desc: 'Breaking down challenges and working toward practical solutions with curiosity and patience.',
    icon: BrainCircuit,
    badge: 'Analytical Mindset',
  },
  {
    title: 'Communication',
    desc: 'Sharing ideas clearly, listening carefully to feedback, and maintaining transparency.',
    icon: MessageSquare,
    badge: 'Interpersonal',
  },
  {
    title: 'Teamwork',
    desc: 'Collaborating with others to achieve shared goals and actively learning from teammates.',
    icon: Users,
    badge: 'Collaboration',
  },
  {
    title: 'Continuous Learning',
    desc: 'Developing technical knowledge through hands-on practice, code experimentation, and real projects.',
    icon: Target,
    badge: 'Growth Mindset',
  },
];

export default function AboutPage() {
  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#c084fc', '#a855f7', '#818cf8', '#ffffff'],
    });
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden bg-[#050308] text-zinc-100">
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-900/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-40 right-10 w-96 h-96 bg-indigo-950/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. HERO INTRODUCTION */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            B.Tech CSE Student • Full-Stack Developer
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Hello, I’m <span className="text-gradient">Yazan Gupta</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-zinc-400 leading-relaxed font-normal">
            I’m a Computer Science student at <strong className="text-white font-semibold">Echelon Institute of Technology</strong>, pursuing a B.Tech in Computer Science from <strong className="text-purple-300 font-semibold font-mono">2024 to 2028</strong>. I’m passionate about technology and full-stack web development, and I enjoy creating applications that are useful, responsive, and easy to use.
          </p>
        </div>

        {/* 2. MY JOURNEY & QUICK FACTS SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story Box - Liquid Glass */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl liquid-glass shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/25 flex items-center justify-center text-purple-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                <BookOpen className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">My Journey</h2>
                <p className="text-xs font-mono text-purple-400/80">Path to Full-Stack Engineering</p>
              </div>
            </div>

            <div className="text-base text-zinc-400 space-y-5 leading-relaxed font-normal">
              <p>
                My interest in development has led me to learn the MERN stack: <strong className="text-white font-semibold">MongoDB, Express.js, React, and Node.js</strong>. I have <strong className="text-purple-300 font-semibold">one year of hands-on experience</strong> building and improving web applications. Through this experience, I’ve developed my understanding of frontend development, backend APIs, and database integration.
              </p>
              <p>
                I enjoy learning by building projects, exploring new technologies, and solving challenges along the way. Each project helps me strengthen my skills and understand how the different parts of a web application work together.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-purple-500/10 flex flex-wrap items-center gap-4">
              <button
                onClick={handleConfetti}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all text-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-zinc-300 liquid-pill hover:bg-purple-950/40 hover:text-white transition-all text-sm"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </Link>
            </div>
          </div>

          {/* Quick Facts & Academic Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Academic Card - Liquid Glass */}
            <div className="p-6 sm:p-7 rounded-3xl liquid-glass shadow-2xl">
              <div className="w-11 h-11 rounded-xl bg-purple-950/50 text-purple-300 flex items-center justify-center mb-4 border border-purple-500/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <GraduationCap className="w-6 h-6 text-purple-300" />
              </div>
              <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-purple-400">
                Education
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                B.Tech in Computer Science
              </h3>
              <p className="text-sm font-medium text-zinc-300 mt-0.5">
                Echelon Institute of Technology
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-mono text-purple-300 liquid-pill px-3 py-1.5 rounded-lg w-fit">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>Duration: 2024–2028</span>
              </div>
            </div>

            {/* Quick Facts List - Liquid Glass */}
            <div className="p-6 rounded-3xl liquid-glass shadow-2xl">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider block mb-4">
                Quick Profile Overview
              </span>
              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-300">
                <li className="flex justify-between items-center pb-2.5 border-b border-purple-500/10">
                  <span className="text-zinc-500">Experience:</span>
                  <span className="font-semibold text-purple-300 font-mono">1 Year Hands-On MERN</span>
                </li>
                <li className="flex justify-between items-center pb-2.5 border-b border-purple-500/10">
                  <span className="text-zinc-500">Primary Stack:</span>
                  <span className="font-semibold text-white">MongoDB, Express, React, Node</span>
                </li>
                <li className="flex justify-between items-center pb-2.5 border-b border-purple-500/10">
                  <span className="text-zinc-500">Location:</span>
                  <span className="font-medium text-zinc-200">{personalData.location}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-zinc-500">Status:</span>
                  <span className="font-semibold text-emerald-400 font-mono">Open to Opportunities</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 3. SKILLS AND STRENGTHS - Liquid Glass */}
        <section className="space-y-8 pt-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-2">
              <Target className="w-3.5 h-3.5 text-purple-400" />
              Core Competencies
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Skills and Strengths
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-normal">
              Key technical proficiencies and interpersonal principles that guide my development process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsAndStrengths.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl liquid-glass-interactive group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-950/50 border border-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <IconComp className="w-5 h-5 text-purple-300" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. MY GOALS - Liquid Glass */}
        <section className="p-8 sm:p-10 rounded-3xl liquid-glass shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-3">
              <Target className="w-3.5 h-3.5 text-purple-400" />
              Looking Forward
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Goals
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              I’m focused on strengthening my <strong className="text-white">computer science fundamentals</strong> and growing as a full-stack developer. I look forward to taking on new challenges, collaborating with others, and creating projects that reflect my skills and continued progress.
            </p>
          </div>
        </section>

        {/* 5. LET'S CONNECT - Liquid Glass */}
        <section className="p-8 sm:p-12 rounded-3xl liquid-glass">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-3">
              <Send className="w-3.5 h-3.5 text-purple-400" />
              Open for Collaboration
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Let’s Connect
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              I’m happy to connect with fellow students, developers, and people working on interesting ideas. Feel free to reach out to discuss technology, web development, or potential collaborations.
            </p>
          </div>

          {/* Social and Communication Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/917011906923"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl liquid-glass-interactive group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <WhatsApp className="w-5 h-5 fill-current text-emerald-400" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-500 block">Instant Chat</span>
                <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">WhatsApp</span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:yazangupta39@gmail.com"
              className="p-5 rounded-2xl liquid-glass-interactive group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <Send className="w-5 h-5 text-purple-300" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-mono text-zinc-500 block">Direct Email</span>
                <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate block">
                  yazangupta39@gmail.com
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/yazan-gupta-939b46281?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl liquid-glass-interactive group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-950/50 border border-indigo-500/25 flex items-center justify-center text-indigo-300 group-hover:scale-105 transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <Linkedin className="w-5 h-5 fill-current text-indigo-300" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-500 block">Professional Network</span>
                <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">LinkedIn</span>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/yazantechofficial89"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl liquid-glass-interactive group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <Github className="w-5 h-5 fill-current text-purple-300" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-500 block">Code Repository</span>
                <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">GitHub</span>
              </div>
            </a>

          </div>

          <div className="mt-8 pt-6 border-t border-purple-500/10 flex items-center justify-between flex-wrap gap-4">
            <p className="text-xs text-zinc-500 font-mono">
              Prefer a formal inquiry form? Visit the contact portal.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-950/50 transition-all"
            >
              <span>Go to Contact Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
