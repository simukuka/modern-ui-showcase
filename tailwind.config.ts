import type { Config } from 'tailwindcss';

/**
 * Brand design tokens for Shaarz Cosmetics.
 * Change colours and fonts here and the whole site updates.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Soft neutral background / surfaces
        cream: {
          50: '#fdfbf8',
          100: '#faf5ef',
          200: '#f3e9de',
          300: '#e8d8c6',
        },
        // Blush tones
        blush: {
          50: '#fdf4f3',
          100: '#fbe8e6',
          200: '#f6d3cf',
          300: '#eeb2ab',
          400: '#e28b82',
          500: '#d0685e',
        },
        // Refined accent (deep rose-bronze) — used for CTAs and links
        accent: {
          DEFAULT: '#8a4b3f',
          light: '#a8665a',
          dark: '#6b372d',
        },
        // Text
        ink: {
          DEFAULT: '#2b2220',
          soft: '#5c4f4b',
          muted: '#6f625e',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(43, 34, 32, 0.18)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-in-right': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-in-right': 'slide-in-right 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-up': 'fade-up 500ms ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config;
