import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Eye, Search, ShieldCheck, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sectionIndex } from '../data/sections';
import { fmt } from '../data/uiCopy';
import { useCopy } from '../hooks/useCopy';
import { reveal, rowRise, stagger, viewportOnce } from '../lib/motion';
import Section from './ui/Section';
import Chip from './ui/Chip';
import Button from './ui/Button';
import CertificateModal from './CertificateModal';

const PREVIEW = 10;
const CATEGORY_IDS = ['all', 'ai', 'python', 'hki', 'industry'];

export default function EducationCerts() {
  const { t, ui, language } = useCopy();
  const { education, certifications } = portfolioData;
  const c = ui.credentials;

  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return certifications.filter((cert) => {
      const okCat = category === 'all' || cert.category === category;
      const okQ =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q)) ||
        (cert.categoryLabel && cert.categoryLabel[language].toLowerCase().includes(q));
      return okCat && okQ;
    });
  }, [certifications, category, query, language]);

  const isFiltering = category !== 'all' || query.trim() !== '';
  const visible = isFiltering || expanded ? filtered : filtered.slice(0, PREVIEW);

  const openCert = (cert) => {
    setSelected(cert);
    setOpen(true);
  };

  const categoryLabel = (id) => {
    const label = t.education.categories?.[id] || id;
    return id === 'all' ? `${ui.projects.all} (${certifications.length})` : label;
  };

  return (
    <Section
      id="education"
      index={sectionIndex('education')}
      eyebrow={c.eyebrow}
      title={c.title}
      intro={t.education.subtitle}
    >
      {/* Education */}
      <h3 className="eyebrow mb-4">{c.education}</h3>
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger(0.08)}
        className="mb-20 divide-y divide-line border-y border-line"
      >
        {education.map((edu) => (
          <motion.li key={edu.institution} variants={reveal} className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
            <p className="font-mono text-xs uppercase tracking-wider text-muted md:col-span-3 md:pt-1.5">{edu.period}</p>
            <div className="md:col-span-5">
              <h4 className="text-xl font-semibold">{edu.institution}</h4>
              <p className="mt-1 font-medium text-signal-ink">{edu.degree[language]}</p>
              <p className="mt-1 text-sm text-muted">{edu.location}</p>
            </div>
            <p className="text-sm leading-relaxed text-ink-2 md:col-span-4">{edu.description[language]}</p>
          </motion.li>
        ))}
      </motion.ol>

      {/* Certifications */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="eyebrow mb-4">{c.certifications}</h3>
          <div role="group" aria-label={c.certifications} className="flex flex-wrap gap-2">
            {CATEGORY_IDS.map((id) => (
              <Chip key={id} as="button" pillId="cert-filter" selected={category === id} onClick={() => setCategory(id)}>
                {categoryLabel(id)}
              </Chip>
            ))}
          </div>
        </div>
        <div className="relative w-full lg:w-80">
          <label htmlFor="cert-search" className="sr-only">
            {c.searchLabel}
          </label>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="cert-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.education.searchPlaceholder}
            className="h-11 w-full rounded-xl border border-line bg-surface pl-10 pr-10 text-sm text-ink placeholder:text-muted focus:border-signal-ink focus:outline-none focus:ring-2 focus:ring-signal/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink"
              aria-label={c.clearSearch}
              title={c.clearSearch}
            >
              <X size={15} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="mb-3 font-mono text-xs text-muted" aria-live="polite">
        {fmt(c.results, { n: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line py-14 text-center text-muted">{c.noResults}</p>
      ) : (
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.035)}
          className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface"
        >
          {visible.map((cert) => (
            <motion.li key={cert.id} variants={rowRise} className="group grid gap-3 px-5 py-4 transition-colors hover:bg-surface-2/60 sm:grid-cols-12 sm:items-center sm:gap-6">
              <div className="min-w-0 sm:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-sans text-[0.95rem] font-semibold leading-snug">{cert.title}</h4>
                  {cert.isSpecialization && (
                    <Chip tone="amber" className="!py-0 !text-[0.68rem]">
                      <Award size={11} aria-hidden="true" />
                      {c.specialization}
                    </Chip>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">
                  {cert.issuer}
                  {cert.issueDate && <span aria-hidden="true"> · </span>}
                  {cert.issueDate}
                </p>
              </div>
              <p className="hidden truncate font-mono text-xs text-muted sm:col-span-2 sm:block">{cert.credentialId || ''}</p>
              <div className="flex items-center gap-2 sm:col-span-3 sm:justify-end">
                <Button variant="secondary" size="sm" onClick={() => openCert(cert)} aria-label={`${c.view}: ${cert.title}`}>
                  <Eye size={15} aria-hidden="true" />
                  {c.view}
                </Button>
                {cert.credentialUrl && (
                  <Button variant="ghost" size="sm" href={cert.credentialUrl} aria-label={`${c.verify}: ${cert.title} ${ui.common.opensInNewTab}`}>
                    <ShieldCheck size={15} aria-hidden="true" />
                    <span className="hidden xl:inline">{c.verify}</span>
                  </Button>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {!isFiltering && filtered.length > PREVIEW && (
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? ui.projects.showLess : fmt(c.showAll, { n: filtered.length })}
          </Button>
        </div>
      )}

      <CertificateModal isOpen={open} onClose={() => setOpen(false)} certificate={selected} />
    </Section>
  );
}
