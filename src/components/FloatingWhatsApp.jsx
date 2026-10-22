import React, { useState } from 'react';
import { WhatsApp } from './Icons';
import { personalData } from '../data/portfolioData';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);
  const cleanPhone = personalData.phone.replace(/[^0-9]/g, '');

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip on hover - Liquid Glass */}
      <div
        className={`hidden sm:flex items-center px-3.5 py-1.5 rounded-xl liquid-glass text-white text-xs font-mono font-medium shadow-2xl transition-all duration-300 pointer-events-none backdrop-blur-xl ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping" />
        <span>Chat on WhatsApp</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${cleanPhone}?text=Hi%20Yazan,%20I%20am%20reaching%20out%20from%20your%20portfolio.`}
        target="_blank"
        rel="noreferrer"
        className="relative group p-3.5 rounded-full bg-[#121215] border border-emerald-500/40 text-emerald-400 shadow-xl shadow-black/80 hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center backdrop-blur-xl"
        aria-label="Direct message on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <WhatsApp className="w-6 h-6 fill-current text-emerald-400" />
      </a>
    </aside>
  );
}
