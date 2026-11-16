import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { stagger, viewportOnce, wordRise } from '../../lib/motion';

/**
 * Heading text that rises in word by word from behind a mask.
 *
 * - `trigger="view"` (default) plays once when scrolled into view.
 * - `trigger="mount"` plays on first render (hero).
 * - `trigger="inherit"` follows a parent's hidden → visible variants. Avoid it
 *   for text that changes (e.g. on language switch): words mounted after the
 *   parent has already played would stay hidden.
 *
 * The root is keyed by `text`, so a language switch remounts it and the
 * words animate in again instead of getting stuck behind the mask.
 *
 * Screen readers get the plain text once (aria-label); the animated word
 * spans are hidden from them.
 */
/**
 * `decorate(word, index)` may return { className, after } for a word:
 * `className` styles the word (e.g. a gradient accent) and `after` renders an
 * element outside the mask (e.g. a drawn underline), positioned under it.
 */
export default function SplitText({ text, as = 'span', className, wordClassName, decorate, step = 0.045, delay = 0, trigger = 'view', ...rest }) {
  const Comp = motion[as] || motion.span;
  const words = String(text).split(/\s+/).filter(Boolean);

  const triggerProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'visible' }
      : trigger === 'view'
        ? { initial: 'hidden', whileInView: 'visible', viewport: viewportOnce }
        : {};

  return (
    <Comp key={text} aria-label={text} className={className} variants={stagger(step, delay)} {...triggerProps} {...rest}>
      {words.map((word, i) => {
        const deco = decorate?.(word, i) || null;
        const parts = word.split(/(?<=-)/);
        return (
        <React.Fragment key={`${word}-${i}`}>
          {/* Hyphenated words ("mission-critical") may still break after the hyphen */}
          {parts.map((part, j) => {
            const mask = (
              <span
                aria-hidden="true"
                // Mask: generous bottom padding (offset by negative margin) so
                // descenders aren't clipped while the word slides up.
                className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top"
              >
                <motion.span variants={wordRise} className={cn('inline-block will-change-transform', wordClassName, deco?.className)}>
                  {part}
                </motion.span>
              </span>
            );
            return (
              <React.Fragment key={j}>
                {j > 0 && <wbr />}
                {deco?.after ? (
                  <span className="relative inline-block align-top">
                    {mask}
                    {deco.after}
                  </span>
                ) : (
                  mask
                )}
              </React.Fragment>
            );
          })}
          {/* Real space between masks keeps normal line wrapping */}
          {i < words.length - 1 && ' '}
        </React.Fragment>
        );
      })}
    </Comp>
  );
}
