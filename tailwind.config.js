import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fadeIn 1.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(0deg, #D27C59, #D27C59),linear-gradient(277.9deg, #F0936C 21.64%, #9DEAF4 119.7%);",
        "blue-slate-gradient":
          "linear-gradient(38deg, rgba(246,251,255,1) 0%, rgba(235,246,255,1) 47%, rgba(247,252,255,1) 100%)",
      },
      colors: {
        primary: "#025687",
        "primary-lite": "#75AFD2",
        "primary-mute": "#DCECF6",
        secondary: "#000000",
        "secondary-lite": "#817F7F",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      theme: {
        prefix: "nextui", // prefix for themes variables
        addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
        defaultTheme: "light", // default theme from the themes object
        defaultExtendTheme: "light",
      },
    }),
  ],
};
