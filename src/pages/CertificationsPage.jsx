import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Search,
  ExternalLink,
  Calendar,
  Building2,
  Sparkles,
  CheckCircle2,
  Eye,
  ShieldCheck,
  FileText,
  Tag,
  Download,
  Star,
  X
} from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

const STORAGE_KEY = 'yazan_custom_certificates';

export default function CertificationsPage() {
  const [allCertificates, setAllCertificates] = useState(certificationsData);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCert, setPreviewCert] = useState(null);

  // Load any existing saved certificates from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllCertificates([...parsed, ...certificationsData]);
          return;
        }
      }
    } catch (e) {
      console.warn('LocalStorage error reading certificates:', e);
    }
    setAllCertificates(certificationsData);
  }, []);

  // Categories list
  const availableCategories = [
    'All',
    ...Array.from(new Set(allCertificates.map((c) => c.category))).filter(Boolean)
  ];

  // Filtered certificates
  const filteredCertificates = allCertificates.filter((cert) => {
    const matchesCategory =
      activeCategory === 'All' || cert.category === activeCategory;

    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !searchQuery ||
      cert.title.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query) ||
      (cert.credentialId && cert.credentialId.toLowerCase().includes(query)) ||
      (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(query)));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Credentials &amp; Achievements
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Certifications &amp; <span className="text-gradient">Accreditations</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Verified original certificates and national achievements earned by Yazan Gupta. High-resolution document previews and official credential verifications.
            </p>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-emerald-400 shadow-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Authentic &amp; Verified</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">Total Credentials</span>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              {allCertificates.length}
            </div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">Verification Status</span>
            <div className="mt-1 text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              100% Authentic
            </div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">Govt &amp; National</span>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-purple-400">
              {allCertificates.filter((c) => c.category?.includes('Government') || c.category?.includes('National')).length || 1}
            </div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">Hackathons &amp; Awards</span>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-cyan-400">
              {allCertificates.filter((c) => c.category?.includes('Hackathon')).length || 1}
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, organization, or skills..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>
            Showing {filteredCertificates.length} of {allCertificates.length} certificates
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-purple-400 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Certificates Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert) => (
            <motion.div
              layout
              key={cert.id || cert._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col rounded-3xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/50 overflow-hidden shadow-xl shadow-black/30 hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Certificate Image Preview */}
              <div
                onClick={() => setPreviewCert(cert)}
                className="relative h-56 w-full overflow-hidden bg-slate-950 cursor-pointer"
              >
                {cert.type === 'pdf' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-400 group-hover:text-purple-300 transition-colors">
                    <FileText className="w-16 h-16 text-purple-400 mb-2" />
                    <span className="text-xs font-mono font-medium">PDF Certificate Document</span>
                    <span className="text-[10px] text-slate-500 mt-1">Click to preview full-screen</span>
                  </div>
                ) : (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified
                  </span>

                  {cert.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/90 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      Original
                    </span>
                  )}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/90 text-white text-xs font-semibold shadow-lg">
                    <Eye className="w-4 h-4" />
                    View Certificate
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Issued {cert.issueDate}</span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="truncate">{cert.category}</span>
                  </div>

                  <h3
                    onClick={() => setPreviewCert(cert)}
                    className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {cert.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-300">{cert.issuer}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills pills */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cert.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="px-2 py-1 rounded-md text-[10px] font-mono text-slate-400 bg-slate-800/50">
                          +{cert.skills.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Full</span>
                  </button>

                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 hover:border-purple-500/40 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 mt-8">
            <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No certificates found</h3>
            <p className="text-sm text-slate-400 mt-1">
              Try adjusting your search query or selected category.
            </p>
          </div>
        )}
      </div>

      {/* Full Certificate Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewCert(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                        {previewCert.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 shrink-0">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Issued by {previewCert.issuer} &bull; {previewCert.issueDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={previewCert.image}
                    download={previewCert.fileName || `${previewCert.title}.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Download Certificate"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setPreviewCert(null)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Preview Container */}
              <div className="p-4 sm:p-6 bg-slate-950 flex-1 flex items-center justify-center overflow-auto max-h-[60vh]">
                {previewCert.type === 'pdf' ? (
                  <iframe
                    src={previewCert.image}
                    title={previewCert.title}
                    className="w-full h-[55vh] rounded-xl border border-slate-800"
                  />
                ) : (
                  <img
                    src={previewCert.image}
                    alt={previewCert.title}
                    className="max-w-full max-h-[55vh] object-contain rounded-xl shadow-2xl border border-slate-800"
                  />
                )}
              </div>

              {/* Footer info */}
              <div className="p-5 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  {previewCert.credentialId && (
                    <div>
                      Credential ID: <span className="font-mono text-emerald-300 font-semibold">{previewCert.credentialId}</span>
                    </div>
                  )}
                  <p className="mt-1 text-slate-300">{previewCert.description}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {previewCert.credentialUrl && (
                    <a
                      href={previewCert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-md transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
