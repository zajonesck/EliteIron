/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ei-red': '#C41E1E',
        'ei-red-dark': '#9B1515',
        'ei-red-light': '#E02020',
        'ei-navy': '#0B1929',
        'ei-navy-light': '#0F2240',
      },
    },
  },
  plugins: [],
};
