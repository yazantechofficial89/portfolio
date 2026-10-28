import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Copy,
  Sparkles
} from 'lucide-react';
import { Github, Linkedin, Twitter, WhatsApp } from './Icons';
import { personalData } from '../data/portfolioData';

export default function Contact() {
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
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill text-purple-200 text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="mt-4 text-base text-zinc-400 font-normal">
            Have an exciting project in mind, a freelance opportunity, or want to discuss full-time engineering roles? Drop a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info Cards - Dark Purple Glass */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl liquid-glass">
              <h3 className="text-xl font-bold text-white mb-2">Direct Contact</h3>
              <p className="text-sm text-zinc-400 mb-6 font-normal">
                Feel free to email me directly, call, or connect via professional networks.
              </p>

              <div className="space-y-4">
                {/* Email card */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0c0915] border border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/60 text-purple-400 flex items-center justify-center border border-purple-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <Mail className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-300/80 font-medium font-mono">Email</div>
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
                    className="p-2 rounded-xl liquid-pill text-zinc-400 hover:text-white transition-colors"
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
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0c0915] border border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-300/80 font-medium font-mono">Phone</div>
                      <a
                        href={`tel:${personalData.phone}`}
                        className="text-sm font-semibold text-white hover:text-emerald-300 transition-colors"
                      >
                        {personalData.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-xl liquid-pill text-zinc-400 hover:text-white transition-colors"
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
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0c0915] border border-purple-500/20">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/60 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <MapPin className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <div className="text-xs text-indigo-300/80 font-medium font-mono">Location</div>
                    <div className="text-sm font-semibold text-white">
                      {personalData.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-purple-500/20">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300/70 block mb-3">
                  Find me online
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={personalData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl liquid-pill text-xs font-mono text-purple-200 hover:text-white hover:border-purple-400/50 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalData.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl liquid-pill text-xs font-mono text-purple-200 hover:text-white hover:border-purple-400/50 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-purple-300" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalData.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl liquid-pill text-xs font-mono text-purple-200 hover:text-white hover:border-purple-400/50 transition-all"
                  >
                    <Twitter className="w-4 h-4 text-purple-300" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form - Dark Purple Glass */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl liquid-glass">
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-sm text-zinc-400 mb-6 font-normal">
                Fill in the details below and it will be delivered directly to my email.
              </p>

              {submitted ? (
                <div className="p-8 text-center rounded-2xl bg-purple-950/30 border border-purple-500/30 text-purple-200">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Your Enquiry is Ready!</h4>
                  <p className="text-sm text-zinc-300 mt-2 max-w-lg mx-auto leading-relaxed">
                    We have pre-filled your message for <strong className="text-purple-300 font-mono">{personalData.email}</strong>. If Gmail didn't open automatically, use the buttons below to deliver instantly:
                  </p>

                  {/* Dual Action Hub */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleWhatsAppClick}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <WhatsApp className="w-4 h-4 fill-current" />
                      <span>Send on WhatsApp</span>
                    </a>
                    <a
                      href={generateGmailLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Gmail App</span>
                    </a>
                  </div>

                  {/* Message Preview & One-click Copy */}
                  <div className="mt-5 p-3 rounded-xl bg-[#080510] border border-purple-500/20 text-left">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono uppercase text-purple-300/70 tracking-wider">Message Content</span>
                      <button
                        onClick={handleCopyFullMessage}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg liquid-pill text-[11px] text-purple-200 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedMessage ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedMessage ? 'Copied!' : 'Copy Text'}</span>
                      </button>
                    </div>
                    <div className="text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto bg-black/40 p-2.5 rounded-lg border border-purple-500/10">
                      {lastSubmittedText}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="mt-5 text-xs text-purple-300/80 hover:text-white underline cursor-pointer"
                  >
                    Write another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-purple-200/90 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0c0915] border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-purple-200/90 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0c0915] border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-purple-200/90 mb-1.5">
                        Your Phone (optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0c0915] border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-purple-200/90 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0c0915] border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-purple-200/90 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0915] border border-purple-500/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.35)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer"
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
                      className="py-3.5 px-6 rounded-xl font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(52,211,153,0.2)]"
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
      </div>
    </section>
  );
}
