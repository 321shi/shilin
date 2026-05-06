/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#FF8C42",
        secondary: "#6BA6FF",
        accent: "#FFF5E6",
        text: "#2D2D2D",
        muted: "#8B8B8B",
        background: "#FFFDF5",
        surface: "#FFFFFF",
        border: "#2D2D2D",
      },
      fontFamily: {
        'sans': ['"Caveat"', '"Noto Sans SC"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'line': '4px 4px 0px #2D2D2D',
        'line-hover': '6px 6px 0px #2D2D2D',
      }
    },
  },
  plugins: [],
};
