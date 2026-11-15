import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { stagger, viewportOnce, wordRise } from '../../lib/motion';

/**
 * Heading text that rises in word by word from behind a mask.
 *
 * - `trigger="inherit"` (default) waits for a parent motion element's
 *   hidden → visible variants (e.g. the Section header's whileInView).
 * - `trigger="mount"` plays on first render (hero).
 * - `trigger="view"` plays once when scrolled into view.
 *
 * Screen readers get the plain text once (aria-label); the animated word
 * spans are hidden from them.
 */
export default function SplitText({ text, as = 'span', className, wordClassName, step = 0.045, delay = 0, trigger = 'inherit', ...rest }) {
  const Comp = motion[as] || motion.span;
  const words = String(text).split(/\s+/).filter(Boolean);

  const triggerProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'visible' }
      : trigger === 'view'
        ? { initial: 'hidden', whileInView: 'visible', viewport: viewportOnce }
        : {};

  return (
    <Comp aria-label={text} className={className} variants={stagger(step, delay)} {...triggerProps} {...rest}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          {/* Hyphenated words ("mission-critical") may still break after the hyphen */}
          {word.split(/(?<=-)/).map((part, j) => (
            <React.Fragment key={j}>
              {j > 0 && <wbr />}
              <span
                aria-hidden="true"
                // Mask: generous bottom padding (offset by negative margin) so
                // descenders aren't clipped while the word slides up.
                className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top"
              >
                <motion.span variants={wordRise} className={cn('inline-block will-change-transform', wordClassName)}>
                  {part}
                </motion.span>
              </span>
            </React.Fragment>
          ))}
          {/* Real space between masks keeps normal line wrapping */}
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Comp>
  );
}
