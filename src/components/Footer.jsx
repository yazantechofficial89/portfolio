import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
              <Code2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <span className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                {personalData.name}
                <span className="text-purple-400">.dev</span>
              </span>
              <p className="text-xs text-slate-400">
                Full-Stack Web Developer & Engineer
              </p>
            </div>
          </Link>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
            <Link to="/" className="hover:text-purple-300 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-purple-300 transition-colors">About</Link>
            <Link to="/skills" className="hover:text-purple-300 transition-colors">Skills</Link>
            <Link to="/projects" className="hover:text-purple-300 transition-colors">Projects</Link>
            <Link to="/experience" className="hover:text-purple-300 transition-colors">Experience</Link>
            <Link to="/contact" className="hover:text-purple-300 transition-colors">Contact</Link>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-400 hover:text-white transition-all group"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> using React, Tailwind CSS & Router
          </p>
        </div>
      </div>
    </footer>
  );
}
