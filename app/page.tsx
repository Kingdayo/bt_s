'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TerminalOpening } from '@/components/sections/TerminalOpening';
import { ThisIsYourStoryToo } from '@/components/sections/ThisIsYourStoryToo';
import { TheJourney } from '@/components/sections/TheJourney';
import { TheThingsYouGaveMe } from '@/components/sections/TheThingsYouGaveMe';
import { ThingsINeverSaidEnough } from '@/components/sections/ThingsINeverSaidEnough';
import { TheDegree } from '@/components/sections/TheDegree';
import { IfLifeWereCode } from '@/components/sections/IfLifeWereCode';
import { ParentTribute } from '@/components/sections/ParentTribute';
import { WhatICarryForward } from '@/components/sections/WhatICarryForward';
import { TheFuture } from '@/components/sections/TheFuture';
import { ThePromise } from '@/components/sections/ThePromise';
import { PhotolessStatement } from '@/components/sections/PhotolessStatement';
import { FinalLetter } from '@/components/sections/FinalLetter';
import { EasterEgg } from '@/components/sections/EasterEgg';
import { Footer } from '@/components/sections/Footer';
import { ProgressRail } from '@/components/ProgressRail';
import { OverlayControls } from '@/components/OverlayControls';
import { AudioEngine } from '@/components/AudioEngine';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const handleBegin = useCallback(() => {
    setStarted(true);
    // smooth scroll to the first content section
    requestAnimationFrame(() => {
      document.getElementById('your-story')?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  const handleReplay = useCallback(() => {
    setStarted(false);
    setReplayKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // keyboard: pressing Enter on terminal screen begins
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!started && (e.key === 'Enter' || e.key === ' ')) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== 'BUTTON') {
          handleBegin();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, handleBegin]);

  return (
    <main className="relative w-full bg-ink">
      <AudioEngine enabled={audioEnabled} />
      <ProgressRail />

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key={`terminal-${replayKey}`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TerminalOpening onBegin={handleBegin} />
          </motion.div>
        ) : (
          <motion.div
            key={`story-${replayKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ThisIsYourStoryToo />
            <TheJourney />
            <TheThingsYouGaveMe />
            <ThingsINeverSaidEnough />
            <TheDegree />
            <IfLifeWereCode />
            <ParentTribute parent="mother" chapter="Chapter Eight" accentSide="left" />
            <ParentTribute parent="father" chapter="Chapter Nine" accentSide="right" />
            <WhatICarryForward />
            <TheFuture />
            <ThePromise />
            <PhotolessStatement />
            <FinalLetter />
            <EasterEgg />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <OverlayControls
          onReplay={handleReplay}
          audioEnabled={audioEnabled}
          onToggleAudio={() => setAudioEnabled((a) => !a)}
        />
      )}
    </main>
  );
}
