'use client';

import { motion } from 'framer-motion';
import { tributeContent, type ParentSection as ParentSectionType } from '@/lib/content';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { StarField } from '@/components/StarField';

interface ParentTributeProps {
  parent: 'mother' | 'father';
  chapter: string;
  accentSide: 'left' | 'right';
}

export function ParentTribute({ parent, chapter, accentSide }: ParentTributeProps) {
  const data: ParentSectionType = tributeContent.parents[parent];
  const reduced = useReducedMotion();
  const isLeft = accentSide === 'left';

  return (
    <section
      id={parent}
      className="grain relative w-full overflow-hidden bg-ink px-6 py-32 md:px-12 md:py-48"
      aria-label={`For ${data.name}`}
    >
      <StarField density={0.00005} glow={parent === 'mother'} />

      {/* accent rule */}
      <div
        className={`pointer-events-none absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent ${
          isLeft ? 'left-0' : 'left-0'
        }`}
      />

      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-sans text-xs tracking-mega text-gold uppercase"
        >
          {chapter}
        </motion.p>

        <motion.h2
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-6xl font-light tracking-wide text-ivory md:text-8xl"
        >
          {parent === 'mother' ? 'MOM' : 'DAD'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 font-serif text-xl font-light leading-relaxed text-ivory-dim md:text-2xl"
        >
          {data.openingLine}
        </motion.p>

        {data.highlight.split('\n').map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 + i * 0.3 }}
            className="mt-3 font-serif text-2xl font-light leading-snug text-gold md:text-3xl"
          >
            {line}
          </motion.p>
        ))}

        {/* letter area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 rounded-lg border border-gold/15 bg-ink-soft/50 p-6 md:mt-20 md:p-10"
        >
          <p className="font-serif text-sm italic text-gold/70">{data.letterTitle}</p>
          <div className="mt-6 space-y-8">
            {data.memories.map((mem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <p className="font-sans text-xs tracking-wide text-ivory-mute uppercase">
                  {mem.label}
                </p>
                <p className="mt-2 font-serif text-lg font-light italic leading-relaxed text-ivory-dim">
                  {mem.placeholder}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 border-t border-gold/15 pt-8">
            <p className="font-sans text-xs tracking-wide text-ivory-mute uppercase">
              Final message
            </p>
            <p className="mt-3 font-serif text-xl font-light leading-relaxed text-gold">
              {data.finalMessage}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
