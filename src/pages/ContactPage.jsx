import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Copy,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { personalData, faqsData } from '../data/portfolioData';
import { Github, Linkedin, WhatsApp, Instagram } from '../components/Icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [lastSubmittedText, setLastSubmittedText] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const cleanPhone = personalData.phone.replace(/[^0-9]/g, '');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWhatsAppLink = () => {
    const text = `Hi Yazan, I am contacting you from your portfolio.\n\n*Name:* ${formData.name || 'Visitor'}\n*Email:* ${formData.email || 'N/A'}\n*Phone:* ${formData.phone || 'N/A'}\n*Subject:* ${formData.subject || 'Project Inquiry'}\n*Message:*\n${formData.message || 'I would like to discuss a project or opportunity.'}`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const generateGmailLink = () => {
    const su = encodeURIComponent(`Portfolio Inquiry: ${formData.subject || 'Project Inquiry'} - from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Yazan,\n\nName: ${formData.name || 'N/A'}\nEmail: ${formData.email || 'N/A'}\nPhone: ${formData.phone || 'N/A'}\nSubject: ${formData.subject || 'N/A'}\n\nMessage:\n${formData.message || ''}\n\n---\nSent from Portfolio: https://yazangupta.online/`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${personalData.email}&su=${su}&body=${body}`;
  };

  const handleCopyFullMessage = () => {
    navigator.clipboard.writeText(lastSubmittedText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleWhatsAppClick = () => {
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name || 'WhatsApp Visitor',
          email: formData.email || 'whatsapp-lead@yazangupta.online',
          phone: formData.phone || '',
          subject: formData.subject ? `[WhatsApp] ${formData.subject}` : 'WhatsApp Lead / Inquiry',
          message: formData.message || 'Visitor clicked Send via WhatsApp.',
        }),
      }).catch(() => {});
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const summary = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    setLastSubmittedText(summary);

    try {
      // Save directly to MongoDB Atlas via backend API
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          subject: formData.subject,
          message: formData.message,
        }),
      });
    } catch (err) {
      console.warn('API error:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    window.open(generateGmailLink(), '_blank');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#c084fc', '#a855f7', '#818cf8', '#ffffff'],
    });
  };

  return (
    <div className="pt-28 pb-20 bg-[#050308] text-zinc-100 min-h-screen relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-900/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-950/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-purple-300 border-purple-500/20 bg-purple-950/40 text-xs font-mono tracking-wider uppercase mb-3">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h1>
          <p className="mt-4 text-base text-zinc-400 font-normal">
            Have an exciting project in mind, want to discuss software engineering roles, or want to collaborate? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info Cards - Liquid Glass */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl liquid-glass">
              <h2 className="text-xl font-bold text-white mb-2">Direct Contact Channels</h2>
              <p className="text-sm text-zinc-400 mb-6 font-normal">
                Connect directly via WhatsApp, Phone call, Email, or professional networks.
              </p>

              <div className="space-y-4">
                {/* WhatsApp Direct Card */}
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hi%20Yazan,%20I%20am%20reaching%20out%20from%20your%20portfolio.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#090611]/80 border border-emerald-500/30 hover:border-emerald-400 hover:bg-[#090611] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/40 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <WhatsApp className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-400 font-mono font-medium">WhatsApp Direct (Instant)</div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{personalData.phone}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400 inline" />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-400 text-black font-mono">
                    Chat
                  </span>
                </a>

                {/* Email card */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#090611]/80 border border-purple-500/15">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/50 text-purple-300 flex items-center justify-center border border-purple-500/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <Mail className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-300/80 font-medium font-mono">Email Address</div>
                      <a
                        href={`mailto:${personalData.email}`}
                        className="text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                      >
                        {personalData.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl liquid-pill text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone card */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#090611]/80 border border-purple-500/15">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/50 text-purple-300 flex items-center justify-center border border-purple-500/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <Phone className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-300/80 font-medium font-mono">Phone Number</div>
                      <a
                        href={`tel:${personalData.phone}`}
                        className="text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                      >
                        {personalData.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-xl liquid-pill text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location card */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#090611]/80 border border-purple-500/15">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/50 text-purple-300 flex items-center justify-center border border-purple-500/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <MapPin className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-xs text-purple-300/80 font-medium font-mono">Location</div>
                    <div className="text-sm font-semibold text-white">
                      {personalData.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-purple-500/10">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold block mb-3">
                  Find me online
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl liquid-pill text-xs font-mono text-zinc-300 hover:text-white hover:border-purple-500/30 transition-all"
                  >
                    <Github className="w-4 h-4 text-purple-300" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalData.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl liquid-pill text-xs font-mono text-zinc-300 hover:text-white hover:border-purple-500/30 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-indigo-300" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalData.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl liquid-pill text-xs font-mono text-zinc-300 hover:text-white hover:border-purple-500/30 transition-all"
                  >
                    <Instagram className="w-4 h-4 text-fuchsia-300" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={personalData.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl liquid-pill text-xs font-mono text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                  >
                    <WhatsApp className="w-4 h-4 text-emerald-400 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Dispatch Form - Liquid Glass */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl liquid-glass">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Send an Enquiry</h2>
                <span className="text-xs font-mono text-emerald-400 liquid-pill px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct to Inbox
                </span>
              </div>
              <p className="text-sm text-zinc-400 mb-6 font-normal">
                Fill out the form below. Submissions reach <strong className="text-purple-300 font-mono">{personalData.email}</strong>.
              </p>

              {submitted ? (
                <div className="p-8 text-center rounded-2xl bg-purple-950/20 border border-purple-500/20 text-zinc-200">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Your Enquiry is Ready!</h3>
                  <p className="text-sm text-zinc-300 mt-2 max-w-lg mx-auto leading-relaxed font-normal">
                    We have pre-filled your message for <strong className="text-white font-mono">{personalData.email}</strong>. If Gmail didn't open automatically, click below to deliver instantly:
                  </p>

                  {/* Dual Action Hub */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleWhatsAppClick}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <WhatsApp className="w-5 h-5 fill-current" />
                      <span>Send on WhatsApp</span>
                    </a>
                    <a
                      href={generateGmailLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-950/50 transition-all"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Open in Gmail App</span>
                    </a>
                  </div>

                  {/* Message Preview & One-click Copy */}
                  <div className="mt-6 p-4 rounded-2xl bg-[#090611] border border-purple-500/15 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase text-purple-400 tracking-wider">Message Content</span>
                      <button
                        onClick={handleCopyFullMessage}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg liquid-pill text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedMessage ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedMessage ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                      </button>
                    </div>
                    <div className="text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto bg-black/40 p-3 rounded-xl border border-white/[0.05]">
                      {lastSubmittedText}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="mt-6 text-xs text-purple-400 hover:text-purple-300 underline cursor-pointer"
                  >
                    Write another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#090611]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#090611]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                        Your Phone Number (optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#090611]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#090611]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#090611]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Preparing...
                        </span>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>Send via Email / Gmail</span>
                        </>
                      )}
                    </button>

                    <a
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleWhatsAppClick}
                      className="py-3.5 px-6 rounded-xl font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                    >
                      <WhatsApp className="w-4 h-4 fill-current" />
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-zinc-500 pt-1">
                    Direct delivery guaranteed &bull; Delivers straight to <strong className="text-purple-300 font-mono">{personalData.email}</strong> &amp; WhatsApp
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section - Liquid Glass */}
        {faqsData && faqsData.length > 0 && (
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
                Common Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqsData.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl liquid-glass overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-purple-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-purple-500/10 pt-3 font-normal">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
