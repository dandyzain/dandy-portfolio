import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { ease } from '../../lib/motion';

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const STYLES = {
  // Highlighter stroke behind the lower half of the phrase
  marker: { image: 'linear-gradient(rgb(var(--c-signal) / 0.22), rgb(var(--c-signal) / 0.22))', size: '100% 42%', position: '0 92%' },
  // Thin underline
  underline: { image: 'linear-gradient(rgb(var(--c-signal)), rgb(var(--c-signal)))', size: '100% 2px', position: '0 100%' },
};

/**
 * Plain text where the given phrases sweep in a highlight one after another
 * (left → right, wrapping across lines). Longer phrases win over shorter
 * overlapping ones ("React Native" before "React").
 */
export default function MarkedText({ text, marks = [], variant = 'marker', delay = 0.8, step = 0.18, duration = 0.6, markClassName }) {
  const reduce = useReducedMotion();
  if (!marks.length) return text;

  const sorted = [...marks].sort((a, b) => b.length - a.length);
  const re = new RegExp(`(${sorted.map(escapeRe).join('|')})`, 'g');
  const parts = String(text).split(re);
  const style = STYLES[variant];
  const [w, hgt] = style.size.split(' ');
  let n = 0;

  return parts.map((part, i) => {
    if (!sorted.includes(part)) return <React.Fragment key={i}>{part}</React.Fragment>;
    const order = n;
    n += 1;
    return (
      <motion.span
        key={i}
        className={cn('[box-decoration-break:clone] [-webkit-box-decoration-break:clone]', markClassName)}
        style={{ backgroundImage: style.image, backgroundRepeat: 'no-repeat', backgroundPosition: style.position }}
        initial={{ backgroundSize: reduce ? `${w} ${hgt}` : `0% ${hgt}` }}
        animate={{ backgroundSize: `${w} ${hgt}`, transition: { duration: reduce ? 0 : duration, ease: ease.out, delay: reduce ? 0 : delay + order * step } }}
      >
        {part}
      </motion.span>
    );
  });
}
