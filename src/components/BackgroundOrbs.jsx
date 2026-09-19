import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Orb 1: Pastel Lavender (Top Left) */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-pastel-lavender/40 dark:bg-indigo-950/30 blur-3xl"
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2: Pastel Mint (Top Right) */}
      <motion.div
        className="absolute top-1/4 -right-20 w-[28rem] h-[28rem] rounded-full bg-pastel-mint/35 dark:bg-emerald-950/25 blur-3xl"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 3: Pastel Peach / Rose (Middle Left) */}
      <motion.div
        className="absolute top-2/3 -left-32 w-[32rem] h-[32rem] rounded-full bg-pastel-peach/35 dark:bg-rose-950/25 blur-3xl"
        animate={{
          x: [0, 70, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 4: Pastel Sky (Bottom Right) */}
      <motion.div
        className="absolute -bottom-20 right-1/4 w-[30rem] h-[30rem] rounded-full bg-pastel-sky/35 dark:bg-sky-950/25 blur-3xl"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 5: Pastel Lilac (Center Subtle) */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-pastel-lilac/30 dark:bg-purple-950/20 blur-3xl"
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
