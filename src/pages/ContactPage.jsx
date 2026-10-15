import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { personalData, faqsData } from '../data/portfolioData';
import { Github, Linkedin, Twitter } from '../components/Icons';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let success = false;
      try {
        const apiRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            subject: formData.subject,
            message: formData.message,
          }),
        });

        const apiData = await apiRes.json();
        if (apiRes.ok && apiData.success) {
          success = true;
        }
      } catch (backendErr) {
        console.warn('Serverless endpoint fallback:', backendErr);
      }

      if (!success) {
        const fallbackRes = await fetch(`https://formsubmit.co/ajax/${personalData.email}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone || 'Not provided',
            Subject: formData.subject,
            Message: formData.message,
            _subject: `New Portfolio Enquiry: ${formData.subject}`,
            _captcha: 'false',
          }),
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok || fallbackData.success === 'true') {
          success = true;
        }
      }

      if (success) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to record inquiry.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage(
        'Server dispatch took too long. You can also send directly via your email client using the button below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h1>
          <p className="mt-4 text-base text-slate-400">
            Have a project in mind, want to discuss software engineering roles, or want to collaborate? Fill out the form below—it reaches my inbox directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white mb-2">Direct Contact Channels</h2>
              <p className="text-sm text-slate-400 mb-6">
                Reach out via email, phone call, or on professional social networks.
              </p>

              <div className="space-y-4">
                {/* Email card */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/60 text-purple-400 flex items-center justify-center border border-purple-500/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Email Address</div>
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
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-400 hover:text-white transition-colors"
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
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Phone Number</div>
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
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-white transition-colors"
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
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/60 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Location</div>
                    <div className="text-sm font-semibold text-white">
                      {personalData.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Find me online
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={personalData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalData.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalData.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-sky-400" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Email Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Send a Direct Enquiry</h2>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct to Inbox
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Submissions automatically arrive at <strong className="text-slate-300 font-mono">{personalData.email}</strong>.
              </p>

              {submitted ? (
                <div className="p-8 text-center rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white">Enquiry Sent to Inbox!</h3>
                  <p className="text-sm text-emerald-300/80 mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you! Your message has been sent directly to <strong className="text-white font-mono">{personalData.email}</strong>. I will reply to you as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-white text-xs font-semibold border border-emerald-500/40 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                      <a
                        href={`mailto:${personalData.email}?subject=${encodeURIComponent(
                          formData.subject || 'Portfolio Inquiry'
                        )}&body=${encodeURIComponent(
                          `Name: ${formData.name}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
                        )}`}
                        className="px-3 py-1.5 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-500 transition-colors whitespace-nowrap text-xs"
                      >
                        Send via Email App
                      </a>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Phone Number (optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Job Offer / Project Proposal"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, timeline, scope, or job opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Delivering to Inbox...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Email</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
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
                    className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-purple-300 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-purple-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
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
