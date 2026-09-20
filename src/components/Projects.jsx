import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  FolderGit2, 
  CheckCircle2, 
  X, 
  ArrowUpRight,
  ExternalLink,
  Gitlab,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Pagination from './Pagination';

const PROJECTS_PER_PAGE = 6;

export default function Projects() {
  const { language } = useLanguage();
  const { projects } = portfolioData;
  const t = portfolioData.translations[language].projects;

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Close modal on Escape key press & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  const categories = t.categories;

  const filteredProjects = useMemo(() => {
    return activeCategory === 0
      ? projects
      : projects.filter(p => {
          const cat = categories[activeCategory].toLowerCase();
          const pCat = p.category.toLowerCase();
          return pCat.includes(cat) || cat.includes(pCat);
        });
  }, [projects, activeCategory, categories]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // Reset to page 1 whenever category changes
  const handleCategoryChange = (idx) => {
    setActiveCategory(idx);
    setCurrentPage(1);
  };

  // Adjust page if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Paginated slice for current page
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const getCardColorTheme = (color) => {
    switch (color) {
      case 'lavender':
        return 'hover:border-indigo-300 dark:hover:border-indigo-600 bg-white dark:bg-slate-800';
      case 'mint':
        return 'hover:border-emerald-300 dark:hover:border-emerald-600 bg-white dark:bg-slate-800';
      case 'sky':
        return 'hover:border-sky-300 dark:hover:border-sky-600 bg-white dark:bg-slate-800';
      case 'peach':
        return 'hover:border-rose-300 dark:hover:border-rose-600 bg-white dark:bg-slate-800';
      case 'butter':
      default:
        return 'hover:border-amber-300 dark:hover:border-amber-600 bg-white dark:bg-slate-800';
    }
  };

  return (
    <section id="projects" className="py-24 bg-pastel-radial relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-peach dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <FolderGit2 size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Filter Buttons with Spring Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryChange(idx)}
                className={`relative px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectTab"
                    className="absolute inset-0 rounded-2xl bg-indigo-600 shadow-pastel-md -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with Stagger & Layout Transitions */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {paginatedProjects.map((project, pIdx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.35, delay: pIdx * 0.05 }}
                whileHover={{ y: -6 }}
                className={`rounded-3xl sm:rounded-4xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-pastel-sm hover:shadow-pastel-lg transition-shadow flex flex-col group ${getCardColorTheme(project.color)}`}
              >
                {/* Project Image Banner with Overlay & Zoom */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white backdrop-blur-md shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {project.gitlabUrl && (
                    <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4">
                      <a
                        href={project.gitlabUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-orange-600 hover:scale-110 transition-transform shadow-sm inline-flex items-center justify-center"
                        title={t.openGitLab}
                      >
                        <Gitlab size={15} />
                      </a>
                    </div>
                  )}

                  {project.githubUrl && (
                    <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white hover:scale-110 transition-transform shadow-sm inline-flex items-center justify-center"
                        title={t.openGitHub}
                      >
                        <Github size={15} />
                      </a>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs text-slate-200 font-medium truncate block">
                      {project.client}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {project.description[language]}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-500">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveModalProject(project)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-pastel-lavender-light hover:bg-pastel-lavender text-indigo-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-indigo-300 text-xs font-bold transition-colors"
                    >
                      <span>{t.studyCase}</span>
                      <ArrowUpRight size={15} />
                    </motion.button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Projects Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredProjects.length}
          itemsPerPage={PROJECTS_PER_PAGE}
          labels={t.pagination}
          sectionId="projects"
        />

        {/* Project Modal Detail with Spring Entrance (Mounted via Portal) */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {activeModalProject && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveModalProject(null)}
                  className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer" 
                />

                <motion.div 
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl sm:rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
                >
                  
                  {/* Fixed Header */}
                  <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm shrink-0">
                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-pastel-lavender dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {activeModalProject.category}
                      </span>
                      {activeModalProject.gitlabUrl && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                          <Gitlab size={13} />
                          GitLab Enterprise
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setActiveModalProject(null)}
                      className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors shrink-0"
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Scrollable Body */}
                  <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                        {activeModalProject.title}
                      </h3>
                      <div className="mt-2 space-y-1 text-xs">
                        <p className="text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-400 dark:text-slate-500">{language === 'en' ? 'Client: ' : 'Perusahaan / Klien: '}</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">{activeModalProject.client}</span>
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-400 dark:text-slate-500">{language === 'en' ? 'Role: ' : 'Peran: '}</span>
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{activeModalProject.role[language]}</span>
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden h-48 sm:h-64 shadow-md bg-slate-100 dark:bg-slate-800">
                      <img
                        src={activeModalProject.image}
                        alt={activeModalProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                          {t.modal.aboutProject}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {activeModalProject.description[language]}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {t.modal.keyFeatures}
                        </h4>
                        <div className="space-y-2">
                          {activeModalProject.features[language].map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {t.modal.techUsed}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeModalProject.tags.map((tTag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 sm:px-3 py-1 rounded-xl text-xs font-semibold bg-pastel-lavender-light dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-pastel-lavender dark:border-slate-700"
                            >
                              {tTag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fixed Footer */}
                  <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3 shrink-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {activeModalProject.gitlabUrl && (
                        <motion.a
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          href={activeModalProject.gitlabUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-sm"
                        >
                          <Gitlab size={14} />
                          <span>{t.modal.openGitLabButton}</span>
                          <ExternalLink size={12} />
                        </motion.a>
                      )}

                      {activeModalProject.githubUrl && (
                        <motion.a
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          href={activeModalProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-sm"
                        >
                          <Github size={14} />
                          <span>{t.modal.openGitHubButton}</span>
                          <ExternalLink size={12} />
                        </motion.a>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveModalProject(null)}
                      className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-300/60 dark:border-slate-700"
                    >
                      {t.modal.close}
                    </motion.button>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </section>
  );
}
