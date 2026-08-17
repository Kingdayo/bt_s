'use client';

import { motion } from 'framer-motion';
import { tributeContent } from '@/lib/content';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function WhatICarryForward() {
  const reduced = useReducedMotion();
  const lessons = tributeContent.lessons;

  return (
    <section
      id="carry-forward"
      className="grain relative w-full overflow-hidden bg-ink-soft px-6 py-32 md:px-12 md:py-48"
      aria-label="What I carry forward"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="font-sans text-xs tracking-mega text-gold uppercase">Chapter Ten</p>
          <h2 className="mt-4 font-serif text-3xl font-light text-ivory md:text-5xl">
            What I Carry Forward
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center font-serif text-2xl font-light leading-relaxed text-ivory-dim md:text-3xl"
        >
          Graduation isn&rsquo;t the ending.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-center font-serif text-2xl font-light leading-relaxed text-ivory-dim md:text-3xl"
        >
          It&rsquo;s proof that everything you poured into me
          <br />
          is now going somewhere.
        </motion.p>

        {/* lesson list */}
        <div className="mt-20 space-y-4">
          {lessons.map((lesson, i) => (
            <motion.div
              key={i}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center gap-5 border-b border-ivory/10 pb-4"
            >
              <span className="font-sans text-xs text-gold/60 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <p className="font-serif text-xl font-light text-ivory md:text-2xl">
                  {lesson.title}
                </p>
                <p className="mt-1 font-sans text-sm text-ivory-mute">{lesson.note}</p>
              </div>
              <motion.span
                className="h-2 w-2 rounded-full bg-gold/40"
                animate={reduced ? {} : { scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 text-center font-serif text-lg font-light italic text-gold md:text-xl"
        >
          These aren&rsquo;t just lessons from my childhood.
          <br />
          They&rsquo;re part of the person I&rsquo;m taking into the future.
        </motion.p>
      </div>
    </section>
  );
}
