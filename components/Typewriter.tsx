'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  showCursor?: boolean;
  onDone?: () => void;
}

export function Typewriter({
  text,
  speed = 38,
  startDelay = 0,
  className = '',
  showCursor = true,
  onDone,
}: TypewriterProps) {
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOutput(text);
      setDone(true);
      onDone?.();
      return;
    }
    setOutput('');
    setDone(false);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(() => {
      const tick = () => {
        if (i <= text.length) {
          setOutput(text.slice(0, i));
          i++;
          timer = setTimeout(tick, speed);
        } else {
          setDone(true);
          onDone?.();
        }
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, reduced]);

  return (
    <span className={className}>
      {output}
      {showCursor && !done && <span className="animate-blink text-gold">_</span>}
    </span>
  );
}
