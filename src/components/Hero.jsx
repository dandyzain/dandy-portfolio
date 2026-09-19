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

            {/* Animated Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.18] tracking-tight mb-5"
            >
              {/* Word-by-word spring entrance */}
              <span className="inline">
                {t.headlineStart.split(' ').map((word, wIdx) => (
                  <motion.span
                    key={`${word}-${wIdx}-${language}`}
                    initial={{ y: 22, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{
                      delay: 0.12 + wIdx * 0.08,
                      type: "spring",
                      stiffness: 140,
                      damping: 12
                    }}
                    whileHover={{ 
                      y: -3, 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 10 } 
                    }}
                    className="inline-block mr-2.5 cursor-default hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>{' '}

              {/* Animated Aurora Gradient Highlight with Sweeping Underline */}
              <motion.span 
                key={`highlight-${language}`}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  filter: 'blur(0px)',
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  opacity: { delay: 0.38, duration: 0.5 },
                  scale: { delay: 0.38, type: "spring", stiffness: 120, damping: 12 },
                  filter: { delay: 0.38, duration: 0.4 },
                  backgroundPosition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="relative inline-block bg-[length:200%_auto] bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 via-pink-500 to-indigo-600 cursor-default"
              >
                {t.headlineHighlight}

                {/* Animated decorative gradient underline sweep */}
                <motion.span 
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ 
                    delay: 0.65, 
                    duration: 0.85, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="block h-1.5 sm:h-2 mt-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left shadow-sm shadow-indigo-500/30"
                />
              </motion.span>
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
              whileHover={{ y: -6, rotateY: 3, rotateX: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-full max-w-[460px] p-6 sm:p-8 rounded-4xl bg-white/85 dark:bg-slate-800/85 border border-white/80 dark:border-slate-700/80 shadow-pastel-lg backdrop-blur-xl"
            >
              
              {/* Profile Card Header with Large Featured Portrait */}
              <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/60">
                <div className="relative mb-4">
                  {/* Outer ambient colorful glow */}
                  <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-pink-500/25 blur-lg pointer-events-none" />

                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 1.5 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-400 to-pink-400 p-1 shadow-pastel-lg cursor-pointer overflow-hidden group"
                  >
                    <div className="w-full h-full rounded-[22px] overflow-hidden bg-gradient-to-b from-indigo-50/90 via-purple-50/80 to-pink-50/90 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center">
                      <img 
                        src={personal.avatar} 
                        alt={personal.fullName}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </motion.div>

                  {/* Status Badge floating on Photo */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/95 dark:bg-slate-900/95 rounded-full shadow-md border border-slate-200/80 dark:border-slate-700 flex items-center gap-1.5 backdrop-blur-sm whitespace-nowrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                      {language === 'id' ? 'Terbuka untuk Peluang Kerja' : 'Available for Hire'}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight mt-1">
                  {personal.fullName}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {personal.role[language]}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>B.S. in Computer Science (UCIC)</span>
                  <span>•</span>
                  <span>Jakarta, Indonesia</span>
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
