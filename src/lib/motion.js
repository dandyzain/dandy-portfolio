// Motion tokens — the single source for durations, easings and shared variants.
// Rule: animate transform/opacity only; one-shot reveals; no infinite loops.

export const duration = {
  instant: 0.1,
  fast: 0.18,
  base: 0.28,
  slow: 0.45,
  story: 0.8,
};

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
};

export const spring = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' };

// Fade + 12px rise, used for section content
export const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export const stagger = (step = 0.06, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
});

export const dialogMotion = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: duration.base } },
    exit: { opacity: 0, transition: { duration: duration.fast } },
  },
  panel: {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: duration.slow, ease: ease.out } },
    exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: duration.fast, ease: ease.inOut } },
  },
};
