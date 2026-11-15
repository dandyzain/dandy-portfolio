import React from 'react';
import { motion } from 'framer-motion';
import { duration, ease, viewportOnce } from '../../lib/motion';

/** One-shot scroll reveal wrapper (fade + 12px rise). */
export default function Reveal({ as = 'div', delay = 0, className, children, ...props }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: duration.slow, ease: ease.out, delay }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}
