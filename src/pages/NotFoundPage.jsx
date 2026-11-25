import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4 text-center bg-transparent text-zinc-100 relative overflow-hidden">
      <div className="max-w-md mx-auto p-8 rounded-3xl liquid-glass border-[#ff2a85]/25 shadow-[0_0_40px_rgba(255,42,133,0.18)]">
        <span className="text-7xl font-black text-gradient block mb-4">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-sm text-zinc-300 mb-8 font-normal">
          The page you are looking for doesn't exist or has been moved to another URL.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#ff2a85] via-[#9333ea] to-[#f59e0b] hover:from-[#ff3d95] hover:to-[#fbbf24] shadow-[0_0_24px_rgba(255,42,133,0.45)] border border-pink-300/30 transition-all text-sm"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
