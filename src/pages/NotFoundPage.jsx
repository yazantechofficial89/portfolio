import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4 text-center">
      <div className="max-w-md mx-auto">
        <span className="text-7xl font-extrabold text-gradient block mb-4">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-sm text-slate-400 mb-8">
          The page you are looking for doesn't exist or has been moved to another URL.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all text-sm"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
