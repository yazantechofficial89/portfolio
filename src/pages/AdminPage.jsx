import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  Phone,
  Calendar,
  Trash2,
  CheckCircle,
  Clock,
  RefreshCw,
  Database,
  Shield,
  AlertCircle
} from 'lucide-react';

export default function AdminPage() {
  const [passkey, setPasskey] = useState(localStorage.getItem('admin_passkey') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const fetchMessages = async (key) => {
    setLoading(true);
    setError('');
    setWarning('');
    try {
      const res = await fetch(`/api/messages`, {
        headers: {
          'x-admin-key': key,
        },
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setMessages(data.messages || []);
        if (data.warning) setWarning(data.warning);
        localStorage.setItem('admin_passkey', key);
      } else {
        setIsAuthenticated(false);
        setError(data.error || 'Invalid Admin Passkey. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to /api/messages. Make sure the API is deployed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (passkey) {
      fetchMessages(passkey);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setPasskey(inputKey);
    fetchMessages(inputKey);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_passkey');
    setPasskey('');
    setIsAuthenticated(false);
    setMessages([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': passkey },
      });
      if (res.ok) {
        setMessages(messages.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleRead = async (id, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read';
    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passkey,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMessages(
          messages.map((m) => (m._id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/80 text-purple-400 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center">Admin Portal</h1>
          <p className="text-xs text-slate-400 text-center mt-1 mb-6">
            Enter your admin secret passkey to access MongoDB contact enquiries.
          </p>

          {error && (
            <div className="p-3 mb-4 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Passkey
              </label>
              <input
                type="password"
                required
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Default: yazanAdmin2026"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all text-sm disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Unlock Admin Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold uppercase mb-2">
              <Database className="w-3.5 h-3.5" />
              MongoDB Connected
            </div>
            <h1 className="text-3xl font-bold text-white">Client Enquiries Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Real-time messages submitted through your portfolio contact form.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchMessages(passkey)}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all text-xs font-medium flex items-center gap-2"
              title="Refresh messages"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-rose-950/40 hover:border-rose-500/40 hover:text-rose-300 text-slate-400 text-xs font-medium transition-colors"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Warning if MONGODB_URI missing */}
        {warning && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs sm:text-sm leading-relaxed">
            <strong>Database Notice:</strong> {warning}
            <div className="mt-2 text-xs text-amber-300/80">
              To persist messages into MongoDB Atlas, add <code className="bg-amber-950 px-1 py-0.5 rounded">MONGODB_URI</code> in Vercel Project Settings &gt; Environment Variables.
            </div>
          </div>
        )}

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400">Total Inquiries</span>
            <div className="text-2xl font-bold text-white mt-1">{messages.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400">Unread</span>
            <div className="text-2xl font-bold text-purple-400 mt-1">
              {messages.filter((m) => m.status !== 'read').length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-xs text-slate-400">Database Engine</span>
            <div className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              MongoDB Atlas M0
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="mt-8 space-y-4">
          {messages.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-slate-900/30 border border-slate-800/80">
              <Mail className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No messages recorded yet</h3>
              <p className="text-xs text-slate-400 mt-1">
                Any submissions on the contact form will be displayed here in real time.
              </p>
            </div>
          ) : (
            messages.map((item) => (
              <div
                key={item._id}
                className={`p-6 rounded-3xl border transition-all ${
                  item.status === 'read'
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
                    : 'bg-slate-900/80 border-purple-500/30 shadow-lg shadow-purple-950/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-950 border border-purple-500/30 flex items-center justify-center font-bold text-purple-300">
                      {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{item.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <a
                          href={`mailto:${item.email}`}
                          className="text-purple-400 hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>{item.email}</span>
                        </a>
                        {item.phone && item.phone !== 'Not provided' && (
                          <a
                            href={`tel:${item.phone}`}
                            className="text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{item.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString()} at{' '}
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    <button
                      onClick={() => handleToggleRead(item._id, item.status)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        item.status === 'read'
                          ? 'bg-slate-800 text-slate-400 border-slate-700'
                          : 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                      }`}
                    >
                      {item.status === 'read' ? 'Mark Unread' : 'Mark Read'}
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Subject: <span className="text-purple-300">{item.subject}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                    {item.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
