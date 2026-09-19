import React from 'react';
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
  ExternalLink,
  MapPin
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onOpenCVModal }) {
  const { personal } = portfolioData;

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-pastel-radial">
      {/* Background Decorative Pastel Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-pastel-lavender/50 dark:bg-indigo-950/40 blur-3xl -z-10 pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/3 right-1/10 w-80 h-80 rounded-full bg-pastel-mint/50 dark:bg-emerald-950/40 blur-3xl -z-10 pointer-events-none animate-pulse-subtle" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-pastel-peach/40 dark:bg-rose-950/30 blur-3xl -z-10 pointer-events-none animate-pulse-subtle" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intro & Headline */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-pastel-lavender dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 mb-6">
              <span className="text-base">👋</span>
              <span>Halo semua, perkenalkan saya</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pastel-lavender-accent" />
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">Dandy Zain</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-4">
              Membangun Solusi Digital dengan{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
                Presisi & Kreativitas
              </span>
            </h1>

            {/* LinkedIn Tagline & Subtitle */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md shadow-sm mb-6">
              <p className="text-sm sm:text-base italic text-indigo-900 dark:text-indigo-200 font-medium">
                "{personal.tagline}"
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <MapPin size={14} className="text-rose-400" />
                <span>{personal.location}</span>
                <span>•</span>
                <span>Aktif di Telkominfra & Bay Pacific</span>
              </div>
            </div>

            {/* Dynamic Skills Pills Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pastel-lavender-light dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-pastel-lavender dark:border-indigo-800">
                <Code2 size={14} /> React.js & Next.js
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pastel-mint-light dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-pastel-mint dark:border-emerald-800">
                <Layers size={14} /> Laravel & Express.js
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pastel-sky-light dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-semibold border border-pastel-sky dark:border-sky-800">
                <Smartphone size={14} /> Flutter & Kotlin Native
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pastel-peach-light dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-semibold border border-pastel-peach dark:border-rose-800">
                <Bot size={14} /> AI Integration
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-pastel-md hover:shadow-pastel-lg transition-all duration-200"
              >
                <span>Jelajahi Proyek</span>
                <ArrowDown size={16} />
              </a>

              <button
                onClick={onOpenCVModal}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200"
              >
                <FileText size={16} className="text-indigo-500" />
                <span>Lihat / Cetak CV</span>
              </button>

              <a
                href={`https://wa.me/${personal.rawPhone}?text=Halo%20Dandy,%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-sm transition-all duration-200"
              >
                <Phone size={15} />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Social & Contact Bar */}
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Terhubung:
              </span>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                title="Kirim Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://github.com/dandyzain"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                title="GitHub"
              >
                <Github size={18} />
              </a>
            </div>

          </div>

          {/* Right Column: Creative Visual Card & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Center Visual Bento Card */}
            <div className="relative w-full max-w-md p-6 sm:p-8 rounded-4xl bg-white/80 dark:bg-slate-800/80 border border-white/60 dark:border-slate-700/60 shadow-pastel-lg backdrop-blur-xl">
              
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/60">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-400 via-pastel-lavender-accent to-pink-300 p-1 shadow-pastel-md">
                    <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-900 flex items-center justify-center font-display font-extrabold text-3xl text-indigo-600 dark:text-indigo-400">
                      DZ
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-slate-900 rounded-full">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    {personal.fullName}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {personal.role}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    S1 Teknik Informatika (UCIC)
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

              {/* Stats Grid inside Hero Card */}
              <div className="grid grid-cols-2 gap-3">
                {personal.stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 text-center"
                  >
                    <span className="block font-display font-bold text-2xl text-slate-900 dark:text-white">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Floating Badge 1 - Top Right */}
            <div className="absolute -top-6 -right-4 sm:-right-6 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-pastel-mint-light dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-pastel-md animate-float-slow backdrop-blur-md text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Full Stack & Mobile Dev</span>
            </div>

            {/* Floating Badge 2 - Bottom Left */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-pastel-lavender-light dark:bg-slate-800 text-indigo-800 dark:text-indigo-300 border border-pastel-lavender dark:border-indigo-800 shadow-pastel-md animate-float-reverse backdrop-blur-md text-xs font-bold">
              <Sparkles size={16} className="text-indigo-500" />
              <span>Telkominfra & Bay Pacific</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
