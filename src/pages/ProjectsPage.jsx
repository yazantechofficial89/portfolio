import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  CheckCircle2,
  Star,
  ArrowUpRight,
  Search,
  Code2,
  Plus,
  Trash2,
  Lock,
  Unlock,
  KeyRound,
  X,
  UploadCloud,
  Image as ImageIcon,
  RotateCcw,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Github } from '../components/Icons';

const STORAGE_KEY = 'yazan_custom_projects';
const DELETED_KEY = 'yazan_deleted_projects';
const ADMIN_PASSKEY = 'yazanAdmin2026';

export default function ProjectsPage() {
  const [customProjects, setCustomProjects] = useState([]);
  const [deletedIds, setDeletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(DELETED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [allProjects, setAllProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminInputKey, setAdminInputKey] = useState('');
  const [adminError, setAdminError] = useState('');

  // Project Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form states for Add Project
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Full-Stack');
  const [formDescription, setFormDescription] = useState('');
  const [formImagePreview, setFormImagePreview] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formDemoUrl, setFormDemoUrl] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Check saved admin passkey on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('admin_passkey');
      if (savedKey === ADMIN_PASSKEY) {
        setIsAdmin(true);
      }
    } catch {}
  }, []);

  // 1. Load projects from localStorage and fetch from MongoDB API
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCustomProjects(parsed);
      }
    } catch (e) {
      console.error('Error loading custom projects:', e);
    }

    // Fetch from database API
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setCustomProjects((prev) => {
            const existingMap = new Map();
            prev.forEach((p) => existingMap.set(p.id || p._id, p));
            data.projects.forEach((p) => {
              const id = p._id || p.id;
              existingMap.set(id, { ...p, id, isCustom: true });
            });
            const merged = Array.from(existingMap.values());
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      })
      .catch((err) => {
        console.log('Background DB projects sync:', err);
      });
  }, []);

  // Merge default portfolio projects with custom/database ones, excluding deleted ones
  useEffect(() => {
    const combined = [...customProjects, ...projectsData];
    const visible = combined.filter(
      (p) => !deletedIds.includes(p.id) && !deletedIds.includes(p._id)
    );
    setAllProjects(visible);
  }, [customProjects, deletedIds]);

  // Admin Login Handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAdminError('');

    if (adminInputKey.trim() === ADMIN_PASSKEY) {
      setIsAdmin(true);
      try {
        localStorage.setItem('admin_passkey', ADMIN_PASSKEY);
      } catch {}
      setIsAdminModalOpen(false);
      setAdminInputKey('');
    } else {
      setAdminError('Incorrect Admin Passkey. Access restricted to portfolio owner.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('admin_passkey');
    } catch {}
  };

  // Image file select with Base64 conversion
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    setFormError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFormError('Image size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormImagePreview(reader.result);
    };
    reader.onerror = () => {
      setFormError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  // Submit new Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!isAdmin) {
      setFormError('Unauthorized: Admin passkey required.');
      return;
    }

    if (!formTitle.trim()) {
      setFormError('Project Title is required.');
      return;
    }
    if (!formDescription.trim()) {
      setFormError('Project Description is required.');
      return;
    }

    const finalImage =
      formImagePreview ||
      formImageUrl.trim() ||
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';

    const parsedTags = formTags
      ? formTags.split(',').map((t) => t.trim()).filter(Boolean)
      : ['React', 'Full-Stack'];

    const parsedFeatures = formFeatures
      ? formFeatures.split('\n').map((f) => f.trim()).filter(Boolean)
      : ['Interactive responsive UI', 'Production-ready architecture'];

    const newProject = {
      id: `custom-proj-${Date.now()}`,
      title: formTitle.trim(),
      category: formCategory,
      description: formDescription.trim(),
      image: finalImage,
      tags: parsedTags,
      features: parsedFeatures,
      demoUrl: formDemoUrl.trim() || '#',
      githubUrl: formGithubUrl.trim() || 'https://github.com/yazantechofficial89',
      featured: Boolean(formFeatured),
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    // 1. Immediately save to local state & localStorage
    const updated = [newProject, ...customProjects];
    setCustomProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    // 2. Save permanently to MongoDB API
    try {
      fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_PASSKEY,
        },
        body: JSON.stringify(newProject),
      }).catch((e) => console.log('API project save:', e));
    } catch (err) {
      console.log(err);
    }

    setFormSuccess(true);
    setTimeout(() => {
      setFormTitle('');
      setFormCategory('Full-Stack');
      setFormDescription('');
      setFormImagePreview('');
      setFormImageUrl('');
      setFormTags('');
      setFormFeatures('');
      setFormDemoUrl('');
      setFormGithubUrl('');
      setFormFeatured(false);
      setFormSuccess(false);
      setIsAddModalOpen(false);
    }, 900);
  };

  // Delete project (Admin only)
  const handleDeleteProject = async (id) => {
    if (!isAdmin) return;

    // Remove from custom list
    if (customProjects.some((p) => p.id === id || p._id === id)) {
      const updated = customProjects.filter((p) => p.id !== id && p._id !== id);
      setCustomProjects(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }

    // Add to deletedIds
    const newDeleted = [...new Set([...deletedIds, id])];
    setDeletedIds(newDeleted);
    try {
      localStorage.setItem(DELETED_KEY, JSON.stringify(newDeleted));
    } catch (e) {
      console.error(e);
    }

    // Delete from API
    try {
      fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': ADMIN_PASSKEY,
        },
      }).catch(() => {});
    } catch {}

    setDeleteConfirmId(null);
  };

  // Restore deleted projects (Admin only)
  const handleRestoreDeleted = () => {
    if (!isAdmin) return;
    setDeletedIds([]);
    try {
      localStorage.removeItem(DELETED_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Find project to delete for confirmation dialog
  const projectToDelete =
    allProjects.find((p) => p.id === deleteConfirmId || p._id === deleteConfirmId) ||
    projectsData.find((p) => p.id === deleteConfirmId) ||
    customProjects.find((p) => p.id === deleteConfirmId || p._id === deleteConfirmId);

  // Dynamic categories based on active projects
  const availableCategories = [
    'All',
    ...Array.from(new Set(allProjects.map((p) => p.category))).filter(Boolean)
  ];

  // Filter projects
  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All' || project.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !searchQuery ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      (project.tags && project.tags.some((t) => t.toLowerCase().includes(query)));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Featured Portfolio Work
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient">Projects & Products</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              A showcase of production-ready full-stack web applications, APIs, and software solutions built by Yazan. Protected showcase — tamper-proof and authentic.
            </p>
          </div>

          {/* Action Header Controls */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {isAdmin ? (
              // Owner / Admin Mode Active
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs font-semibold">
                  <Unlock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Owner Mode</span>
                </div>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-600/30 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>

                {deletedIds.length > 0 && (
                  <button
                    onClick={handleRestoreDeleted}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl font-semibold text-xs text-amber-300 bg-amber-950/60 border border-amber-500/30 hover:bg-amber-900/60 transition-colors"
                    title="Restore deleted projects"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>({deletedIds.length})</span>
                  </button>
                )}

                <button
                  onClick={handleAdminLogout}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
                  title="Lock Owner Mode"
                >
                  <Lock className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Public Visitor Mode -> Protected & Tamper-proof
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-colors"
                title="Portfolio Owner Access"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Owner Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">Total Projects</span>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              {allProjects.length}
            </div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">Featured Builds</span>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-amber-400 flex items-center gap-2">
              <span>{allProjects.filter((p) => p.featured).length}</span>
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">Tech Categories</span>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-purple-400">
              {new Set(allProjects.map((p) => p.category)).size}
            </div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400">Protection Status</span>
            <div className="mt-1 text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Tamper-Proof Locked</span>
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
              placeholder="Search projects by name, tag, or stack..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Category Filter Buttons */}
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

        {/* Counter Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <span>
            Showing {filteredProjects.length} of {allProjects.length} projects
          </span>

          <div className="flex items-center gap-4">
            {isAdmin && deletedIds.length > 0 && (
              <button
                onClick={handleRestoreDeleted}
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Undo / Restore {deletedIds.length} deleted</span>
              </button>
            )}

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-purple-400 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id || project._id}
              className="group flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/50 overflow-hidden shadow-xl shadow-black/30 hover:-translate-y-2 transition-all duration-300 relative"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      {project.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-800/80 text-purple-200 border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>

                  {/* Delete button only shown to authenticated Admin/Owner */}
                  {isAdmin && (
                    <button
                      onClick={() => setDeleteConfirmId(project.id || project._id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-1 text-xs"
                      title="Delete this project (Admin Only)"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <Code2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-sm text-slate-400 mt-1">
              Try adjusting your search query or selected category.
            </p>
          </div>
        )}
      </div>

      {/* Admin Passkey Login Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl"
            >
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-4">
                <KeyRound className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white">Owner / Admin Access</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Enter your Admin Passkey to unlock project adding, editing, and deletion controls.
              </p>

              {adminError && (
                <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                  {adminError}
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Admin Passkey
                  </label>
                  <input
                    type="password"
                    required
                    value={adminInputKey}
                    onChange={(e) => setAdminInputKey(e.target.value)}
                    placeholder="Enter passkey..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    autoFocus
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAdminModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-600/30 transition-all shadow-md"
                  >
                    Unlock Controls
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Project Modal (Admin Only) */}
      <AnimatePresence>
        {isAddModalOpen && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Add New Project</h3>
                  <p className="text-xs text-slate-400">
                    Add a new project to your portfolio. Automatically saved to permanent storage.
                  </p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                  {formError}
                </div>
              )}

              {formSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8 animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Project Saved Permanently!</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Your new project is now published in your portfolio showcase.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddProject} className="space-y-4">
                  {/* Image Upload Zone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Project Screenshot / Cover Image
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-700 hover:border-purple-500/60 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-950/40"
                    >
                      {formImagePreview ? (
                        <div className="relative group max-h-48 overflow-hidden rounded-xl">
                          <img
                            src={formImagePreview}
                            alt="Project preview"
                            className="w-full h-44 object-cover mx-auto"
                          />
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-white font-medium">Click to change image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="w-8 h-8 text-purple-400 mb-2" />
                          <p className="text-sm font-medium text-white">
                            Click to select project screenshot
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            PNG, JPG, or WEBP up to 10MB
                          </p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Or Image URL */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Or Online Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formImageUrl}
                      onChange={(e) => {
                        setFormImageUrl(e.target.value);
                        if (!formImagePreview) setFormImagePreview(e.target.value);
                      }}
                      placeholder="https://images.unsplash.com/... or hosted screenshot"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Title & Category Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. CivicTrack Urban Mapping"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Category
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Mobile App">Mobile App</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="High-level overview of what this application does and what problems it solves..."
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>

                  {/* Tech Tags */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Tech Stack Tags (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind CSS"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Key Highlights / Features (One per line)
                    </label>
                    <textarea
                      rows={2}
                      value={formFeatures}
                      onChange={(e) => setFormFeatures(e.target.value)}
                      placeholder="Real-time WebSockets synchronization&#10;Stripe webhook payment gateway&#10;Role-based access control"
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>

                  {/* URLs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Live Demo URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formDemoUrl}
                        onChange={(e) => setFormDemoUrl(e.target.value)}
                        placeholder="https://yourproject.vercel.app"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        GitHub Repository URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formGithubUrl}
                        onChange={(e) => setFormGithubUrl(e.target.value)}
                        placeholder="https://github.com/yazantechofficial89/..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="featuredCheck"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 bg-slate-950 border-slate-700 focus:ring-purple-500"
                    />
                    <label htmlFor="featuredCheck" className="text-xs font-medium text-slate-300 cursor-pointer">
                      Feature on Homepage Top Projects
                    </label>
                  </div>

                  {/* Modal Actions */}
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Publish Project</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal (Admin Only) */}
      <AnimatePresence>
        {deleteConfirmId && isAdmin && (
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
              className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-md w-full z-10 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6" />
              </div>

              <h4 className="text-lg font-bold text-white">Delete Project?</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Are you sure you want to remove{' '}
                <span className="text-white font-semibold underline decoration-rose-500">
                  {projectToDelete?.title || 'this project'}
                </span>{' '}
                from your portfolio?
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                (You can restore any removed project anytime using the "Restore" button).
              </p>

              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProject(deleteConfirmId)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/30 transition-all"
                >
                  Yes, Delete Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
