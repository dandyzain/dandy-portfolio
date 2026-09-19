import React, { useState, useEffect } from 'react';
import { 
  ArrowDown, 
  FileText, 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  Code2, 
  Layers, 
  Smartphone, 
  Bot, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

// Animated Counter Component
function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const numeric = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const increment = numeric / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [numeric, duration]);

  return <span>{count}{suffix}</span>;
}

export default function Hero({ onOpenCVModal }) {
  const { language } = useLanguage();
  const { personal } = portfolioData;
  const t = portfolioData.translations[language].hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 }
    },
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-pastel-radial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intro & Headline with Stagger Animation */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            
            {/* Top Greeting Badge */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-pastel-lavender dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 mb-6 cursor-default"
            >
              <motion.span 
                animate={{ rotate: [0, 20, -10, 20, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3 }}
                className="text-base inline-block origin-bottom-right"
              >
                👋
              </motion.span>
              <span>{t.greeting}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pastel-lavender-accent" />
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">Dandy Zain</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-4"
            >
              {t.headlineStart}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
                {t.headlineHighlight}
              </span>
            </motion.h1>

            {/* LinkedIn Tagline & Subtitle */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl bg-white/75 dark:bg-slate-800/75 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md shadow-sm mb-6 w-full"
            >
              <p className="text-sm sm:text-base italic text-indigo-900 dark:text-indigo-200 font-medium">
                "{personal.tagline}"
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <MapPin size={14} className="text-rose-400 shrink-0" />
                <span>{personal.location[language]}</span>
                <span>•</span>
                <span>{t.activeAt}</span>
              </div>
            </motion.div>

            {/* Dynamic Skills Pills Stack */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: <Code2 size={14} />, text: "React.js & Next.js", bg: "bg-pastel-lavender-light dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-pastel-lavender dark:border-indigo-800" },
                { icon: <Layers size={14} />, text: "Laravel & Express.js", bg: "bg-pastel-mint-light dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-pastel-mint dark:border-emerald-800" },
                { icon: <Smartphone size={14} />, text: "Flutter & Kotlin Native", bg: "bg-pastel-sky-light dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-pastel-sky dark:border-sky-800" },
                { icon: <Bot size={14} />, text: "AI Integration", bg: "bg-pastel-peach-light dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-pastel-peach dark:border-rose-800" },
              ].map((pill, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border shadow-xs cursor-default ${pill.bg}`}
                >
                  {pill.icon} {pill.text}
                </motion.span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-pastel-md hover:shadow-pastel-lg transition-all duration-200"
              >
                <span>{t.exploreProjects}</span>
                <ArrowDown size={16} />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenCVModal}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200"
              >
                <FileText size={16} className="text-indigo-500" />
                <span>{t.viewCV}</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${personal.rawPhone}?text=Halo%20Dandy,%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-sm transition-all duration-200"
              >
                <Phone size={15} />
                <span>{t.whatsapp}</span>
              </motion.a>
            </motion.div>

            {/* Social & Contact Bar */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {t.connected}
              </span>
              {[
                { href: personal.linkedin, icon: <Linkedin size={18} />, title: "LinkedIn Profile" },
                { href: `mailto:${personal.email}`, icon: <Mail size={18} />, title: "Send Email" },
                { href: "https://github.com/dandyzain", icon: <Github size={18} />, title: "GitHub" },
              ].map((s, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                  title={s.title}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Interactive Card & Floating Badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            
            {/* Center Visual Bento Card with Subtle Tilt on Hover */}
            <motion.div 
              whileHover={{ y: -6, rotateY: 4, rotateX: -3 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-4xl bg-white/85 dark:bg-slate-800/85 border border-white/80 dark:border-slate-700/80 shadow-pastel-lg backdrop-blur-xl"
            >
              
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/60">
                <div className="relative">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-400 via-pastel-lavender-accent to-pink-300 p-1 shadow-pastel-md cursor-pointer"
                  >
                    <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-900 flex items-center justify-center font-display font-extrabold text-3xl text-indigo-600 dark:text-indigo-400">
                      DZ
                    </div>
                  </motion.div>
                  <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-slate-900 rounded-full">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    {personal.fullName}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {personal.role[language]}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    B.S. in Computer Science (UCIC)
                  </p>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="rounded-2xl bg-slate-900 p-4 text-xs font-mono text-slate-300 shadow-inner mb-6">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-400 ml-2 font-sans">dandy.config.js</span>
                </div>
                <p className="text-purple-400">const <span className="text-sky-300">developer</span> = &#123;</p>
                <p className="pl-4 text-slate-300">name: <span className="text-emerald-300">'Dandy Rahmat Zain'</span>,</p>
                <p className="pl-4 text-slate-300">stack: [<span className="text-emerald-300">'React'</span>, <span className="text-emerald-300">'Laravel'</span>, <span className="text-emerald-300">'Flutter'</span>],</p>
                <p className="pl-4 text-slate-300">passion: <span className="text-emerald-300">'High-performance apps'</span>,</p>
                <p className="pl-4 text-slate-300">readyForHire: <span className="text-amber-300">true</span></p>
                <p className="text-purple-400">&#125;;</p>
              </div>

              {/* Animated Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {personal.stats.map((stat, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 text-center"
                  >
                    <span className="block font-display font-bold text-2xl text-slate-900 dark:text-white">
                      <Counter value={stat.value} />
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {stat.label[language]}
                    </span>
                  </motion.div>
                ))}
              </div>

            </motion.div>

            {/* Floating Badge 1 - Top Right */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 sm:-right-6 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-pastel-mint-light dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-pastel-md backdrop-blur-md text-xs font-bold"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{t.roles.fullstack}</span>
            </motion.div>

            {/* Floating Badge 2 - Bottom Left */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-4 sm:-left-6 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-pastel-lavender-light dark:bg-slate-800 text-indigo-800 dark:text-indigo-300 border border-pastel-lavender dark:border-indigo-800 shadow-pastel-md backdrop-blur-md text-xs font-bold"
            >
              <Sparkles size={16} className="text-indigo-500" />
              <span>{t.activeAt}</span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
