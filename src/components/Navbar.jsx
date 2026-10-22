import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Sparkles } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050308]/85 backdrop-blur-2xl border-b border-purple-500/15 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.08)]'
          : 'bg-[#050308]/50 backdrop-blur-xl py-4 border-b border-purple-500/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Dark Purple Obsidian Glass Emblem */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-800 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.25)] group-hover:shadow-[0_0_28px_rgba(168,85,247,0.4)] transition-all">
            <div className="w-full h-full bg-[#0a0712] rounded-[11px] flex items-center justify-center group-hover:bg-[#120d20] transition-colors border border-purple-500/20">
              <Code2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300 group-hover:scale-105 transition-all" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-purple-200 transition-colors">
              Yazan <span className="text-purple-400">Gupta</span>
            </span>
            <span className="text-[10px] text-purple-300/60 tracking-widest font-mono uppercase -mt-0.5">
              FULLSTACK DEV
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links - Dark Purple Glass Pill Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0c0915]/80 border border-purple-500/20 p-1.5 rounded-full px-2.5 backdrop-blur-2xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_8px_20px_rgba(0,0,0,0.6)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-purple-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/35 to-indigo-600/35 border border-purple-500/40 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action Button - Deep Rich Purple Gradient */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.35)] hover:shadow-[0_0_28px_rgba(147,51,234,0.5)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200 group-hover:rotate-12 transition-transform" />
            <span>Hire Me</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white bg-[#0c0915] border border-purple-500/20 focus:outline-none backdrop-blur-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#06040a]/98 border-b border-purple-500/20 backdrop-blur-2xl px-4 pt-3 pb-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-950/70 border border-purple-500/40 text-purple-200 font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
                        : 'text-zinc-400 hover:text-white hover:bg-purple-950/30'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 text-center py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 text-sm shadow-[0_0_20px_rgba(147,51,234,0.35)]"
              >
                Hire Me / Get In Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
