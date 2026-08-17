'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkle: number;
  vx: number;
  vy: number;
}

interface StarFieldProps {
  density?: number;
  className?: string;
  glow?: boolean;
}

export function StarField({ density = 0.00012, className = '', glow = false }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      w = parent?.clientWidth ?? window.innerWidth;
      h = parent?.clientHeight ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(40, Math.floor(w * h * density));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.15,
        twinkle: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.twinkle += 0.012;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        const alpha = reduced
          ? s.baseAlpha
          : s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        if (glow && s.r > 1.1) {
          ctx.fillStyle = `hsla(41, 70%, 65%, ${alpha})`;
        } else {
          ctx.fillStyle = `hsla(40, 30%, 92%, ${alpha})`;
        }
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    init();
    if (reduced) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 30%, 92%, ${s.baseAlpha})`;
        ctx.fill();
      }
    } else {
      draw();
    }

    const onResize = () => {
      cancelAnimationFrame(raf);
      init();
      if (!reduced) draw();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [density, glow, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}
