import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import SectionRail from './components/SectionRail';
import MobileContactBar from './components/MobileContactBar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import EducationCerts from './components/EducationCerts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrintableCVModal from './components/PrintableCVModal';
import NotFound from './components/NotFound';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectFilterProvider } from './context/ProjectFilterContext';
import { ToastProvider } from './components/ui/Toast';
import { useCopy } from './hooks/useCopy';

const isHome = () => ['/', '/index.html'].includes(window.location.pathname.replace(/\/+$/, '/') || '/');

function PortfolioContent() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const { ui } = useCopy();
  const openCV = () => setIsCVModalOpen(true);

  if (!isHome()) return <NotFound />;

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a href="#main" className="skip-link">
        {ui.common.skipToContent}
      </a>

      <Navbar onOpenCVModal={openCV} />
      <SectionRail />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero onOpenCVModal={openCV} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <EducationCerts />
        <Contact onOpenCVModal={openCV} />
      </main>

      <Footer />
      <MobileContactBar onOpenCVModal={openCV} />

      <PrintableCVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <ProjectFilterProvider>
              <PortfolioContent />
            </ProjectFilterProvider>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
