'use client';

import { motion } from 'framer-motion';
import { tributeContent } from '@/lib/content';

export function Footer() {
  const name = tributeContent.graduateName.replace(/\[|\]/g, '');

  return (
    <footer className="grain relative w-full overflow-hidden bg-ink-deep px-6 py-20 text-center md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-xl"
      >
        <div className="mx-auto mb-10 h-px w-16 bg-gold/30" />
        <p className="font-serif text-lg font-light italic text-ivory-dim">
          Built with love.
        </p>
        <p className="mt-2 font-serif text-lg font-light italic text-ivory-dim">
          Powered by gratitude.
        </p>
        <p className="mt-6 font-sans text-xs tracking-wide text-ivory-mute">
          &copy; 2026 {name || '[Your Name]'}
        </p>
        <div className="mx-auto my-8 h-px w-16 bg-ivory/10" />
        <p className="font-serif text-sm font-light italic text-ivory-mute">
          No photos were required.
        </p>
        <p className="font-serif text-sm font-light italic text-ivory-mute">
          The memories were enough.
        </p>
      </motion.div>
    </footer>
  );
}
