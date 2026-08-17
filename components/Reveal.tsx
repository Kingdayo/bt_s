'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'section';
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  once = true,
  as = 'div',
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' });
  const reduced = useReducedMotion();

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : y }}
      transition={{ duration: reduced ? 0.3 : 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.08,
  once = true,
}: WordRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: '110%' }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: reduced ? 0.3 : 0.7,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
