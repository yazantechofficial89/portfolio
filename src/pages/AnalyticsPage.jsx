import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Eye,
  Globe,
  Smartphone,
  Laptop,
  Compass,
  ExternalLink,
  RefreshCw,
  TrendingUp,
  MapPin,
  Clock,
  ArrowUpRight,
  Shield,
  Activity
} from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/visitor-stats');
      const json = await res.json();
      if (json.success && json.stats) {
        setData(json.stats);
      } else {
        setError(json.warning || json.error || 'Failed to fetch analytics data');
      }
    } catch (err) {
      setError(err.message || 'Network error fetching analytics');
    } finally {
      setIsLoading(false);
      setLastRefreshed(new Date());
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = data || {
    totalVisits: 0,
    uniqueVisitors: 0,
    todayVisits: 0,
    topSources: [],
    topPages: [],
    topCities: [],
    deviceBreakdown: [],
    recentVisitors: [],
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-zinc-100">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 mb-3">
            <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Real-Time Visitor Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Traffic & Link Analytics
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Live database record of visitors entering through your links & search engines.
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs font-mono text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-purple-400' : ''}`} />
          <span>Refresh</span>
          <span className="text-zinc-500 text-[11px] ml-1">
            ({lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })})
          </span>
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative p-6 rounded-2xl bg-gradient-to-b from-purple-900/20 to-black/40 border border-purple-500/20 shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between text-purple-300 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Total Page Views</span>
            <Eye className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-4xl font-black text-white tracking-tight">
            {isLoading && !data ? '...' : stats.totalVisits.toLocaleString()}
          </div>
          <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>All lifetime recorded visits</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative p-6 rounded-2xl bg-gradient-to-b from-indigo-900/20 to-black/40 border border-indigo-500/20 shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between text-indigo-300 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Unique Visitors</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-4xl font-black text-white tracking-tight">
            {isLoading && !data ? '...' : stats.uniqueVisitors.toLocaleString()}
          </div>
          <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Distinct devices & users</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative p-6 rounded-2xl bg-gradient-to-b from-emerald-900/20 to-black/40 border border-emerald-500/20 shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between text-emerald-300 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Today's Visits</span>
            <Clock className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-4xl font-black text-white tracking-tight">
            {isLoading && !data ? '...' : stats.todayVisits.toLocaleString()}
          </div>
          <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Activity since 00:00 UTC</span>
          </p>
        </motion.div>
      </div>

      {/* Middle Grid: Traffic Sources & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Traffic Sources */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              <h2 className="text-base font-bold text-white">Top Referral Links & Sources</h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">Where visitors come from</span>
          </div>

          {stats.topSources.length === 0 ? (
            <p className="text-xs text-zinc-500 py-6 text-center font-mono">No referral data logged yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.topSources.map((item, idx) => {
                const total = stats.totalVisits || 1;
                const percentage = Math.round((item.count / total) * 100);
                return (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-zinc-200 group-hover:text-purple-300 transition-colors">
                        {item.source}
                      </span>
                      <span className="font-mono text-zinc-400">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Visited Pages & Cities */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Top Pages & Visitor Geolocation</h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">Routes & Cities</span>
          </div>

          <div className="space-y-5">
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Most Visited Pages:
              </span>
              <div className="flex flex-wrap gap-2">
                {stats.topPages.length === 0 ? (
                  <span className="text-xs text-zinc-500 font-mono">No page data yet</span>
                ) : (
                  stats.topPages.map((p, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-200"
                    >
                      <span className="text-purple-400 font-semibold">{p.path}</span>
                      <span className="text-zinc-500">({p.count})</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Top Cities & Regions:
              </span>
              <div className="flex flex-wrap gap-2">
                {stats.topCities.length === 0 ? (
                  <span className="text-xs text-zinc-500 font-mono">Geographic data recorded on next external visit</span>
                ) : (
                  stats.topCities.map((c, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                    >
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{c.city}, {c.country}</span>
                      <span className="text-zinc-500">({c.count})</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table: Recent Visitor Log */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Recent Visitors (Live Log)</h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">Last 50 entries</span>
        </div>

        {stats.recentVisitors.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 font-mono text-xs">
            No visitor entries logged yet. Visit your website through any link to see it appear here!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Time</th>
                  <th className="py-3 px-3">Source / Link</th>
                  <th className="py-3 px-3">Landing Page</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Device / Browser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {stats.recentVisitors.map((v, idx) => {
                  const date = new Date(v.createdAt);
                  const timeFormatted = date.toLocaleString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  });

                  return (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3 text-zinc-400 whitespace-nowrap">
                        {timeFormatted}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-medium text-purple-300">
                        {v.source}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-semibold text-white">
                        {v.path}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-zinc-400">
                        {v.city ? `${v.city}, ${v.country}` : v.country || 'Global'}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-zinc-400">
                        {v.deviceType} &bull; {v.browser}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
