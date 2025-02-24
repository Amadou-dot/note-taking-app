import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        'background-light': '#F0F0F0',
        'background-dark': '#1e293b',
        'text-dark': '#1e293b',
        'text-light': '#F0F0F0',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
