import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

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
          ? 'bg-[#07040d]/85 backdrop-blur-2xl border-b border-[#ff2a85]/20 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.85),0_0_20px_rgba(255,42,133,0.15)]'
          : 'bg-[#07040d]/50 backdrop-blur-xl py-4 border-b border-[#ff2a85]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - GTA 6 Vice City Neon Emblem */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2a85] via-[#7c3aed] to-[#f59e0b] p-[1.5px] shadow-[0_0_22px_rgba(255,42,133,0.4)] group-hover:shadow-[0_0_32px_rgba(255,42,133,0.65)] transition-all">
            <div className="w-full h-full bg-[#0a0514] rounded-[10px] flex items-center justify-center group-hover:bg-[#140b26] transition-colors border border-[#ff2a85]/30 p-1">
              <img
                src="/yg-logo.png"
                alt="YG Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,42,133,0.7)] group-hover:scale-110 transition-transform"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-pink-200 transition-colors">
              Yazan <span className="text-[#ff2a85]">Gupta</span>
            </span>
            <span className="text-[9px] text-[#f59e0b] tracking-widest font-mono uppercase -mt-0.5 font-bold">
              🌴 VICE CITY DEV
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links - GTA 6 Dark Glass Pill Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0d0718]/85 border border-[#ff2a85]/25 p-1.5 rounded-full px-2.5 backdrop-blur-2xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.7)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
                  isActive ? 'text-white font-bold' : 'text-zinc-300 hover:text-pink-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#ff2a85]/35 via-[#9333ea]/35 to-[#f59e0b]/25 border border-[#ff2a85]/55 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_15px_rgba(255,42,133,0.35)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action Button - GTA 6 Sunset Neon Gradient */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#ff2a85] via-[#9333ea] to-[#f59e0b] hover:from-[#ff3d95] hover:to-[#fbbf24] border border-pink-300/30 transition-all duration-300 shadow-[0_0_22px_rgba(255,42,133,0.45)] hover:shadow-[0_0_32px_rgba(255,42,133,0.65)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-100 group-hover:rotate-12 transition-transform" />
            <span>Hire Me</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white bg-[#0d0718] border border-[#ff2a85]/25 focus:outline-none backdrop-blur-md"
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
            className="lg:hidden bg-[#07040d]/98 border-b border-[#ff2a85]/25 backdrop-blur-2xl px-4 pt-3 pb-6 shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
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
                        ? 'bg-[#ff2a85]/20 border border-[#ff2a85]/50 text-pink-100 font-bold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
                        : 'text-zinc-300 hover:text-white hover:bg-[#ff2a85]/10'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 text-center py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#ff2a85] via-[#9333ea] to-[#f59e0b] text-sm shadow-[0_0_24px_rgba(255,42,133,0.45)]"
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
