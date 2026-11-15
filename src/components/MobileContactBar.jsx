import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Mail, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { whatsappLink } from '../data/sections';
import { useCopy } from '../hooks/useCopy';
import { duration, ease } from '../lib/motion';

/**
 * Mobile-only quick contact bar. Appears after the hero and hides while the
 * contact section or footer is on screen, so it never duplicates them.
 */
export default function MobileContactBar({ onOpenCVModal }) {
  const { ui, language } = useCopy();
  const { personal } = portfolioData;
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const targets = [document.getElementById('contact'), document.querySelector('footer')].filter(Boolean);
    const seen = new Set();
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0.15 });
    const contactIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setContactVisible(seen.size > 0);
    });
    if (hero) heroIo.observe(hero);
    targets.forEach((t) => contactIo.observe(t));
    return () => {
      heroIo.disconnect();
      contactIo.disconnect();
    };
  }, []);

  const show = pastHero && !contactVisible;
  const waText = language === 'id' ? 'Halo Dandy, saya melihat portofolio Anda.' : 'Hi Dandy, I saw your portfolio.';

  const item =
    'flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-[0.72rem] font-semibold text-ink-2 transition-colors active:bg-surface-2';

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label={ui.mobileBar.label}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: duration.base, ease: ease.out } }}
          exit={{ y: 80, opacity: 0, transition: { duration: duration.fast } }}
          className="no-print fixed inset-x-3 bottom-3 z-40 flex gap-1 rounded-2xl border border-line bg-surface/95 p-1.5 shadow-lift backdrop-blur-md md:hidden"
          style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
        >
          <a href={whatsappLink(personal.rawPhone, waText)} target="_blank" rel="noopener noreferrer" className={item}>
            <MessageCircle size={18} className="text-signal-ink" aria-hidden="true" />
            {ui.mobileBar.whatsapp}
          </a>
          <a href={`mailto:${personal.email}`} className={item}>
            <Mail size={18} aria-hidden="true" />
            {ui.mobileBar.email}
          </a>
          <button type="button" onClick={onOpenCVModal} className={item}>
            <FileText size={18} aria-hidden="true" />
            {ui.mobileBar.cv}
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
