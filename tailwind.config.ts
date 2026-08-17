import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          DEFAULT: 'hsl(var(--ink))',
          deep: 'hsl(var(--ink-deep))',
          soft: 'hsl(var(--ink-soft))',
        },
        ivory: {
          DEFAULT: 'hsl(var(--ivory))',
          dim: 'hsl(var(--ivory-dim))',
          mute: 'hsl(var(--ivory-mute))',
        },
        gold: {
          DEFAULT: 'hsl(var(--gold))',
          soft: 'hsl(var(--gold-soft))',
          deep: 'hsl(var(--gold-deep))',
        },
        champagne: 'hsl(var(--champagne))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-glow': 'radial-gradient(circle at center, hsl(var(--gold) / 0.15), transparent 70%)',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        blink: 'blink 1.05s step-end infinite',
        shimmer: 'shimmer 8s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        draw: 'draw 2.4s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
