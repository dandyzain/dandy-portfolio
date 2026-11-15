import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import SectionRail from './components/SectionRail';
import MobileContactBar from './components/MobileContactBar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import EducationCerts from './components/EducationCerts';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrintableCVModal from './components/PrintableCVModal';
import NotFound from './components/NotFound';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectFilterProvider } from './context/ProjectFilterContext';
import { ToastProvider } from './components/ui/Toast';
import { useCopy } from './hooks/useCopy';
import { allProjects } from './hooks/useProjects';
import { parseRoute } from './lib/projectUrl';
import { track } from './lib/analytics';

// Known routes: /, /id/, /work/<slug>, /id/work/<slug> (with a real slug).
const isKnownRoute = () => {
  const route = parseRoute();
  if (!route) return false;
  return !route.slug || allProjects.some((p) => p.slug === route.slug);
};

function PortfolioContent() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const { ui } = useCopy();
  const openCV = () => {
    setIsCVModalOpen(true);
    track('cv_open');
  };

  if (!isKnownRoute()) return <NotFound />;

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
        <Testimonials />
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
              <Analytics />
            </ProjectFilterProvider>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
