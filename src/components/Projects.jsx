import React, { useState } from 'react';
import { 
  FolderGit2, 
  CheckCircle2, 
  X, 
  ArrowUpRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { language } = useLanguage();
  const { projects } = portfolioData;
  const t = portfolioData.translations[language].projects;

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = t.categories;

  const filteredProjects = activeCategory === 0
    ? projects
    : projects.filter(p => {
        const cat = categories[activeCategory];
        return p.category.toLowerCase().includes(cat.toLowerCase()) || 
               cat.toLowerCase().includes(p.category.toLowerCase());
      });

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
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
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
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === idx
                  ? 'bg-indigo-600 text-white shadow-pastel-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-4xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-pastel-sm hover:shadow-pastel-lg transition-all duration-300 flex flex-col group ${getCardColorTheme(project.color)}`}
            >
              {/* Project Image Banner with Overlay */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white backdrop-blur-md shadow-sm">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs text-slate-200 font-medium truncate block">
                    {project.client}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {project.description[language]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
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
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-pastel-lavender-light hover:bg-pastel-lavender text-indigo-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-indigo-300 text-xs font-bold transition-colors"
                  >
                    <span>{t.studyCase}</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Project Modal Detail */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-4xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-2xl">
              
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-pastel-lavender dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {activeModalProject.category}
                </span>
                <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-2">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'en' ? 'Client' : 'Klien'}: {activeModalProject.client} • {language === 'en' ? 'Role' : 'Peran'}: {activeModalProject.role[language]}
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden h-60 sm:h-72 mb-6">
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
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-pastel-lavender-light dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 border border-pastel-lavender dark:border-slate-600"
                      >
                        {tTag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
                >
                  {t.modal.close}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
