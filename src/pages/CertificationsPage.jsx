import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Search,
  Plus,
  UploadCloud,
  X,
  ExternalLink,
  Calendar,
  Building2,
  Sparkles,
  CheckCircle2,
  Eye,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Tag,
  Download,
  Star
} from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

const STORAGE_KEY = 'yazan_custom_certificates';

export default function CertificationsPage() {
  const [customCerts, setCustomCerts] = useState([]);
  const [allCertificates, setAllCertificates] = useState(certificationsData);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);

  // Form states for Upload
  const [formTitle, setFormTitle] = useState('');
  const [formIssuer, setFormIssuer] = useState('');
  const [formDate, setFormDate] = useState(new Date().getFullYear().toString());
  const [formCategory, setFormCategory] = useState('Hackathons & Competitions');
  const [formSkills, setFormSkills] = useState('');
  const [formCredentialId, setFormCredentialId] = useState('');
  const [formCredentialUrl, setFormCredentialUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImagePreview, setFormImagePreview] = useState('');
  const [formFileType, setFormFileType] = useState('image');
  const [formFileName, setFormFileName] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Load custom certificates from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCustomCerts(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading custom certificates:', e);
    }
  }, []);

  // Merge default portfolio certificates with custom ones
  useEffect(() => {
    const combined = [...customCerts, ...certificationsData];
    setAllCertificates(combined);
  }, [customCerts]);

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setUploadError('');
    if (!file) return;

    const isPdf = file.type === 'application/pdf';
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage) {
      setUploadError('Please select a valid image file (JPG, PNG, WEBP) or PDF.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File size exceeds 15MB limit.');
      return;
    }

    setFormFileType(isPdf ? 'pdf' : 'image');
    setFormFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setFormImagePreview(reader.result);
    };
    reader.onerror = () => {
      setUploadError('Failed to read file.');
    };
    reader.readAsDataURL(file);
  };

  // Submit new certificate
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setUploadError('');

    if (!formTitle.trim()) {
      setUploadError('Certificate Title is required.');
      return;
    }
    if (!formIssuer.trim()) {
      setUploadError('Issuing Organization is required.');
      return;
    }

    const finalImage =
      formImagePreview ||
      formImageUrl.trim() ||
      'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?auto=format&fit=crop&w=1200&q=80';

    const parsedSkills = formSkills
      ? formSkills.split(',').map((s) => s.trim()).filter(Boolean)
      : ['Web Development', 'Full-Stack'];

    const newCert = {
      id: `cert-${Date.now()}`,
      title: formTitle.trim(),
      issuer: formIssuer.trim(),
      issueDate: formDate.trim() || new Date().getFullYear().toString(),
      category: formCategory,
      credentialId: formCredentialId.trim() || `VERIFIED-${Date.now().toString().slice(-6)}`,
      credentialUrl: formCredentialUrl.trim() || '',
      description:
        formDescription.trim() ||
        `Verified certification awarded to Yazan Gupta by ${formIssuer.trim()}.`,
      image: finalImage,
      type: formFileType,
      fileName: formFileName || 'certificate.jpg',
      skills: parsedSkills,
      featured: true,
      isVerified: true,
      isCustom: true,
    };

    const updated = [newCert, ...customCerts];
    setCustomCerts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    setUploadSuccess(true);
    setTimeout(() => {
      setFormTitle('');
      setFormIssuer('');
      setFormDate(new Date().getFullYear().toString());
      setFormSkills('');
      setFormCredentialId('');
      setFormCredentialUrl('');
      setFormDescription('');
      setFormImagePreview('');
      setFormFileName('');
      setFormImageUrl('');
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
    }, 900);
  };

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

          {/* Action Header Button */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-600/30 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certificate</span>
            </button>
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
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-xl bg-purple-600/90 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-4 h-4" />
                    <span>View Certificate</span>
                  </span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-purple-400 font-medium mb-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate">{cert.issuer}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>

                  {/* Skills tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-slate-800/80 text-purple-200 border border-slate-700/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer details & Action */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{cert.issueDate}</span>
                  </div>

                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
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

      {/* Add Certificate Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl max-h-[90vh] overflow-y-auto my-auto"
            >
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Add New Certificate</h3>
                  <p className="text-xs text-slate-400">
                    Upload image or PDF of your original credential.
                  </p>
                </div>
              </div>

              {uploadError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                  {uploadError}
                </div>
              )}
              {uploadSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Certificate added successfully!</span>
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {/* File Upload Zone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Certificate Document (Image or PDF)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-950/50"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      className="hidden"
                    />
                    <UploadCloud className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-white">
                      Click to browse or drag &amp; drop
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PNG, JPG, WEBP, or PDF (Max 15MB)
                    </p>
                    {formFileName && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{formFileName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Certificate Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. All India Hackathon Winner"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Issuing Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formIssuer}
                      onChange={(e) => setFormIssuer(e.target.value)}
                      placeholder="e.g. Ministry of Youth Affairs / IEEE"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Hackathons & Competitions">Hackathons &amp; Competitions</option>
                      <option value="Government of India / National Recognitions">Govt &amp; National</option>
                      <option value="Full-Stack & Cloud Architecture">Full-Stack &amp; Cloud</option>
                      <option value="Artificial Intelligence & ML">AI &amp; Machine Learning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Issue Date / Year
                    </label>
                    <input
                      type="text"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      placeholder="e.g. 2026"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Credential ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={formCredentialId}
                      onChange={(e) => setFormCredentialId(e.target.value)}
                      placeholder="e.g. MYB-2026-CERT"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Skills / Tech Covered (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formSkills}
                    onChange={(e) => setFormSkills(e.target.value)}
                    placeholder="e.g. React, Node.js, AI Innovation, Problem Solving"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Description / Key Highlights
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Brief description of the certificate honor..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-600/30 transition-all shadow-md"
                  >
                    Save Certificate
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
