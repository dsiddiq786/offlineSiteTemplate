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
        // sans: ['var(--font-sans)'],
        // mono: ['var(--font-mono)'],
      },
      borderColor: {
        DEFAULT: '#d9d8d6', // Set default border color (e.g., Red)
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
