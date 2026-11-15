import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sectionIndex } from '../data/sections';
import { projectsForSkill } from '../data/skillMap';
import { fmt } from '../data/uiCopy';
import { useCopy } from '../hooks/useCopy';
import { useProjects } from '../hooks/useProjects';
import { useProjectFilter } from '../context/ProjectFilterContext';
import { scrollToSection } from '../hooks/useActiveSection';
import { reveal, stagger, viewportOnce } from '../lib/motion';
import Section from './ui/Section';

const GROUPS = ['frontend', 'backend', 'mobile', 'aiAndTools'];

export default function Skills() {
  const { t, ui } = useCopy();
  const projects = useProjects();
  const { setSkill } = useProjectFilter();

  const groups = useMemo(
    () =>
      GROUPS.map((id) => ({
        id,
        title: t.skills.groups[id].title,
        desc: t.skills.groups[id].desc,
        items: portfolioData.skills[id].map((s) => ({ ...s, ids: projectsForSkill(s.name, projects) })),
      })),
    [t, projects]
  );

  const showProjects = (skill) => {
    setSkill({ label: skill.name, ids: skill.ids });
    scrollToSection('projects');
  };

  return (
    <Section id="skills" index={sectionIndex('skills')} eyebrow={ui.skills.eyebrow} title={ui.skills.title} intro={ui.skills.intro}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger(0.08)}
        className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2"
      >
        {groups.map((g, gi) => (
          <motion.article key={g.id} variants={reveal} className="flex flex-col bg-surface p-6 sm:p-8">
            <p className="font-mono text-xs text-signal-ink">L{gi + 1}</p>
            <h3 className="mt-2 text-xl font-semibold">{g.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{g.desc}</p>
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {g.items.map((s) => {
                const n = s.ids?.length || 0;
                return (
                  <li key={s.name} className="flex items-center justify-between gap-3 py-2.5">
                    <span className="min-w-0">
                      <span className="text-[0.95rem] font-medium text-ink">{s.name}</span>
                      {s.tag && <span className="ml-2 hidden font-mono text-[0.68rem] uppercase tracking-wide text-muted sm:inline">{s.tag}</span>}
                    </span>
                    {n > 0 ? (
                      <button
                        type="button"
                        onClick={() => showProjects(s)}
                        aria-label={fmt(ui.skills.showProjects, { n, skill: s.name })}
                        title={n === 1 ? ui.skills.usedInOne : fmt(ui.skills.usedIn, { n })}
                        className="group inline-flex h-8 shrink-0 items-center gap-1 rounded-full border border-line px-2.5 font-mono text-xs font-semibold text-ink-2 transition-colors duration-fast hover:border-signal hover:bg-signal/10 hover:text-signal-ink"
                      >
                        {n}
                        <ArrowUpRight size={13} aria-hidden="true" className="transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    ) : (
                      <span className="shrink-0 font-mono text-[0.68rem] uppercase tracking-wide text-muted">{s.ids === null ? ui.skills.practice : '—'}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
