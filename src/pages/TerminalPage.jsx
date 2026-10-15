import React from 'react';
import InteractiveTerminal from '../components/InteractiveTerminal';
import { Terminal, Sparkles, HelpCircle, Command } from 'lucide-react';

export default function TerminalPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
            CLI Interactive Shell
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Developer <span className="text-gradient">Console</span>
          </h1>
          <p className="mt-4 text-base text-slate-400">
            A real-time command terminal built for technical evaluators. Test commands, inspect stack architecture, or trigger Easter eggs.
          </p>
        </div>

        {/* Terminal Component */}
        <InteractiveTerminal />

        {/* Command Reference Guide */}
        <div className="mt-14 p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold text-base mb-4">
            <Command className="w-5 h-5 text-purple-400" />
            <span>Supported Commands Reference</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">$ help</span>
              <span className="text-slate-400">Lists all available terminal commands.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">$ about</span>
              <span className="text-slate-400">Prints developer summary & current status.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">$ skills</span>
              <span className="text-slate-400">Outputs core technologies by layer.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">$ projects</span>
              <span className="text-slate-400">Lists all production applications.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">$ contact</span>
              <span className="text-slate-400">Shows verified email & contact info.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">$ sudo hire</span>
              <span className="text-slate-400">Triggers festive hiring confirmation! 🎉</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
