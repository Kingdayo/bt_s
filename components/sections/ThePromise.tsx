'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const CHOICES = ['Get a job', 'Build something', 'Keep learning', 'Make my parents proud'];

export function ThePromise() {
  const [selected, setSelected] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <section
      id="promise"
      className="grain relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink px-6 py-32 md:px-12"
      aria-label="The promise"
    >
      <div className="pointer-events-none absolute inset-0 bg-gold-glow opacity-20" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-sans text-xs tracking-mega text-gold uppercase"
        >
          Chapter Twelve
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-center font-serif text-2xl font-light text-ivory-dim md:text-4xl"
        >
          So what happens after graduation?
        </motion.h2>

        <div className="mt-16 flex w-full flex-col gap-3 md:gap-4">
          {CHOICES.map((choice, i) => {
            const isFinal = i === CHOICES.length - 1;
            const isPicked = selected === i;
            return (
              <motion.button
                key={choice}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => isFinal && setSelected(i)}
                disabled={!isFinal || isPicked}
                className={`group flex items-center justify-center rounded-full border px-6 py-3.5 font-sans text-sm tracking-wide transition-all md:text-base ${
                  isPicked
                    ? 'border-gold bg-gold/10 text-gold'
                    : isFinal
                      ? 'border-gold/40 text-ivory hover:border-gold hover:bg-gold/5 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50'
                      : 'border-ivory/15 text-ivory-mute hover:border-ivory/30'
                }`}
              >
                {choice}
                {isPicked && <span className="ml-2 text-gold">&#10003;</span>}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected === CHOICES.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 flex flex-col items-center text-center"
            >
              <h2 className="font-serif text-4xl font-light tracking-wide text-gold md:text-6xl">
                MAKE THEM PROUD.
              </h2>
              <p className="mt-6 font-serif text-xl font-light italic text-ivory-dim md:text-2xl">
                Already in progress.
              </p>
              <p className="mt-4 font-serif text-base font-light text-ivory-mute md:text-lg">
                This degree is only the beginning.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
