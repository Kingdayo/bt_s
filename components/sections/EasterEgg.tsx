'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Binary } from 'lucide-react';
import { loveBinary, loveBinaryDecoded } from '@/lib/content';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function EasterEgg() {
  const [decoded, setDecoded] = useState(false);
  const reduced = useReducedMotion();

  return (
    <section
      id="easter-egg"
      className="grain relative w-full overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-32"
      aria-label="A hidden message"
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Binary className="mx-auto text-gold/40" size={24} />
          <p className="mt-4 font-mono text-xs leading-relaxed text-ivory-mute break-words md:text-sm">
            {loveBinary}
          </p>

          <button
            onClick={() => setDecoded(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2 font-sans text-xs tracking-wide text-ivory-dim transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
          >
            Decode this
          </button>
        </motion.div>

        <AnimatePresence>
          {decoded && (
            <motion.h2
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: reduced ? 0.4 : 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-serif text-4xl font-light tracking-wide text-gold md:text-6xl"
            >
              {loveBinaryDecoded}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
