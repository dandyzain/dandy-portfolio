import { useEffect, useState } from 'react';

/**
 * Scroll-spy via IntersectionObserver: returns the id of the section whose
 * area crosses a band just below the navbar. Falls back to 'hero' at the top.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState('hero');
  const key = ids.join('|');

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const current = ids.find((id) => visible.get(id));
        setActive(current || (window.scrollY < 200 ? 'hero' : (prev) => prev));
      },
      // a thin band ~35% from the top of the viewport
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

/** Smoothly scroll to a section, honoring reduced motion, and update the hash. */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', id === 'hero' ? window.location.pathname + window.location.search : `#${id}`);
}
