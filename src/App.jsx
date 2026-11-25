import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import VisitorTracker from './components/VisitorTracker';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Starfield from './components/Starfield';

// Eager load Home for instant First Contentful Paint
import Home from './pages/Home';

// Lazy load secondary routes for optimal performance and minimal initial bundle
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-pink-500/40 border-t-[#ff2a85] rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <VisitorTracker />
      <div className="min-h-screen bg-[#07040d] text-zinc-100 selection:bg-[#ff2a85]/35 selection:text-pink-100 flex flex-col justify-between relative overflow-hidden">
        {/* GTA 6 Vice City Dusk Starfield & Neon Meteors */}
        <Starfield />

        <Navbar />
        <main className="flex-1 relative z-10">
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
