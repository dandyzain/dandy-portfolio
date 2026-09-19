import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Server, 
  Smartphone, 
  BrainCircuit, 
  Layers 
} from 'lucide-react';
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
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
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
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === cat.id
                  ? 'bg-indigo-600 text-white shadow-pastel-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="p-8 rounded-4xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-sm hover:shadow-pastel-md transition-all duration-300"
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

                    {/* Pastel progress bar */}
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${group.accent}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
