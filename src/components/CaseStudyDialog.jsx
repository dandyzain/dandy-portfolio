import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Gitlab, Link2 } from 'lucide-react';
import { fmt } from '../data/uiCopy';
import { shortTitle, subtitleOf } from '../data/projectMeta';
import { useCopy } from '../hooks/useCopy';
import { projectUrl } from '../lib/projectUrl';
import Dialog from './ui/Dialog';
import Chip from './ui/Chip';
import Button from './ui/Button';
import ProjectCover from './ProjectCover';
import { useToast } from './ui/Toast';

/** Case study: Context → What I built → Role/Client/Stack/Links, with prev/next. */
export default function CaseStudyDialog({ project, list, onClose, onNavigate }) {
  const { ui, language } = useCopy();
  const toast = useToast();
  const p = ui.projects;

  const index = project ? list.findIndex((x) => x.id === project.id) : -1;
  const prev = index > 0 ? list[index - 1] : list[list.length - 1];
  const next = index >= 0 && index < list.length - 1 ? list[index + 1] : list[0];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(projectUrl(project.slug));
      toast(p.linkCopied);
    } catch {
      /* clipboard blocked — the URL bar already holds the link */
    }
  };

  const links = project
    ? [
        project.liveUrl && { href: project.liveUrl, label: p.live, icon: ExternalLink, primary: true },
        project.githubUrl && { href: project.githubUrl, label: p.github, icon: Github },
        project.gitlabUrl && { href: project.gitlabUrl, label: p.gitlab, icon: Gitlab },
      ].filter(Boolean)
    : [];

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
          <ProjectCover project={project} className="h-44 border-b border-line sm:h-60" showLabel={false} />
          <div className="grid gap-10 px-5 py-8 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {subtitleOf(project.title) && <p className="font-display text-xl font-medium text-ink-2 sm:text-2xl">{subtitleOf(project.title)}</p>}
              <h3 className="eyebrow mb-3 mt-8">{p.context}</h3>
              <p className="leading-relaxed text-ink-2">{project.description[language]}</p>

              <h3 className="eyebrow mb-3 mt-8">{p.features}</h3>
              <ol className="space-y-4">
                {project.features[language].map((f, i) => (
                  <li key={f} className="grid grid-cols-[2rem_1fr] gap-2 leading-relaxed text-ink">
                    <span className="font-mono text-xs leading-7 text-signal-ink">{String(i + 1).padStart(2, '0')}</span>
                    {f}
                  </li>
                ))}
              </ol>
            </div>

            <aside className="space-y-6 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
              <div>
                <h3 className="eyebrow mb-1.5">{p.role}</h3>
                <p className="font-medium">{project.role[language]}</p>
              </div>
              <div>
                <h3 className="eyebrow mb-1.5">{p.client}</h3>
                <p className="text-ink-2">{project.client}</p>
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
              {links.length > 0 && (
                <div>
                  <h3 className="eyebrow mb-2">{p.links}</h3>
                  <div className="flex flex-col gap-2">
                    {links.map(({ href, label, icon: Icon, primary }) => (
                      <Button key={href} href={href} variant={primary ? 'primary' : 'secondary'} size="md" className="justify-start">
                        <Icon size={16} aria-hidden="true" />
                        {label}
                        <span className="sr-only">{ui.common.opensInNewTab}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </article>
      )}
    </Dialog>
  );
}
