import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { reveal, viewportOnce } from '../../lib/motion';

/**
 * Editorial section shell: mono index + eyebrow, large heading, optional intro,
 * and an `aside` slot on the right of the heading (for actions or filters).
 * `data-section` is read by the scroll-spy and the cable line.
 */
export default function Section({ id, index, eyebrow, title, intro, aside, className, headerClassName, children }) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} data-section aria-labelledby={headingId} className={cn('relative py-20 sm:py-28', className)}>
      <div className="container-page">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reveal}
          className={cn('mb-10 grid gap-6 sm:mb-14 lg:grid-cols-12 lg:items-end', headerClassName)}
        >
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4 flex items-center gap-3">
              {index && <span className="text-signal-ink">{index}</span>}
              <span aria-hidden="true" className="h-px w-8 bg-line" />
              <span>{eyebrow}</span>
            </p>
            <h2 id={headingId} className="text-display-lg font-semibold">
              {title}
            </h2>
            {intro && <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-2 sm:text-lg">{intro}</p>}
          </div>
          {aside && <div className="lg:col-span-4 lg:justify-self-end">{aside}</div>}
        </motion.header>
        {children}
      </div>
    </section>
  );
}
