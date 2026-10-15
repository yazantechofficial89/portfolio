import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalData, projectsData, skillsData } from '../data/portfolioData';

const AVAILABLE_COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'sudo hire', 'clear'];

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `Welcome to ${personalData.name}'s interactive shell v2.4.0! Type 'help' or click quick command pills below to get started.`,
    },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    const cmd = raw.toLowerCase();

    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let response = '';

    if (cmd === 'help') {
      response = `Available commands:
  • about     - Learn about ${personalData.name}'s background
  • skills    - View core technologies & proficiencies
  • projects  - List key full-stack software built
  • contact   - Get email, location, and social links
  • sudo hire - Launch immediate hiring pipeline 🚀
  • clear     - Clear terminal buffer`;
    } else if (cmd === 'about') {
      response = `${personalData.name} - ${personalData.title}
Status: ${personalData.status}
Bio: ${personalData.bio}`;
    } else if (cmd === 'skills') {
      response = `[Frontend]: ${skillsData.frontend.map((s) => s.name).join(', ')}
[Backend]:  ${skillsData.backend.map((s) => s.name).join(', ')}
[Database]: ${skillsData.database.map((s) => s.name).join(', ')}
[DevOps]:   ${skillsData.tools.map((s) => s.name).join(', ')}`;
    } else if (cmd === 'projects') {
      response = projectsData
        .map((p, i) => `${i + 1}. ${p.title} (${p.category}) - [${p.tags.slice(0, 3).join(', ')}]`)
        .join('\n');
    } else if (cmd === 'contact') {
      response = `Email:    ${personalData.email}
Phone:    ${personalData.phone}
Location: ${personalData.location}
GitHub:   ${personalData.socials.github}
LinkedIn: ${personalData.socials.linkedin}`;
    } else if (cmd === 'sudo hire' || cmd === 'hire') {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
      });
      response = `PERMISSION GRANTED: ✨ Thank you for your interest! Let's build something phenomenal together. Contact me directly at ${personalData.email}.`;
    } else {
      response = `zsh: command not found: "${raw}". Type 'help' to see valid commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: raw },
      { type: 'output', text: response },
    ]);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <section id="terminal" className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
            Interactive Playground
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Terminal <span className="text-gradient">Console</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            For developers and recruiters who prefer the command-line interface.
          </p>
        </div>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="text-xs text-slate-400 font-mono mr-1">Quick run:</span>
          {AVAILABLE_COMMANDS.map((c) => (
            <button
              key={c}
              onClick={() => executeCommand(c)}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-purple-300 hover:border-purple-500/40 transition-colors"
            >
              ${c}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 text-xs text-slate-400 font-mono">
                guest@{personalData.name.toLowerCase()}-dev:~
              </span>
            </div>
            <button
              onClick={() => setHistory([])}
              className="text-slate-400 hover:text-slate-200 p-1"
              title="Clear terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Terminal Output Area */}
          <div className="p-5 min-h-[260px] max-h-[380px] overflow-y-auto space-y-3.5 select-text">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'system' && (
                  <p className="text-purple-400/90 italic">{item.text}</p>
                )}
                {item.type === 'input' && (
                  <p className="text-slate-200 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">❯</span>
                    <span>{item.text}</span>
                  </p>
                )}
                {item.type === 'output' && (
                  <pre className="text-slate-300 whitespace-pre-wrap font-mono pl-4 border-l-2 border-slate-800 mt-1">
                    {item.text}
                  </pre>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 bg-slate-900/50 border-t border-slate-800"
          >
            <span className="text-emerald-400 font-bold">❯</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a command (e.g. 'help', 'skills', 'sudo hire')..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-400 text-xs sm:text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition-colors"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
