'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-40 h-[2px] w-full origin-left bg-gradient-to-r from-gold/0 via-gold to-gold/0"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
