const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fdfdff',
      black: '#111827',
      darkbg: '#374151',
      darkhover: '#272e3a',
      darkselected: '#4c596f',
      indigo: colors.indigo,
      gray: colors.gray,
    },
  },
  darkMode: 'class',
  plugins: [require('tailwind-scrollbar-hide')],
};
