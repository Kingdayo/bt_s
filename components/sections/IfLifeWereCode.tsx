'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface CodeBlock {
  lines: string[];
}

const CODE_BLOCKS: CodeBlock[] = [
  {
    lines: [
      'const myLife = {',
      '    education: "Computer Science",',
      '    achievement: "Graduated",',
      '    future: "in God\u2019s hands"',
      '};',
    ],
  },
  {
    lines: [
      'myLife.support = [',
      '    "God",',
      '    "Mom",',
      '    "Dad"',
      '];',
    ],
  },
  {
    lines: [
      'myLife.success = {',
      '    effort: "mine",',
      '    opportunity: "ours",',
      '    gratitude: "endless"',
      '};',
    ],
  },
  {
    lines: [
      'function thankYou() {',
      '    return "I love you.";',
      '}',
    ],
  },
];

const DEPENDENCIES = ['love', 'patience', 'sacrifice', 'family'];

export function IfLifeWereCode() {
  const [visibleBlocks, setVisibleBlocks] = useState<number>(0);
  const [built, setBuilt] = useState(false);
  const [depsShown, setDepsShown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // reveal blocks sequentially via scroll
  useEffect(() => {
    if (reduced) {
      setVisibleBlocks(CODE_BLOCKS.length);
      setBuilt(true);
      setDepsShown(true);
      return;
    }
  }, [reduced]);

  const revealNext = () => {
    setVisibleBlocks((b) => {
      const next = Math.min(b + 1, CODE_BLOCKS.length);
      if (next === CODE_BLOCKS.length) {
        setTimeout(() => setBuilt(true), 900);
        setTimeout(() => setDepsShown(true), 2400);
      }
      return next;
    });
  };

  return (
    <section
      id="code"
      className="grain relative w-full overflow-hidden bg-ink-deep px-4 py-32 md:px-12 md:py-48"
      aria-label="If life were code"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 text-center"
        >
          <p className="font-sans text-xs tracking-mega text-gold uppercase">Chapter Six</p>
          <h2 className="mt-4 font-serif text-3xl font-light text-ivory md:text-5xl">
            If Life Were Code
          </h2>
        </motion.div>

        {/* editor window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="overflow-hidden rounded-xl border border-ivory/10 bg-[#0d0c0a] shadow-gold"
        >
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-ivory/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/70" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/70" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/70" />
            <span className="ml-3 font-sans text-xs text-ivory-mute">life.js</span>
          </div>

          {/* code area */}
          <div
            ref={containerRef}
            className="min-h-[340px] overflow-x-auto p-5 font-mono text-sm leading-relaxed md:p-7 md:text-[15px]"
          >
            {CODE_BLOCKS.slice(0, visibleBlocks).map((block, bi) => (
              <CodeBlockView key={bi} block={block} reduced={reduced} delay={bi * 0.1} />
            ))}

            {/* build output */}
            <AnimatePresence>
              {built && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-6 border-t border-gold/20 pt-4"
                >
                  <p className="flex items-center gap-2 font-mono text-sm text-green-400/90">
                    <Check size={15} /> BUILD SUCCESSFUL
                  </p>
                  {depsShown && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="mt-3 font-mono text-xs text-ivory-mute"
                    >
                      <p>Dependencies:</p>
                      <ul className="mt-1 space-y-0.5">
                        {DEPENDENCIES.map((d) => (
                          <li key={d} className="pl-4 text-gold/80">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* reveal button */}
        {visibleBlocks < CODE_BLOCKS.length && (
          <div className="mt-8 text-center">
            <button
              onClick={revealNext}
              className="rounded-full border border-gold/40 px-6 py-2.5 font-sans text-sm tracking-wide text-ivory-dim transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              {visibleBlocks === 0 ? 'Compile' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function CodeBlockView({ block, reduced, delay }: { block: CodeBlock; reduced: boolean; delay: number }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (reduced) {
      setVisibleLines(block.lines.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (i <= block.lines.length) {
        setVisibleLines(i);
        i++;
        timer = setTimeout(tick, 280);
      }
    };
    timer = setTimeout(tick, delay * 1000 + 300);
    return () => clearTimeout(timer);
  }, [block.lines, reduced, delay]);

  return (
    <div className="mb-3">
      {block.lines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="whitespace-pre"
        >
          <CodeLine line={line} />
        </motion.div>
      ))}
    </div>
  );
}

const KEYWORDS = ['const', 'function', 'return'];
const STRINGS = /"([^"]*)"/g;

function CodeLine({ line }: { line: string }) {
  const parts: { text: string; type: 'plain' | 'keyword' | 'string' | 'prop' }[] = [];
  let match: RegExpExecArray | null;

  const segments: { text: string; type: 'plain' | 'keyword' | 'string' | 'prop' }[] = [];
  let lastIndex = 0;
  STRINGS.lastIndex = 0;
  while ((match = STRINGS.exec(line)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: line.slice(lastIndex, match.index), type: 'plain' });
    }
    segments.push({ text: match[0], type: 'string' });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < line.length) {
    segments.push({ text: line.slice(lastIndex), type: 'plain' });
  }

  for (const seg of segments) {
    if (seg.type === 'string') {
      parts.push(seg);
      continue;
    }
    // check keywords
    let segText = seg.text;
    for (const kw of KEYWORDS) {
      const kwIdx = segText.indexOf(kw);
      if (kwIdx !== -1) {
        if (kwIdx > 0) parts.push({ text: segText.slice(0, kwIdx), type: 'plain' });
        parts.push({ text: kw, type: 'keyword' });
        segText = segText.slice(kwIdx + kw.length);
      }
    }
    if (segText) parts.push({ text: segText, type: 'plain' });
  }

  return (
    <>
      {parts.map((p, i) => (
        <span
          key={i}
          className={
            p.type === 'keyword'
              ? 'text-[#c678dd]'
              : p.type === 'string'
                ? 'text-[#98c379]'
                : 'text-ivory-dim'
          }
        >
          {p.text}
        </span>
      ))}
    </>
  );
}
