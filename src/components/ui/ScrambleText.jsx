import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>_·';

/**
 * Mono "signal decode" text: each line resolves letter by letter out of
 * random glyphs, holds, then decodes into the next line. Width is reserved
 * for the longest line so nothing around it shifts.
 *
 * Paused while off-screen or in a background tab; static (first line) for
 * reduced motion. Screen readers get the first line only, once.
 */
export default function ScrambleText({ lines, hold = 2600, charMs = 28, startDelay = 300, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref);
  const [text, setText] = useState(reduce ? lines[0] : '');
  const state = useRef({ index: 0, raf: 0, timer: 0 });

  useEffect(() => {
    const s = state.current;
    if (reduce) {
      setText(lines[0]);
      return undefined;
    }
    if (!inView) return undefined;

    let cancelled = false;
    const decode = (target, from, done) => {
      const start = performance.now();
      const len = Math.max(target.length, from.length);
      const tick = (now) => {
        if (cancelled) return;
        const resolved = Math.floor((now - start) / charMs);
        let out = '';
        for (let i = 0; i < len; i += 1) {
          const ch = target[i];
          if (i < resolved) out += ch ?? ''; // settled (extra old letters vanish)
          else if (ch === ' ') out += ' '; // keep word gaps readable
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(out);
        if (resolved < len) s.raf = requestAnimationFrame(tick);
        else {
          setText(target);
          done();
        }
      };
      s.raf = requestAnimationFrame(tick);
    };

    const next = (from) => {
      const target = lines[s.index % lines.length];
      decode(target, from, () => {
        if (lines.length < 2) return;
        s.timer = window.setTimeout(() => {
          if (document.hidden) {
            // try again when the tab is visible
            s.timer = window.setTimeout(() => next(target), 1000);
            return;
          }
          s.index += 1;
          next(target);
        }, hold);
      });
    };

    s.timer = window.setTimeout(() => next(text || ''), text ? 0 : startDelay);
    return () => {
      cancelled = true;
      cancelAnimationFrame(s.raf);
      clearTimeout(s.timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, lines, hold, charMs, startDelay]);

  return (
    <span ref={ref} className={cn('relative inline-grid', className)}>
      <span className="sr-only">{lines[0]}</span>
      {/* Invisible copies reserve the width of the longest line */}
      {lines.map((l) => (
        <span key={l} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {l}
        </span>
      ))}
      <span aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap">
        {text}
        <span className="ml-0.5 inline-block w-[0.55em] animate-pulse text-signal-ink motion-reduce:hidden">▍</span>
      </span>
    </span>
  );
}
