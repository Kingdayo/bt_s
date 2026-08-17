'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { tributeContent } from '@/lib/content';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const CO_AUTHORS = ['raising', 'supporting', 'encouraging', 'protecting', 'believing', 'loving'];

export function TheDegree() {
  const reduced = useReducedMotion();
  const name = tributeContent.graduateName;

  return (
    <section
      id="degree"
      className="grain relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink px-6 py-32 md:px-12"
      aria-label="The degree"
    >
      <div className="pointer-events-none absolute inset-0 bg-gold-glow opacity-30" />

      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* certificate */}
        <div className="relative overflow-hidden rounded-lg border border-gold/25 bg-ink-soft/80 p-8 text-center shadow-gold md:p-14">
          {/* corner ornaments */}
          <Corner className="left-3 top-3" />
          <Corner className="right-3 top-3 rotate-90" />
          <Corner className="bottom-3 right-3 rotate-180" />
          <Corner className="bottom-3 left-3 -rotate-90" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 text-gold">
              <span className="h-px w-8 bg-gold/40" />
              <Award size={18} />
              <span className="h-px w-8 bg-gold/40" />
            </div>
            <p className="mt-4 font-sans text-[11px] tracking-mega text-gold uppercase">
              Certificate of Achievement
            </p>
            <h2 className="mt-6 font-serif text-3xl font-light text-ivory md:text-4xl">
              BACHELOR OF
            </h2>
            <h2 className="font-serif text-3xl font-light text-ivory md:text-4xl">
              COMPUTER SCIENCE
            </h2>
          </motion.div>

          <div className="my-8 mx-auto h-px w-24 bg-gold/30" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-sm italic text-ivory-mute"
          >
            awarded to
          </motion.p>
          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-3 font-serif text-2xl font-light text-gold md:text-3xl"
          >
            {name}
          </motion.p>

          <div className="my-8 mx-auto h-px w-24 bg-gold/30" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-serif text-sm italic text-ivory-mute"
          >
            Unofficially awarded to
          </motion.p>
          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="mt-3 font-serif text-3xl font-light tracking-wide text-ivory md:text-4xl"
          >
            MOM &amp; DAD
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-8 font-serif text-sm text-ivory-dim"
          >
            For outstanding achievement in
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 1.6 } },
            }}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          >
            {CO_AUTHORS.map((word) => (
              <motion.li
                key={word}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                className="font-serif text-base italic text-ivory-dim"
              >
                {word}
              </motion.li>
            ))}
          </motion.ul>
          <p className="mt-3 font-serif text-sm text-ivory-mute">a future computer scientist.</p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2.4 }}
            className="mt-10 font-sans text-xs tracking-display text-gold/70"
          >
            Co-authors: Mom &amp; Dad
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

function Corner({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute h-6 w-6 text-gold/40 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 2 L2 10 M2 2 L10 2" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
