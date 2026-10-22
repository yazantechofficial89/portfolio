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
          ? 'bg-black/75 backdrop-blur-2xl border-b border-white/[0.08] py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.08)]'
          : 'bg-black/40 backdrop-blur-xl py-4 border-b border-white/[0.05]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Obsidian Glass Emblem */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/20 via-white/5 to-transparent p-[1px] shadow-[0_0_20px_rgba(255,255,255,0.06)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all">
            <div className="w-full h-full bg-[#09090b] rounded-[11px] flex items-center justify-center group-hover:bg-[#121216] transition-colors border border-white/[0.06]">
              <Code2 className="w-5 h-5 text-white group-hover:scale-105 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-zinc-200 transition-colors">
              Yazan <span className="text-zinc-400 font-light">Gupta</span>
            </span>
            <span className="text-[10px] text-zinc-500 tracking-widest font-mono uppercase -mt-0.5">
              Fullstack Dev
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links - Liquid Glass Pill Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-full px-2.5 backdrop-blur-2xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.08)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/[0.08] border border-white/[0.18] rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action Button - Liquid Glass CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-zinc-200 border border-white/80 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.18)] hover:shadow-[0_0_28px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-800 group-hover:rotate-12 transition-transform" />
            <span>Hire Me</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white bg-white/[0.04] border border-white/10 focus:outline-none backdrop-blur-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer - Deep Obsidian Glass */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-black/95 border-b border-white/10 backdrop-blur-2xl px-4 pt-3 pb-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
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
                        ? 'bg-white/[0.08] border border-white/20 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 text-center py-2.5 rounded-xl font-semibold text-black bg-white hover:bg-zinc-200 text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
