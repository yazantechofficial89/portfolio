import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import { Github, Linkedin, Instagram, WhatsApp } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-white/[0.08] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-base group-hover:text-zinc-200 transition-colors">
                Yazan <span className="text-zinc-400 font-light">Gupta</span>
              </span>
              <p className="text-xs text-zinc-500 font-mono">
                Full-Stack Web Developer &amp; Engineer
              </p>
            </div>
          </Link>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-zinc-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/skills" className="hover:text-white transition-colors">Skills</Link>
            <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link to="/certifications" className="hover:text-white transition-colors">Certifications</Link>
            <Link to="/experience" className="hover:text-white transition-colors">Experience</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Social Icons & Back to top button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl liquid-pill hover:text-white hover:border-white/20 text-zinc-400 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl liquid-pill hover:text-white hover:border-white/20 text-zinc-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl liquid-pill hover:text-white hover:border-white/20 text-zinc-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl liquid-pill hover:text-emerald-400 hover:border-white/20 text-zinc-400 transition-colors"
                title="WhatsApp"
              >
                <WhatsApp className="w-4 h-4 fill-current" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl liquid-pill text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-3">
          <p>
            &copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400" /> &bull; Modern Liquid Glass Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
