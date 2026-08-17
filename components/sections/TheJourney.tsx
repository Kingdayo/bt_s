'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { tributeContent } from '@/lib/content';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function TheJourney() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);

  const milestones = tributeContent.milestones;

  return (
    <section
      ref={ref}
      id="journey"
      className="grain relative w-full overflow-hidden bg-ink px-6 py-32 md:px-12 md:py-48"
      aria-label="The journey"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <p className="font-sans text-xs tracking-mega text-gold uppercase">Chapter Two</p>
          <h2 className="mt-4 font-serif text-3xl font-light text-ivory md:text-5xl">
            The Journey
          </h2>
          <p className="mt-6 font-serif text-lg font-light italic text-ivory-mute md:text-xl">
            A path I walked. A path you lit.
          </p>
        </motion.div>

        <div className="relative">
          {/* track */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-ivory/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineScaleY, opacity: progressOpacity }}
            className="absolute left-[7px] top-0 h-full w-px origin-top bg-gradient-to-b from-gold/80 via-gold/50 to-gold/20 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((m, i) => (
              <JourneyNode key={i} index={i} milestone={m} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyNode({
  index,
  milestone,
  reduced,
}: {
  index: number;
  milestone: (typeof tributeContent.milestones)[number];
  reduced: boolean;
}) {
  const isLeft = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* node dot */}
      <div className="absolute left-0 top-1.5 z-10 md:relative md:top-0 md:flex md:w-1/2 md:justify-center">
        <div className="relative flex h-[15px] w-[15px] items-center justify-center">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-[15px] w-[15px] rounded-full border border-gold/50 bg-ink"
          />
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1.6, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute h-[15px] w-[15px] rounded-full border border-gold/40"
          />
        </div>
      </div>

      {/* content */}
      <div className={`ml-8 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
        <h3 className="font-serif text-xl font-light text-ivory md:text-2xl">
          {milestone.title}
        </h3>
        <p className="mt-1 font-sans text-sm text-ivory-mute">{milestone.description}</p>
      </div>
    </motion.div>
  );
}
