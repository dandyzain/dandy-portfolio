import React, { useEffect } from 'react';
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

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  const isImage = certificate.fileType === 'image' || certificate.file.endsWith('.jpg') || certificate.file.endsWith('.png');
  const encodedFile = encodeURI(certificate.file);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] z-10"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <div className="space-y-1.5 flex-1 pr-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${certificate.badgeColor || 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'}`}>
                  {certificate.categoryLabel ? certificate.categoryLabel[language] : certificate.category}
                </span>
                {certificate.isSpecialization && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <Award size={11} />
                    {language === 'en' ? 'Specialization' : 'Spesialisasi'}
                  </span>
                )}
                {certificate.credentialId && (
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    ID: {certificate.credentialId}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                {certificate.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                  <Building2 size={13} className="text-indigo-500" />
                  {certificate.issuer}
                </span>
                {certificate.issueDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {certificate.issueDate}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {certificate.credentialUrl && (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors border border-indigo-200 dark:border-indigo-800/60"
                  title="Verify online credentials"
                >
                  <ShieldCheck size={14} className="text-indigo-500" />
                  <span>{language === 'en' ? 'Verify' : 'Verifikasi'}</span>
                  <ExternalLink size={12} />
                </a>
              )}

              <a
                href={encodedFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Open in new window / full view"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">{language === 'en' ? 'Open File' : 'Buka File'}</span>
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Certificate Viewer Body */}
          <div className="flex-1 overflow-auto p-3 sm:p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[55vh]">
            {isImage ? (
              <div className="w-full flex items-center justify-center">
                <img
                  src={encodedFile}
                  alt={certificate.title}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center">
                <iframe
                  src={`${encodedFile}#toolbar=0&navpanes=0&scrollbar=1`}
                  title={certificate.title}
                  className="w-full h-[65vh] sm:h-[72vh] rounded-xl border border-slate-800 bg-slate-900 shadow-2xl"
                />
                <div className="w-full text-center mt-3 sm:hidden">
                  <a
                    href={encodedFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 underline font-medium"
                  >
                    <FileText size={13} />
                    {language === 'en' ? 'Tap here to view full PDF directly' : 'Ketuk di sini untuk buka PDF penuh'}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" />
              {language === 'en' ? 'Verified Document from official repository' : 'Dokumen terverifikasi dari arsip resmi'}
            </span>
            <span>dandy-portfolio/public/certificate</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
