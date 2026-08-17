'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { StarField } from '@/components/StarField';

const POINTS = [
  { label: 'PAST', x: 18, y: 50 },
  { label: 'PRESENT', x: 50, y: 30 },
  { label: 'FUTURE', x: 82, y: 50 },
];

export function TheFuture() {
  const reduced = useReducedMotion();
  const [expanding, setExpanding] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setExpanding(true);
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="future"
      className="grain relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink-deep px-6 py-32 md:px-12"
      aria-label="The future"
    >
      <StarField density={0.0001} glow />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-sans text-xs tracking-mega text-gold uppercase"
        >
          Chapter Eight
        </motion.p>

        {/* constellation diagram */}
        <div className="relative mt-12 aspect-[2/1] w-full max-w-2xl">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {/* connecting arc */}
            <motion.path
              d="M 18% 50% Q 50% 10%, 82% 50%"
              fill="none"
              stroke="hsl(var(--gold))"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              initial={reduced ? {} : { pathLength: 0 }}
              animate={expanding ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            {/* expanding rings from future */}
            {expanding &&
              [0, 1, 2].map((i) => (
                <motion.circle
                  key={i}
                  cx="82%"
                  cy="50%"
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="0.4"
                  initial={{ r: 0, opacity: 0.6 }}
                  animate={reduced ? {} : { r: [0, 60], opacity: [0.6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'easeOut' }}
                />
              ))}
          </svg>

          {POINTS.map((p, i) => (
            <motion.div
              key={p.label}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0 }}
              animate={expanding ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.4 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex flex-col items-center">
                <span className="h-3 w-3 rounded-full bg-gold shadow-gold" />
                <span className="mt-2 font-sans text-[10px] tracking-display text-ivory-dim md:text-xs">
                  {p.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 text-center font-serif text-2xl font-light text-ivory-dim md:text-3xl"
        >
          I don&rsquo;t know where life takes me from here.
        </motion.p>

        <div className="mt-6 space-y-2 text-center">
          {['I don\u2019t know what I\u2019ll build.', 'I don\u2019t know who I\u2019ll become.', 'I don\u2019t know what challenges are waiting for me.'].map(
            (line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.3 }}
                className="font-serif text-lg font-light italic text-ivory-mute md:text-xl"
              >
                {line}
              </motion.p>
            ),
          )}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 text-center font-serif text-xl font-light text-ivory-dim md:text-2xl"
        >
          But I know something I didn&rsquo;t know when I started this journey.
        </motion.p>

        <div className="mt-10 space-y-3 text-center">
          <motion.h2
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl font-light text-gold md:text-5xl"
          >
            Wherever I go,
          </motion.h2>
          <motion.h2
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl font-light text-gold md:text-5xl"
          >
            I carry what you gave me.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
