import { useCallback, useRef } from 'react';
import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { finePointer } from '../lib/motion';

/**
 * Cursor spotlight: writes the pointer position into --mx / --my on the
 * element so a `.spotlight` overlay (see index.css) can follow it.
 * Returns props to spread on the element.
 */
export function useSpotlight() {
  const onPointerMove = useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  return { onPointerMove };
}

/**
 * Subtle 3D tilt toward the cursor. Returns { ref, style, handlers }.
 * `max` is the maximum rotation in degrees.
 */
export function useTilt(max = 6) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  const enabled = !reduce && finePointer();

  const onPointerMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return {
    ref,
    style: enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined,
    handlers: { onPointerMove, onPointerLeave },
  };
}
