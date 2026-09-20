import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Server, 
  Smartphone, 
  BrainCircuit, 
  Layers 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { language } = useLanguage();
  const { skills } = portfolioData;
  const t = portfolioData.translations[language].skills;

  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: t.categories.all, icon: <Sparkles size={16} /> },
    { id: 'frontend', label: t.categories.frontend, icon: <Code2 size={16} /> },
    { id: 'backend', label: t.categories.backend, icon: <Server size={16} /> },
    { id: 'mobile', label: t.categories.mobile, icon: <Smartphone size={16} /> },
    { id: 'aiAndTools', label: t.categories.aiAndTools, icon: <BrainCircuit size={16} /> },
  ];

  const skillGroups = [
    {
      id: 'frontend',
      title: t.groups.frontend.title,
      description: t.groups.frontend.desc,
      color: 'lavender',
      accent: 'bg-indigo-500',
      items: skills.frontend
    },
    {
      id: 'backend',
      title: t.groups.backend.title,
      description: t.groups.backend.desc,
      color: 'mint',
      accent: 'bg-emerald-500',
      items: skills.backend
    },
    {
      id: 'mobile',
      title: t.groups.mobile.title,
      description: t.groups.mobile.desc,
      color: 'sky',
      accent: 'bg-sky-500',
      items: skills.mobile
    },
    {
      id: 'aiAndTools',
      title: t.groups.aiAndTools.title,
      description: t.groups.aiAndTools.desc,
      color: 'peach',
      accent: 'bg-rose-500',
      items: skills.aiAndTools
    }
  ];

  const filteredGroups = activeTab === 'all' 
    ? skillGroups 
    : skillGroups.filter(g => g.id === activeTab);

  return (
    <section id="skills" className="py-24 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-lavender dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Filter Category Tabs with Spring Sliding Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-2xl bg-indigo-600 shadow-pastel-md -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid with Stagger & Animated Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group, gIdx) => (
              <motion.div
                layout
                key={group.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.4, delay: gIdx * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-5 sm:p-8 rounded-3xl sm:rounded-4xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-sm hover:shadow-pastel-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    {group.title}
                  </h3>
                  <span className="w-3 h-3 rounded-full bg-pastel-lavender-accent" />
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  {group.description}
                </p>

                <div className="space-y-4">
                  {group.items.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                          <span>{skill.name}</span>
                          {skill.tag && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              {skill.tag}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Animated Pastel progress bar */}
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: sIdx * 0.08, ease: "easeOut" }}
                          className={`h-full rounded-full ${group.accent}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
