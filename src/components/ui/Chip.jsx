import React from 'react';
import { cn } from '../../lib/cn';

/**
 * Small label. `tone`: neutral | signal | amber. `mono` for metadata-style labels.
 * Pass `as="button"` + `selected` for filter chips.
 */
export default function Chip({ as: Tag = 'span', tone = 'neutral', mono, selected, className, children, ...props }) {
  const interactive = Tag === 'button';
  return (
    <Tag
      {...(interactive ? { type: 'button', 'aria-pressed': !!selected } : {})}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        mono && 'font-mono text-[0.72rem] tracking-wide',
        tone === 'neutral' && 'border-line bg-surface text-ink-2',
        tone === 'signal' && 'border-signal/30 bg-signal/10 text-signal-ink',
        tone === 'amber' && 'border-amber/30 bg-amber/10 text-amber-ink',
        interactive && 'h-9 px-3.5 text-sm transition-colors duration-fast hover:border-ink/40',
        interactive && selected && '!border-ink !bg-ink !text-bg',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
