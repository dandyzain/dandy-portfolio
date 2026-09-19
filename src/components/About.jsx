import React from 'react';
import { 
  User, 
  Code, 
  Smartphone, 
  Cpu, 
  Zap, 
  MapPin, 
  Mail, 
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { language } = useLanguage();
  const { personal } = portfolioData;
  const t = portfolioData.translations[language].about;

  const cardIcons = [
    <Code className="text-indigo-600 dark:text-indigo-400" size={24} />,
    <Smartphone className="text-emerald-600 dark:text-emerald-400" size={24} />,
    <Cpu className="text-rose-600 dark:text-rose-400" size={24} />,
    <Zap className="text-amber-600 dark:text-amber-400" size={24} />
  ];

  const cardBgs = [
    "bg-pastel-lavender-light dark:bg-indigo-950/40 border-pastel-lavender dark:border-indigo-900",
    "bg-pastel-mint-light dark:bg-emerald-950/40 border-pastel-mint dark:border-emerald-900",
    "bg-pastel-peach-light dark:bg-rose-950/40 border-pastel-peach dark:border-rose-900",
    "bg-pastel-butter-light dark:bg-amber-950/40 border-pastel-butter dark:border-amber-900"
  ];

  return (
    <section id="about" className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-lavender dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <User size={14} />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Bio & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-4xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-sm">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-pastel-lavender-accent" />
                {t.professionalSummary}
              </h3>
              
              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {personal.bio[language].map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Key Principles Checklist */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.principles.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact & Location Info Card */}
            <div className="p-6 rounded-3xl bg-pastel-gradient-1 border border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-rose-500 shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">{t.workLocation}</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">{personal.address}</p>
                </div>
              </div>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:shadow-sm transition-all"
              >
                <Mail size={14} />
                <span>{personal.email}</span>
              </a>
            </div>
          </div>

          {/* Right: 4 Strength Cards (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {t.cards.map((card, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-pastel-md hover:-translate-y-1 ${cardBgs[idx]}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm mb-4">
                  {cardIcons[idx]}
                </div>
                <h4 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
