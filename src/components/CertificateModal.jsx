import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Download, 
  Award, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ShieldCheck,
  Eye,
  FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CertificateModal({ isOpen, onClose, certificate }) {
  const { language } = useLanguage();
  
  // Retain last active certificate so exit animations finish smoothly
  const lastCertRef = useRef(certificate);
  if (certificate) {
    lastCertRef.current = certificate;
  }
  const activeCert = certificate || lastCertRef.current;

  // Close on Escape key press & prevent background scrolling
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

  if (typeof document === 'undefined') return null;

  const isImage = activeCert && (
    activeCert.fileType === 'image' || 
    activeCert.file.endsWith('.jpg') || 
    activeCert.file.endsWith('.png')
  );
  const encodedFile = activeCert ? encodeURI(activeCert.file) : '';

  return createPortal(
    <AnimatePresence>
      {isOpen && activeCert && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            key="cert-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Window Card */}
          <motion.div
            key="cert-dialog"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm shrink-0">
              <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${activeCert.badgeColor || 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'}`}>
                    {activeCert.categoryLabel ? activeCert.categoryLabel[language] : activeCert.category}
                  </span>
                  {activeCert.isSpecialization && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                      <Award size={11} />
                      {language === 'en' ? 'Specialization' : 'Spesialisasi'}
                    </span>
                  )}
                  {activeCert.credentialId && (
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      ID: {activeCert.credentialId}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-base sm:text-xl text-slate-900 dark:text-white leading-tight break-words">
                  {activeCert.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                    <Building2 size={13} className="text-indigo-500" />
                    {activeCert.issuer}
                  </span>
                  {activeCert.issueDate && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {activeCert.issueDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {activeCert.credentialUrl && (
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors border border-indigo-200 dark:border-indigo-800/60"
                    title="Verify online credential"
                  >
                    <ShieldCheck size={14} className="text-indigo-500" />
                    <span className="hidden md:inline">{language === 'en' ? 'Verify Online' : 'Verifikasi Online'}</span>
                    <ExternalLink size={12} />
                  </a>
                )}

                <a
                  href={encodedFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Open full document in new tab"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">{language === 'en' ? 'Open Full File' : 'Buka File'}</span>
                </a>

                <a
                  href={encodedFile}
                  download
                  className="inline-flex items-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Download file"
                >
                  <Download size={15} />
                </a>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
                  title="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Certificate Viewer Body */}
            <div className="flex-1 overflow-auto p-2 sm:p-4 bg-slate-950 flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh]">
              {isImage ? (
                <div className="w-full flex items-center justify-center p-2">
                  <img
                    src={encodedFile}
                    alt={activeCert.title}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center">
                  <iframe
                    src={`${encodedFile}#toolbar=0&navpanes=0&scrollbar=1`}
                    title={activeCert.title}
                    className="w-full h-[58vh] sm:h-[68vh] rounded-xl border border-slate-800 bg-slate-900 shadow-2xl"
                  />
                  {/* Fallback bar below iframe */}
                  <div className="w-full flex items-center justify-between px-2 pt-2 text-xs text-slate-400">
                    <span className="text-[11px] truncate">
                      {language === 'en' ? 'PDF preview rendering via browser engine' : 'Pratinjau PDF dirender langsung dari arsip'}
                    </span>
                    <a
                      href={encodedFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 underline font-medium shrink-0 ml-2"
                    >
                      <FileText size={12} />
                      {language === 'en' ? 'Open in new tab if needed' : 'Buka di tab baru jika diperlukan'}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Note */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" />
                {language === 'en' ? 'Verified Document from official repository' : 'Dokumen terverifikasi dari arsip resmi'}
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
                dandy-portfolio/public/certificate
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
