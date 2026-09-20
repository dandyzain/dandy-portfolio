import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function PrintableCVModal({ isOpen, onClose }) {
  const { language } = useLanguage();
  const { personal, experiences, education, certifications } = portfolioData;
  const t = portfolioData.translations[language].cvModal;

  // Close modal on Escape key press & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 no-print">
          
          {/* Backdrop with Fade Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container with Spring Scale Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl sm:rounded-4xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            
            {/* Top Action Bar (hidden in print) */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shrink-0 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <h3 className="font-display font-bold text-xs sm:text-base text-slate-800 dark:text-white truncate">
                  {t.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/cv-dandy-rahmat-zain.pdf"
                  download="CV-Dandy-Rahmat-Zain.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
                  title={t.downloadOriginal}
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">{t.downloadOriginal}</span>
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Printer size={14} />
                  <span>{t.printSave}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Close CV Modal"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* CV Document Body (Scrollable inside modal, fully visible in print) */}
            <div className="p-4 sm:p-8 md:p-10 overflow-y-auto bg-white text-slate-900" id="printable-cv">
              
              {/* Header */}
              <div className="border-b-2 border-slate-200 pb-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-24 sm:w-22 sm:h-26 rounded-xl overflow-hidden border border-slate-300 shadow-xs shrink-0 bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
                      <img 
                        src={personal.avatar} 
                        alt={personal.fullName} 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                        {personal.fullName}
                      </h1>
                      <p className="text-sm sm:text-base font-bold text-indigo-600 mt-0.5">
                        {personal.role[language]}
                      </p>
                      <p className="text-xs text-slate-600 italic mt-1 max-w-md">
                        "{personal.tagline}"
                      </p>
                    </div>
                  </div>

                  {/* Contact Info Header */}
                  <div className="text-xs text-slate-600 space-y-1.5 sm:text-right shrink-0">
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <MapPin size={12} className="text-rose-500" />
                      <span>{personal.location[language]}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Phone size={12} className="text-emerald-500" />
                      <span>{personal.phone}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Mail size={12} className="text-indigo-500" />
                      <span>{personal.email}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Linkedin size={12} className="text-blue-500" />
                      <span>linkedin.com/in/dandy-zain-ab380a290</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ringkasan Profil */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-2">
                  {t.summaryTitle}
                </h2>
                <p className="text-xs leading-relaxed text-slate-700">
                  {personal.bio[language].join(' ')}
                </p>
              </div>

              {/* Pengalaman Kerja */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-3">
                  {t.experienceTitle}
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="mb-1.5 space-y-0.5">
                        <div className="font-bold text-slate-900 text-sm leading-snug">
                          {exp.role}
                        </div>
                        <div className="text-slate-700 font-medium text-xs">
                          {exp.company}
                        </div>
                        <div className="text-slate-400 font-medium text-[11px]">
                          {exp.period[language]}
                        </div>
                      </div>
                      <p className="text-slate-600 mt-1 leading-relaxed">{exp.description[language]}</p>
                      <ul className="mt-1.5 space-y-0.5 list-disc list-inside text-slate-700">
                        {exp.highlights[language].slice(0, 3).map((hl, hIdx) => (
                          <li key={hIdx} className="leading-normal">{hl}</li>
                        ))}
                      </ul>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {exp.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Enterprise Projects Highlight */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-2">
                  {language === 'en' ? 'Key Enterprise Projects (Telkominfra)' : 'Proyek Unggulan Enterprise (Telkominfra)'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="font-bold text-slate-800">1. Asset Management & WFM System v2.1</p>
                    <p className="text-[11px] text-slate-600">PM & CM work orders, dynamic QR code tagging, GPS tracking, Oracle DB.</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">2. LION — NOC Submarine Cable GIS</p>
                    <p className="text-[11px] text-slate-600">Web GIS submarine cable mapping, KML/KMZ overlay, vessel hazard buffer alerts.</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">3. NOC-RAN — Radio Access Center</p>
                    <p className="text-[11px] text-slate-600">Nationwide 4G/5G cellular tower monitoring, alarm telemetry, Redis caching.</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">4. RENATA — HR Talent & E-Learning</p>
                    <p className="text-[11px] text-slate-600">Recruitment pipeline, corporate LMS, technical skill competency matrix.</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">5. WBS — Whistleblowing System</p>
                    <p className="text-[11px] text-slate-600">Encrypted compliance incident reporting, tiered investigation workflows.</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">6. KEPO & TSA — Docs & Tower Audit</p>
                    <p className="text-[11px] text-slate-600">Dynamic PDF watermarking repository & tower site activity telemetry audit.</p>
                  </div>
                </div>
              </div>

              {/* Pendidikan & Sertifikasi (2 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-2">
                    {t.educationTitle}
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu, idx) => (
                      <div key={idx} className="text-xs">
                        <p className="font-bold text-slate-900">{edu.institution}</p>
                        <p className="text-indigo-600 font-semibold">{edu.degree[language]}</p>
                        <p className="text-slate-500 text-[11px]">{edu.period} • {edu.location}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-2">
                    {t.certificationsTitle}
                  </h2>
                  <div className="space-y-1.5">
                    {certifications.slice(0, 6).map((cert, idx) => (
                      <div key={idx} className="text-xs flex items-center justify-between">
                        <span className="font-medium text-slate-800">• {cert.title}</span>
                        <span className="text-[10px] text-slate-500">{cert.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keahlian Teknis */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-2">
                  {t.skillsTitle}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Frontend:</span>
                    <span className="text-slate-600 text-[11px]">React, Next.js, Vue, Nuxt, Tailwind CSS, TypeScript</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Backend:</span>
                    <span className="text-slate-600 text-[11px]">Laravel, Express.js, PHP, Node.js, MySQL, PostgreSQL, Redis</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Mobile:</span>
                    <span className="text-slate-600 text-[11px]">Flutter, Kotlin Native, Android SDK, Firebase</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Tools & AI:</span>
                    <span className="text-slate-600 text-[11px]">Git/GitHub, Docker, AI Prompting, Systems Thinking</span>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
