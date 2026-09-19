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
import { motion } from 'framer-motion';
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
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
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
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Bio & Narrative (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 rounded-4xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-sm hover:shadow-pastel-md transition-shadow">
              
              {/* Profile Bio Header with Avatar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/60">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-400 to-pink-400 p-0.5 shadow-pastel-md shrink-0 overflow-hidden"
                >
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-gradient-to-b from-indigo-50/90 to-purple-100/90 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                    <img 
                      src={personal.avatar} 
                      alt={personal.fullName} 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-xs" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                      {personal.fullName}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      Developer
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {personal.role[language]} • Telkominfra & Bay Pacific
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                    "{personal.tagline}"
                  </p>
                </div>
              </div>

              <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pastel-lavender-accent animate-ping" />
                {t.professionalSummary}
              </h4>
              
              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {personal.bio[language].map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Key Principles Checklist */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.principles.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 cursor-default"
                  >
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact & Location Info Card */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-6 rounded-3xl bg-pastel-gradient-1 border border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-rose-500 shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">{t.workLocation}</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">{personal.address}</p>
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:shadow-sm transition-all"
              >
                <Mail size={14} />
                <span>{personal.email}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: 4 Strength Cards (5 cols) with Stagger and Spring */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {t.cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-3xl border shadow-sm transition-shadow ${cardBgs[idx]}`}
              >
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm mb-4 cursor-pointer"
                >
                  {cardIcons[idx]}
                </motion.div>
                <h4 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
