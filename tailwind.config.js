import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(0deg, #D27C59, #D27C59),linear-gradient(277.9deg, #F0936C 21.64%, #9DEAF4 119.7%);',
        'blue-slate-gradient': 'linear-gradient(38deg, rgba(246,251,255,1) 0%, rgba(235,246,255,1) 47%, rgba(247,252,255,1) 100%)',
      },
      colors: {
        primary: '#2f6690'
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      theme: {
        prefix: 'nextui', // prefix for themes variables
        addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
        defaultTheme: 'light', // default theme from the themes object
        defaultExtendTheme: 'light',
      },
    }),
  ],
};
