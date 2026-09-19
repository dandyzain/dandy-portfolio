import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Sparkles,
  Eye,
  ExternalLink,
  Search,
  FileText,
  ShieldCheck,
  Building2,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import CertificateModal from './CertificateModal';

export default function EducationCerts() {
  const { language } = useLanguage();
  const { education, certifications } = portfolioData;
  const t = portfolioData.translations[language].education;

  // Filter and search state
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal preview state
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCertificate = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  // Filtered certifications
  const filteredCerts = useMemo(() => {
    return certifications.filter(cert => {
      const matchesCategory = activeCategory === 'all' || cert.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        cert.title.toLowerCase().includes(q) || 
        cert.issuer.toLowerCase().includes(q) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q)) ||
        (cert.categoryLabel && cert.categoryLabel[language].toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [certifications, activeCategory, searchQuery, language]);

  const categories = [
    { id: 'all', label: t.categories?.all || (language === 'en' ? 'All (29)' : 'Semua (29)') },
    { id: 'ai', label: t.categories?.ai || (language === 'en' ? 'AI & Data' : 'AI & Data') },
    { id: 'python', label: t.categories?.python || (language === 'en' ? 'Google IT & Python' : 'Google IT & Python') },
    { id: 'hki', label: t.categories?.hki || (language === 'en' ? 'HKI & Academic' : 'HKI & Akademik') },
    { id: 'industry', label: t.categories?.industry || (language === 'en' ? 'Industry & Training' : 'Pelatihan & Industri') },
  ];

  return (
    <section id="education" className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-butter dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Part 1: Academic History Cards (2 Columns) */}
        <div className="mb-20">
          <div className="flex items-center gap-2.5 mb-6">
            <BookOpen className="text-indigo-600 dark:text-indigo-400" size={22} />
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
              {t.academicHistory}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -4 }}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-sm hover:shadow-pastel-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-pastel-lavender-light dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {idx === 0 ? t.higherEd : t.vocationalEd}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Calendar size={13} />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-xl text-slate-900 dark:text-white mt-1">
                    {edu.institution}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                    {edu.degree[language]}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2 mb-4">
                    <MapPin size={13} className="text-rose-400 shrink-0" />
                    <span>{edu.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-4">
                    {edu.description[language]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part 2: Official Certifications & Licenses Showcase */}
        <div>
          {/* Section Sub-Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Award className="text-rose-500" size={24} />
                <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                  {t.certificationsTitle}
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {language === 'en' 
                  ? 'Click "Show Certificate" on any card to preview or download verified document soft files.' 
                  : 'Klik "Lihat Sertifikat" pada kartu untuk membuka dan mengunduh soft file dokumen terverifikasi.'}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60 self-start md:self-auto">
              <CheckCircle size={14} />
              <span>{t.verifiedCount}</span>
            </span>
          </div>

          {/* Filter Tabs & Search Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder || 'Search certifications...'}
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Certifications Grid (3 Columns) */}
          {filteredCerts.length === 0 ? (
            <div className="text-center py-16 bg-white/40 dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'en' ? 'No certifications matched your search criteria.' : 'Tidak ada sertifikat yang cocok dengan pencarian Anda.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCerts.map((cert, idx) => (
                <motion.div
                  key={cert.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (idx % 6) * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-sm hover:shadow-pastel-md transition-all flex flex-col justify-between group"
                >
                  {/* Card Top: Badges & Title */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${cert.badgeColor}`}>
                        {cert.categoryLabel ? cert.categoryLabel[language] : cert.category}
                      </span>
                      {cert.isSpecialization ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                          <Award size={10} />
                          Specialization
                        </span>
                      ) : (
                        <Sparkles size={13} className="text-amber-400" />
                      )}
                    </div>

                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cert.title}
                    </h4>

                    {cert.description && (
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {cert.description[language]}
                      </p>
                    )}
                  </div>

                  {/* Card Middle: Issuer & Metadata */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1.5 font-medium truncate">
                        <Building2 size={13} className="text-indigo-500 shrink-0" />
                        <span className="truncate">{cert.issuer}</span>
                      </span>
                      {cert.issueDate && (
                        <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                          {cert.issueDate}
                        </span>
                      )}
                    </div>

                    {cert.credentialId && (
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        ID: {cert.credentialId}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Show Certificate & Quick Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenCertificate(cert)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
                      title="Preview certificate soft file"
                    >
                      <Eye size={14} />
                      <span>{t.showCert || 'Show Certificate'}</span>
                    </button>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        title="Verify credential online"
                      >
                        <ShieldCheck size={15} />
                      </a>
                    )}

                    <a
                      href={encodeURI(cert.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      title="Open file directly"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Certificate Viewer Lightbox Modal */}
      <CertificateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certificate={selectedCert}
      />
    </section>
  );
}
