import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { spring } from '../../lib/motion';

/**
 * Small label. `tone`: neutral | signal | amber. `mono` for metadata-style labels.
 * Pass `as="button"` + `selected` for filter chips. Give a group of filter
 * chips the same `pillId` and the selected background slides between them.
 */
export default function Chip({ as: Tag = 'span', tone = 'neutral', mono, selected, pillId, className, children, ...props }) {
  const interactive = Tag === 'button';
  const sliding = interactive && pillId;
  return (
    <Tag
      {...(interactive ? { type: 'button', 'aria-pressed': !!selected } : {})}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        mono && 'font-mono text-[0.72rem] tracking-wide',
        tone === 'neutral' && 'border-line bg-surface text-ink-2',
        tone === 'signal' && 'border-signal/30 bg-signal/10 text-signal-ink',
        tone === 'amber' && 'border-amber/30 bg-amber/10 text-amber-ink',
        interactive && 'h-9 px-3.5 text-sm transition-[color,border-color,transform] duration-fast hover:border-ink/40 active:scale-[0.96]',
        sliding && 'relative isolate',
        interactive && selected && (sliding ? '!border-ink !text-bg' : '!border-ink !bg-ink !text-bg'),
        className
      )}
      {...props}
    >
      {sliding && selected && (
        <motion.span layoutId={pillId} transition={spring} className="absolute inset-0 -z-10 rounded-full bg-ink" aria-hidden="true" />
      )}
      {children}
    </Tag>
  );
}
