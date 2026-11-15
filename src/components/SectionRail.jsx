import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SECTIONS, SECTION_IDS } from '../data/sections';
import { useActiveSection, scrollToSection } from '../hooks/useActiveSection';
import { useCopy } from '../hooks/useCopy';
import { cn } from '../lib/cn';

/**
 * The "cable": a fixed vertical rail on wide screens. Its fill follows scroll
 * progress and each section is a node that lights up when active.
 */
export default function SectionRail() {
  const { ui } = useCopy();
  const active = useActiveSection(SECTION_IDS);
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 160, damping: 36, restDelta: 0.001 });

  return (
    <nav
      aria-label={ui.common.sectionNav}
      className="no-print pointer-events-none fixed left-[max(1rem,calc(50vw-38rem-3.25rem))] top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative py-2">
        <div className="absolute bottom-0 left-[5px] top-0 w-px bg-line" aria-hidden="true" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-signal"
        />
        <ol className="relative flex flex-col gap-7">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(s.id);
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className="group pointer-events-auto flex items-center gap-3"
                >
                  <span
                    className={cn(
                      'h-[11px] w-[11px] rounded-full border-2 transition-[background-color,border-color,transform] duration-base ease-out',
                      isActive ? 'scale-110 border-signal bg-signal' : 'border-line bg-bg group-hover:border-ink-2'
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'font-mono text-[0.68rem] uppercase tracking-wider transition-[opacity,transform,color] duration-base ease-out',
                      isActive
                        ? 'translate-x-0 text-signal-ink opacity-100'
                        : '-translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                    )}
                  >
                    {s.index}
                    <span className="sr-only"> {ui.nav[s.nav]}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
