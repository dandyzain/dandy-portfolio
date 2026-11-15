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
      },
      fontSize: {
        // Fluid display sizes for editorial headings
        'display-xl': ['clamp(2.4rem, 5.4vw, 4.6rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
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
