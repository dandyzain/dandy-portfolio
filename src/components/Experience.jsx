import React, { useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ArrowUpRight, MapPin, CalendarDays } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sectionIndex } from '../data/sections';
import { shortTitle } from '../data/projectMeta';
import { useCopy } from '../hooks/useCopy';
import { useProjects } from '../hooks/useProjects';
import { openProject, projectPath } from '../lib/projectUrl';
import { cn } from '../lib/cn';
import { duration, ease, spring } from '../lib/motion';
import Section from './ui/Section';
import Chip from './ui/Chip';

const isCurrent = (exp) => /present|sekarang/i.test(exp.period.en);

function ExperienceDetail({ exp, related, language, ui, compact = false }) {
  return (
    <div>
      {compact ? (
        <p className="eyebrow flex flex-wrap items-center gap-2">
          {exp.type}
          <span aria-hidden="true">·</span>
          {exp.location}
        </p>
      ) : (
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <p className="eyebrow mb-2 flex items-center gap-2">
            {exp.type}
            {isCurrent(exp) && (
              <Chip tone="signal" className="!py-0.5 font-sans normal-case tracking-normal">
                {ui.current}
              </Chip>
            )}
          </p>
          <h3 className="text-2xl font-semibold sm:text-3xl">{exp.role}</h3>
          <p className="mt-1 font-medium text-ink-2">{exp.company}</p>
        </div>
        <dl className="space-y-1 text-sm text-muted sm:text-right">
          <div className="flex items-center gap-2 sm:justify-end">
            <dt className="sr-only">{ui.period}</dt>
            <CalendarDays size={14} aria-hidden="true" />
            <dd>{exp.period[language]}</dd>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <dt className="sr-only">{ui.location}</dt>
            <MapPin size={14} aria-hidden="true" />
            <dd>{exp.location}</dd>
          </div>
        </dl>
      </div>
      )}

      <p className={cn('max-w-prose leading-relaxed text-ink-2', compact ? 'mt-4' : 'mt-6')}>{exp.description[language]}</p>

      <h4 className="eyebrow mb-3 mt-8">{ui.contributions}</h4>
      <ul className="space-y-3">
        {exp.highlights[language].map((h) => (
          <li key={h} className="grid grid-cols-[1rem_1fr] gap-3 text-[0.95rem] leading-relaxed text-ink">
            <span className="mt-[0.6rem] h-px w-3 bg-signal" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>

      <h4 className="eyebrow mb-3 mt-8">{ui.stack}</h4>
      <ul className="flex flex-wrap gap-2">
        {exp.techStack.map((tech) => (
          <li key={tech}>
            <Chip mono>{tech}</Chip>
          </li>
        ))}
      </ul>

      {related.length > 0 && (
        <>
          <h4 className="eyebrow mb-3 mt-8">{ui.related}</h4>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {related.map((p) => (
              <li key={p.id}>
                <a
                  href={projectPath(p.slug)}
                  onClick={(e) => {
                    e.preventDefault();
                    openProject(p.slug);
                  }}
                  className="group inline-flex items-center gap-1 text-sm font-semibold text-signal-ink"
                >
                  <span className="link-underline">{shortTitle(p.title)}</span>
                  <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function Experience() {
  const { t, ui, language } = useCopy();
  const { experiences } = portfolioData;
  const projects = useProjects();
  const [selected, setSelected] = useState(experiences[0].id);
  const [openMobile, setOpenMobile] = useState(experiences[0].id);
  const tabRefs = useRef([]);
  const baseId = useId();

  const relatedFor = (exp) => projects.filter((p) => p.client.toLowerCase().includes(exp.company.toLowerCase()));
  const activeIndex = experiences.findIndex((e) => e.id === selected);
  const active = experiences[activeIndex];

  const onTabKey = (e, i) => {
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % experiences.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + experiences.length) % experiences.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = experiences.length - 1;
    if (next === null) return;
    e.preventDefault();
    setSelected(experiences[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section
      id="experience"
      index={sectionIndex('experience')}
      eyebrow={ui.experience.eyebrow}
      title={ui.experience.title}
      intro={t.experience.subtitle}
    >
      {/* Desktop: vertical tabs */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-12">
        <div role="tablist" aria-orientation="vertical" aria-label={ui.experience.listLabel} className="relative col-span-4 border-l border-line">
          {experiences.map((exp, i) => {
            const isSel = exp.id === selected;
            return (
              <button
                key={exp.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`${baseId}-tab-${exp.id}`}
                aria-selected={isSel}
                aria-controls={`${baseId}-panel`}
                tabIndex={isSel ? 0 : -1}
                onClick={() => setSelected(exp.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className="group relative block w-full py-4 pl-6 pr-2 text-left"
              >
                {isSel && (
                  <motion.span layoutId="exp-active" transition={spring} className="absolute -left-px bottom-2 top-2 w-0.5 rounded-full bg-signal" aria-hidden="true" />
                )}
                <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-muted">{exp.period[language]}</span>
                <span className={cn('mt-1 block font-display text-lg font-semibold leading-snug transition-colors', isSel ? 'text-ink' : 'text-ink-2 group-hover:text-ink')}>
                  {exp.company}
                </span>
                <span className="mt-0.5 block text-sm text-muted">{exp.role}</span>
              </button>
            );
          })}
        </div>

        <div className="col-span-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id + language}
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${active.id}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } }}
              exit={{ opacity: 0, y: -6, transition: { duration: duration.fast } }}
              className="rounded-3xl border border-line bg-surface p-8 shadow-card outline-none xl:p-10"
            >
              <ExperienceDetail exp={active} related={relatedFor(active)} language={language} ui={ui.experience} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile/tablet: accordion */}
      <ul className="divide-y divide-line border-y border-line lg:hidden">
        {experiences.map((exp) => {
          const open = openMobile === exp.id;
          const panelId = `${baseId}-m-${exp.id}`;
          return (
            <li key={exp.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenMobile(open ? null : exp.id)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                >
                  <span>
                    <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-muted">{exp.period[language]}</span>
                    <span className="mt-1 block font-display text-lg font-semibold leading-snug">{exp.company}</span>
                    <span className="mt-0.5 block text-sm text-muted">{exp.role}</span>
                  </span>
                  <ChevronDown size={20} aria-hidden="true" className={cn('mt-5 shrink-0 text-muted transition-transform duration-base', open && 'rotate-180')} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, transition: { duration: duration.base, ease: ease.out } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: duration.fast, ease: ease.inOut } }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8">
                      <ExperienceDetail exp={exp} related={relatedFor(exp)} language={language} ui={ui.experience} compact />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
