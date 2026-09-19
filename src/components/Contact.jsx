import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Check, 
  Copy, 
  FileText, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

export default function Contact({ onOpenCVModal }) {
  const { personal } = portfolioData;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Full Stack Web Development',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebratory pastel confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A5B4FC', '#A7F3D0', '#FDA4AF', '#FDE047', '#C084FC']
    });

    // Also open user's email client with pre-filled details
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formState.service} dari ${formState.name}`);
    const body = encodeURIComponent(
      `Halo Dandy,\n\nNama: ${formState.name}\nEmail: ${formState.email}\nLayanan: ${formState.service}\n\nPesan:\n${formState.message}\n\nTerima kasih.`
    );
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-pastel-radial relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-mint dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare size={14} />
            <span>Mari Berkolaborasi</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Hubungi Saya & Diskusikan Proyek Anda
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Terbuka untuk kesempatan kerja full-time, konsultasi teknis, maupun proyek aplikasi skala menengah & besar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts & CV CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Information Card */}
            <div className="p-8 rounded-4xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-sm">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-6">
                Saluran Komunikasi Langsung
              </h3>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-pastel-lavender dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Email</span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {personal.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-500 hover:text-indigo-600 shadow-sm transition-colors shrink-0 ml-2"
                    title="Salin Email"
                  >
                    {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* WhatsApp Item */}
                <a
                  href={`https://wa.me/${personal.rawPhone}?text=Halo%20Dandy,%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">WhatsApp & Ponsel</span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {personal.phone}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 group-hover:translate-x-1 transition-transform">
                    Kirim Chat →
                  </span>
                </a>

                {/* LinkedIn Item */}
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Linkedin size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">LinkedIn Profile</span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        in/dandy-zain-ab380a290
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                    Buka Profil →
                  </span>
                </a>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-500 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Alamat Lengkap</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {personal.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* CV Download / Print Banner */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={onOpenCVModal}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-pastel-lavender hover:bg-indigo-200 text-indigo-900 dark:bg-indigo-950 dark:hover:bg-indigo-900 dark:text-indigo-200 font-bold text-xs sm:text-sm shadow-sm transition-all duration-200"
                >
                  <FileText size={18} className="text-indigo-600" />
                  <span>Lihat & Download Curriculum Vitae (PDF)</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-4xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-lg backdrop-blur-xl">
              
              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">
                Kirimkan Pesan Anda
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8">
                Formulir ini akan otomatis menyiapkan draf pesan ke email resmi saya.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-medium flex items-center gap-2 animate-fadeIn">
                  <Sparkles size={18} className="text-emerald-500 shrink-0" />
                  <span>Terima kasih! Pesan Anda telah disiapkan. Klien email Anda akan terbuka untuk konfirmasi pengiriman.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="nama@perusahaan.com"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Kebutuhan / Topik Diskusi
                  </label>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  >
                    <option value="Full Stack Web Development">Full Stack Web Development (React / Next.js / Laravel)</option>
                    <option value="Mobile App Development">Mobile App Development (Flutter / Kotlin)</option>
                    <option value="AI Integration & Automation">AI Integration & Automation</option>
                    <option value="Full-time / Remote Opportunity">Tawaran Posisi Kerja (Full-time / Remote)</option>
                    <option value="Konsultasi Teknis">Konsultasi Teknis & Arsitektur</option>
                  </select>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Pesan Anda *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Ceritakan proyek, tantangan, atau peluang yang ingin Anda diskusikan..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-pastel-md hover:shadow-pastel-lg transition-all duration-200"
                >
                  <Send size={16} />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
