'use client';

import { motion } from 'framer-motion';
import { tributeContent } from '@/lib/content';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function FinalLetter() {
  const reduced = useReducedMotion();

  return (
    <section
      id="final-letter"
      className="grain relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink-deep px-6 py-32 md:px-12"
      aria-label="Final letter"
    >
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.h2
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-light tracking-wide text-ivory md:text-7xl"
        >
          MOM.
        </motion.h2>
        <motion.h2
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-serif text-5xl font-light tracking-wide text-ivory md:text-7xl"
        >
          DAD.
        </motion.h2>

        <div className="my-16 h-px w-20 bg-gold/30" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-xl font-light leading-relaxed text-ivory-dim md:text-2xl"
        >
          I made this because I wanted you to know something.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 font-serif text-lg font-light leading-relaxed text-ivory-mute md:text-xl"
        >
          When people congratulate me for graduating,
          <br />
          I smile and say thank you.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 font-serif text-lg font-light leading-relaxed text-ivory-mute md:text-xl"
        >
          But somewhere inside,
          <br />
          I know there are three names that belong in that celebration.
        </motion.p>

        <div className="mt-14 space-y-6">
          {['MINE.', 'YOURS.', 'OURS.'].map((word, i) => (
            <motion.h3
              key={word}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl font-light tracking-mega text-gold md:text-6xl"
            >
              {word}
            </motion.h3>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 font-serif text-xl font-light leading-relaxed text-ivory-dim md:text-2xl"
        >
          {tributeContent.finalMessage}
        </motion.p>

        <motion.h2
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 font-serif text-4xl font-light tracking-wide text-ivory md:text-6xl"
        >
          I LOVE YOU.
        </motion.h2>
      </div>
    </section>
  );
}
