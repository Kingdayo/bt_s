'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { tributeContent } from '@/lib/content';

const BOOT_SEQUENCE = [
  'initializing...',
  'loading memories...',
  'loading sacrifices...',
  'loading late nights...',
  'loading encouragement...',
  'loading patience...',
  'calculating who made this possible...',
];

interface TerminalOpeningProps {
  onBegin: () => void;
}

export function TerminalOpening({ onBegin }: TerminalOpeningProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<'boot' | 'reveal' | 'ready'>('boot');
  const reduced = useReducedMotion();

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const next = () => {
      if (i < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, BOOT_SEQUENCE[i]]);
        i++;
        timer = setTimeout(next, reduced ? 200 : 620);
      } else {
        timer = setTimeout(() => setPhase('reveal'), reduced ? 300 : 1100);
      }
    };
    timer = setTimeout(next, 500);

    return () => clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (phase === 'reveal') {
      const t = setTimeout(() => setPhase('ready'), reduced ? 400 : 1800);
      return () => clearTimeout(t);
    }
  }, [phase, reduced]);

  const handleBegin = () => {
    onBegin();
  };

  return (
    <section
      id="terminal"
      className="grain relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink-deep px-6"
      aria-label="Terminal opening"
    >
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* terminal header */}
        <div className="mb-5 flex items-center gap-2 text-ivory-mute">
          <span className="h-2.5 w-2.5 rounded-full bg-gold/40" />
          <span className="font-sans text-[11px] tracking-display uppercase">tribute.init</span>
        </div>

        {/* boot lines */}
        <div className="min-h-[220px] font-sans text-sm leading-relaxed text-ivory-dim md:text-base">
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3"
              >
                <span className="text-gold/60">{'>'}</span>
                <span>{line}</span>
                {i === lines.length - 1 && phase === 'boot' && (
                  <span className="animate-blink text-gold">_</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* reveal */}
          <AnimatePresence>
            {phase !== 'boot' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mt-8"
              >
                <motion.h1
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, letterSpacing: '0.5em' }}
                  animate={{ opacity: 1, scale: 1, letterSpacing: '0.18em' }}
                  transition={{ duration: reduced ? 0.4 : 1.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-4xl font-light text-ivory md:text-6xl"
                >
                  YOU DID.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: reduced ? 0.1 : 0.7 }}
                  className="mt-4 font-sans text-sm tracking-display text-gold md:text-base"
                >
                  MOM &amp; DAD
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* begin button */}
        <AnimatePresence>
          {phase === 'ready' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-col items-start gap-3"
            >
              <button
                onClick={handleBegin}
                className="group relative inline-flex items-center gap-3 rounded-full border border-gold/40 px-8 py-3 font-sans text-sm tracking-display text-ivory transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                <span>BEGIN</span>
                <ArrowDown
                  size={15}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </button>
              <p className="font-sans text-xs text-ivory-mute">
                A letter to {tributeContent.parents.mother.name.replace(/\[|\]/g, '')} and{' '}
                {tributeContent.parents.father.name.replace(/\[|\]/g, '')}
                . From {tributeContent.graduateName.replace(/\[|\]/g, '')}.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
