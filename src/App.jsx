import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import EducationCerts from './components/EducationCerts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrintableCVModal from './components/PrintableCVModal';
import { FileText, MessageCircle } from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function PortfolioContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const { language } = useLanguage();

  // Sync dark mode class on html tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-pastel-bg-light dark:bg-pastel-bg-dark text-slate-800 dark:text-slate-100 transition-colors duration-300 relative">
      
      {/* Top Navbar */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onOpenCVModal={() => setIsCVModalOpen(true)} 
      />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenCVModal={() => setIsCVModalOpen(true)} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <EducationCerts />
        <Contact onOpenCVModal={() => setIsCVModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Quick Access (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 no-print">
        <button
          onClick={() => setIsCVModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 font-bold text-xs shadow-pastel-md border border-pastel-lavender dark:border-slate-700 hover:scale-105 transition-all"
          title={language === 'en' ? 'View Complete CV' : 'Lihat CV Lengkap'}
        >
          <FileText size={15} className="text-indigo-600" />
          <span className="hidden sm:inline">{language === 'en' ? 'CV Document' : 'CV Dokumen'}</span>
        </button>

        <a
          href={`https://wa.me/${portfolioData.personal.rawPhone}?text=Halo%20Dandy,%20saya%20melihat%20portfolio%20web%20Anda.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-pastel-md hover:scale-110 transition-all"
          title="Chat WhatsApp"
        >
          <MessageCircle size={22} />
        </a>
      </div>

      {/* Printable / Viewable CV Modal */}
      <PrintableCVModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  );
}
