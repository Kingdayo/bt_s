'use client';

import { useEffect, useRef } from 'react';

interface AudioEngineProps {
  enabled: boolean;
}

// A subtle generative ambient pad using the Web Audio API.
// No external audio files required. Honors the enabled toggle.
export function AudioEngine({ enabled }: AudioEngineProps) {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    master: GainNode;
    oscs: OscillatorNode[];
    lfo: OscillatorNode;
    lfoGain: GainNode;
  } | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (ctxRef.current && nodesRef.current) {
        const ctx = ctxRef.current;
        const { master, oscs, lfo } = nodesRef.current;
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
        setTimeout(() => {
          try {
            lfo.stop();
            oscs.forEach((o) => o.stop());
            ctx.close();
          } catch {
            // already closed
          }
          ctxRef.current = null;
          nodesRef.current = null;
        }, 1200);
      }
      return;
    }

    if (ctxRef.current) return;

    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.setTargetAtTime(0.08, ctx.currentTime, 2.5);
    master.connect(ctx.destination);

    // Soft lowpass for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;
    filter.Q.value = 0.6;
    filter.connect(master);

    // A gentle C minor-ish pad
    const freqs = [130.81, 196.0, 261.63, 392.0];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 === 0 ? 'sine' : 'triangle';
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.18 / freqs.length;
      o.connect(g);
      g.connect(filter);
      o.start();
      return o;
    });

    // Slow LFO for breathing
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();

    nodesRef.current = { master, oscs, lfo, lfoGain };

    return () => {
      // teardown handled by the enabled=false branch above
    };
  }, [enabled]);

  return null;
}
