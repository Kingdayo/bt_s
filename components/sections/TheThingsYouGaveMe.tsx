'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { tributeContent, type GiftItem } from '@/lib/content';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { StarField } from '@/components/StarField';

const NODE_POSITIONS = [
  { x: 50, y: 16 },
  { x: 22, y: 32 },
  { x: 78, y: 30 },
  { x: 30, y: 54 },
  { x: 70, y: 56 },
  { x: 50, y: 46 },
  { x: 18, y: 72 },
  { x: 82, y: 70 },
  { x: 42, y: 80 },
  { x: 58, y: 64 },
];

export function TheThingsYouGaveMe() {
  const [active, setActive] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const reduced = useReducedMotion();
  const gifts = tributeContent.gifts;

  const openGift = (i: number) => {
    setActive(i);
    setVisited((prev) => new Set(prev).add(i));
  };

  const allVisited = visited.size === gifts.length;

  return (
    <section
      id="gifts"
      className="grain relative w-full overflow-hidden bg-ink-soft px-6 py-32 md:px-12 md:py-48"
      aria-label="The things you gave me"
    >
      <StarField density={0.00006} glow />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="font-sans text-xs tracking-mega text-gold uppercase">Chapter Three</p>
          <h2 className="mt-4 font-serif text-3xl font-light text-ivory md:text-5xl">
            The Things You Gave Me
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg font-light italic text-ivory-mute md:text-xl">
            Each one became part of who I am. Touch one to understand its weight.
          </p>
        </motion.div>

        {/* constellation canvas */}
        <div className="relative mx-auto aspect-square w-full max-w-2xl">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {/* connecting lines between visited nodes */}
            {Array.from(visited).map((i, _idx, arr) => {
              const next = arr[_idx + 1];
              if (next === undefined) return null;
              const a = NODE_POSITIONS[i];
              const b = NODE_POSITIONS[next];
              return (
                <motion.line
                  key={`${i}-${next}`}
                  x1={`${a.x}%`}
                  y1={`${a.y}%`}
                  x2={`${b.x}%`}
                  y2={`${b.y}%`}
                  stroke="hsl(var(--gold))"
                  strokeWidth="0.5"
                  strokeOpacity="0.35"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                />
              );
            })}
            {/* lines to center from each visited */}
            {Array.from(visited).map((i) => {
              const p = NODE_POSITIONS[i];
              return (
                <motion.line
                  key={`c-${i}`}
                  x1={`${p.x}%`}
                  y1={`${p.y}%`}
                  x2="50%"
                  y2="50%"
                  stroke="hsl(var(--gold))"
                  strokeWidth="0.3"
                  strokeOpacity="0.15"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
              );
            })}
          </svg>

          {/* center node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={allVisited ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/5 shadow-gold md:h-20 md:w-20">
              <span className="font-serif text-xs text-gold md:text-sm">YOU</span>
            </div>
          </motion.div>

          {/* gift nodes */}
          {gifts.map((gift, i) => {
            const pos = NODE_POSITIONS[i % NODE_POSITIONS.length];
            const isVisited = visited.has(i);
            return (
              <button
                key={i}
                onClick={() => openGift(i)}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft rounded-full"
                aria-label={`Read about ${gift.concept}`}
              >
                <motion.span
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className={`flex h-11 items-center justify-center rounded-full border px-3 transition md:h-12 md:px-4 ${
                    isVisited
                      ? 'border-gold/60 bg-gold/10 text-gold'
                      : 'border-ivory/15 bg-ink-deep/60 text-ivory-dim hover:border-gold/40 hover:text-gold'
                  }`}
                >
                  <span className="font-sans text-[11px] tracking-wide md:text-xs">
                    {gift.concept}
                  </span>
                </motion.span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {allVisited && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center font-serif text-lg font-light italic text-gold md:text-xl"
            >
              Everything you gave became part of who I became.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* modal */}
      <AnimatePresence>
        {active !== null && (
          <GiftModal
            gift={gifts[active]}
            onClose={() => setActive(null)}
            reduced={reduced}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function GiftModal({
  gift,
  onClose,
  reduced,
}: {
  gift: GiftItem;
  onClose: () => void;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/90 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Reflection on ${gift.concept}`}
    >
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg rounded-2xl border border-gold/20 bg-ink p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ivory-mute transition hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h3 className="font-serif text-2xl font-light tracking-wide text-gold md:text-3xl">
          {gift.concept.toUpperCase()}
        </h3>
        <div className="mt-6 space-y-4">
          {gift.message.map((line, i) => (
            <motion.p
              key={i}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.35 }}
              className="font-serif text-base font-light leading-relaxed text-ivory-dim md:text-lg"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
