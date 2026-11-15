import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sectionIndex } from '../data/sections';
import { fmt } from '../data/uiCopy';
import { shortTitle, subtitleOf } from '../data/projectMeta';
import { useCopy } from '../hooks/useCopy';
import { useProjects } from '../hooks/useProjects';
import { useProjectFilter } from '../context/ProjectFilterContext';
import { closeProject, getProjectSlug, onProjectChange, openProject } from '../lib/projectUrl';
import { cn } from '../lib/cn';
import { duration, ease, spring } from '../lib/motion';
import Section from './ui/Section';
import Chip from './ui/Chip';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import ProjectCover from './ProjectCover';
import CaseStudyDialog from './CaseStudyDialog';

const ARCHIVE_PREVIEW = 6;
// Category values as stored in the data (EN labels), index-aligned with translations.
const CATEGORY_VALUES = portfolioData.translations.en.projects.categories;

function caseLink(project) {
  return {
    href: `?project=${project.slug}`,
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // allow open-in-new-tab
      e.preventDefault();
      openProject(project.slug);
    },
  };
}

function FeaturedProject({ project, index, flip, ui, language }) {
  return (
    <Reveal as="article" className="group grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
      <a
        {...caseLink(project)}
        className={cn('block overflow-hidden rounded-3xl border border-line shadow-card transition-shadow duration-base hover:shadow-lift lg:col-span-7', flip && 'lg:order-2')}
        aria-label={`${ui.projects.readCase}: ${shortTitle(project.title)}`}
        tabIndex={-1}
      >
        <ProjectCover project={project} className="aspect-[16/10]" />
      </a>
      <div className={cn('lg:col-span-5', flip && 'lg:order-1')}>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-signal-ink">F/{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line" />
          {project.category}
        </p>
        <h3 className="mt-3 text-display-md font-semibold">
          <a {...caseLink(project)} className="link-underline">
            {shortTitle(project.title)}
          </a>
        </h3>
        {subtitleOf(project.title) && <p className="mt-2 font-medium text-ink-2">{subtitleOf(project.title)}</p>}
        <p className="mt-4 line-clamp-4 leading-relaxed text-ink-2">{project.description[language]}</p>
        <p className="mt-4 text-sm text-muted">{project.client}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <li key={tag}>
              <Chip mono>{tag}</Chip>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button {...caseLink(project)}>
            {ui.projects.readCase}
            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-fast group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </Button>
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="secondary">
              <ExternalLink size={15} aria-hidden="true" />
              {ui.projects.live}
              <span className="sr-only">{ui.common.opensInNewTab}</span>
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, ui, language }) {
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } }}
      exit={{ opacity: 0, transition: { duration: duration.fast } }}
      className="list-none"
    >
      <a
        {...caseLink(project)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,box-shadow,border-color] duration-base ease-out hover:-translate-y-1 hover:border-ink/25 hover:shadow-lift"
      >
        <ProjectCover project={project} className="aspect-[16/8] border-b border-line" showLabel={false} />
        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">{project.category}</p>
          <h3 className="mt-1.5 text-lg font-semibold leading-snug">{shortTitle(project.title)}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-2">{project.description[language]}</p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <span className="truncate text-xs text-muted">{project.client}</span>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-signal-ink">
              <span className="sr-only">{ui.projects.readCase}</span>
              <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </a>
    </motion.li>
  );
}

export default function Projects() {
  const { t, ui, language } = useCopy();
  const projects = useProjects();
  const { skill, setSkill } = useProjectFilter();
  const [category, setCategory] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [slug, setSlug] = useState(getProjectSlug);

  useEffect(() => onProjectChange(setSlug), []);

  const featured = useMemo(() => projects.filter((p) => p.featured).sort((a, b) => a.featured - b.featured), [projects]);
  const archive = useMemo(() => projects.filter((p) => !p.featured), [projects]);
  const ordered = useMemo(() => [...featured, ...archive], [featured, archive]);

  const isFiltering = category !== 0 || !!skill;
  const filtered = useMemo(() => {
    return ordered.filter((p) => {
      const okCat = category === 0 || p.category === CATEGORY_VALUES[category];
      const okSkill = !skill || skill.ids.includes(p.id);
      return okCat && okSkill;
    });
  }, [ordered, category, skill]);

  // When a skill filter arrives from the Skills section, reset category.
  useEffect(() => {
    if (skill) setCategory(0);
  }, [skill]);

  const active = slug ? ordered.find((p) => p.slug === slug) || null : null;
  const navList = isFiltering && active && filtered.some((p) => p.id === active.id) ? filtered : ordered;

  const gridItems = isFiltering ? filtered : expanded ? archive : archive.slice(0, ARCHIVE_PREVIEW);

  const navigate = (p) => {
    openProject(p.slug, { replace: true });
    requestAnimationFrame(() => {
      document.querySelector('[role="dialog"] .overflow-y-auto')?.scrollTo({ top: 0 });
    });
  };

  return (
    <Section
      id="projects"
      index={sectionIndex('projects')}
      eyebrow={ui.projects.eyebrow}
      title={ui.projects.title}
      intro={t.projects.subtitle}
    >
      {/* Filters */}
      <div className="mb-12 flex flex-col gap-4 border-y border-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label={ui.projects.filterLabel} className="flex flex-wrap gap-2">
          {t.projects.categories.map((label, i) => (
            <Chip key={label} as="button" selected={category === i} onClick={() => setCategory(i)}>
              {i === 0 ? ui.projects.all : label}
            </Chip>
          ))}
          {skill && (
            <Chip tone="signal" className="h-9 gap-2 pl-3.5 pr-1.5 text-sm">
              {fmt(ui.projects.skillFilter, { skill: skill.label })}
              <button
                type="button"
                onClick={() => setSkill(null)}
                className="grid h-6 w-6 place-items-center rounded-full hover:bg-signal/20"
                aria-label={ui.projects.clearFilter}
                title={ui.projects.clearFilter}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </Chip>
          )}
        </div>
        <p className="font-mono text-xs text-muted" aria-live="polite">
          {fmt(ui.projects.showing, { n: isFiltering ? filtered.length : projects.length, total: projects.length })}
        </p>
      </div>

      {!isFiltering && (
        <div className="space-y-20 sm:space-y-28">
          {featured.map((p, i) => (
            <FeaturedProject key={p.id} project={p} index={i} flip={i % 2 === 1} ui={ui} language={language} />
          ))}
        </div>
      )}

      {!isFiltering && (
        <h3 className="eyebrow mb-6 mt-24 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-line" />
          {ui.projects.archive}
        </h3>
      )}

      {gridItems.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line py-16 text-center text-muted">{ui.projects.empty}</p>
      ) : (
        <LayoutGroup>
          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {gridItems.map((p) => (
                <ProjectCard key={p.id} project={p} ui={ui} language={language} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      )}

      {!isFiltering && archive.length > ARCHIVE_PREVIEW && (
        <div className="mt-10 flex justify-center">
          <Button variant="secondary" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? ui.projects.showLess : fmt(ui.projects.showMore, { n: archive.length })}
          </Button>
        </div>
      )}

      <CaseStudyDialog project={active} list={navList} onClose={closeProject} onNavigate={navigate} />
    </Section>
  );
}
