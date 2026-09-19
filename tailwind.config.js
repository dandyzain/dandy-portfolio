/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        pastel: {
          lavender: {
            light: '#F4F5FF',
            DEFAULT: '#E4E7FF',
            accent: '#8B9BFA',
            dark: '#6366F1'
          },
          mint: {
            light: '#F0FDF8',
            DEFAULT: '#D1FAE5',
            accent: '#34D399',
            dark: '#10B981'
          },
          peach: {
            light: '#FFF5F2',
            DEFAULT: '#FFE4E0',
            accent: '#FB7185',
            dark: '#F43F5E'
          },
          sky: {
            light: '#F0F9FF',
            DEFAULT: '#E0F2FE',
            accent: '#38BDF8',
            dark: '#0284C7'
          },
          butter: {
            light: '#FEFCE8',
            DEFAULT: '#FEF08A',
            accent: '#FACC15',
            dark: '#EAB308'
          },
          lilac: {
            light: '#FAF5FF',
            DEFAULT: '#F3E8FF',
            accent: '#C084FC',
            dark: '#9333EA'
          },
          card: {
            light: '#FFFFFF',
            dark: '#1E2238'
          },
          bg: {
            light: '#FAF9F6',
            dark: '#0F1222'
          }
        }
      },
      boxShadow: {
        'pastel-sm': '0 2px 10px rgba(139, 155, 250, 0.08)',
        'pastel-md': '0 8px 30px rgba(139, 155, 250, 0.12)',
        'pastel-lg': '0 15px 40px rgba(139, 155, 250, 0.18)',
        'pastel-glow': '0 0 35px rgba(228, 231, 255, 0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}
