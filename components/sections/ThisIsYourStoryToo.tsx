'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { StarField } from '@/components/StarField';

export function ThisIsYourStoryToo() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);

  return (
    <section
      ref={ref}
      id="your-story"
      className="grain relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 md:px-12"
      aria-label="This is your story too"
    >
      <StarField density={0.00008} />
      <div className="pointer-events-none absolute inset-0 bg-gold-glow opacity-40" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-2xl font-light leading-relaxed text-ivory-dim md:text-3xl"
        >
          Before I became a computer scientist,
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-serif text-2xl font-light leading-relaxed text-ivory-dim md:text-3xl"
        >
          I was simply your child.
        </motion.p>

        <div className="my-12 h-px w-16 bg-gold/30 md:my-16" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-2xl font-light leading-relaxed text-ivory-dim md:text-3xl"
        >
          And before this degree became mine,
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-serif text-2xl font-light leading-relaxed text-ivory-dim md:text-3xl"
        >
          this journey was ours.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 font-serif text-3xl font-light tracking-display text-gold md:mt-24 md:text-5xl"
        >
          THIS IS YOUR STORY TOO.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 max-w-md font-sans text-sm leading-relaxed text-ivory-mute md:text-base"
        >
          This is my attempt to tell you what I don&rsquo;t say often enough.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory-mute"
        aria-hidden="true"
      >
        <ChevronDown className="animate-float" size={20} />
      </motion.div>
    </section>
  );
}
