'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { tributeContent } from '@/lib/content';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { StarField } from '@/components/StarField';

export function ThingsINeverSaidEnough() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const statements = tributeContent.unsaid;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setIndex((i) => (i < statements.length - 1 ? i + 1 : i));
    }, reduced ? 2500 : 5200);
    return () => clearTimeout(t);
  }, [index, paused, reduced, statements.length]);

  const next = () => setIndex((i) => Math.min(i + 1, statements.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <section
      id="unsaid"
      className="grain relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink-deep px-6 py-32 md:px-12"
      aria-label="Things I never said enough"
    >
      <StarField density={0.00005} />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="font-sans text-xs tracking-mega text-gold uppercase">Chapter Four</p>
          <p className="mt-6 font-serif text-xl font-light italic leading-relaxed text-ivory-dim md:text-2xl">
            There are things children feel deeply
            <br />
            but don&rsquo;t always know how to say.
          </p>
        </motion.div>

        {/* statement stage */}
        <div className="relative flex min-h-[200px] w-full items-center justify-center md:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -30, filter: 'blur(8px)' }}
              transition={{ duration: reduced ? 0.3 : 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center font-serif text-2xl font-light leading-snug text-ivory text-balance md:text-4xl md:leading-tightest"
            >
              {statements[index].text}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-16 flex items-center gap-6">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition hover:border-gold/50 hover:text-gold disabled:opacity-30 disabled:hover:border-ivory/15 disabled:hover:text-ivory-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            aria-label="Previous statement"
          >
            <ChevronLeft size={18} />
          </button>

          {/* dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Statement progress">
            {statements.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-gold' : 'w-1.5 bg-ivory/20 hover:bg-ivory/40'
                }`}
                aria-label={`Go to statement ${i + 1}`}
                aria-selected={i === index}
                role="tab"
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={index === statements.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition hover:border-gold/50 hover:text-gold disabled:opacity-30 disabled:hover:border-ivory/15 disabled:hover:text-ivory-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            aria-label="Next statement"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setPaused((p) => !p)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition hover:border-gold/50 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            aria-label={paused ? 'Resume auto-advance' : 'Pause auto-advance'}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>

        <p className="mt-6 font-sans text-xs text-ivory-mute">
          {index + 1} of {statements.length}
        </p>
      </div>
    </section>
  );
}
