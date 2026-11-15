import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, FileText, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { SECTIONS, SECTION_IDS } from '../data/sections';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useCopy } from '../hooks/useCopy';
import { useActiveSection, scrollToSection } from '../hooks/useActiveSection';
import { cn } from '../lib/cn';
import { spring } from '../lib/motion';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';
import IconButton from './ui/IconButton';
import Dialog from './ui/Dialog';

function Brand() {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection('hero');
      }}
      className="group flex items-center gap-3"
    >
      <span aria-hidden="true" className="relative grid h-9 w-9 place-items-center rounded-lg bg-ink font-mono text-[0.8rem] font-semibold tracking-tight text-bg transition-transform duration-fast ease-out group-hover:-rotate-3">
        DZ
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-signal ring-2 ring-bg" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[0.95rem] font-semibold text-ink">{portfolioData.personal.preferredName}</span>
        <span className="hidden font-mono text-[0.68rem] uppercase tracking-wider text-muted sm:block">Full Stack · Mobile</span>
      </span>
    </a>
  );
}

export default function Navbar({ onOpenCVModal }) {
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { ui } = useCopy();
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Skills is not in the top bar (it is in the menu); while it is in view the
  // top bar keeps its neighbour, Experience, lit.
  const activeTop = active === 'skills' ? 'experience' : active;
  const navItems = SECTIONS.filter((s) => s.inNav);

  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const goFromMenu = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    // wait for the sheet's exit so scroll lock is released
    setTimeout(() => scrollToSection(id), 220);
  };

  const themeLabel = isDark ? ui.common.themeToLight : ui.common.themeToDark;

  return (
    <header
      className={cn(
        'no-print fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-base',
        scrolled ? 'border-b border-line bg-bg/80 backdrop-blur-md' : 'border-b border-transparent'
      )}
    >
      <div className="container-page flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Brand />

        <nav aria-label={ui.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((s) => {
              const isActive = activeTop === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex h-10 items-center px-3 text-sm font-medium transition-colors duration-fast',
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    )}
                  >
                    {ui.nav[s.nav]}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={spring}
                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-signal"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex h-9 items-center rounded-lg px-2.5 font-mono text-xs font-semibold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            aria-label={`EN / ID — ${ui.common.languageSwitch}`}
            title={ui.common.languageSwitch}
          >
            <span className={language === 'en' ? 'text-ink' : 'text-muted'}>EN</span>
            <span className="mx-1 text-line" aria-hidden="true">/</span>
            <span className={language === 'id' ? 'text-ink' : 'text-muted'}>ID</span>
          </button>
          <IconButton label={themeLabel} onClick={toggleTheme} variant="ghost" size="sm">
            <motion.span
              key={isDark ? 'sun' : 'moon'}
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.28 }}
              className="inline-flex"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </motion.span>
          </IconButton>
          <Button variant="secondary" size="sm" onClick={onOpenCVModal} className="hidden md:inline-flex">
            <FileText size={15} aria-hidden="true" />
            {ui.nav.cv}
          </Button>
          <Magnetic className="hidden md:inline-flex" max={5}>
            <Button size="sm" href="#contact" onClick={(e) => go(e, 'contact')}>
              {ui.nav.cta}
              <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-fast group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Button>
          </Magnetic>
          <IconButton
            label={ui.common.menuOpen}
            onClick={() => setMenuOpen(true)}
            variant="ghost"
            size="sm"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            <Menu size={19} />
          </IconButton>
        </div>
      </div>

      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-signal"
      />

      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title={ui.common.menu}
        closeLabel={ui.common.menuClose}
        fullscreenMobile
        bodyClassName="px-5 py-6 sm:px-7"
      >
        <nav aria-label={ui.nav.primary}>
          <ol className="divide-y divide-line border-y border-line">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => goFromMenu(e, s.id)}
                  aria-current={active === s.id ? 'true' : undefined}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="font-mono text-xs text-signal-ink">{s.index}</span>
                  <span
                    className={cn(
                      'font-display text-2xl font-semibold transition-colors',
                      active === s.id ? 'text-ink' : 'text-ink-2 group-hover:text-ink'
                    )}
                  >
                    {ui.nav[s.nav]}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              setMenuOpen(false);
              setTimeout(onOpenCVModal, 220);
            }}
          >
            <FileText size={16} aria-hidden="true" />
            {ui.nav.cv}
          </Button>
          <Button size="lg" href="#contact" onClick={(e) => goFromMenu(e, 'contact')}>
            {ui.nav.cta}
          </Button>
        </div>
      </Dialog>
    </header>
  );
}
