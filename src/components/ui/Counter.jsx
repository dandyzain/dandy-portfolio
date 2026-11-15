import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { ease } from '../../lib/motion';

/** Counts up to `value` (e.g. "4+", "29") once, when it scrolls into view. */
export default function Counter({ value, duration = 1.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const target = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = String(value).replace(/[0-9]/g, '');
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setN(target);
      return undefined;
    }
    const controls = animate(0, target, {
      duration,
      ease: ease.out,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {/* Screen readers get the final value immediately */}
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
