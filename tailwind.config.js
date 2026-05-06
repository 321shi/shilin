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
        primary: "#000000",
        secondary: "#000000",
        accent: "#F0F0F0",
        text: "#000000",
        muted: "#666666",
        background: "#FFFFFF",
        surface: "#FFFFFF",
        border: "#000000",
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
        'line': '4px 4px 0px #000000',
        'line-hover': '6px 6px 0px #000000',
      }
    },
  },
  plugins: [],
};
