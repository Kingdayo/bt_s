'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function PhotolessStatement() {
  const reduced = useReducedMotion();

  return (
    <section
      id="photoless"
      className="grain relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink-deep px-6 py-32 md:px-12"
      aria-label="Why there are no photographs"
    >
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-12"
        >
          {/* abstract aperture / lens symbol */}
          <svg width="56" height="56" viewBox="0 0 56 56" className="text-gold/50" aria-hidden="true">
            <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="28" cy="28" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <line x1="28" y1="2" x2="28" y2="54" stroke="currentColor" strokeWidth="0.5" />
            <line x1="2" y1="28" x2="54" y2="28" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-2xl font-light leading-relaxed text-ivory md:text-3xl"
        >
          There are no photographs here.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 font-serif text-xl font-light italic leading-relaxed text-ivory-dim md:text-2xl"
        >
          Not because there aren&rsquo;t memories.
        </motion.p>

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl font-serif text-xl font-light leading-relaxed text-gold md:text-2xl"
        >
          But because some of the most important things you&rsquo;ve given me
          were never captured by a camera.
        </motion.p>
      </div>
    </section>
  );
}
