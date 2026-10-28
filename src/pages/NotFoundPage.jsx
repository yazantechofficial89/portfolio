import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4 text-center bg-transparent text-zinc-100 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md mx-auto p-8 rounded-3xl liquid-glass shadow-2xl">
        <span className="text-7xl font-black text-gradient block mb-4">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-sm text-zinc-400 mb-8 font-normal">
          The page you are looking for doesn't exist or has been moved to another URL.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all text-sm"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
