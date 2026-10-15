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
  Trash2,
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

const CATEGORIES = [
  'All',
  'Hackathons & Competitions',
  'Government & Honors',
  'Web Development',
  'Cloud & DevOps',
  'Databases',
  'Programming',
  'Custom Uploads'
];

export default function CertificationsPage() {
  const [customCerts, setCustomCerts] = useState([]);
  const [allCertificates, setAllCertificates] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

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

  // Merge default portfolio certificates with custom uploaded ones
  useEffect(() => {
    const combined = [...customCerts, ...certificationsData];
    setAllCertificates(combined);
  }, [customCerts]);

  // Handle file selection (Image or PDF)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setUploadError('');
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    if (!isImage && !isPdf) {
      setUploadError('Please select a valid image (PNG, JPG, WEBP) or PDF file.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setUploadError('File size exceeds 25MB limit.');
      return;
    }

    setFormFileName(file.name);
    setFormFileType(isPdf ? 'pdf' : 'image');

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
  const handleAddCertificate = (e) => {
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
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80';

    const parsedSkills = formSkills
      ? formSkills.split(',').map((s) => s.trim()).filter(Boolean)
      : ['Software Engineering'];

    const newCert = {
      id: `custom-${Date.now()}`,
      title: formTitle.trim(),
      issuer: formIssuer.trim(),
      issueDate: formDate.trim() || new Date().getFullYear().toString(),
      category: formCategory,
      skills: parsedSkills,
      credentialId: formCredentialId.trim() || `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      credentialUrl: formCredentialUrl.trim() || '',
      description: formDescription.trim() || 'Original certificate uploaded by candidate.',
      image: finalImage,
      type: formFileType,
      fileName: formFileName,
      isCustom: true,
      uploadedAt: new Date().toISOString(),
    };

    const updated = [newCert, ...customCerts];
    setCustomCerts(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    setUploadSuccess(true);
    setTimeout(() => {
      // Reset form
      setFormTitle('');
      setFormIssuer('');
      setFormDate(new Date().getFullYear().toString());
      setFormCategory('Hackathons & Competitions');
      setFormSkills('');
      setFormCredentialId('');
      setFormCredentialUrl('');
      setFormDescription('');
      setFormImagePreview('');
      setFormFileType('image');
      setFormFileName('');
      setFormImageUrl('');
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
    }, 900);
  };

  // Delete a custom certificate
  const handleDeleteCustomCert = (id) => {
    const updated = customCerts.filter((c) => c.id !== id);
    setCustomCerts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setDeleteConfirmId(null);
  };

  // Filter certificates
  const filteredCertificates = allCertificates.filter((cert) => {
    const matchesCategory =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Custom Uploads'
        ? Boolean(cert.isCustom)
        : cert.category === activeCategory;

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
              <Award className="w-3.5 h-3.5 text-purple-400" />
              Verified Credentials & Achievements
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Certifications & <span className="text-gradient">Accreditations</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Original certificates, national hackathon honors, and industry accreditations earned by Yazan. You can also upload new certificates to preview and keep in your portfolio.
            </p>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 self-start md:self-auto shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Upload Certificate</span>
          </button>
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
            <span className="text-xs font-medium text-slate-400">Original / Verified</span>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-amber-400">
              {allCertificates.filter((c) => c.isOriginal).length}
            </div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">Issuing Entities</span>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-cyan-400">
              {new Set(allCertificates.map((c) => c.issuer)).size}
            </div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">User Uploads</span>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {customCerts.length}
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, issuer, credential ID, or skill..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
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
                {cat === 'Custom Uploads' && customCerts.length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">
                    {customCerts.length}
                  </span>
                )}
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
            <div
              key={cert.id}
              className={`group flex flex-col rounded-3xl bg-slate-900/60 border ${
                cert.isOriginal
                  ? 'border-amber-500/40 shadow-amber-950/20 hover:border-amber-400/80'
                  : 'border-slate-800/80 hover:border-purple-500/50'
              } overflow-hidden shadow-xl shadow-black/30 hover:-translate-y-2 transition-all duration-300 relative`}
            >
              {/* Image / Thumbnail Preview with Click to Enlarge */}
              <div
                onClick={() => setPreviewCert(cert)}
                className="relative h-52 w-full overflow-hidden bg-slate-950 cursor-pointer"
              >
                {cert.type === 'pdf' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-purple-950/40 p-6">
                    <FileText className="w-14 h-14 text-purple-400 mb-2" />
                    <span className="text-xs font-semibold text-white text-center line-clamp-1">{cert.title}</span>
                    <span className="text-[11px] text-slate-400 mt-1">PDF Document • Click to View</span>
                  </div>
                ) : (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 bg-slate-950/90 group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/85 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {cert.category}
                  </span>

                  {cert.isOriginal ? (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/90 backdrop-blur-md text-amber-300 border border-amber-500/50 shadow-md shadow-amber-950/50">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      Original
                    </span>
                  ) : cert.isCustom ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40">
                      User Uploaded
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30">
                      <ShieldCheck className="w-3 h-3 text-purple-400" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/60 backdrop-blur-[2px] transition-opacity">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/20">
                    <Eye className="w-3.5 h-3.5" />
                    Click to View Full Certificate
                  </span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-medium text-slate-300">{cert.issuer}</span>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cert.issueDate}</span>
                  </div>

                  <h3
                    onClick={() => setPreviewCert(cert)}
                    className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {cert.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills / Topics */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-800/80 text-purple-200 border border-slate-700/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <div className="mt-4 text-[11px] font-mono text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/60 flex items-center justify-between">
                      <span>ID:</span>
                      <span className="text-slate-300 font-semibold select-all">{cert.credentialId}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {cert.isCustom && (
                      <button
                        onClick={() => setDeleteConfirmId(cert.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete custom uploaded certificate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="mt-16 text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-slate-800/60">
            <Award className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No certificates found</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">
              No credentials match your active filter or search query. Try clearing filters or upload a new certificate.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Upload Certificate Modal */}
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

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Upload Original Certificate</h3>
                  <p className="text-xs text-slate-400">
                    Upload your Image (JPG, PNG) or PDF certificate to add it to your portfolio.
                  </p>
                </div>
              </div>

              {uploadError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                  {uploadError}
                </div>
              )}

              {uploadSuccess ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Certificate Added Successfully!</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Your certificate is now stored and visible in your portfolio.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddCertificate} className="space-y-4">
                  {/* File Upload Zone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Certificate File (Image or PDF)
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-700 hover:border-purple-500/60 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-950/40"
                    >
                      {formImagePreview ? (
                        <div className="relative group max-h-48 overflow-hidden rounded-xl">
                          {formFileType === 'pdf' ? (
                            <div className="py-8 flex flex-col items-center justify-center">
                              <FileText className="w-12 h-12 text-purple-400 mb-2" />
                              <span className="text-sm font-semibold text-white">{formFileName || 'PDF Document Selected'}</span>
                              <span className="text-xs text-purple-300 mt-1">Click to change file</span>
                            </div>
                          ) : (
                            <>
                              <img
                                src={formImagePreview}
                                alt="Uploaded preview"
                                className="w-full h-44 object-contain mx-auto"
                              />
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs text-white font-medium">Click to change image</span>
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="w-8 h-8 text-purple-400 mb-2" />
                          <p className="text-sm font-medium text-white">
                            Click to select certificate image or PDF
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            JPG, PNG, WEBP, or PDF up to 25MB
                          </p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Or Image URL */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Or Online Image / Document URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formImageUrl}
                      onChange={(e) => {
                        setFormImageUrl(e.target.value);
                        if (!formImagePreview) setFormImagePreview(e.target.value);
                      }}
                      placeholder="https://... direct link to certificate image or PDF"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Title & Issuer Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Certificate Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. All India Hackathon 2026"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Issuing Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formIssuer}
                        onChange={(e) => setFormIssuer(e.target.value)}
                        placeholder="e.g. Axcentra / Google / College"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Category & Date Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Category
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="Hackathons & Competitions">Hackathons & Competitions</option>
                        <option value="Government & Honors">Government & Honors</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                        <option value="Databases">Databases</option>
                        <option value="Programming">Programming</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Issue Year / Date
                      </label>
                      <input
                        type="text"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        placeholder="e.g. 2026 or Sept 2026"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Skills / Technologies (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={formSkills}
                      onChange={(e) => setFormSkills(e.target.value)}
                      placeholder="e.g. Problem Solving, Algorithms, React, Node.js"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Credential ID & URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Credential ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={formCredentialId}
                        onChange={(e) => setFormCredentialId(e.target.value)}
                        placeholder="e.g. AIH-2026-12345"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Verification URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formCredentialUrl}
                        onChange={(e) => setFormCredentialUrl(e.target.value)}
                        placeholder="https://verification-link.com/..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Description / Learning Highlights
                    </label>
                    <textarea
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Brief overview of achievements, challenges solved, or skills validated..."
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>

                  {/* Modal Actions */}
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsUploadModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all"
                    >
                      Save & Display Certificate
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Certificate Image / PDF Viewer Modal */}
      <AnimatePresence>
        {previewCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
                  <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                      {previewCert.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Issued by {previewCert.issuer} • {previewCert.issueDate}
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
                    title="Open / Download"
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
                      Credential ID: <span className="font-mono text-purple-300 font-semibold">{previewCert.credentialId}</span>
                    </div>
                  )}
                  <p className="mt-1 text-slate-300">{previewCert.description}</p>
                </div>

                {previewCert.credentialUrl && (
                  <a
                    href={previewCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-md transition-colors inline-flex items-center gap-1.5 self-end sm:self-auto shrink-0"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full z-10 shadow-2xl"
            >
              <h4 className="text-base font-bold text-white">Delete Certificate?</h4>
              <p className="text-xs text-slate-400 mt-2">
                Are you sure you want to remove this uploaded certificate from your portfolio? This action cannot be undone.
              </p>
              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteCustomCert(deleteConfirmId)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/30"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
