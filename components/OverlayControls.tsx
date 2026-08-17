'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface OverlayControlsProps {
  onReplay: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export function OverlayControls({
  onReplay,
  audioEnabled,
  onToggleAudio,
}: OverlayControlsProps) {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(t);
  }, [atTop]);

  return (
    <AnimatePresence>
      {(visible || atTop) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-5 right-5 z-50 flex flex-col gap-2"
        >
          <button
            onClick={onToggleAudio}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-ink-deep/70 text-ivory-dim backdrop-blur-sm transition hover:border-gold/60 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            aria-label={audioEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
            onMouseEnter={() => setVisible(true)}
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={onReplay}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-ink-deep/70 text-ivory-dim backdrop-blur-sm transition hover:border-gold/60 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            aria-label="Restart the experience from the beginning"
            onMouseEnter={() => setVisible(true)}
          >
            <RotateCcw size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
