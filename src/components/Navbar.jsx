import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  FileText, 
  Send, 
  Languages 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ darkMode, setDarkMode, onOpenCVModal }) {
  const { language, toggleLanguage } = useLanguage();
  const t = portfolioData.translations[language].nav;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'experience', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.about, href: '#about', id: 'about' },
    { name: t.experience, href: '#experience', id: 'experience' },
    { name: t.skills, href: '#skills', id: 'skills' },
    { name: t.projects, href: '#projects', id: 'projects' },
    { name: t.education, href: '#education', id: 'education' },
    { name: t.contact, href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-pastel py-3 shadow-pastel-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-pastel-lavender-accent to-pink-400 flex items-center justify-center text-white font-display font-bold text-xl shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              DZ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg text-slate-800 dark:text-white tracking-tight">
                  {portfolioData.personal.preferredName}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {t.available}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Full Stack & Mobile Dev
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeSection === link.id
                    ? 'bg-pastel-lavender-accent text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all shadow-sm text-xs font-bold"
              title={language === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English (US)'}
            >
              <Languages size={14} className="text-indigo-500" />
              <span>{language === 'en' ? '🇺🇸 EN' : '🇮🇩 ID'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* View CV Button */}
            <button
              onClick={onOpenCVModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold bg-pastel-mint-light hover:bg-pastel-mint text-emerald-800 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-all shadow-sm"
            >
              <FileText size={14} />
              <span>{t.viewCV}</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/${portfolioData.personal.rawPhone}?text=Halo%20Dandy,%20saya%20tertarik%20dengan%20portfolio%20Anda.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-pastel-sm hover:shadow-pastel-md transition-all duration-200"
            >
              <Send size={13} />
              <span>{t.contactMe}</span>
            </a>
          </div>

          {/* Mobile Actions Hamburger */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              {language === 'en' ? '🇺🇸 EN' : '🇮🇩 ID'}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-xl animate-fadeIn">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-pastel-lavender-accent text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCVModal();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-sm font-medium bg-pastel-mint-light text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  <FileText size={16} />
                  <span>{t.viewCV}</span>
                </button>
                <a
                  href={`https://wa.me/${portfolioData.personal.rawPhone}?text=Halo%20Dandy,%20saya%20tertarik%20dengan%20portfolio%20Anda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-sm font-medium bg-indigo-600 text-white"
                >
                  <Send size={16} />
                  <span>{t.contactMe}</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
