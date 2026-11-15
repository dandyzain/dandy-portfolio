import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sectionIndex } from '../data/sections';
import { fmt } from '../data/uiCopy';
import { clientLabel, shortTitle, subtitleOf } from '../data/projectMeta';
import { useCopy } from '../hooks/useCopy';
import { useProjects } from '../hooks/useProjects';
import { useProjectFilter } from '../context/ProjectFilterContext';
import { closeProject, getProjectSlug, onProjectChange, openProject, projectPath } from '../lib/projectUrl';
import { track } from '../lib/analytics';
import { cn } from '../lib/cn';
import { drawLine, duration, ease, pop, rowRise, stagger, viewportOnce } from '../lib/motion';
import { useSpotlight } from '../hooks/usePointerFx';
import Section from './ui/Section';
import Chip from './ui/Chip';
import Button from './ui/Button';
import ProjectCover from './ProjectCover';
import CaseStudyDialog from './CaseStudyDialog';

const ARCHIVE_PREVIEW = 6;
// Category values as stored in the data (EN labels), index-aligned with translations.
const CATEGORY_VALUES = portfolioData.translations.en.projects.categories;

function caseLink(project) {
  return {
    href: projectPath(project.slug),
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // allow open-in-new-tab
      e.preventDefault();
      openProject(project.slug);
    },
  };
}

// Cover slides in from its side and settles; text rises line by line.
const coverIn = (flip) => ({
  hidden: { opacity: 0, x: flip ? 32 : -32, scale: 0.97 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: duration.story, ease: ease.out } },
});

function FeaturedProject({ project, index, flip, ui, language }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Parallax: the cover image drifts inside its frame while the row scrolls by.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-22, 22]);

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(0.07)}
      className="group grid items-center gap-6 lg:grid-cols-12 lg:gap-12"
    >
      <motion.a
        variants={coverIn(flip)}
        {...caseLink(project)}
        className={cn('block overflow-hidden rounded-3xl border border-line shadow-card transition-shadow duration-base hover:shadow-lift lg:col-span-7', flip && 'lg:order-2')}
        aria-label={`${ui.projects.readCase}: ${shortTitle(project.title)}`}
        tabIndex={-1}
      >
        <motion.div style={{ y: drift, scale: reduce ? 1 : 1.08 }}>
          <ProjectCover project={project} className="aspect-[16/10]" sizes="(min-width: 1024px) 40rem, 100vw" />
        </motion.div>
      </motion.a>
      <motion.div variants={stagger(0.06, 0.15)} className={cn('lg:col-span-5', flip && 'lg:order-1')}>
        <motion.p variants={rowRise} className="eyebrow flex items-center gap-3">
          <span className="text-signal-ink">F/{String(index + 1).padStart(2, '0')}</span>
          <motion.span variants={drawLine} aria-hidden="true" className="h-px w-6 origin-left bg-signal/60" />
          {project.category}
        </motion.p>
        <motion.h3 variants={rowRise} className="mt-3 text-display-md font-semibold">
          <a {...caseLink(project)} className="link-underline">
            {shortTitle(project.title)}
          </a>
        </motion.h3>
        {subtitleOf(project.title) && (
          <motion.p variants={rowRise} className="mt-2 font-medium text-ink-2">
            {subtitleOf(project.title)}
          </motion.p>
        )}
        <motion.p variants={rowRise} className="mt-4 line-clamp-4 leading-relaxed text-ink-2">
          {project.description[language]}
        </motion.p>
        <motion.p variants={rowRise} className="mt-4 text-sm text-muted">
          {clientLabel(project, language)}
        </motion.p>
        <motion.ul variants={stagger(0.04)} className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <motion.li key={tag} variants={pop}>
              <Chip mono>{tag}</Chip>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div variants={rowRise} className="mt-7 flex flex-wrap items-center gap-3">
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
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

function ProjectCard({ project, ui, language, index = 0 }) {
  const spotlight = useSpotlight();
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out, delay: (index % 3) * 0.07 } }}
      viewport={viewportOnce}
      exit={{ opacity: 0, transition: { duration: duration.fast } }}
      className="list-none"
    >
      <a
        {...caseLink(project)}
        {...spotlight}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,box-shadow,border-color] duration-base ease-out hover:-translate-y-1 hover:border-ink/25 hover:shadow-lift"
      >
        <span className="spotlight z-10" aria-hidden="true" />
        <ProjectCover project={project} className="aspect-[16/8] border-b border-line" showLabel={false} sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw" />
        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">{project.category}</p>
          <h3 className="mt-1.5 text-lg font-semibold leading-snug">{shortTitle(project.title)}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-2">{project.description[language]}</p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <span className="truncate text-xs text-muted">{clientLabel(project, language)}</span>
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
  const [showAcademic, setShowAcademic] = useState(false);
  const [slug, setSlug] = useState(getProjectSlug);

  useEffect(() => onProjectChange(setSlug), []);

  const featured = useMemo(() => projects.filter((p) => p.featured).sort((a, b) => a.featured - b.featured), [projects]);
  // Professional & personal work first; coursework/exam/concept projects are
  // grouped separately below so they don't dilute the main archive.
  const archive = useMemo(() => projects.filter((p) => !p.featured && !p.academic), [projects]);
  const academic = useMemo(() => projects.filter((p) => p.academic), [projects]);
  const ordered = useMemo(() => [...featured, ...archive, ...academic], [featured, archive, academic]);

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

  // Keep the tab title in sync and record which case studies get read.
  useEffect(() => {
    const base = 'Dandy Rahmat Zain — Full Stack & Mobile Developer';
    document.title = active ? `${shortTitle(active.title)} — Case study · Dandy Rahmat Zain` : base;
    if (active) track('case_study_open', { project: active.slug });
  }, [active]);
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
            <Chip key={label} as="button" pillId="project-filter" selected={category === i} onClick={() => setCategory(i)}>
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
              {gridItems.map((p, i) => (
                <ProjectCard key={p.id} project={p} ui={ui} language={language} index={i} />
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

      {!isFiltering && academic.length > 0 && (
        <div className="mt-20 border-t border-line pt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-prose">
              <h3 className="eyebrow flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-line" />
                {ui.projects.academicGroup}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{ui.projects.academicIntro}</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowAcademic((v) => !v)}
              aria-expanded={showAcademic}
              aria-controls="academic-projects"
              className="shrink-0 self-start sm:self-auto"
            >
              {showAcademic ? ui.projects.hideAcademic : fmt(ui.projects.showAcademic, { n: academic.length })}
            </Button>
          </div>
          {showAcademic && (
            <ul id="academic-projects" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {academic.map((p, i) => (
                <ProjectCard key={p.id} project={p} ui={ui} language={language} index={i} />
              ))}
            </ul>
          )}
        </div>
      )}

      <CaseStudyDialog project={active} list={navList} onClose={closeProject} onNavigate={navigate} />
    </Section>
  );
}
