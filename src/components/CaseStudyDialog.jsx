import React from 'react';
import { motion } from 'framer-motion';
import { duration, ease, pop, rowRise, stagger } from '../lib/motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Gitlab, Link2, Lock } from 'lucide-react';
import { fmt } from '../data/uiCopy';
import { caseStudies } from '../data/caseStudies';
import { clientLabel, shortTitle, subtitleOf } from '../data/projectMeta';
import { useCopy } from '../hooks/useCopy';
import { projectUrl } from '../lib/projectUrl';
import { track } from '../lib/analytics';
import Dialog from './ui/Dialog';
import Chip from './ui/Chip';
import Button from './ui/Button';
import ProjectCover, { Screenshot } from './ProjectCover';
import { useToast } from './ui/Toast';

function Block({ title, children }) {
  return (
    <motion.section variants={rowRise} className="mt-10 first:mt-0">
      <h3 className="eyebrow mb-3">{title}</h3>
      {children}
    </motion.section>
  );
}

/**
 * Case study: Problem → What I built → Key decisions → Outcome, with real
 * screenshots when available and Role/Client/Stack/Links in the sidebar.
 */
export default function CaseStudyDialog({ project, list, onClose, onNavigate }) {
  const { ui, language } = useCopy();
  const toast = useToast();
  const p = ui.projects;
  const study = project ? caseStudies[project.slug] : null;

  const index = project ? list.findIndex((x) => x.id === project.id) : -1;
  const prev = index > 0 ? list[index - 1] : list[list.length - 1];
  const next = index >= 0 && index < list.length - 1 ? list[index + 1] : list[0];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(projectUrl(project.slug));
      toast(p.linkCopied);
      track('case_study_link_copied', { project: project.slug });
    } catch {
      /* clipboard blocked — the URL bar already holds the link */
    }
  };

  const links = project
    ? [
        project.liveUrl && { href: project.liveUrl, label: p.live, icon: ExternalLink, primary: true, kind: 'live' },
        project.githubUrl && { href: project.githubUrl, label: p.github, icon: Github, kind: 'github' },
        project.gitlabUrl && { href: project.gitlabUrl, label: p.gitlab, icon: Gitlab, kind: 'gitlab' },
      ].filter(Boolean)
    : [];

  const [heroShot, ...moreShots] = project?.shots || [];

  return (
    <Dialog
      open={!!project}
      onClose={onClose}
      size="xl"
      closeLabel={ui.common.close}
      title={project ? shortTitle(project.title) : ''}
      header={
        project && (
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <Chip tone="signal" mono className="!py-0.5">
              {project.category}
            </Chip>
            {project.academic && (
              <Chip mono className="!py-0.5">
                {p.academicBadge}
              </Chip>
            )}
            <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              {fmt(p.position, { i: index + 1, total: list.length })}
            </span>
          </div>
        )
      }
      footer={
        project && (
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" size="sm" onClick={() => onNavigate(prev)} aria-label={`${p.prev}: ${shortTitle(prev.title)}`}>
              <ArrowLeft size={15} aria-hidden="true" />
              <span className="hidden max-w-[12rem] truncate sm:inline">{shortTitle(prev.title)}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={copyLink}>
              <Link2 size={15} aria-hidden="true" />
              <span className="hidden sm:inline">{p.copyLink}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate(next)} aria-label={`${p.next}: ${shortTitle(next.title)}`}>
              <span className="hidden max-w-[12rem] truncate sm:inline">{shortTitle(next.title)}</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Button>
          </div>
        )
      }
    >
      {project && (
        <article key={project.id}>
          {heroShot ? (
            <figure className="border-b border-line bg-surface-2">
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: duration.story, ease: ease.out, delay: 0.1 } }}
                className="aspect-[16/10] max-h-[28rem] w-full overflow-hidden"
              >
                <Screenshot shot={heroShot} alt={heroShot.alt[language]} sizes="(min-width: 1024px) 64rem, 100vw" eager />
              </motion.div>
            </figure>
          ) : (
            <ProjectCover project={project} className="h-44 border-b border-line sm:h-60" showLabel={false} />
          )}

          <div className="grid gap-10 px-5 py-8 sm:px-8 lg:grid-cols-12">
            <motion.div initial="hidden" animate="visible" variants={stagger(0.08, 0.2)} className="lg:col-span-8">
              {subtitleOf(project.title) && (
                <motion.p variants={rowRise} className="mb-8 font-display text-xl font-medium text-ink-2 sm:text-2xl">
                  {subtitleOf(project.title)}
                </motion.p>
              )}

              {study?.outcomes?.length > 0 && (
                <motion.dl variants={stagger(0.08)} className="mb-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                  {study.outcomes.map((o) => (
                    <motion.div key={o.label.en} variants={pop} className="flex flex-col bg-surface p-5">
                      <dt className="order-2 mt-1 text-sm text-ink-2">{o.label[language]}</dt>
                      <dd className="font-display text-2xl font-semibold tracking-tight text-signal-ink">{o.value}</dd>
                    </motion.div>
                  ))}
                </motion.dl>
              )}

              <Block title={study ? p.problem : p.context}>
                <p className="leading-relaxed text-ink-2">{study ? study.problem[language] : project.description[language]}</p>
              </Block>

              <Block title={p.features}>
                {study && <p className="mb-4 leading-relaxed text-ink-2">{project.description[language]}</p>}
                <ol className="space-y-4">
                  {project.features[language].map((f, i) => (
                    <li key={f} className="grid grid-cols-[2rem_1fr] gap-2 leading-relaxed text-ink">
                      <span className="font-mono text-xs leading-7 text-signal-ink">{String(i + 1).padStart(2, '0')}</span>
                      {f}
                    </li>
                  ))}
                </ol>
              </Block>

              {study?.decisions?.length > 0 && (
                <Block title={p.decisions}>
                  <ul className="space-y-6">
                    {study.decisions.map((d) => (
                      <li key={d.title.en} className="border-l-2 border-signal/40 pl-4">
                        <p className="font-semibold text-ink">{d.title[language]}</p>
                        <p className="mt-1.5 leading-relaxed text-ink-2">{d.body[language]}</p>
                      </li>
                    ))}
                  </ul>
                </Block>
              )}
              {moreShots.length > 0 && (
                <Block title={p.screens}>
                  <div className="space-y-5">
                    {moreShots.map((s) => (
                      <figure key={s.src}>
                        <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface-2">
                          <Screenshot shot={s} alt={s.alt[language]} sizes="(min-width: 1024px) 40rem, 100vw" />
                        </div>
                        <figcaption className="mt-2 text-sm text-muted">{s.alt[language]}</figcaption>
                      </figure>
                    ))}
                  </div>
                </Block>
              )}

            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0, transition: { duration: duration.slow, ease: ease.out, delay: 0.3 } }}
              className="space-y-6 lg:col-span-4 lg:border-l lg:border-line lg:pl-8"
            >
              <div>
                <h3 className="eyebrow mb-1.5">{p.role}</h3>
                <p className="font-medium">{project.role[language]}</p>
              </div>
              <div>
                <h3 className="eyebrow mb-1.5">{project.academic ? p.type : p.client}</h3>
                <p className="text-ink-2">{clientLabel(project, language)}</p>
              </div>
              <div>
                <h3 className="eyebrow mb-2">{p.stack}</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Chip mono>{tag}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
              {(links.length > 0 || project.internal) && (
                <div>
                  <h3 className="eyebrow mb-2">{p.links}</h3>
                  <div className="flex flex-col gap-2">
                    {links.map(({ href, label, icon: Icon, primary, kind }) => (
                      <Button
                        key={href}
                        href={href}
                        variant={primary ? 'primary' : 'secondary'}
                        size="md"
                        className="justify-start"
                        onClick={() => track('project_link_click', { project: project.slug, kind })}
                      >
                        <Icon size={16} aria-hidden="true" />
                        {label}
                        <span className="sr-only">{ui.common.opensInNewTab}</span>
                      </Button>
                    ))}
                    {project.internal && (
                      <p className="flex items-start gap-2 rounded-xl border border-dashed border-line px-3.5 py-3 text-sm text-ink-2">
                        <Lock size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-muted" />
                        {p.internalNote}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        </article>
      )}
    </Dialog>
  );
}
