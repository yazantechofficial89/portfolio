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
  Send,
  TrendingUp,
  Activity,
  Heart,
  Cpu
} from 'lucide-react';
import { Github, Linkedin, WhatsApp } from '../components/Icons';
import { personalData } from '../data/portfolioData';
import { trackResumeDownload } from '../utils/trackResumeDownload';

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
  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#c084fc', '#a855f7', '#818cf8', '#ffffff'],
    });
    trackResumeDownload('about');
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden bg-transparent text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. HERO INTRODUCTION WITH PROFILE PHOTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              B.Tech CSE Student &bull; Full-Stack Developer
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Hello, I’m <span className="text-gradient">Yazan Gupta</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-zinc-400 leading-relaxed font-normal">
              I’m a Computer Science student at <strong className="text-white font-semibold">Echelon Institute of Technology</strong>, pursuing a B.Tech in Computer Science from <strong className="text-purple-300 font-semibold font-mono">2024 to 2028</strong>. I’m passionate about technology and full-stack web development, and I enjoy creating applications that are useful, responsive, and easy to use.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-[270px] sm:max-w-[290px]">
              {/* Photo Frame (Clean obsidian border) */}
              <div className="relative rounded-3xl overflow-hidden liquid-glass border border-white/10 shadow-2xl bg-[#090611]">
                <img
                  src="/yazan.jpg"
                  alt="Yazan Gupta"
                  className="w-full h-80 sm:h-96 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050308]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium liquid-pill text-emerald-400 bg-[#090611]/85 backdrop-blur-md border border-purple-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium liquid-pill text-purple-200 bg-[#090611]/85 backdrop-blur-md border border-purple-500/20">
                    B.Tech CSE '28
                  </span>
                </div>
              </div>
            </div>
          </div>
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
              <a
                href="/api/download-resume?source=about"
                download="Yazan_Gupta_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all text-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

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
                  <span className="text-zinc-500">Key Hobby:</span>
                  <span className="font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    Stock Market Trading
                  </span>
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

        {/* 4. HOBBIES & PERSONAL INTERESTS - Liquid Glass */}
        <section className="space-y-8 pt-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-2">
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              Beyond The Code
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Hobbies &amp; Personal Interests
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-normal">
              Passions and pursuits that nurture my discipline, analytical thinking, and mental focus.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Primary Spotlight Card: Stock Market Trading with Bull vs Bear Artwork */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl liquid-glass-interactive border border-emerald-500/30 bg-[#090713] shadow-2xl relative overflow-hidden group flex flex-col justify-between">
              
              {/* Bull vs Bear Trading Vivid Background */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img
                  src="/bull-bear-trading.png"
                  alt="Stock Market Bull vs Bear"
                  className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                  loading="eager"
                  decoding="async"
                />
                {/* Smooth Gradient: Clear on artwork, darker towards bottom text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090713] via-[#090713]/80 via-40% to-black/25" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md">
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider block drop-shadow">
                        Financial Markets &amp; Technicals
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors drop-shadow">
                        Stock Market Trading
                      </h3>
                    </div>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-pill border-emerald-500/40 text-emerald-300 text-xs font-mono bg-emerald-950/80 backdrop-blur-md">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Active Trader</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#090713]/80 backdrop-blur-md border border-white/10 shadow-lg mt-3">
                  <p className="text-sm sm:text-base text-zinc-100 leading-relaxed font-normal">
                    Passionate about active stock market trading, technical chart patterns, and price action analysis. I enjoy studying market structure, analyzing volume trends, and practicing systematic risk-to-reward management. The discipline, emotional control, and pattern recognition demanded by trading directly complement my algorithmic problem-solving in software engineering.
                  </p>
                </div>
              </div>

              {/* Trading Highlights Pills */}
              <div className="mt-5 pt-4 border-t border-emerald-500/25 flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#090713]/85 text-emerald-300 border border-emerald-500/35 backdrop-blur-md shadow-sm">
                  📈 Technical Analysis
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#090713]/85 text-emerald-300 border border-emerald-500/35 backdrop-blur-md shadow-sm">
                  📊 Price Action &amp; Volume
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#090713]/85 text-emerald-300 border border-emerald-500/35 backdrop-blur-md shadow-sm">
                  ⚖️ Risk Management
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#090713]/85 text-emerald-300 border border-emerald-500/35 backdrop-blur-md shadow-sm">
                  🧠 Market Psychology
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#090713]/85 text-emerald-300 border border-emerald-500/35 backdrop-blur-md shadow-sm">
                  💼 Equity Trading
                </span>
              </div>
            </div>

            {/* Secondary Hobbies Stack */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Card 2: Tech Innovation */}
              <div className="p-6 sm:p-7 rounded-3xl liquid-glass-interactive flex-1 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                      <Cpu className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">Technology</span>
                      <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        Tech Innovation &amp; AI
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    Exploring cutting-edge open-source web frameworks, modern tooling, developer workflow automations, and experimentation with AI capabilities.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-purple-500/15 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-purple-950/30 text-purple-300 border border-purple-500/20">
                    Open Source
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-purple-950/30 text-purple-300 border border-purple-500/20">
                    AI Tools
                  </span>
                </div>
              </div>

              {/* Card 3: Strategic Logic Puzzles */}
              <div className="p-6 sm:p-7 rounded-3xl liquid-glass-interactive flex-1 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-950/50 border border-indigo-500/25 flex items-center justify-center text-indigo-300 group-hover:scale-105 transition-transform">
                      <BrainCircuit className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block">Analytical Mind</span>
                      <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        Strategy &amp; Logic Puzzles
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    Engaging in chess, analytical puzzles, and mathematical riddles that cultivate patience, spatial reasoning, and tactical foresight.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-indigo-500/15 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-indigo-950/30 text-indigo-300 border border-indigo-500/20">
                    Chess
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-indigo-950/30 text-indigo-300 border border-indigo-500/20">
                    Problem Solving
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MY GOALS - Liquid Glass */}
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
