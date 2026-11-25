/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gta: {
          pink: '#ff2a85',
          amber: '#f59e0b',
          purple: '#7c3aed',
          cyan: '#06b6d4',
          dark: '#07040d',
          surface: '#0d0718',
        },
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'neon-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 16px rgba(255, 42, 133, 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 6px rgba(255, 42, 133, 0.3))' },
        }
      }
    },
  },
  plugins: [],
}
