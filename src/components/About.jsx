import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useCopy } from '../hooks/useCopy';
import { sectionIndex } from '../data/sections';
import { reveal, stagger, viewportOnce } from '../lib/motion';
import Section from './ui/Section';
import Reveal from './ui/Reveal';

export default function About() {
  const { t, ui, language } = useCopy();
  const { personal } = portfolioData;
  const [lead, ...rest] = personal.bio[language];

  return (
    <Section
      id="about"
      index={sectionIndex('about')}
      eyebrow={ui.about.eyebrow}
      title={ui.about.title}
      intro={t.about.subtitle}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="text-lg font-medium leading-relaxed text-ink sm:text-xl">{lead}</p>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-2">
            {rest.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <h3 className="eyebrow mb-4">{ui.about.principles}</h3>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {t.about.principles.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                  <Check size={16} className="mt-0.5 shrink-0 text-signal-ink" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted">
            <MapPin size={15} aria-hidden="true" />
            <span>
              {ui.about.basedIn} <span className="font-medium text-ink-2">{personal.location[language]}</span>
            </span>
          </p>
        </Reveal>

        <div className="lg:col-span-5">
          <h3 className="eyebrow mb-2">{ui.about.whatIDo}</h3>
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger(0.08)}
            className="divide-y divide-line border-y border-line"
          >
            {t.about.cards.map((card, i) => (
              <motion.li key={card.title} variants={reveal} className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-5">
                <span className="font-mono text-xs text-signal-ink">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4 className="text-base font-semibold">{card.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{card.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </Section>
  );
}
