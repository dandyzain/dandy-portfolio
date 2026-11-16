import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '../../lib/cn';
import { finePointer } from '../../lib/motion';

/**
 * Pulls its child a few pixels toward the cursor, then springs back.
 * Only on fine pointers and when reduced motion is off.
 */
export default function Magnetic({ strength = 0.3, max = 8, className, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });

  const enabled = !reduce && finePointer();
  const clamp = (v) => Math.max(-max, Math.min(max, v));

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={enabled ? { x, y } : undefined}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.div>
  );
}
