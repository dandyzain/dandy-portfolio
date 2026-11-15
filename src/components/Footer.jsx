import React from 'react';
import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SECTIONS } from '../data/sections';
import { useCopy } from '../hooks/useCopy';
import { scrollToSection } from '../hooks/useActiveSection';
import SplitText from './ui/SplitText';

export default function Footer() {
  const { ui, t } = useCopy();
  const { personal } = portfolioData;

  const social = [
    { href: personal.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: personal.github, label: 'GitHub', icon: Github },
    { href: `mailto:${personal.email}`, label: 'Email', icon: Mail },
  ];

  return (
    <footer className="no-print border-t border-line pb-28 pt-16 md:pb-12">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <SplitText as="p" trigger="view" text={personal.fullName} step={0.08} className="font-display text-display-md font-semibold" />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-2">{t.footer.tagline}</p>
          </div>

          <nav aria-label={ui.footer.navigate} className="md:col-span-3">
            <p className="eyebrow mb-4">{ui.footer.navigate}</p>
            <ul className="space-y-2.5 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(s.id);
                    }}
                    className="link-underline text-ink-2 hover:text-ink"
                  >
                    {ui.nav[s.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">{ui.footer.elsewhere}</p>
            <ul className="space-y-2.5 text-sm">
              {social.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center gap-2 text-ink-2 hover:text-ink"
                  >
                    <Icon size={15} aria-hidden="true" />
                    <span className="link-underline">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {personal.fullName}. {ui.footer.built}
          </p>
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="group inline-flex items-center gap-1.5 self-start font-mono uppercase tracking-wider text-ink-2 hover:text-ink sm:self-auto"
          >
            {ui.footer.backToTop}
            <ArrowUp size={14} aria-hidden="true" className="transition-transform duration-fast group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
