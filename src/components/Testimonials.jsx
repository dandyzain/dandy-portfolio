import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { useCopy } from '../hooks/useCopy';
import { reveal, stagger, viewportOnce } from '../lib/motion';
import Section from './ui/Section';

/** Social proof. Renders nothing until src/data/testimonials.js has entries. */
export default function Testimonials() {
  const { ui, language } = useCopy();
  if (!testimonials.length) return null;
  const c = ui.testimonials;

  return (
    <Section id="testimonials" eyebrow={c.eyebrow} title={c.title}>
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger(0.08)}
        className="grid gap-5 md:grid-cols-2"
      >
        {testimonials.map((t) => (
          <motion.li key={t.name} variants={reveal} className="flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
            <Quote size={22} aria-hidden="true" className="text-signal-ink" />
            <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink">“{t.quote[language]}”</blockquote>
            <footer className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-ink-2">{t.role[language]}</p>
                {t.relation && <p className="mt-0.5 font-mono text-[0.68rem] uppercase tracking-wider text-muted">{t.relation[language]}</p>}
              </div>
              {t.source && (
                <a
                  href={t.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-signal-ink hover:underline"
                >
                  {c.source}
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only">{ui.common.opensInNewTab}</span>
                </a>
              )}
            </footer>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
