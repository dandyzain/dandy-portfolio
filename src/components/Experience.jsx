import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle, 
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { language } = useLanguage();
  const { experiences } = portfolioData;
  const t = portfolioData.translations[language].experience;

  const [selectedId, setSelectedId] = useState(experiences[0].id);

  const activeExp = experiences.find(e => e.id === selectedId) || experiences[0];

  const getColorClasses = (color) => {
    switch(color) {
      case 'lavender':
        return {
          badge: 'bg-pastel-lavender dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border-pastel-lavender-accent/30',
          dot: 'bg-indigo-500',
          border: 'border-indigo-200 dark:border-indigo-800'
        };
      case 'mint':
        return {
          badge: 'bg-pastel-mint dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          dot: 'bg-emerald-500',
          border: 'border-emerald-200 dark:border-emerald-800'
        };
      case 'sky':
        return {
          badge: 'bg-pastel-sky dark:bg-sky-950 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800',
          dot: 'bg-sky-500',
          border: 'border-sky-200 dark:border-sky-800'
        };
      case 'peach':
      default:
        return {
          badge: 'bg-pastel-peach dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
          dot: 'bg-rose-500',
          border: 'border-rose-200 dark:border-rose-800'
        };
    }
  };

  return (
    <section id="experience" className="py-24 bg-pastel-radial relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-mint dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Company List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
              {t.selectPrompt}
            </p>
            {experiences.map((exp, idx) => {
              const colors = getColorClasses(exp.color);
              const isSelected = exp.id === selectedId;

              return (
                <motion.button
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedId(exp.id)}
                  className={`w-full text-left p-5 rounded-3xl transition-colors duration-200 flex items-start justify-between border ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 shadow-pastel-md border-indigo-300 dark:border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'bg-white/60 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="relative mt-1">
                      <div className={`w-3 h-3 rounded-full ${colors.dot} shrink-0`} />
                      {isSelected && (
                        <motion.div 
                          layoutId="pulseDot"
                          className="absolute -inset-1 rounded-full bg-indigo-400/40 animate-ping" 
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                        {exp.company}
                      </h4>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {exp.role}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <Calendar size={12} />
                        <span>{exp.period[language]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1">
                    {exp.duration[language] === (language === 'en' ? 'Active' : 'Aktif') && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {t.activeBadge}
                      </span>
                    )}
                    <ChevronRight 
                      size={18} 
                      className={`transition-transform duration-200 ${
                        isSelected ? 'text-indigo-600 translate-x-1' : 'text-slate-300'
                      }`} 
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Detailed Experience View with AnimatePresence (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeExp.id + '-' + language}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-8 sm:p-10 rounded-4xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-lg backdrop-blur-xl"
              >
                
                {/* Card Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${getColorClasses(activeExp.color).badge}`}>
                      {activeExp.type}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                      {activeExp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                      <Building2 size={16} />
                      <span>{activeExp.company}</span>
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5 justify-end font-medium">
                      <Calendar size={14} className="text-slate-400" />
                      <span>{activeExp.period[language]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{activeExp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="py-6">
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeExp.description[language]}
                  </p>
                </div>

                {/* Key Contributions / Highlights */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {t.contributions}
                  </h4>
                  <div className="space-y-2.5">
                    {activeExp.highlights[language].map((highlight, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                      >
                        <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-normal">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Used in this role */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                    {t.techUsed}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.techStack.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
