import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Sparkles } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import { Github, Linkedin, Instagram, WhatsApp } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 bg-[#0d0718]/95 backdrop-blur-2xl border-t border-[#ff2a85]/35 shadow-[0_-15px_40px_rgba(255,42,133,0.12)] pt-12 pb-8">
      {/* Glowing Neon Top Accent Bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff2a85] to-[#06b6d4] shadow-[0_0_16px_rgba(255,42,133,0.9)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
          
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-[#140b26] border-2 border-[#ff2a85]/50 group-hover:border-[#ff2a85] flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,42,133,0.35)] group-hover:shadow-[0_0_28px_rgba(255,42,133,0.65)] p-1.5">
              <img
                src="/yg-logo.png"
                alt="YG Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <span className="font-black text-xl text-white tracking-tight block">
                Yazan <span className="text-[#ff2a85] drop-shadow-[0_0_8px_rgba(255,42,133,0.8)]">Gupta</span>
              </span>
              <p className="text-xs text-pink-100 font-mono font-medium tracking-wide mt-0.5">
                🌴 Full-Stack Web Developer &bull; <span className="text-[#f59e0b] font-bold">Vice City Edition</span>
              </p>
            </div>
          </Link>

          {/* High-Contrast Nav Quick Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm font-semibold text-white">
            <Link to="/" className="hover:text-[#ff2a85] transition-colors py-1">Home</Link>
            <Link to="/about" className="hover:text-[#ff2a85] transition-colors py-1">About</Link>
            <Link to="/skills" className="hover:text-[#ff2a85] transition-colors py-1">Skills</Link>
            <Link to="/projects" className="hover:text-[#ff2a85] transition-colors py-1">Projects</Link>
            <Link to="/certifications" className="hover:text-[#ff2a85] transition-colors py-1">Certifications</Link>
            <Link to="/experience" className="hover:text-[#ff2a85] transition-colors py-1">Experience</Link>
            <Link to="/contact" className="hover:text-[#ff2a85] transition-colors py-1">Contact</Link>
          </nav>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#170e2c] border border-[#ff2a85]/35 hover:border-white text-zinc-200 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center justify-center transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#170e2c] border border-[#ff2a85]/35 hover:border-[#06b6d4] text-zinc-200 hover:text-[#06b6d4] hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#170e2c] border border-[#ff2a85]/35 hover:border-[#ff2a85] text-zinc-200 hover:text-[#ff2a85] hover:shadow-[0_0_15px_rgba(255,42,133,0.5)] flex items-center justify-center transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#170e2c] border border-[#ff2a85]/35 hover:border-emerald-400 text-zinc-200 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.5)] flex items-center justify-center transition-all"
                title="WhatsApp"
              >
                <WhatsApp className="w-4 h-4 fill-current" />
              </a>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2a85] via-[#9333ea] to-[#f59e0b] hover:from-[#ff3d95] hover:to-[#fbbf24] text-white shadow-[0_0_18px_rgba(255,42,133,0.4)] hover:shadow-[0_0_26px_rgba(255,42,133,0.65)] flex items-center justify-center transition-all cursor-pointer ml-1"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-300 font-mono gap-3">
          <p className="flex items-center gap-1.5 text-zinc-200">
            <span>&copy; 2026 {personalData.name}. All rights reserved.</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[#f59e0b] font-bold">🌴 Vice City 2026 &bull; CSE '28</span>
            <span className="text-zinc-600">&bull;</span>
            <Link
              to="/analytics"
              className="inline-flex items-center gap-1.5 text-pink-300 hover:text-white px-2.5 py-1 rounded-md bg-[#1a0f30] border border-[#ff2a85]/30 hover:border-[#ff2a85]/60 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
