/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#121212',
          light: '#1E1E1E',
        },
        primary: {
          DEFAULT: '#32CD32',
          hover: '#2EBD2E',
          100: '#E8FFE8',
          200: '#C5FFC5',
          300: '#90FF90',
          400: '#60FF60',
          500: '#32CD32',
          600: '#2BA62B',
          700: '#217D21',
          800: '#195A19',
          900: '#0F3A0F',
        },
        secondary: {
          DEFAULT: '#8A2BE2',
          hover: '#7A25CC',
          100: '#F3E7FC',
          200: '#E6CFF9',
          300: '#CFA6F5',
          400: '#B77DF0',
          500: '#8A2BE2',
          600: '#7A25CC',
          700: '#621DA3',
          800: '#4A1679',
          900: '#310D4F',
        },
        success: {
          DEFAULT: '#10B981',
          hover: '#0EA06F',
        },
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};