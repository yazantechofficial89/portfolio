import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import { Github, Linkedin, Instagram, WhatsApp } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07040d]/80 backdrop-blur-md border-t border-[#ff2a85]/20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#ff2a85]/15">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2a85]/30 via-[#7c3aed]/20 to-[#f59e0b]/20 border border-[#ff2a85]/40 flex items-center justify-center group-hover:border-[#ff2a85]/70 transition-colors shadow-[0_0_15px_rgba(255,42,133,0.35)] p-1">
              <img
                src="/yg-logo.png"
                alt="YG Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,42,133,0.6)] group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <span className="font-bold text-white text-base group-hover:text-pink-200 transition-colors">
                Yazan <span className="text-[#ff2a85] font-semibold">Gupta</span>
              </span>
              <p className="text-xs text-pink-200/70 font-mono">
                🌴 Full-Stack Web Developer &bull; Vice City Edition
              </p>
            </div>
          </Link>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-zinc-300">
            <Link to="/" className="hover:text-[#ff2a85] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#ff2a85] transition-colors">About</Link>
            <Link to="/skills" className="hover:text-[#ff2a85] transition-colors">Skills</Link>
            <Link to="/projects" className="hover:text-[#ff2a85] transition-colors">Projects</Link>
            <Link to="/certifications" className="hover:text-[#ff2a85] transition-colors">Certifications</Link>
            <Link to="/experience" className="hover:text-[#ff2a85] transition-colors">Experience</Link>
            <Link to="/contact" className="hover:text-[#ff2a85] transition-colors">Contact</Link>
          </div>

          {/* Social Icons & Back to top button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl liquid-pill hover:text-white hover:border-[#ff2a85]/60 hover:shadow-[0_0_12px_rgba(255,42,133,0.35)] text-zinc-300 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl liquid-pill hover:text-[#06b6d4] hover:border-[#06b6d4]/60 hover:shadow-[0_0_12px_rgba(6,182,212,0.35)] text-zinc-300 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl liquid-pill hover:text-[#ff2a85] hover:border-[#ff2a85]/60 hover:shadow-[0_0_12px_rgba(255,42,133,0.35)] text-zinc-300 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl liquid-pill hover:text-emerald-400 hover:border-emerald-400/60 hover:shadow-[0_0_12px_rgba(52,211,153,0.35)] text-zinc-300 transition-colors"
                title="WhatsApp"
              >
                <WhatsApp className="w-4 h-4 fill-current" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl liquid-pill text-zinc-300 hover:text-white hover:border-[#ff2a85]/60 hover:shadow-[0_0_12px_rgba(255,42,133,0.35)] transition-all cursor-pointer"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-pink-200/70 font-mono gap-3">
          <p>
            &copy; 2026 {personalData.name}. All rights reserved.
          </p>
          <p className="text-zinc-400 flex items-center gap-2">
            <span>🌴 Vice City 2026 &bull; CSE '28</span>
            <span>&bull;</span>
            <Link to="/analytics" className="hover:text-[#ff2a85] transition-colors">
              Analytics
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
