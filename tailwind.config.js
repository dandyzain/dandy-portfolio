/** @type {import('tailwindcss').Config} */

// Design tokens live as CSS variables in src/index.css (RGB channels, so
// Tailwind opacity modifiers like `bg-signal/10` keep working).
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        ink: token('ink'),
        'ink-2': token('ink-2'),
        muted: token('muted'),
        line: token('line'),
        signal: token('signal'),
        'signal-ink': token('signal-ink'),
        amber: token('amber'),
        'amber-ink': token('amber-ink'),
        danger: token('danger'),
        // LEGACY (removed in Phase 7 once every component is migrated)
        pastel: {
          lavender: { light: '#F4F5FF', DEFAULT: '#E4E7FF', accent: '#8B9BFA', dark: '#6366F1' },
          mint: { light: '#F0FDF8', DEFAULT: '#D1FAE5', accent: '#34D399', dark: '#10B981' },
          peach: { light: '#FFF5F2', DEFAULT: '#FFE4E0', accent: '#FB7185', dark: '#F43F5E' },
          sky: { light: '#F0F9FF', DEFAULT: '#E0F2FE', accent: '#38BDF8', dark: '#0284C7' },
          butter: { light: '#FEFCE8', DEFAULT: '#FEF08A', accent: '#FACC15', dark: '#EAB308' },
          lilac: { light: '#FAF5FF', DEFAULT: '#F3E8FF', accent: '#C084FC', dark: '#9333EA' },
          card: { light: '#FFFFFF', dark: '#1E2238' },
          bg: { light: '#FAF9F6', dark: '#0F1222' },
        },
      },
      fontSize: {
        // Fluid display sizes for editorial headings
        'display-xl': ['clamp(2.6rem, 6.2vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2rem, 4.2vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.5rem, 2.6vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        eyebrow: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
      },
      maxWidth: {
        content: '76rem',
        prose: '42rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--c-shadow) / 0.06), 0 8px 24px -12px rgb(var(--c-shadow) / 0.18)',
        lift: '0 2px 4px rgb(var(--c-shadow) / 0.06), 0 24px 48px -20px rgb(var(--c-shadow) / 0.35)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        instant: '100ms',
        fast: '180ms',
        base: '280ms',
        slow: '450ms',
      },
    },
  },
  plugins: [],
}
